const BaseController = require('./BaseController');

const db = require('../../models');

const { Notroom } = db;

class NotificationController extends BaseController {
  updateNotification = async (data) => {
    console.log('###############################################################################################');
    console.log('Update notification - send update to the specific room, sender id and receiver id needed', data);
    // senderId: 3, receiverId: 2
    if ( !data.receiverId || !data.senderId) return;
    // find room from database and send message to that room
    // Find existing room with status of running or initialized
    const existingRoom = await Notroom.findOne({
      where: {
        notroominvitorId: data.senderId, // student
        invitereceiverId: data.receiverId, // teacher
      },
    });

    if (!existingRoom) return;

    this.socket.to(existingRoom.dataValues.name).emit('update-notification-from-server', data);
  };
}

module.exports = NotificationController;
