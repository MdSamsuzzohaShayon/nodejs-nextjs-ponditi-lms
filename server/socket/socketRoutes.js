const MessageController = require('./controllers/MessageController');
const RoomController = require('./controllers/RoomController');
const NotificationController = require('./controllers/NotificationController');

const socketRoutes = (socket) => {
  const messageController = new MessageController(socket);
  const roomController = new RoomController(socket);
  const notificationController = new NotificationController(socket);

  // console.log(socket.id);
  // Get message from client
  socket.on('message-from-client', messageController.sendMessage);
  socket.on('join-room-from-client', roomController.joinRoom);
  socket.on('join-notroom-from-client', roomController.joinNotroom);
  socket.on('update-notification-from-client', notificationController.updateNotification);
  socket.on('disconnect', (reason) => {
    console.log('Disconnected ', reason);
  });
};

module.exports = socketRoutes;
