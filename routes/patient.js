const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { registerPatient } = require("../controllers/patient");
const isAuth = require("../middleware/isAuth");

router.post(
  "/register",
  [
    body("name").trim().not().isEmpty().withMessage("Please enter name field."),
    body("patientId")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter patient ID"),
    body("contact")
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("Please add valid contact number."),
    body("location")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter patient location."),
  ],
  isAuth,
  registerPatient
);

module.exports = router;
