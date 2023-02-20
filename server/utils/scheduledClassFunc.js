const { Op } = require('sequelize');
const db = require('../models');

const { ScheduledClass, Notroom, Customer } = db;

const { scheduledClassStatus, roles, roomStatus } = require('../config/keys');

const scheduledClassStartOnTime = async (allScheduledClass) => {
  let hasARunningClass = false;

  const dateNow = new Date();
  const classIdList = [];
  const runningClassIdList = [];

  let cls = 0;
  while (cls < allScheduledClass.length) {
    // create a new date object with the current time
    const startClassDate = new Date(allScheduledClass[cls].start);
    // add one hour to the hour component
    startClassDate.setHours(startClassDate.getHours() + 1);

    // Check date exceed
    // console.log(
    //   `FIND MATCHED:::: current date: ${dateNow.getDate()} === start date: ${startClassDate.getDate()}, current month: ${dateNow.getMonth() + 1} === start month: ${
    //     startClassDate.getMonth() + 1
    //   } whole - current date: ${dateNow} start date ${startClassDate} \n ========================================`,
    // );
    // console.log(`Conditions,  Running class dateNow > startClassDate = ${dateNow > startClassDate} || allScheduledClass[cls].status === scheduledClassStatus.APPROVED = ${allScheduledClass[cls].status === scheduledClassStatus.APPROVED} || allScheduledClass[cls].status === scheduledClassStatus.START_CLASS = ${allScheduledClass[cls].status === scheduledClassStatus.START_CLASS}`);
    if (dateNow > startClassDate && allScheduledClass[cls].status === scheduledClassStatus.APPROVED) {
      classIdList.push(allScheduledClass[cls].id);
    }
    if (allScheduledClass[cls].status === scheduledClassStatus.START_CLASS) {
      runningClassIdList.push(allScheduledClass[cls].id);
    }
    cls += 1;
  }

  if (classIdList.length > 0) {
    console.log('Updated class - /utils/scheduledClassStart.js');
    // await ScheduledClass.update(
    //   { status: scheduledClassStatus.START_CLASS },
    //   {
    //     where: { id: { [Op.in]: classIdList } },
    //   }
    // );
    hasARunningClass = true; // Temp
    //   console.log(structuredClone(classList));
  }

  if (runningClassIdList.length > 0) {
    hasARunningClass = true;
  }
  return hasARunningClass;
};

// Make the teacher pending if he does not completed the class
const userStatusChangeOnIncomplete = async (hasARunningClass, userId) => {
  // Consumer.isActive = PENDING
  let userTaskComplete = true;
  const classIdList = [];

  /*
  let clsI = 0;
  while (clsI < allScheduledClass.length) {
    if (allScheduledClass[clsI].status === scheduledClassStatus.START_CLASS) {
      classIdList.push(allScheduledClass[clsI].id);
    }
    clsI += 1;
  }

  if (classIdList.length > 0) {
  }
  */
  if (hasARunningClass) {
    console.log('Updated customer - status to incomplete - /utils/scheduledClassFunc.js');
    await Customer.update({ isActive: scheduledClassStatus.INCOMPLETE }, { where: { [Op.and]: [{ id: userId }, { role: roles.TEACHER }] } });
    //   console.log(structuredClone(classList));
    // Send notifications
    userTaskComplete = false;
  }
  return userTaskComplete;
};
const userCompletePendingClasses = async (allScheduledClass, userId) => {
  let clearedPendingClasses = false;
  const classIdList = [];
  let clsI = 0;
  while (clsI < allScheduledClass.length) {
    if (allScheduledClass[clsI].status === scheduledClassStatus.START_CLASS || allScheduledClass[clsI].status === scheduledClassStatus.APPROVED) {
      classIdList.push(allScheduledClass[clsI].id);
    }
    clsI += 1;
  }

  // Last class has been updated
  if (classIdList.length === 1) {
    console.log('Updated customer - status to approved again  - /utils/scheduledClassFunc.js');
    await Customer.update({ isActive: scheduledClassStatus.APPROVED }, { where: { id: userId } });
    clearedPendingClasses = true;
  }
  return clearedPendingClasses;
};
const selectStatus = (inputStatus) => {
  let status = scheduledClassStatus.PENDING;

  switch (inputStatus) {
    case scheduledClassStatus.PENDING:
      status = scheduledClassStatus.PENDING;
      break;
    case scheduledClassStatus.INITIATED_CLASS:
      status = scheduledClassStatus.INITIATED_CLASS;
      break;
    case scheduledClassStatus.ACCEPT_REQUEST:
      status = scheduledClassStatus.ACCEPT_REQUEST;
      break;
    case scheduledClassStatus.REJECTED_REQUEST:
      status = scheduledClassStatus.REJECTED_REQUEST;
      break;
    case scheduledClassStatus.START_CLASS:
      status = scheduledClassStatus.START_CLASS;
      break;
    case scheduledClassStatus.COMPLETE:
      status = scheduledClassStatus.COMPLETE;
      break;
    case scheduledClassStatus.CANCEL:
      status = scheduledClassStatus.CANCEL;
      break;
    case scheduledClassStatus.FINISH_CLASS:
      status = scheduledClassStatus.FINISH_CLASS;
      break;

    case scheduledClassStatus.APPROVED:
      status = scheduledClassStatus.APPROVED;
      break;
    case scheduledClassStatus.COMPLETE_REQUESTED:
      status = scheduledClassStatus.COMPLETE_REQUESTED;
      break;
    case scheduledClassStatus.PAYMENT_DUE:
      status = scheduledClassStatus.PAYMENT_DUE;
      break;

    default:
      break;
  }
  return status;
};


