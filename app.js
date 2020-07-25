const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const prescriptionRoute = require("./routes/prescription");
const timingsRoute = require("./routes/timings");

const { eventOne, eventTwo } = require("./cron-job/cron-shedule");

// middlewares
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/patient", patientRoutes);
app.use("/prescription", prescriptionRoute);
app.use("/timings", timingsRoute);

// express Error-Handling
app.use((err, req, res, next) => {
  const message = err.message;
  const statusCode = err.statusCode;
  res.status(statusCode).json({
    error: message,
  });
});

mongoose
  .connect(process.env.DB_SERVER)
  .then(() => {
    console.log("[DB CONNECTED]");
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`[SERVER RUNNING IN PORT ${process.env.SERVER_PORT} ]`);
    });
  })
  .catch((err) => {
    console.log("[ERROR IN DB_CONNECTION]");
  });
