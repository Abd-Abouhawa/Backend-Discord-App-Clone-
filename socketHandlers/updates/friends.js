const User = require('./../../models/userModel');
const FriendInvitation = require('./../../models/friendInvitation');
const serverStore = require('./../../serverStore');

const updateFriendsPendingInvitations = async (userId)=>{
  try{
    const pendingInvitations = await FriendInvitation.find({
      recieverId : userId
    }).populate('senderId' , '_id username email');

    // find all active connections of specified userId

    const recieverList = serverStore.getOnlineUsers(userId);
    
    const io = serverStore.getSocketServerInstance();
    
    recieverList.forEach(recieverSocketId =>{
      io.to(recieverSocketId).emit('friends-invitations' , {
        pendingInvitations : pendingInvitations ? pendingInvitations : []
      })
    })

  }catch(err){
    console.log(err);
  }
}
const updateFriends = async (userId)=>{
  try{

    // find active connection of specific id (online users)
    const receiverList = serverStore.getOnlineUsers(userId);

    if(receiverList.length > 0){

      const user = await User.findById(userId , {_id : 1 , friends : 1})
        .populate('friends' , '_id username email');
  
      if(user){
        const friendsList = user.friends.map(f=>{
          return {
            id : f._id,
            mail : f.email,
            username : f.username
          };
        });
      } 
  
      // get the io server instance
      const io = serverStore.getSocketServerInstance();
  
      receiverList.forEach(receiverSocketId=>{
  
        io.to(receiverSocketId).emit('friends-list' , {
          friends : friendsList ? friendsList : []
        })
      })
    }

  }catch(err){
    console.log(err);
  }
}

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends
};