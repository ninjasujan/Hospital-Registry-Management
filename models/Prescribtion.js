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

module.exports = mongoose.model("Prescription", prescriptionSchema);
