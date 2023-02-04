/* eslint-disable prefer-object-spread */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../models');

const { roles, scheduledClassStatus, types, notificationTypes } = require('../config/keys');

const { STUDENT, TEACHER } = roles;
const { PENDING, APPROVED, REJECTED, START_CLASS, PAYMENT_DUE, FINISH_CLASS } = scheduledClassStatus;
const { ONLINE, TL, SL } = types;
const { INITIATED_CLASS, ACCEPT_REQUEST, REJECTED_REQUEST } = notificationTypes;

const { ScheduledClass, Customer, ClassType, Subject, Review, Notification } = db;
const initiateScheduledClass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }
  // if sender is teacher reciver must be student elsewhere sender is student and reciver is student
  const scObj = Object.assign({}, req.body);
  let studentSender = false;
  // console.log(req.userId);

  try {
    switch (scObj.tutionplace.toUpperCase()) {
      case ONLINE:
        scObj.tutionplace = ONLINE;
        break;
      case TL:
        scObj.tutionplace = TL;
        break;
      case SL:
        scObj.tutionplace = SL;
        break;
      default:
        scObj.tutionplace = ONLINE;
        break;
    }
    // console.log(scObj);
    const findSender = await Customer.findOne({
      where: { id: req.userId },
    });
    if (findSender === null) {
      return res.status(404).json({ msg: 'Sender not found' });
    }
    if (findSender.isActive === PAYMENT_DUE) {
      return res.status(404).json({
        msg: 'Pay all of your dues, ask teacher to complete all the class and send request to any other teacher',
      });
    }
    if (findSender.role === STUDENT) {
      studentSender = true;
    } else if (findSender.role === TEACHER) {
      studentSender = false;
    } else {
      return res.status(406).json({ msg: 'Only student and teacher can send request' });
    }
    const findRecever = await Customer.findOne({
      where: { id: scObj.receiverId },
    });
    // console.log(req.userRole);
    // console.log("Sender - student");
    // console.log("recever - teacher");
    // console.log(findSender);
    // console.log(findRecever);

    if (findRecever === null) {
      return res.status(404).json({ msg: 'Recever not found' });
    }

    if (studentSender === true) {
      if (findRecever.role === STUDENT) {
        return res.status(406).json({
          msg: 'Invalid recever - sender and recever both can not be teacher or student',
        });
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (findRecever.role === TEACHER) {
        return res.status(406).json({
          msg: 'Invalid recever - sender and recever both can not be teacher or student',
        });
      }
    }
    // find classtype and subject
    const findClassType = await ClassType.findOne({
      where: { id: scObj.ClassTypeId },
    });
    const findSubject = await Subject.findOne({
      where: { id: scObj.SubjectId },
    });
    // set class type
    if (!findClassType) {
      return res.status(406).json({ msg: 'There is no classtype with this ID' });
    }
    if (!findSubject) {
      return res.status(406).json({ msg: 'There is no Subject with this ID' });
    }
    // calculate end time
    // calculate cost
    // perHourRate
    // findRecever.dataValues.rate * scObj.hours = total costs
    // console.log(scObj.start);
    const scObjToCreate = {
      status: PENDING,
      types: scObj.tutionplace,
      start: scObj.start,
      // hours: scObj.hours,
      perHourRate: findRecever.dataValues.rate,
      tuitionlocation: scObj.tuitionlocation,
    };
    if (scObj.desc) {
      scObjToCreate.desc = scObj.desc;
    }

    const newScheduledClass = await ScheduledClass.create(scObjToCreate);
    await Promise.all([
      newScheduledClass.setSender(findSender),
      newScheduledClass.setRecever(findRecever),
      newScheduledClass.setClassType(findClassType),
      newScheduledClass.setSubject(findSubject),
    ]);

    const notification = await Notification.create({
      type: INITIATED_CLASS,
      comment: `A scheduled calss is been initialized (${newScheduledClass.id})`,
    });
    // console.log(notification);
    await notification.setCustomer(findRecever);
    return res.status(201).json({
      msg: 'Initiated scheduled class successfully',
      scheduledClass: newScheduledClass,
      notification,
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'server error' });
};

const getAllScheduledClass = async (req, res) => {
  try {
    const allScheduledClass = await ScheduledClass.findAll({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }, { model: Review }],
    });
    return res.json(allScheduledClass);
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'server error' });
};

