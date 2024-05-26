import worker from "@/lib/worker";
import { createQueueMQ } from "./utils";
import Papa from "papaparse";
import { connection } from "@/lib/redis";

const queue = createQueueMQ("mailQueue");

// export const CSVQueue = {

//     queue,
//     adders: {
//         add: (data: {name: string, filStream: Buffer}) => queue.add(data.name, data.filStream )
//     },
//     worker: async() => {
//   const queueName = queue.name;
//   new Worker(
//     "csvParsingQueue",
//     async (job) => {
//       console.log("in worker");
//       const data = job?.data;
//       const parsedData = Papa.parse(data.data.data);
//       console.log("Task executed ", parsedData.data);
//     },{}
//   );
//     }
// }
