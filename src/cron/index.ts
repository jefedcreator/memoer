import schedule from "node-schedule";
import { config } from "@config";
import { fetch, setGlobalDispatcher, Agent } from "undici";

const rule = new schedule.RecurrenceRule();
rule.second = 29;

const job = schedule.scheduleJob(rule, async function () {
  setGlobalDispatcher(new Agent({ connect: { timeout: 100000_000 } }));
  const response = await fetch(
    `http://0.0.0.0:${config.port}/v1/notes/reminder`,
    {
      signal: AbortSignal.timeout(1000000),
    }
  );
  console.log("cron response", await response.text());
});

// const reminder = async () => {
//   const response = await fetch(
//     `http://0.0.0.0:${config.port}/v1/notes/reminder`,
//     {
//       signal: AbortSignal.timeout(1000000),
//     }
//   );
//   console.log("cron response", await response.text());

// };

// reminder()
