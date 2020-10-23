const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const { check, validationResult } = require("express-validator");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateTurbulence = require("../../validation/turbulence");

// Load User model
const User = require("../../models/User");
//load Turbulence Model
const Turbulence = require("../../models/Turbulence");
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

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/register
// @desc Register user
// @access Private
// router.post("/post", (req, res) => {
//   // Form validation

//   const { errors, isValid } = validateTurbulence(req.body);

//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   const { routefrom, routeto, altitude } = req.body;

//   turbulence = new Turbulence({
//     routefrom,
//     routeto,
//     altitude,
//   });

//   turbulence.save();
// });
router.post(
  "/turbpost",
  [
    check("routefrom", "Please Enter a Valid Value").not().isEmpty(),
    check("routeto", "Please enter a valid Value").not().isEmpty(),
    check("altitude", "Please enter a valid number").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { routefrom, routeto, altitude } = req.body;
    try {
      if (routefrom == routeto) {
        return res.status(400).json({
          msg: "Data Already Exists",
        });
      }

      turbulence = new Turbulence({
        routefrom,
        routeto,
        altitude,
      });

      await turbulence.save();

      const payload = {
        turbulence: {
          id: turbulence._id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

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
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
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
router.get("/list", (req, res) => {
  Turbulence.find({})
    .sort({ reportedAt: -1 })
    .then((turbulence) => {
      console.log("turbulence:", turbulence);
      res.json(turbulence);
    })
    .catch((error) => {
      console.log("error:", turbulence);
    });
});

module.exports = router;
