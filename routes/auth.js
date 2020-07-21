const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { signUp, login, checkSignup } = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please enter valid name."),
    body("username")
      .trim()
      .isLength({ min: 5 })
      .normalizeEmail()
      .withMessage("Please add valid E-Mail"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage(
        "Please add valid password, password must be at least 5 char long"
      ),
  ],
  signUp
);

router.post(
  "/login",
  [
    body("username")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter valid username"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter valid password"),
  ],
  login
);

router.get("/signup", checkSignup);

module.exports = router;
