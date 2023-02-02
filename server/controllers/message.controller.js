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
    return res.status(200).json({ msg: 'getting all messages', messages: allMessages });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Internal server error' });
};
const getAllRoomsOfAUser = async (req, res) => {
  try {
    // Find existing room with status of running or initialized
    const findAllRooms = await Room.findAll({
      where: {
        [Op.or]: [{ invitorId: req.userId }, { invitereceverId: req.userId }],
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

module.exports = { getAllMessageOfARoom, getAllRoomsOfAUser };
