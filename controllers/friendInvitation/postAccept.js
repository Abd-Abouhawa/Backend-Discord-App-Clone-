const User = require('./../../models/userModel');
const FriendInvitation = require('./../../models/friendInvitation');
const friendsUpdate = require('./../../socketHandlers/updates/friends');

const postAccept = async (req,res)=>{
  try{

    const {id} = req.body;
    const invitation = await FriendInvitation.findByUserId(id);
    if(!invitation){
      return res.status(401).send('Error occured , please try again!');
    }    

    const {senderId , receiverId} = invitation;

    // add Friends to both users
    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];
    await senderUser.save();

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];
    await receiverUser.save();

    // delete invitation
    await FriendInvitation.findByIdAndDelete(id);

    // update friends list if the user are online
    friendsUpdate.updateFriends(senderId.toString());
    friendsUpdate.updateFriends(receiverId.toString());

    // update list of the friends pending invitations 
    friendsUpdate.updateFriendsPendingInvitations(receiverId.toString());
    
    return res.status(200).send('Frined successfully added!');

  }catch(err){
    console.log(err);
    return res.status(500).send('Something went wrong please try again');
  }
}


module.exports = postAccept;