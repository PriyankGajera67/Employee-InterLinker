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
    default:"",
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
    default:'9999999999',
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
    default:"",
    required:false
  },
  numbersOfEmployees:{
    type:Number,
    default:0
  },
  joiningDate:{
    type:String,
    default:"",
    required:false
  },
  address:{
    type:String,
    default:"",
    required:false
  },
  postalCode:{
    type:String,
    default:"",
    required: false
  },
  city:{
    type:String,
    default:"",
    required:false
  },
  country:{
    type:String,
    default:"",
    required:false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
