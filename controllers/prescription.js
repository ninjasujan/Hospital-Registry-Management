const Prescribtion = require("../models/Prescribtion");
const { validationResult } = require("express-validator");

exports.addPrescription = (req, res, next) => {
  const error = validationResult(req);
};
