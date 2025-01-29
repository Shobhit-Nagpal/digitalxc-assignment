import { File, XIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface FilePreviewProps {
  name: string;
  onClick: () => void;
}

export function FilePreview({ name, onClick }: FilePreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center space-x-3 transition-all duration-300 hover:shadow-lg">
      <File className="w-6 h-6 text-blue-500" />
      <p className="font-medium text-gray-700 dark:text-gray-200">{name}</p>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
      >
        <XIcon className="w-4 h-4" />
        <span className="sr-only">Remove file</span>
      </Button>
    </div>
  );
}
