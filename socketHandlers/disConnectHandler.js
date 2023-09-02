const serverStore = require('./../serverStore');

const disConnectHandler = (socket)=>{
  serverStore.removeConnectedUser(socket.id);
};

module.exports = disConnectHandler;