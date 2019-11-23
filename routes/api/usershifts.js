const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User model
const Usershifts = require("../../models/Usershift");

router.post("/addShift", (req, res) => {
  Usershifts.findOne({ userId:req.body.userId,start: req.body.start, end:req.body.end }).then(shift => {
    if (shift) {
      return res.status(400).json({ email: "Shift already exists" });
    } else {
      const newShift = new Usershifts({
        userId: req.body.userId,
        start: req.body.start,
        end:  req.body.end
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
  Usershifts.remove({userId:data.userId,start: data.start, end:data.end}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


module.exports = router;
