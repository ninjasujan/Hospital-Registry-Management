const express = require("express");
const { updateTimings } = require("../controllers/timings");
const router = express.Router();

router.put("/update-timings", updateTimings);

module.exports = router;
