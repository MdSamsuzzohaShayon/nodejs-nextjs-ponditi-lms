/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-object-spread */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../models');

const sendSMS = require('../utils/sendSMS');
const { roles, scheduledClassStatus, types, notificationTypes, roomStatus } = require('../config/keys');
const {
  scheduledClassStartOnTime,
  userStatusChangeOnIncomplete,
  userCompletePendingClasses,
  selectStatus,
  makeStatusMessage,
  createNotroom,
} = require('../utils/scheduledClassFunc');

const { STUDENT, TEACHER } = roles;
const { PENDING, APPROVED, REJECTED, START_CLASS, PAYMENT_DUE, FINISH_CLASS, CANCEL } = scheduledClassStatus;
const { ONLINE, TL, SL } = types;
const { INITIATED_CLASS, ACCEPT_REQUEST, REJECTED_REQUEST } = notificationTypes;
const { RUNNING } = roomStatus;

const { ScheduledClass, Customer, ClassType, Subject, Review, Notification, Notroom } = db;
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

    if (findRecever === null) {
      return res.status(404).json({ msg: 'Recever not found' });
    }

    if (findRecever.dataValues.isActive !== APPROVED) {
      return res.status(404).json({ msg: 'This teacher can not accept any request now!' });
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
        return res.status(406).json({ msg: 'Invalid recever - sender and recever both can not be teacher or student' });
      }
    }

    // Conditional check for student's location
    if (scObj.tutionplace === SL && (scObj.tuitionlocation === null || scObj.tuitionlocation === '')) {
      return res.status(406).json({ msg: "If you select studnet's location you must put a location" });
    }

    switch (scObj.tutionplace.toUpperCase()) {
      case ONLINE:
        scObj.tutionplace = ONLINE;
        scObj.tuitionlocation = ONLINE;
        break;
      case TL:
        scObj.tutionplace = TL;
        scObj.tuitionlocation = findRecever.dataValues.presentaddress;
        break;
      case SL:
        scObj.tutionplace = SL;
        break;
      default:
        scObj.tutionplace = ONLINE;
        scObj.tuitionlocation = ONLINE;
        break;
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

    let startISODate = scObj.start;
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!isoDateRegex.test(startISODate)) {
      startISODate = new Date(startISODate);
    } else {
      const date = new Date(startISODate);

      if (isNaN(date)) {
        return res.status(406).json({
          msg: 'Invalid Date format',
        });
      }
    }
    const scObjToCreate = {
      status: PENDING,
      types: scObj.tutionplace,
      start: startISODate,
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
    const classStatus = selectStatus(INITIATED_CLASS);
    const comment = makeStatusMessage(classStatus);
    const notification = await Notification.create({
      type: classStatus,
      comment: `${comment} (${newScheduledClass.id})`,
    });
    createNotroom(findSender, findRecever);
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

    /**
     * ===================================================================
     * UPDATE CLASS STATUS IF TIME EXCEED
     */
    const allScheduledClass = await ScheduledClass.findAll({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }],
      where: {
        [Op.or]: [{ receverId: req.userId }, { senderId: req.userId }],
      },
    });
    const hasARunningClass = await scheduledClassStartOnTime(allScheduledClass);
    /**
     * ===================================================================
     * CUSTOMER STATUS WILL BE INCOMPLETE IF SHE/SHE DOES NOT COMPLETE THE CLASS
     */
    const userTaskComplete = await userStatusChangeOnIncomplete(hasARunningClass, req.userId);
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
    /**
     * ===================================================================
     * UPDATE CLASS STATUS IF TIME EXCEED
     */
    const allScheduledClassToUpdate = await ScheduledClass.findAll({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }],
      where: {
        [Op.or]: [{ receverId: req.userId }, { senderId: req.userId }],
      },
    });
    const hasARunningClass = await scheduledClassStartOnTime(allScheduledClassToUpdate);
    /**
     * ===================================================================
     * CUSTOMER STATUS WILL BE INCOMPLETE IF SHE/SHE DOES NOT COMPLETE THE CLASS
     */
    const userTaskComplete = await userStatusChangeOnIncomplete(hasARunningClass, req.userId);

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
      return res.status(204).json({ msg: 'no class found', classScheduledList: [] });
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
        // [Op.or]: [{ status: PENDING }, { status: REJECTED }],
      },
    });
    // console.log(findScheduledClass);
    if (!findScheduledClass) {
      return res.status(406).json({
        msg: 'No class found to accept. Note: class must be pending or rejected',
      });
    }
    /**
     * ===================================================================
     * UPDATE CLASS STATUS IF TIME EXCEED
     */
    const allScheduledClass = await ScheduledClass.findAll({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }],
      where: {
        [Op.or]: [{ receverId: req.userId }, { senderId: req.userId }],
      },
    });
    const hasARunningClass = await scheduledClassStartOnTime(allScheduledClass);
    /**
     * ===================================================================
     * IF THE USER IS CANCELING HIS LAST CLASS, HE WILL BE APPROVED USER AGAIN
     */
    const clearedPendingClasses = await userCompletePendingClasses(allScheduledClass, req.userId);
    /**
     * ===================================================================
     * CUSTOMER STATUS WILL BE INCOMPLETE IF SHE/SHE DOES NOT COMPLETE THE CLASS
     */
    if (!clearedPendingClasses) {
      const userTaskComplete = await userStatusChangeOnIncomplete(hasARunningClass, req.userId);
      if (!userTaskComplete) {
        return res.status(406).json({ msg: 'You can not reject any request until you complete all of your previous running class!' });
      }
    }

    if (findScheduledClass.dataValues.receverId !== req.userId) {
      return res.status(406).json({ msg: 'You are not request receiver' });
    }
    const updatedScheduledClass = await findScheduledClass.update({
      status: APPROVED,
    });
    const findSender = await Customer.findOne({
      where: { id: findScheduledClass.dataValues.senderId },
    });

    sendSMS(
      findSender.dataValues.phone,
      `A class is been accepted \n Class ID: ${findScheduledClass.dataValues.id} \n URL: ${process.env.FRONTEND_URL}/scheduledclass/detail/?scheduledclassId=${findScheduledClass.dataValues.id}`
    );
    const comment = makeStatusMessage(ACCEPT_REQUEST);
    const notification = await Notification.create({
      type: ACCEPT_REQUEST,
      comment: `${comment} (${findScheduledClass.dataValues.id})`,
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

    /**
     * ===================================================================
     * UPDATE CLASS STATUS IF TIME EXCEED
     */
    const allScheduledClass = await ScheduledClass.findAll({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }],
      where: {
        [Op.or]: [{ receverId: req.userId }, { senderId: req.userId }],
      },
    });
    const hasARunningClass = await scheduledClassStartOnTime(allScheduledClass);
    /**
     * ===================================================================
     * CUSTOMER STATUS WILL BE INCOMPLETE IF SHE/SHE DOES NOT COMPLETE THE CLASS
     */
    const userTaskComplete = await userStatusChangeOnIncomplete(hasARunningClass, req.userId);
    if (!userTaskComplete) {
      return res.status(406).json({ msg: 'You can not reject any request until you complete all of your previous running class!' });
    }

    if (!findScheduledClass) {
      return res.status(406).json({ msg: 'No class found to reject' });
    }

    if (findScheduledClass.dataValues.receverId !== req.userId) {
      return res.status(406).json({ msg: 'You are not request receiver' });
    }
    const updatedScheduledClass = await findScheduledClass.update({
      status: REJECTED,
    });
    // console.log(findScheduledClass);
    const findSender = await Customer.findOne({
      where: { id: findScheduledClass.dataValues.senderId },
    });
    const comment = makeStatusMessage(REJECTED_REQUEST);
    const notification = await Notification.create({
      type: REJECTED_REQUEST,
      comment: `${comment} (${findScheduledClass.dataValues.id})`,
    });
    // console.log(notification);
    await notification.setCustomer(findSender);
    return res.status(202).json({ msg: 'Request rejected successfully', updatedScheduledClass });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'server error' });
};

