const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// middlewares
app.use(bodyParser.json());

app.listen(process.env.SERVER_PORT, () => {
  console.log(`[SERVER RUNNING in PORT ${process.env.SERVER_PORT} ]`);
});
