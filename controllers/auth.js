const { validationResult } = require("express-validator");
const User = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

exports.login = (req, res, next) => {
  console.log("[auth.js] login", req.body);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    error.message = error.errors[0].msg;
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.username;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ username: email })
    .then((user) => {
      if (!user) {
        const error = new Error("User not registered.!");
        error.statusCode = 404;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Invalid Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id },
        "hospital-key"
      );
      return res
        .status(200)
        .json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.checkSignup = (req, res, next) => {
  User.findOne({})
    .then((user) => {
      if (!user) {
        const error = new Error("User not signedup.");
        error.statusCode = 401;
        throw error;
      }
      return res.status(200).json({
        message: "User already signedup.!",
        userId: user._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
