const cron = require("node-cron");
const Prescription = require("../models/Prescribtion");
const Patient = require("../models/Patients");

const mailUtility = (timeIndex) => {
  let filteredList;
  let messageInfoList = [];
  let time = null;

  if (timeIndex === 0) time = "Morning";
  if (timeIndex === 1) time = "Afternoon";
  if (timeIndex === 2) time === "Night";

  Prescription.find({ isOver: false })
    .populate({ path: "patientId" })
    .then((list) => {
      filteredList = list.map((med) => {
        return med.filterMedicineList(timeIndex);
      });

      filteredList.forEach((prescription) => {
        if (prescription.medicineList.length > 0) {
          // console.log("[Prescription]", prescription);
          let ob = {};
          ob.name = prescription.patientId.name;
          let medicinesName = [];
          prescription.medicineList.forEach((medicine) => {
            medicinesName.push(medicine.name);
          });
          ob.medicinesName = medicinesName;
          messageInfoList.push(ob);
        }
      });

      console.log("***************************************************");

      messageInfoList.forEach((mail) => {
        console.log(
          `Dear ${
            mail.name
          }, \n The below is the list of medicines you need to take in the ${time} session \n ${mail.medicinesName.join(
            " "
          )}`
        );
      });
      console.log("***************************************************");
    });
};

// exports.eventOne = cron.schedule("* * * * * *", () => {
//   mailUtility(1);
// });

exports.eventTwo = cron.schedule("*/3 * * * * *", () => {
  Prescription.find({ isOver: false })
    .then((list) => {
      list.forEach((medicines) => {
        medicines.updateStatus();
      });
      list.forEach((eachList) => {
        return eachList.save();
      });
    })
    .then((dbUpdated) => {
      console.log("[Update Utility function fired.]");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});
