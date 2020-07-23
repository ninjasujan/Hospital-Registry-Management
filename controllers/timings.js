const Timing = require("../models/Timings");

exports.updateTimings = (req, res, next) => {
  Timing.findOne({})
    .then((timings) => {
      if (req.body.morning) {
        timings.morning = req.body.morning;
      }
      if (req.body.afterNoon) {
        timings.afterNoon = req.body.afterNoon;
      }
      if (req.body.night) {
        timings.night = req.body.night;
      }
      return timings.save();
    })
    .then((updatedTimings) => {
      return res.status(200).json({
        message: "Timings updated in Database",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
