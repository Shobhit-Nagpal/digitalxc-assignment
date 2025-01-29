import { useXLSX } from "@/hooks/use-xlsx";
import { FileUpload } from "./file-upload";
import { SecretSantaTable } from "./secret-santa-table";
import { Button } from "./ui/button";
import { File, XIcon } from "lucide-react";

export function SecretSanta() {
  const { xlsx, uploadXLSX, reset } = useXLSX();

  if (!xlsx) {
    return (
      <section className="mt-10">
        <FileUpload uploadFile={uploadXLSX} />
      </section>
    );
  }

  return (
    <section className="mt-10">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center space-x-3 transition-all duration-300 hover:shadow-lg">
          <File className="w-6 h-6 text-blue-500" />
          <p className="font-medium text-gray-700 dark:text-gray-200">
            {xlsx.name}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => reset()}
            className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
        <SecretSantaTable />
      </div>
    </section>
  );
}
