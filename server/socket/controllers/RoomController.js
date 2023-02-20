const { Op } = require('sequelize');
const BaseController = require('./BaseController');
const db = require('../../models');
const { roomStatus } = require('../../config/keys');

const { Customer, Room, Notroom } = db;
const { INITIALIZED } = roomStatus;

class RoomController extends BaseController {
  joinRoom = async (data) => {
    // console.log('=========================================');
    // console.log('Joining the room - ', data);
    if (!data.senderId || !data.receiverId) return;

    // Find existing room with status of running or initialized
    const existingRoom = await Room.findOne({
      where: {
        // [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
        [Op.or]: [{ invitorId: data.senderId }, { invitorId: data.receiverId }],
        [Op.or]: [{ invitereceverId: data.senderId }, { invitereceverId: data.receiverId }],
      },
    });

    if (existingRoom) {
      // console.log({ existingRoom });
      this.socket.join(existingRoom.name);
    } else {
      // We can keep room name to our user name
      const findSender = await Customer.findOne({ where: { id: data.senderId } });
      const findReciever = await Customer.findOne({ where: { id: data.receiverId } });
      // await Promise.all([findSender, findReciever]);
      if (!findSender || !findReciever) return;
      // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
      // Get user and sender from database
      const roomName = `${findSender.dataValues.name.slice(0, 3).replace(/\s+/g, '')}_${findReciever.dataValues.name.slice(0, 3).replace(/\s+/g, '')}_${Math.floor(
        Math.random() * 90 + 10,
      )}`;
      // Create a room
      const newRoom = await Room.create({
        // invitorId: data.senderId,
        // invitereceverId: data.receiverId,
        name: roomName.toUpperCase(),
        status: INITIALIZED,
      });
      await newRoom.setRoominvitor(findSender);
      await newRoom.setInviterecever(findReciever);
      // Set sender and receiver for room
      // receiver join the room automitically
      this.socket.join(roomName);
    }
  };

  // Join in multiple rooms
  joinNotroom = async (data) => {
    // Join all rooms
    // Client join multiple rooms on component mount -
    // rooms = ['room1', 'room2', 'room3'];
    // socket.join(rooms);

    // console.log('Joining the room - ', data);
    if (!data.userId) return;

    // Find all rooms room with status of running or initialized
    const roomList = await Notroom.findAll({
      where: {
        [Op.or]: [{ notroominvitorId: data.userId }, { invitereceiverId: data.userId }],
      },
    });

    // console.log({ roomList });

    if (roomList.length > 0) {
      // console.log({ roomList });
      const roomNameList = [];
      for (let i = 0; i < roomList.length; i += 1) {
        roomNameList.push(roomList[i].dataValues.name);
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(roomNameList);
      }

      this.socket.join(roomNameList);
    } else {
      // We can keep room name to our user name
      console.log('No room to join');
    }
  };
}

module.exports = RoomController;
