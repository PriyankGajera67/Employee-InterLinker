const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User model
const Connections = require("../../models/Connections");

router.post("/addConnection", (req, res) => {
  Connections.findOne({ userId: req.body.userId, connectionId:req.body.connectionId }).then(connection => {
    if (connection) {
      return res.status(400).json({ email: "Connection already exists" });
    } else {
      const newConnection = new Connections({
        userId: req.body.userId,
        connectionId: req.body.connectionId,
        name: req.body.name,
        employer: req.body.employer,
        position:req.body.position
      });
      newConnection.save().then(user => {
        return res.json(user)
      }).catch(err => console.log(err));
    }
  });
});


router.post("/getMyConnnections", (req, res) => {
  data = req.body;
  console.log(data.userId);
  Connections.find({ userId: data.userId }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

module.exports = router;
