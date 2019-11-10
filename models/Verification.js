const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VerificationSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  verified:{
    type:Boolean,
    default: false,
    required: true
  }
});

module.exports = Verification = mongoose.model("verification", VerificationSchema);
