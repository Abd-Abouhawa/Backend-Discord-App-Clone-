const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : { type : String , required : true },
  email : { type : String , required : true , unique : true },
  password : { type : String , required : true ,minLength : 8 },
  friends : [{type : mongoose.Types.ObjectId , ref : 'User'}]
  
//   confirmPassword: {
//     type: String,
//     required: [true, "Please confirm your password!"],
//     validate: {
//         validator: function(el) {
//             return el === this.password;
//         },
//         message: 'passwords are not the same!'
//     }
// }
})

const User = mongoose.model('User' , userSchema);
module.exports = User;