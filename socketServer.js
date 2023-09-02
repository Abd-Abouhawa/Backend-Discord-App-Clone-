const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disConnectHandler = require('./socketHandlers/disConnectHandler');
const serverStore = require('./serverStore');

const registerSocketServer = (server) =>{ // this function to add the socket IO server to our express server
  const io = require('socket.io')(server , {
    cors : {
      origin : '*',
      methods : ['GET' , 'POST']
    }
  });
  serverStore.setSocketServerInstance(io);
  
  io.use((socket , next)=>{ // before connection check token of the user
    authSocket(socket, next);
  })

  const emitAllOnlineUsers = () =>{
    const onlineUsers = serverStore.getAllOnlineUsers();
    io.emit('online-users' , {onlineUsers}) // emit to all of the connected users to our socketIO server
  }

  io.on('connection', (socket) =>{ // listen if any client will connect 
    // so any person will have an connection from the "react" app
    // and if the connection will occur for every single user connected from our 'react' app then
    // even when open multiple taps with the same site , he will have different socket ID
    console.log('user connected');
    console.log(socket.id);
    newConnectionHandler(socket , io); 

    emitAllOnlineUsers();

    socket.on('disconnect', ()=>{
      disConnectHandler(socket);
    })
  })
  setInterval(()=>{
    emitAllOnlineUsers();
  },[ 1000 * 8 ])
};

module.exports = {
  registerSocketServer
};