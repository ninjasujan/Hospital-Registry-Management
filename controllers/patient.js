const Patient = require("../models/Patient");
const { validationResult } = require("express-validator");

exports.registerPatient = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    error.message = error.errors[0].msg;
    error.statusCode = 422;
    throw error;
  }
  const { patientId, name, birthDate, contact, address, location } = req.body;
  Patient.findOne({ patientId: patientId })
    .then((patient) => {
      if (patient) {
        const error = new Error("Patient already registered.!");
        error.statusCode = 422;
        throw error;
      }
      const newPatient = new Patient({
        patientId,
        name,
        birthDate,
        contact,
        address,
        location,
      });
      return newPatient.save();
    })
    .then((savedPatient) => {
      return res.status(201).json({
        message: "Patient registration successfull.",
        patientId: savedPatient._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
