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
          console.log("[Prescription]", prescription);
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
      console.log(messageInfoList);

      messageInfoList.forEach((mail) => {
        console.log(
          `Dear ${
            mail.patientId.name
          }, \n The below is the list of medicines you need to take in the ${time} \n session \n ${mail.medicinesName.join(
            " "
          )}`
        );
      });
      console.log("***************************************************");
    });
};

exports.eventOne = cron.schedule("* * * * * *", () => {
  mailUtility();
});

// exports.eventTwo = cron.schedule("*/2 * * * * *", () => {
//   console.log("[Cron Job runs for every [two] seconds..]");
// });
