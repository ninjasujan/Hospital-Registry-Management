const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`[SERVER RUNNING in PORT ${process.env.SERVER_PORT} ]`);
});
