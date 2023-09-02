const connectedUsers = new Map();
let io = null;


const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
}

const getSocketServerInstance = ()=> io;

const addNewConnectedUser = ({socketId , userId})=>{
  connectedUsers.set(socketId, {userId});
  console.log("new connected user : " , connectedUsers);
};

const removeConnectedUser = (socketId)=>{
  if(connectedUsers.has(socketId)){
    
    connectedUsers.delete(socketId);
    console.log(socketId , ' is leave');
  }
  
}

const getOnlineUsers = (userId)=>{
  const activeConnection = [];
  connectedUsers.forEach(function(value,key){
    if(value.uesrId===userId){
      activeConnection.push(key); //to emit to the socket not to user😉
    }
  });
  return activeConnection;
}

const getAllOnlineUsers = ()=>{
  const onlineUsers = [];
  connectedUsers.forEach((value , key)=>{
    onlineUsers.push({
      socketId : key,
      userId : value.userId
    });
  });
  return onlineUsers;
}

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getOnlineUsers,
  setSocketServerInstance,
  getSocketServerInstance,
  getAllOnlineUsers
}

// socket to (on)
// io to (on or emit)