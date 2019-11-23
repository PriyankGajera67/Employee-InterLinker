const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User model
const Usershifts = require("../../models/Usershift");

router.post("/addShift", (req, res) => {
  Usershifts.findOne({ userId:req.body.userId}).then(shift => {
    if (shift) {
      Usershifts.update({userId:req.body.userId},{data:req.body.data},(err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    } else {
      const newShift = new Usershifts({
        userId: req.body.userId,
        data: req.body.data
      });
      newShift.save().then(shift => {
        return shift.json()
      }).catch(err => console.log(err));
    }
  });
});

router.post("/getShift", (req, res) => {
  data = req.body;
  console.log(data.userId);
  Usershifts.find({ userId: data.userId }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/removeShift", (req, res) => {
  data = req.body;
  Usershifts.remove({userId:data.userId}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


module.exports = router;
