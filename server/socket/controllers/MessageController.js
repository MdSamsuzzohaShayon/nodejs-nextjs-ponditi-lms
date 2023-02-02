/* eslint-disable class-methods-use-this */
const { Op } = require('sequelize');
const BaseController = require('./BaseController');
const { roomStatus } = require('../../config/keys');
const db = require('../../models');

const { Customer, Room, Message } = db;
const { RUNNING } = roomStatus;

class MessageController extends BaseController {
  sendMessage = async (data) => {
    // find room from database and send message to that room
    // Find existing room with status of running or initialized
    const existingRoom = await Room.findOne({
      where: {
        // [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
        [Op.or]: [{ invitorId: data.senderId }, { invitorId: data.receiverId }],
        [Op.or]: [{ invitereceverId: data.senderId }, { invitereceverId: data.receiverId }],
      },
    });
    if (!existingRoom || !data.receiverId || !data.senderId || !data.message || data.message === '') return;
    if (data.receiverId === data.senderId) return;
    this.socket.to(existingRoom.dataValues.name).emit('message-from-server', data);
    // io.sockets.emit('this', { will: 'be received by everyone'});
    if (existingRoom.dataValues.status !== RUNNING) {
      await existingRoom.update({ status: RUNNING });
    }

    // Check who is sending message and who is receiving the message
    /*
    let senderId = null;
    let receiverId = null;
    // invitorId: 3, invitereceverId: 2
    // message: 'hi how are you', receiverId: 2, senderId: 3
    if (existingRoom.dataValues.invitorId === data.senderId) {
      senderId = data.senderId;
      receiverId = data.receiverId;
    } else {
      senderId = data.receiverId;
      receiverId = data.senderId;
    }
    */

    // console.log(existingRoom);
    // console.log('Send message data', data);
    // Create a message with sender and reciever
    const findSender = await Customer.findOne({ where: { id: data.senderId } });
    const findReceiver = await Customer.findOne({ where: { id: data.receiverId } });
    if (!findSender || !findReceiver) return;
    const newMessage = await Message.create({
      text: data.message,
    });
    await Promise.all([newMessage.setRoom(existingRoom), newMessage.setMessagesender(findSender), newMessage.setMessagerecever(findReceiver)]);
    // console.log(newMessage);
    // this.socket.to(existingRoom.dataValues.name).emit('message-from-server', data);
    // emit and event to client
  };
}
module.exports = MessageController;
