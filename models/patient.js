const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patients", patientSchema);
