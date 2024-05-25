import { Queue } from "bullmq";

import { Redis } from "ioredis";

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
