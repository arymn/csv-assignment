"use client";
import { uploadFile } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";

const CSVFileInput: FC = () => {
  const [csvFile, setCsvFile] = useState<File>();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!csvFile) return;
    try {
      const formData = new FormData();
      formData.append("file", csvFile);
      console.log({ formData });
      // const res = await fetch("/api/upload", {
      //   method: "POST",
      //   body: formData,
      // });
      const res = await uploadFile(formData);
      console.log("Response", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          onChange={(e) => setCsvFile(e.target.files?.[0])}
          id="csv"
          type="file"
        />
        <Button type="submit">Submit</Button>
      </form>
      {/* <Button
        onClick={async () => {
          await fetch("/api/addjob", {
            method: "POST",
          });
        }}
      >
        Execute Job
      </Button> */}
    </>
  );
};

export default CSVFileInput;
