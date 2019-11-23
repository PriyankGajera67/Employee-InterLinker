const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserShiftSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  data:{
    type: String,
    required:true,
  }
});

module.exports = UserShift = mongoose.model("usershift", UserShiftSchema);