const makeStatusMessage = (inputStatus) => {
  let msg = 'notification message';

  switch (inputStatus) {
    case scheduledClassStatus.PENDING:
      msg = 'New Class Request';
      break;
    case scheduledClassStatus.INITIATED_CLASS:
      // To teacher
      msg = 'You have got an message class request';
      break;
    case scheduledClassStatus.ACCEPT_REQUEST:
      // To student
      msg = 'Your request is accepted by your teacher, now you can join the class on scheduled time';
      break;
    case scheduledClassStatus.REJECTED_REQUEST:
      // To student
      msg = 'Your request is rejeced, you can not join the class ';
      break;
    case scheduledClassStatus.REJECTED:
      // To student
      msg = 'Your request is rejeced, you can not join the class ';
      break;
    case scheduledClassStatus.START_CLASS:
      // To student
      msg = 'Your is been started, you are requested to join the class now ';
      break;
    case scheduledClassStatus.COMPLETE:
      // To student
      msg = 'A class has been completed, Click here to write a review.';
      break;
    case scheduledClassStatus.CANCEL:
      // To student
      msg = 'A class is been canceled, you can ask the reason to your teacher';
      break;
    case scheduledClassStatus.FINISH_CLASS:
      // To student
      msg = 'A class has been completed, Click here to write a review.';
      break;

    case scheduledClassStatus.APPROVED:
      // To student
      msg = 'Your request is accepted by your teacher, now you can join the class on scheduled time';
      break;
    case scheduledClassStatus.COMPLETE_REQUESTED:
      // To student
      msg = 'Your teacher will review your request and complete the class';
      break;
    case scheduledClassStatus.PAYMENT_DUE:
      // To student
      msg = 'You have owe, please clear those and make new request';
      break;

    default:
      break;
  }
  return msg;
};


const createNotroom = async (findSender, findReceiver) => {
  try {
    // find notification room
    const existingNotroom = await Notroom.findOne({
      where: {
        [Op.or]: [{ invitorId: findSender.dataValues.id }, { invitorId: findReceiver.dataValues.id }],
        [Op.or]: [{ invitereceiverId: findSender.dataValues.id }, { invitereceiverId: findReceiver.dataValues.id }],
      },
    });
    // if there is no notification room create one,
    if (!existingNotroom) {
      // const findReceiver = await Customer.findOne({
      //   where: { id: receiverId },
      // });
      const roomName = `NR_${findSender.dataValues.name.slice(0, 3).replace(/\s+/g, '')}_${findReceiver.dataValues.name.slice(0, 3).replace(/\s+/g, '')}_${Math.floor(
        Math.random() * 90 + 10,
      )}`;
      // Create a room
      const newNotroom = await Notroom.create({
        name: roomName.toUpperCase(),
        status: roomStatus.RUNNING,
      });
      await Promise.all([newNotroom.setNotroominvitor(findSender), newNotroom.setInvitereceiver(findReceiver)]);
    }
    // Client join multiple rooms on component mount - rooms = ['room1', 'room2', 'room3']; socket.join(rooms);
    // from client - if the request is been succeed make a emit event,
    // Reload all notification from user
  } catch (error) {
    console.log(error);
  }
}

module.exports = { scheduledClassStartOnTime, userStatusChangeOnIncomplete, userCompletePendingClasses, selectStatus, makeStatusMessage, createNotroom };
