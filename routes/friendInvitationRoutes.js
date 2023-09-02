const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const express = require('express');
const router = express.Router();

const auth = require('./../middleware/auth');
const friendInvitationController = require('./../controllers/friendInvitation/friendInvitationController');

const postFriendInvitationSchema = joi.object({
  targetMailAddress : joi.string().email().required(),
});

const inviteDecisionSchema = joi.object({
  id : joi.string().required(),
});


router.post(
  '/invite' ,
  auth ,
  validator.body(postFriendInvitationSchema),
  friendInvitationController.controllers.postInvite 
);

router.post(
  '/accept' ,
  auth ,
  validator.body(inviteDecisionSchema),
  friendInvitationController.controllers.postAccept 
);

router.post(
  '/reject' ,
  auth ,
  validator.body(inviteDecisionSchema),
  friendInvitationController.controllers.postReject 
);

module.exports = router;