const getSingleScheduledClass = async (req, res) => {
  const { scheduledclassId } = req.params;
  const where = {
    id: scheduledclassId,
    [Op.or]: [{ receverId: req.userId }, { senderId: req.userId }],
  };
  try {
    const singleScheduledClass = await ScheduledClass.findOne({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }, { model: Review }],
      where,
    });
    if (singleScheduledClass === null) {
      return res.status(404).json({
        msg: 'You do not have any scheduled class with this ID',
      });
    }
    const newSingleScheduledClass = Object.assign(singleScheduledClass);
    const newSender = Object.assign(newSingleScheduledClass.Sender);
    if (newSender.password) {
      newSender.password = undefined;
    }
    // console.log(newSender);
    const newRecever = Object.assign(newSingleScheduledClass.Recever);
    if (newRecever.password) {
      newRecever.password = undefined;
    }
    newSingleScheduledClass.Sender = newSender;
    newSingleScheduledClass.Recever = newRecever;
    // const { password, ...restRecever} = Recever;
    return res.status(200).json({
      msg: 'found scheduled class',
      scheduledclass: newSingleScheduledClass,
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'server error' });
};

/**
 * @Get all scheduled classes of a member
 */
const getAllScheduledClassofAMember = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }
  try {
    const memberId = parseInt(req.params.memberId, 10); // getAllScheduledClassofAMember
    // console.log(memberId, req.userId, req.userRole);
    // if (memberId !== req.userId) {
    //   return res.status(404).json({ msg: 'No user with this ID' });
    // }
    const findUser = await Customer.findOne({ where: { id: memberId } });
    if (!findUser) {
      return res.status(404).json({ msg: 'No user with this ID' });
    }
    const where = {};
    if (findUser.dataValues.role === TEACHER) {
      where.ReceverId = memberId;
    } else if (findUser.dataValues.role === STUDENT) {
      where.SenderId = memberId;
    } else {
      return res.status(404).json({ msg: 'no class found' });
    }
    const allScheduledClass = await ScheduledClass.findAll({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }],
      where,
    });
    // console.log(allScheduledClass.length);
    if (allScheduledClass.length === 0) {
      return res.status(404).json({ msg: 'no class found' });
    }
    const newScheduledClass = Object.assign(allScheduledClass);
    const modifiedScheduledClassList = [];

    for (let i = 0; i < newScheduledClass.length; i += 1) {
      const singleScheduledClass = {
        id: newScheduledClass[i].id,
        desc: newScheduledClass[i].desc,
        types: newScheduledClass[i].types,
        status: newScheduledClass[i].status,
        start: newScheduledClass[i].start,
        perHourRate: newScheduledClass[i].perHourRate,
        // hours: newScheduledClass[i].hours,
        createdAt: newScheduledClass[i].createdAt,
        updatedAt: newScheduledClass[i].updatedAt,
      };
      // console.log('-------------------------');
      if (newScheduledClass[i].Sender) {
        const { password, otp, cc, ...newSender } = newScheduledClass[i].Sender.dataValues;
        singleScheduledClass.Sender = newSender;
        // console.log(newSender);
      }
      if (newScheduledClass[i].Recever) {
        const { password, otp, cc, ...newRecever } = newScheduledClass[i].Recever.dataValues;
        singleScheduledClass.Recever = newRecever;
        // console.log(newRecever);
      }
      if (newScheduledClass[i].ClassType) {
        singleScheduledClass.ClassType = newScheduledClass[i].ClassType.dataValues;
        // console.log(newClassType);
      }
      if (newScheduledClass[i].Subject) {
        singleScheduledClass.Subject = newScheduledClass[i].Subject.dataValues;
        // console.log(newSubject);
      }
      modifiedScheduledClassList.push(singleScheduledClass);
    }

    return res.status(200).json({
      msg: 'Getting all classes',
      classScheduledList: modifiedScheduledClassList,
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'server error' });
};

const acceptRequestedScheduledClass = async (req, res) => {
  try {
    const findScheduledClass = await ScheduledClass.findOne({
      where: {
        id: req.params.scheduledclassId,
        [Op.or]: [{ status: PENDING }, { status: REJECTED }],
      },
    });
    if (!findScheduledClass) {
      return res.status(406).json({
        msg: 'No class found to accept. Note: class must be pending or rejected',
      });
    }

    if (findScheduledClass.dataValues.receverId !== req.userId) {
      return res.status(406).json({ msg: 'You are not request recever' });
    }
    const updatedScheduledClass = await findScheduledClass.update({
      status: APPROVED,
    });
    const findSender = await Customer.findOne({
      where: { id: findScheduledClass.dataValues.senderId },
    });
    // console.log(findScheduledClass);
    const notification = await Notification.create({
      type: ACCEPT_REQUEST,
      comment: `A scheduled calss request is accepted (${findScheduledClass.dataValues.id})`,
    });
    // console.log(notification);
    await notification.setCustomer(findSender);
    return res.status(202).json({ msg: 'Request accepted successfully', updatedScheduledClass });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'server error' });
};

