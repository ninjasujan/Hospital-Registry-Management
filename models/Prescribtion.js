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

prescriptionSchema.methods.filterMedicineList = function () {
  this.medicineList = this.medicineList.filter((medicine) => {
    return medicine.timings[0] === 1 && medicine.till >= new Date();
  });
  return this;
};

module.exports = mongoose.model("Prescription", prescriptionSchema);
