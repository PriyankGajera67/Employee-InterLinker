const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ConnectionsSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  connectionId: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  senderEmployer: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  senderPosition:{
    type:String,
    default:"Software Developer",
    required:true
  },
  senderBio:{
    type:String,
    default:"This is Bio",
    required:true
  },
  employer: {
    type: String,
    required: true
  },
  position:{
    type:String,
    default:"Software Developer",
    required:true
  },
  bio:{
    type:String,
    default:"This is Bio",
    required:true
  },
  varified:{
    type:Boolean,
    default:false,
    required:true
  }
});

module.exports = Verification = mongoose.model("connections", ConnectionsSchema);