const rejectRequestedScheduledClass = async (req, res) => {
  try {
    const findScheduledClass = await ScheduledClass.findOne({
      where: { id: req.params.scheduledclassId, status: PENDING },
    });
    if (!findScheduledClass) {
      return res.status(406).json({ msg: 'No class found to reject' });
    }

    if (findScheduledClass.dataValues.receverId !== req.userId) {
      return res.status(406).json({ msg: 'You are not request recever' });
    }
    const updatedScheduledClass = await findScheduledClass.update({
      status: REJECTED,
    });
    // console.log(findScheduledClass);
    const findSender = await Customer.findOne({
      where: { id: findScheduledClass.dataValues.senderId },
    });
    // console.log(findScheduledClass);
    const notification = await Notification.create({
      type: REJECTED_REQUEST,
      comment: `A scheduled calss request is rejected (${findScheduledClass.dataValues.id})`,
    });
    // console.log(notification);
    await notification.setCustomer(findSender);
    return res.status(202).json({ msg: 'Request rejected successfully', updatedScheduledClass });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'server error' });
};

const startScheduledClass = async (req, res) => {
  try {
    const findScheduledClass = await ScheduledClass.findOne({
      where: { id: req.params.scheduledclassId, status: APPROVED },
    });
    if (!findScheduledClass) {
      return res.status(406).json({ msg: 'No class found to reject or class may not approved' });
    }

    if (findScheduledClass.dataValues.receverId !== req.userId) {
      return res.status(406).json({ msg: 'YOnly teacher can start the class' });
    }
    const updatedScheduledClass = await findScheduledClass.update({
      status: START_CLASS,
      startedat: new Date().toISOString(),
    });

    await Promise.all([
      Customer.update({ isActive: PAYMENT_DUE }, { where: { id: findScheduledClass.senderId } }),
      Customer.update({ isActive: PAYMENT_DUE }, { where: { id: findScheduledClass.receverId } }),
    ]);
    const findSender = await Customer.findOne({
      where: { id: findScheduledClass.dataValues.senderId },
    });
    // console.log(findScheduledClass);
    const notification = await Notification.create({
      type: START_CLASS,
      comment: `You class is started (${findScheduledClass.dataValues.id})`,
    });
    // console.log(notification);
    await notification.setCustomer(findSender);
    return res.status(202).json({ msg: 'Sarted class successfully', updatedScheduledClass });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'server error' });
};

const updateScheduledClass = async (req, res) => {
  try {
    const findScheduledClass = await ScheduledClass.findOne({
      where: { id: req.params.scheduledclassId, types: ONLINE },
    });
    if (!findScheduledClass) {
      return res.status(406).json({
        msg: 'No class found to reject or class may not online based',
      });
    }
    await findScheduledClass.update({
      meetlink: req.body.meetlink,
    });
    return res.status(202).json({ msg: 'Updated class successfully', meetlink: req.body.meetlink });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'server error' });
};

const completeRequestedScheduledClass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }
  try {
    // finishclass
    // console.log(req.params.scheduledclassId);
    const findScheduledClass = await ScheduledClass.findOne({
      where: { id: req.params.scheduledclassId, status: START_CLASS },
    });
    // console.log(findScheduledClass);
    if (!findScheduledClass) {
      return res.status(406).json({ msg: 'No class found to reject or class may not started' });
    }
    await Promise.all([
      findScheduledClass.update({
        status: FINISH_CLASS,
        terminatedat: new Date().toISOString(),
      }),
      Customer.update({ isActive: APPROVED }, { where: { id: findScheduledClass.dataValues.senderId } }),
      Customer.update({ isActive: APPROVED }, { where: { id: findScheduledClass.dataValues.receverId } }),
    ]);

    const findSender = await Customer.findOne({
      where: { id: findScheduledClass.dataValues.senderId },
    });
    const notification = await Notification.create({
      type: FINISH_CLASS,
      comment: `Your class is finished (${findScheduledClass.dataValues.id})`,
    });
    await notification.setCustomer(findSender);
    return res.status(202).json({
      msg: 'Finish class successfully',
      // updatedScheduledClass,
    });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'server error' });
};

module.exports = {
  initiateScheduledClass,
  getAllScheduledClass,
  getAllScheduledClassofAMember,
  acceptRequestedScheduledClass,
  rejectRequestedScheduledClass,
  getSingleScheduledClass,
  startScheduledClass,
  completeRequestedScheduledClass,
  updateScheduledClass,
};
