const User = require('./../../models/userModel');
const FriendInvitation = require('./../../models/friendInvitation');
const friendsUpdate = require('./../../socketHandlers/updates/friends');

const postInvite = async (req,res)=>{
  const {targetMailAddress} = req.body;
  const {userId , email} = req.user;

  // check if friend that we would like to invite in not user
  if(email.toLowerCase() === targetMailAddress.toLowerCase()){
    return res
    .status(409)
    .send('Sorry , You cannot become friend with yourself!');
  }

  const targetUser = await User.findOne({email : targetMailAddress.toLowerCase()});
  if(!targetUser)
  return res
  .status(404)
  .send(`Friend of ${targetMailAddress} has not been found!`);

  // check if invitation has been already sent

  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId : userId,
    recieverId : targetUser._id
  })
  if(invitationAlreadyReceived){
    return res.status(409).send('Invitation has been already sent!');
  }

  // check if the user we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.friends.find(friendId=>
    friendId.toString()===userId
    );

    if(usersAlreadyFriends){
      return res
      .status(409)
      .send('Friend already added , please check friends list!');
    }

    // create a new invitation 

    const newInvitation = await FriendInvitation.create({
      senderId : userId,
      recieverId : targetUser._id
    })

    // if invitation has been successfully created ,
    // we would to update friends invitations if other user in online

    // send pending invitations update to specific user 

    friendsUpdate.updateFriendsPendingInvitations(targetUser._id.toString());

    return res.status(201).send('Invitation has been sent!');
}

module.exports = postInvite;