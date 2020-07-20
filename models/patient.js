const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("patients", patientSchema);
