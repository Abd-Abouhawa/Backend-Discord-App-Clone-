const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res)=>{
  try{
    const {username , email , password } = req.body;

    // check if user is already registered
    const userExists = await User.exists({email});
    
    if(userExists)return res.status(409).send('this email already registered');

    // encrypt the Password
    const encryptedPassword = await bcrypt.hash(password , 10);

    // Create user document and store in DB
    const user = await User.create(
      {
      username,
      email : email.toLowerCase(),
      password : encryptedPassword
    })
    console.log(user);

    // create token
    const token = jwt.sign(
      {
        userId : user._id,
        email
      },
      process.env.JWT_SECRET,
      {expiresIn : process.env.EXPIRES_IN}
    );

    console.log(token);
    res.status(201).json({
      status : 'success',
      user,
      token
    })
    console.log("done")
  }catch(err){
    return res.status(500).send(err);
  }
}

module.exports = postRegister;