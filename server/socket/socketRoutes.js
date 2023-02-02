const MessageController = require('./controllers/MessageController');
const RoomController = require('./controllers/RoomController');

const socketRoutes = (socket) => {
  const messageController = new MessageController(socket);
  const roomController = new RoomController(socket);

  // console.log(socket.id);
  // Get message from client
  socket.on('message-from-client', messageController.sendMessage);
  socket.on('join-room-from-client', roomController.joinRoom);
  socket.on('disconnect', (reason) => {
    console.log('Disconnected ', reason);
  });
};

module.exports = socketRoutes;
