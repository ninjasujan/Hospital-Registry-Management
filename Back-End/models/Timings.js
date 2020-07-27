const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimingsSchema = new Schema({
  morning: {
    type: String,
    required: true,
  },
  afterNoon: {
    type: String,
    required: true,
  },
  night: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Timings", TimingsSchema);
