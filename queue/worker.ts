import { Worker, Queue, Job } from "bullmq";
import Redis from "ioredis";
import { parse } from "csv-parse/sync";
import Papa from "papaparse";

export const connection = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

export const csvParsingQueue = new Queue("csvParsingQueue", {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

const worker = new Worker(
  "csvParsingQueue",
  async (job) => {
    const data = job?.data;
    const parsedData = parse(data.data.data, { columns: true });
    return parsedData;
  },
  {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 2 },
  }
);

worker.on("completed", (job) => {
  console.log(`Job completed with result`, job.returnvalue);
});

export default worker;
