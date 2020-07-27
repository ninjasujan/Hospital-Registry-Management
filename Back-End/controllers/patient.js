const Patient = require("../models/Patients");
const { validationResult } = require("express-validator");

exports.registerPatient = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    error.message = error.errors[0].msg;
    error.statusCode = 422;
    throw error;
  }
  console.log("No input error");
  const { patientId, name, birthDate, contact, address, location } = req.body;
  Patient.findOne({ patientId: patientId })
    .then((patient) => {
      if (patient) {
        const error = new Error("Patient already registered.!");
        error.statusCode = 403;
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
        patient: savedPatient,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateRegister = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    error.message = error.errors[0].msg;
    error.statusCode = 422;
    throw error;
  }
  const patientId = req.body.patientId;
  Patient.findOne({ patientId: patientId })
    .then((patient) => {
      console.log();
      if (!patient) {
        const error = new Error(
          "Patient not registered yet, please register patient first"
        );
        error.statusCode = 403;
        throw error;
      }
      patient.patientId = req.body.patientId;
      patient.name = req.body.name;
      patient.birthDate = req.body.birthDate;
      patient.contact = req.body.contact;
      patient.address = req.body.address;
      patient.location = req.body.location;
      return patient.save();
    })
    .then((updatedPatient) => {
      return res.status(200).json({
        message: "Patient information successfully updated.",
        patientId: updatedPatient._id.toString(),
        patient: updatedPatient,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePatient = (req, res, next) => {
  const patientId = req.params.patientId;
  if (!patientId) {
    const error = new Error("Enter Patient ID");
    error.statusCode = 404;
    throw error;
  }
  Patient.deleteOne({ patientId: patientId })
    .then((deleted) => {
      console.log("Deleted", deleted);
      if (deleted.deletedCount == 0) {
        const error = new Error(
          "Patient information not exist, please check patient ID"
        );
        error.statusCode = 403;
        throw error;
      }
      return res.status(200).json({
        message: "Patient entry removed.",
        patient: deleted,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
