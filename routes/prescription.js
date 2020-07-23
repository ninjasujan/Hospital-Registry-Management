const express = require("express");
const { body, check, param } = require("express-validator");
const {
  addPrescription,
  removePrescription,
  getAllPrescriptions,
} = require("../controllers/prescription");
const isAuth = require("../middleware/isAuth");
const Patient = require("../models/Patients");
const { query } = require("express");
const router = express.Router();

router.post(
  "/add-prescription",
  [
    body("patientId")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Invalid patient ID")
      .custom((patientId, { req }) => {
        return Patient.findOne({ patientId: patientId }).then((found) => {
          if (!found) {
            console.log("Patient not found.!");
            return Promise.reject(
              "Patient ID was not registered before, please register first"
            );
          }
          req.body._id = found._id;
        });
      }),
    body("medicineList").custom((prescribedMedicine, { req }) => {
      const tempList = JSON.stringify({ list: prescribedMedicine });
      const medicineList = JSON.parse(tempList).list;

      if (!medicineList) {
        return Promise.reject("Please suggest medicines");
      }
      if (medicineList.length <= 0) {
        return Promise.reject("Please specify the drug list");
      }
      let index = 0;
      for (let medicine of medicineList) {
        console.log("[Medicine Timings]", medicine.timings);
        let isValid = true;
        if (isValid && medicine.name === "") {
          isValid = false;
          return Promise.reject("Not a valid medicine name");
        }
        if (isValid && medicine.days <= 0) {
          isValid = false;
          return Promise.reject("Not a valid day");
        }
        console.log("----------------", medicine.timings.length);
        if (isValid && medicine.timings.length !== 3) {
          isValid = false;
          return Promise.reject("Add a valid timings for a medicine.");
        } else {
          if (
            isValid &&
            medicine.timings[0] === 0 &&
            medicine.timings[1] === 0 &&
            medicine.timings[2] === 0
          ) {
            isValid = false;
            return Promise.reject("Please suggest valid timings for drug");
          }
        }
        // custome req body update
        const nextDate = new Date().setDate(
          new Date().getDate() + medicine.days
        );
        req.body.medicineList[index].till = new Date(nextDate);
        console.log("[Final medicine fields]", req.body.medicineList[index]);
        if (!isValid) break;
        index += 1;
      }
      return true;
    }),
  ],
  isAuth,
  addPrescription
);

router.post(
  "/delete-prescription",
  [
    body("patientId")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Invalid patient ID")
      .custom((patientId, { req }) => {
        return Patient.findOne({ patientId: patientId }).then((found) => {
          if (!found) {
            return Promise.reject(
              "Patient ID was not registered before, please register first"
            );
          }
          req.body._id = found._id;
        });
      }),
    body("date")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please specify the date  of the patient visit."),
  ],
  isAuth,
  removePrescription
);

router.get(
  "/get-prescription/:patientId",
  [
    param("patientId")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please specify valid patientId")
      .custom((id, { req }) => {
        return Patient.findOne({ patientId: id }).then((patient) => {
          if (!patient) {
            return Promise.reject(
              "Patient ID was not registered before, please register first"
            );
          }
          req.body._id = patient._id;
        });
      }),
  ],
  isAuth,
  getAllPrescriptions
);

module.exports = router;
