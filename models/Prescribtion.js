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
      type: String,
      required: true,
      ref: "Patients",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    isOver: {
      type: Boolean,
      default: false,
    },
    medicineList: [medicineSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
