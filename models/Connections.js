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
  name: {
    type: String,
    required: true
  },
  employer: {
    type: String,
    required: true
  },
  position:{
    type:String,
    default:"Software Developer",
    required:true
  }
});

module.exports = Verification = mongoose.model("connections", ConnectionsSchema);