const cancelScheduledClass = async (req, res) => {
  try {
    const findScheduledClass = await ScheduledClass.findOne({
      where: { id: req.params.scheduledclassId },
    });

    /**
     * ===================================================================
     * UPDATE CLASS STATUS IF TIME EXCEED
     */
    const allScheduledClass = await ScheduledClass.findAll({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }],
      where: {
        [Op.or]: [{ receverId: req.userId }, { senderId: req.userId }],
      },
    });
    const hasARunningClass = await scheduledClassStartOnTime(allScheduledClass);
    /**
     * ===================================================================
     * IF THE USER IS CANCELING HIS LAST CLASS, HE WILL BE APPROVED USER AGAIN
     */
    const clearedPendingClasses = await userCompletePendingClasses(allScheduledClass, req.userId);
    /**
     * ===================================================================
     * CUSTOMER STATUS WILL BE INCOMPLETE IF SHE/SHE DOES NOT COMPLETE THE CLASS
     */
    if (!clearedPendingClasses) {
      const userTaskComplete = await userStatusChangeOnIncomplete(hasARunningClass, req.userId);
      if (!userTaskComplete) {
        return res.status(406).json({ msg: 'You can not reject any request until you complete all of your previous running class!' });
      }
    }

    if (!findScheduledClass) {
      return res.status(406).json({ msg: 'No class found to reject' });
    }

    if (findScheduledClass.dataValues.receverId !== req.userId) {
      return res.status(406).json({ msg: 'You are not request receiver' });
    }

    // APPROVED
    if (findScheduledClass.dataValues.status !== APPROVED) {
      return res.status(406).json({ msg: 'This class can not be canceled' });
    }

    const classStatus = selectStatus(CANCEL);
    const comment = makeStatusMessage(CANCEL);
    const updatedScheduledClass = await findScheduledClass.update({
      status: classStatus,
    });
    // console.log(findScheduledClass);
    const findSender = await Customer.findOne({
      where: { id: findScheduledClass.dataValues.senderId },
    });
    // console.log(findScheduledClass);

    const notification = await Notification.create({
      type: classStatus,
      comment: `${comment} (${findScheduledClass.dataValues.id})`,
    });
    // console.log(notification);
    await notification.setCustomer(findSender);
    return res.status(202).json({ msg: `Class status is ${classStatus.toLowerCase()}`, updatedScheduledClass });
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
    const classStatus = selectStatus(START_CLASS);
    const comment = makeStatusMessage(START_CLASS);
    const notification = await Notification.create({
      type: classStatus,
      comment: `${comment} (${findScheduledClass.dataValues.id})`,
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
      where: { id: req.params.scheduledclassId },
    });
    /**
     * ===================================================================
     * UPDATE CLASS STATUS IF TIME EXCEED
     */
    const allScheduledClass = await ScheduledClass.findAll({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }],
      where: {
        [Op.or]: [{ receverId: req.userId }, { senderId: req.userId }],
      },
    });
    const hasARunningClass = await scheduledClassStartOnTime(allScheduledClass);
    /**
     * ===================================================================
     * CUSTOMER STATUS WILL BE INCOMPLETE IF SHE/SHE DOES NOT COMPLETE THE CLASS
     */
    const userTaskComplete = await userStatusChangeOnIncomplete(hasARunningClass, req.userId);
    // if (userTaskComplete) {
    //   return res.status(406).json({ msg: 'You can not update any request until you complete all of your previous running class!' });
    // }
    if (!findScheduledClass) {
      return res.status(406).json({
        msg: 'No class found',
      });
    }
    await findScheduledClass.update({
      meetlink: req.body.meetlink,
    });

    const findSender = await Customer.findOne({ where: { id: findScheduledClass.dataValues.senderId } });
    sendSMS(
      findSender.dataValues.phone,
      `A class link is been shared \n Class ID: ${findScheduledClass.dataValues.id} \n URL: ${process.env.FRONTEND_URL}/scheduledclass/detail/?scheduledclassId=${findScheduledClass.dataValues.id}`
    );
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
    /*
    // STARTED CLASS CAN BE COMPLETED
    const findScheduledClass = await ScheduledClass.findOne({
      where: { id: req.params.scheduledclassId, status: START_CLASS },
    });
    // console.log(findScheduledClass);
    if (!findScheduledClass) {
      return res.status(406).json({ msg: 'No class found to reject or class may not started' });
    }
    */

    /**
     * ===================================================================
     * UPDATE CLASS STATUS IF TIME EXCEED
     */
    const allScheduledClass = await ScheduledClass.findAll({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: ClassType }, { model: Subject }],
      where: {
        [Op.or]: [{ receverId: req.userId }, { senderId: req.userId }],
      },
    });
    const hasARunningClass = await scheduledClassStartOnTime(allScheduledClass);
    /**
     * ===================================================================
     * CUSTOMER STATUS WILL BE INCOMPLETE IF SHE/SHE DOES NOT COMPLETE THE CLASS
     */
    const clearedPendingClasses = await userCompletePendingClasses(allScheduledClass, req.userId);
    // APPROVED CLASS CAN BE COMPLETED
    const findScheduledClass = await ScheduledClass.findOne({
      where: { id: req.params.scheduledclassId, status: { [Op.or]: [START_CLASS, APPROVED] } },
    });
    if (!findScheduledClass) {
      return res.status(406).json({ msg: 'No class found, class may not started or approved' });
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

    const classStatus = selectStatus(FINISH_CLASS);
    const comment = makeStatusMessage(FINISH_CLASS);
    const notification = await Notification.create({
      type: classStatus,
      comment: `${comment} (${findScheduledClass.dataValues.id})`,
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
  cancelScheduledClass,
};
