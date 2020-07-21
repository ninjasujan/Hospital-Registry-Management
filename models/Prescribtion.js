const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Patients",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
