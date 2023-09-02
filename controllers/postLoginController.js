const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res)=>{
  try{
    const {email , password} = req.body;
    const user = await User.findOne({email : email.toLowerCase()});


    if(user && await bcrypt.compare(password , user.password)){
      // send new token
      const token = jwt.sign(
        {
          userId : user._id,
          email
        },
        process.env.JWT_SECRET,
        {expiresIn : process.env.EXPIRES_IN}
      );
      
      res.status(200).json({
        user :{
          username : user.username,
          email,
          token
        }
      });
    }
    return res.status(400).send("Invalid credentials , please try again!");
  } catch(err){
    return res.status(500).send("Something went wrong! , please try again ");
  } 
}

module.exports = postLogin;