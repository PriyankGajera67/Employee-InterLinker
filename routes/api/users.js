const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Verification = require("../../models/Verification");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              role: user.role,
              id: user._id,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/all", (req, res) => {
  User.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/verify", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      User.updateOne({ email: req.body.email }, { "verified": true }, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
    } else {
      return res.status(400).json({ email: "Opps Something went wrong!!" });
    }
  });
});

router.post("/allCompany", (req, res) => {
  User.find({ role: "COMPANY" }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/getUser", (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: user });
  });
});

router.post("/delete", (req, res) => {
  User.deleteOne({ email: req.body.email }, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/updateUser", (req, res) => {
  data = req.body.profileData;
  User.findOne({ email: data.email }).then(user => {
      if (user) {
        User.updateOne({ email: req.body.profileData.email }, {
          "email": req.body.profileData.email,
          "dob": req.body.profileData.dob,
          "name": req.body.profileData.name,
          "address":req.body.profileData.address,
          "postalCode": req.body.profileData.postalCode,
          "country": req.body.profileData.country,
          "city": req.body.profileData.city,
          "joiningDate": req.body.profileData.joiningDate,
          "gender": req.body.profileData.gender,
          "employer": req.body.profileData.employer,
          "contactNumber": req.body.profileData.contactNumber,
          "fullTime": req.body.profileData.fullTime,
          "position":req.body.profileData.position
        }, (err) => {
          if (err) return res.json({ success: false, error: err });
          return res.json({ success: true });
        });
      } else {
        return res.status(400).json({ email: "Opps Something went wrong!!" });
      }
    });
});

router.post("/getVerificationRequests", (req, res) => {
  data = req.body;
  User.find({ employer: data.employer, verified: false }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/getCompanyById", (req, res) => {
  data = req.body;
  User.findById(req.body.id, (err, user) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: user });
  });
});

router.post("/getVerifiedUsers", (req, res) => {
  data = req.body;
  User.find({ employer: data.employer, verified: true }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

module.exports = router;
