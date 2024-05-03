import schedule from "node-schedule";
import { config } from "@config";
const rule = new schedule.RecurrenceRule();
rule.second = 59;

const job = schedule.scheduleJob(rule, async function () {
  const response = await fetch(
    `http://0.0.0.0:${config.port}/v1/notes/reminder`
  );
  console.log("cron response", await response.text());
});
