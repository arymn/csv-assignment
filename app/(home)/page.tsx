import CSVFileInput from "@/app/(home)/components/csvFileInput";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-start justify-between font-mono text-sm flex flex-col gap-4">
        <h1 className="text-2xl md:text-4xl font-bold">CSV Assignment</h1>
        <CSVFileInput />
      </div>
    </main>
  );
}
