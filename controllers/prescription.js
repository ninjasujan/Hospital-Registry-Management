const Prescription = require("../models/Prescribtion");
const { validationResult } = require("express-validator");
const Patients = require("../models/Patients");

exports.addPrescription = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    error.message = error.errors[0].msg;
    error.statusCode = 422;
    throw error;
  }

  try {
    await Prescription.updateMany(
      { isOver: gty, patientId: req.body._id },
      { $set: { isOver: true } }
    );
  } catch (err) {
    err.statusCode = 500;
    err.message = "Update failed";
    next(err);
  }

  console.log("Final input DB", req.body);

  const prescribe = new Prescription({
    patientId: req.body._id,
    date: new Date().toISOString().toString(),
    medicineList: req.body.medicineList,
  });

  return prescribe
    .save()
    .then((savedPrescribe) => {
      return res.status(201).json({
        message: "Doctor prescription added to patient.",
        prescription: savedPrescribe,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.removePrescription = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    error.message = error.errors[0].msg;
    error.statusCode = 422;
    throw error;
  }
  const patientId = req.body._id;
  const date = req.body.date;
  Prescription.deleteOne({
    $and: [{ date: { $regex: date } }, { patientId: patientId }],
  })
    .then((result) => {
      if (result.deletedCount <= 0) {
        const error = new Error(
          "Prescripton was not added for the patient on the specified date "
        );
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({
        message: "Patient prescription deleted in the specified date.",
      });
    })
    .catch((err) => {
      console.log("Catch Statement..");
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllPrescriptions = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    error.statusCode = 422;
    error.message = error.errors[0].msg;
    throw error;
  }
  let loadedPatient;
  Patients.findOne({ _id: req.body._id })
    .then((patientInfo) => {
      loadedPatient = patientInfo;
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw error;
    });

  Prescription.find({ patientId: req.body._id }, {})
    .then((patientPrescription) => {
      return res.status(200).json({
        patientInfo: loadedPatient,
        prescriptionInfo: patientPrescription,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
