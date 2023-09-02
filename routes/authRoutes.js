const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const express = require('express');
const router = express.Router();
const {contollers} = require('./../controllers/authController');

const registerSchema = joi.object({
  username : joi.string().min(3).max(24).required(),
  password : joi.string().min(8).max(24).required(),
  email : joi.string().email().required(),
});

const loginSchema = joi.object({
  password : joi.string().min(8).max(24).required(),
  email : joi.string().email().required(),
});


router.post(
  '/register',
  validator.body(registerSchema),
  contollers.postRegister
);

router.post(
  '/login',
  validator.body(loginSchema),
  contollers.postLogin
);


module.exports = router;