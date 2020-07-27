const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  till: {
    type: Date,
    required: true,
  },
  timings: {
    type: [Number],
    required: true,
  },
});

const prescriptionSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Patients",
    },
    date: {
      type: String,
      required: true,
    },
    isOver: {
      type: Boolean,
      default: false,
    },
    medicineList: [medicineSchema],
  },
  { timestamps: true }
);

prescriptionSchema.methods.filterMedicineList = function (index) {
  this.medicineList = this.medicineList.filter((medicine) => {
    return medicine.timings[index] === 1 && medicine.till >= new Date();
  });
  return this;
};

prescriptionSchema.methods.updateStatus = function () {
  console.log("[Updating status in DB...]");
  let isUpdate = true;
  this.medicineList.forEach((medicine) => {
    if (medicine.till > new Date()) {
      isUpdate = false;
    }
  });
  if (isUpdate) {
    console.log("[isover set to true]");
    this.isOver = true;
  } else {
    console.log("[isOver remains false ]");
  }
};

module.exports = mongoose.model("Prescription", prescriptionSchema);
