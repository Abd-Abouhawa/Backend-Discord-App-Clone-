const jwt = require('jsonwebtoken');

const config = process.env;

const verifyTokenSocket = (socket , next)=>{
  const token = socket.handshake.auth?.token;
  try{
    const decoded = jwt.verify(token , config.JWT_SECRET);
    socket.user = decoded;
  }
  catch(err){
    const socketError = new Error('Not authorized');
    return next(socketError);
  }
  next();
}

module.exports = {
  verifyTokenSocket
}