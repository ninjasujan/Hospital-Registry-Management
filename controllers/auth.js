const { validationResult } = require("express-validator");
const User = require("../models/Auth");
const bcrypt = require("bcryptjs");

exports.signUp = (req, res, next) => {
  console.log("[SIGNUP]", req.body);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    error.message = error.errors[0].msg;
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const password = req.body.password;
  const userName = req.body.username;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      console.log("[Hashed Password]");
      const user = new User({
        name: name,
        password: hashedPassword,
        username: userName,
      });
      return user.save();
    })
    .then((user) => {
      console.log("[User Registered]");
      return res.status(201).json({
        message: "User registered.",
        userId: user._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
