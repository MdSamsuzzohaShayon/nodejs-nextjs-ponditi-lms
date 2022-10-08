/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../models');

const { roles, scheduledClassStatus, types } = require('../config/keys');

const { STUDENT, TEACHER } = roles;
const { PENDING, APPROVED, REJECTED, COMPLETE_REQUESTED } =
  scheduledClassStatus;
const { ONLINE } = types;

const { ScheduledClass, User, ClassType, Subject, Review } = db;

const initiateScheduledClass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }
  // if sender is teacher reciver must be student elsewhere sender is student and reciver is student
  const scObj = Object.assign(req.body);
  let studentSender = false;
  // console.log(req.userId);

  try {
    const findSender = await User.findOne({
      where: { id: req.userId },
    });
    if (findSender === null) {
      return res.status(404).json({ msg: 'Sender not found' });
    }
    if (findSender.role === STUDENT) {
      studentSender = true;
    } else if (findSender.role === TEACHER) {
      studentSender = false;
    } else {
      return res
        .status(406)
        .json({ msg: 'Only student and teacher can send request' });
    }
    const findRecever = await User.findOne({
      where: { id: scObj.receverId },
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
      where: { id: scObj.ClassTypeId },
    });
    // set class type
    if (!findClassType) {
      return res
        .status(406)
        .json({ msg: 'There is no classtype with this ID' });
    }
    if (!findSubject) {
      return res.status(406).json({ msg: 'There is no Subject with this ID' });
    }
    // calculate end time
    // calculate cost
    // perHourRate
    // findRecever.dataValues.rate * scObj.hours = total costs
    const scObjToCreate = {
      status: PENDING,
      types: ONLINE,
      start: scObj.start,
      // hours: scObj.hours,
      perHourRate: findRecever.dataValues.rate,
    };
    if (scObj.desc) {
      scObjToCreate.desc = scObj.desc;
    }

    const newScheduledClass = await ScheduledClass.create(scObjToCreate);
    await newScheduledClass.setSender(findSender);
    await newScheduledClass.setRecever(findRecever);
    await newScheduledClass.setClassType(findClassType);
    await newScheduledClass.setSubject(findSubject);
    return res.status(201).json({
      msg: 'Initiated scheduled class successfully',
      scheduledClass: newScheduledClass,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllScheduledClass = async (req, res) => {
  try {
    const allScheduledClass = await ScheduledClass.findAll({
      include: [
        { model: User, as: 'Sender' },
        { model: User, as: 'Recever' },
        { model: ClassType },
        { model: Subject },
      ],
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
      include: [
        { model: User, as: 'Sender' },
        { model: User, as: 'Recever' },
        { model: ClassType },
        { model: Subject },
      ],
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
    if (memberId !== req.userId) {
      return res.status(404).json({ msg: 'No user with this ID' });
    }
    const where = {};
    if (req.userRole === TEACHER) {
      where.ReceverId = req.params.memberId;
    } else if (req.userRole === STUDENT) {
      where.SenderId = req.params.memberId;
    } else {
      return res.status(404).json({ msg: 'no class found' });
    }

    const allScheduledClass = await ScheduledClass.findAll({
      include: [
        { model: User, as: 'Sender' },
        { model: User, as: 'Recever' },
        { model: ClassType },
        { model: Subject },
      ],
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
        const { password, otp, cc, ...newSender } =
          newScheduledClass[i].Sender.dataValues;
        singleScheduledClass.Sender = newSender;
        // console.log(newSender);
      }
      if (newScheduledClass[i].Recever) {
        const { password, otp, cc, ...newRecever } =
          newScheduledClass[i].Recever.dataValues;
        singleScheduledClass.Recever = newRecever;
        // console.log(newRecever);
      }
      if (newScheduledClass[i].ClassType) {
        singleScheduledClass.ClassType =
          newScheduledClass[i].ClassType.dataValues;
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
      where: { id: req.params.scheduledclassId, status: PENDING },
    });
    if (!findScheduledClass) {
      return res.status(406).json({ msg: 'No class found to accept' });
    }

    if (findScheduledClass.dataValues.receverId !== req.userId) {
      return res.status(406).json({ msg: 'You are not request recever' });
    }
    const updatedScheduledClass = await findScheduledClass.update({
      status: APPROVED,
    });
    // console.log(findScheduledClass);
    return res
      .status(202)
      .json({ msg: 'Request accepted successfully', updatedScheduledClass });
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
    return res
      .status(202)
      .json({ msg: 'Request rejected successfully', updatedScheduledClass });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'server error' });
};

const completeRequestedScheduledClass = async (req, res) => {
  const errors = validationResult(req);
  const reviewObj = Object.assign(req.body);
  reviewObj.publish = false;
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }
  try {
    if (reviewObj.stars <= 5 && reviewObj.stars > 0) {
      return res.status(406).json({
        msg: 'Stars must be between 1 to 5 numbers',
      });
    }
    const where = {
      id: req.params.scheduledclassId,
      status: APPROVED,
      [Op.or]: [{ senderId: req.userId }, { receverId: req.userId }],
    };
    const findScheduledClass = await ScheduledClass.findOne({
      include: [
        { model: User, as: 'Sender' },
        { model: User, as: 'Recever' },
      ],
      where,
    });
    if (!findScheduledClass) {
      return res.status(406).json({
        msg: 'No class found - scheduled class must be approved in order to complete it',
      });
    }

    let findUser = null;
    // Check who is the request sender
    if (req.userRole === STUDENT) {
      findUser = findScheduledClass.Recever;
    } else if (req.userRole === TEACHER) {
      // get sender id
      findUser = findScheduledClass.Sender;
    } else {
      return res
        .status(406)
        .json({ msg: 'Only teacher or student could send request' });
    }

    const reviewExist = Review.findOne({
      where: { UserId: findUser.id, ScheduledClassId: findScheduledClass.id },
    });
    if (reviewExist) {
      return res.status(406).json({ msg: 'You already made a commented' });
    }
    const sendUserReview = await Review.create(reviewObj);
    await sendUserReview.setUser(findUser);
    await sendUserReview.setScheduledClass(findScheduledClass);

    const updatedScheduledClass = await findScheduledClass.update({
      status: COMPLETE_REQUESTED,
    });
    // console.log(findScheduledClass);
    return res.status(202).json({
      msg: 'complete request made successfully',
      updatedScheduledClass,
      sendUserReview,
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
  completeRequestedScheduledClass,
};
