"use server";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { csvParsingQueue } from "@/lib/queue";
import { Job } from "bullmq";
import Papa from "papaparse";
import csvParser from "csv-parser";
import neatCsv from "neat-csv";

export async function uploadFile(formData: FormData) {
  async function addJob(job: Job) {
    const options = { repeat: { every: 5000 } };
    await csvParsingQueue.add(job.name, job, options);
  }

  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const fileStream = Buffer.from(arrayBuffer);
  const d = await neatCsv(fileStream);
  console.log("d", d);
  const job = await Job.create(csvParsingQueue, file.name, fileStream);
  await addJob(job);
  // executeJob("sampleQueue", file);
}
