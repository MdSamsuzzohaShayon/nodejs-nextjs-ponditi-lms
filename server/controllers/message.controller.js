const sequelize = require('sequelize');

const { Op } = sequelize;
const db = require('../models');

const { Customer, Message, Room } = db;
const getAllMessageOfARoom = async (req, res) => {
  try {
    // console.log(req.query);
    if (!req.query.senderId || !req.query.receiverId) return res.status(406).json({ msg: 'sender and receiver can not be empty' });
    // Find existing room with status of running or initialized
    const existingRoom = await Room.findOne({
      where: {
        // [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
        [Op.or]: [{ invitorId: req.query.senderId }, { invitorId: req.query.receiverId }],
        [Op.or]: [{ invitereceverId: req.query.senderId }, { invitereceverId: req.query.receiverId }],
      },
    });
    if (!existingRoom) return res.status(404).json({ msg: 'No previous message found' });
    const allMessages = await existingRoom.getMessages();
    return res.status(200).json({ msg: 'getting all messages', messages: allMessages, roomId: existingRoom.dataValues.id });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Internal server error' });
};

const getAllUnseenMessageOfARoom = async (req, res) => {
  try {
    // Find existing room with status of running or initialized
    const allUnseenMessages = await Message.findAll({
      where: {
        messagereceverId: req.userId,
        publish: false,
      },
      // include: {
      //   model: Customer,
      //   as: 'Messagesender',
      // }
    });
    // console.log(allUnseenMessages);
    if (allUnseenMessages.length < 0) return res.status(204).json({ msg: 'No unseen messages' });
    return res.status(200).json({ msg: 'getting all unseen messages', messages: allUnseenMessages });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Internal server error' });
};
const getAllRoomsOfAUser = async (req, res) => {
  try {
    console.log({ userId: req.userId });
    // Find existing room with status of running or initialized
    const findAllRooms = await Room.findAll({
      where: {
        [Op.or]: [{ invitorId: req.userId }, { invitereceverId: req.userId }],
        // [Op.or]: [{ '$Roominvitor.id$': req.userId }, { '$Inviterecever.id$': req.userId }],
      },
      include: [
        { model: Customer, as: 'Roominvitor', attributes: ['id', 'name', 'phone'] },
        { model: Customer, as: 'Inviterecever', attributes: ['id', 'name', 'phone'] },
      ],
    });
    if (!findAllRooms) return res.status(404).json({ msg: 'No room founds' });
    return res.status(200).json({ msg: 'getting all rooms', rooms: findAllRooms });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Internal server error' });
};

const seenAllMessageOfARoom = async (req, res) => {
  try {
    // console.log({ receiverId: req.body.roomId });
    const findARoom = await Room.findOne({ where: { id: req.body.roomId } });
    if (!findARoom) return res.status(404).json({ msg: 'No room found!' });
    const messages = await findARoom.getMessages();
    const unseenMessageIdList = [];
    for (let i = 0; i < messages.length; i += 1) {
      if (messages[i].publish === false) {
        unseenMessageIdList.push(messages[i].id);
      }
    }
    await Message.update(
      { publish: true },
      {
        where: {
          id: {
            [Op.in]: unseenMessageIdList, // this will update all the records
          },
        },
      },
    );
    return res.status(200).json({ msg: 'Seen all messages of this room' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Internal server error' });
};

module.exports = {
  getAllMessageOfARoom,
  getAllRoomsOfAUser,
  getAllUnseenMessageOfARoom,
  seenAllMessageOfARoom,
};
