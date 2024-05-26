import { connection } from "@/lib/redis";
import { Queue } from "bullmq";

export const createQueueMQ = (name: string) =>
  new Queue(name, { connection: connection });

export const sleep = (t: number) =>
  new Promise((resolve) => setTimeout(resolve, t));
