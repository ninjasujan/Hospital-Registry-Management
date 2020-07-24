const cron = require("node-cron");

exports.eventOne = cron.schedule("* * * * * *", () => {
  console.log("[Cron job fires for every seconds.]");
});

exports.eventTwo = cron.schedule("*/2 * * * * *", () => {
  console.log("[Cron Job runs for every [two] seconds..]");
});
