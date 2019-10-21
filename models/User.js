const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role:{
    type:String,
    default:"REGULAR"
  },
  employer:{
    type:String,
    required:false
  },
  fullTime:{
    type:Boolean,
    default:false
  },
  partTime:{
    type:Boolean,
    default:false
  },
  webSite:{
    type:String,
    default:"www.xyz.com"
  },
  gender:{
    type:String,
    default:'Male'
  },
  contactNumber:{
    type:String,
    Default:'9999999999',
    maxlength:10
  },
  verified:{
    type:Boolean,
    default:false
  },
  avatar:{
    type:String,
    default:'https://img.pngio.com/avatar-user-computer-icons-software-developer-avatar-png-png-computer-user-900_540.jpg'
  },
  dob:{
    type:String,
    required:false
  },
  numbersOfEmployees:{
    type:Number,
    default:0
  },
  joiningDate:{
    type:String,
    required:false
  },
  address:{
    type:String,
    required:false
  },
  postalCode:{
    type:String,
    required: false
  },
  city:{
    type:String,
    required:false
  },
  country:{
    type:String,
    required:false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
