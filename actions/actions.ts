"use server";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { csvParsingQueue } from "@/queue/worker";
import { Job } from "bullmq";
import Papa from "papaparse";
import { parse } from "csv-parse/sync";
// const executeJob = async (name: string, bufferedData: File) => {
//   const job = await Job.create(sampleQueue, name, { data: bufferedData });
//   await addJob(job);
// };

export async function uploadFile(formData: FormData) {
  async function addJob(job: Job) {
    const options = { repeat: { every: 5000 } };
    await csvParsingQueue.add(job.name, job, options);
  }

  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const fileStream = Buffer.from(arrayBuffer);
  const d = parse(fileStream, { columns: true });
  const job = await Job.create(csvParsingQueue, file.name, fileStream);
  await addJob(job);
  // executeJob("sampleQueue", file);
}
