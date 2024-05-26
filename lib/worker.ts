import { Worker, Queue, Job } from "bullmq";
import Redis from "ioredis";
import neatCsv from "neat-csv";
import Papa from "papaparse";
import { connection } from "@/lib/redis";

const worker = new Worker(
  "csvParsingQueue",
  async (job) => {
    // console.log("in worker");
    const data = job?.data;
    const parsedData = Papa.parse(data.data.data);
    console.log("Task executed ", parsedData.data);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 2 },
  }
);

worker.on("completed", (job) => {
  console.log(`Job completed with result ${job.returnvalue}`);
});

// worker.on("failed", (job, err) => {
//   console.log(`Job failed with error ${err.message}`);
// });

export default worker;
