const mongoose = require('mongoose');

const friendInvitationSchema = new mongoose.Schema({
  senderId : {
    type : mongoose.Types.ObjectId,
    ref : 'User'
  },
  recieverId : {
    type : mongoose.Types.ObjectId,
    ref : 'User'
  }
});

module.exports = mongoose.model('FriendInvitation' , friendInvitationSchema);
