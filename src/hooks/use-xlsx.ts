"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { useToast } from "./use-toast";
import { Headers } from "@/consts";

export function useXLSX() {
  const { toast } = useToast();
  const [xlsx, setXLSX] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);

  const uploadXLSX = (xlsx: File) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const workbook = XLSX.read(event.target?.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
      const headers = rows.shift();

      if (!headers) {
        return toast({
          title: "Failed to get headers on Excel file",
          variant: "destructive",
        });
      }

      if (headers && headers.length < 2) {
        return toast({
          title: "Failed to parse headers",
          description:
            "Please make sure there are minimum 2 headers inside the Excel file",
          variant: "destructive",
        });
      }

      if (headers && headers[0] !== Headers.EmployeeName) {
        return toast({
          title: "Failed to parse headers",
          description: `Please make sure the first column is named as ${Headers.EmployeeName}`,
          variant: "destructive",
        });
      }

      if (headers && headers[0] !== Headers.EmployeeName) {
        return toast({
          title: "Failed to parse headers",
          description: `Please make sure the first column is named as ${Headers.EmployeeName}`,
          variant: "destructive",
        });
      }

      if (headers && headers[1] !== Headers.EmployeeEmail) {
        return toast({
          title: "Failed to parse headers",
          description: `Please make sure the first column is named as ${Headers.EmployeeEmail}`,
          variant: "destructive",
        });
      }

      setHeaders(headers as string[]);
      setData(rows);
      setXLSX(xlsx);
    };

    reader.onerror = () => {
      toast({
        title: "Failed to read file",
        variant: "destructive",
      });
    };

    reader.readAsBinaryString(xlsx);
  };

  const reset = () => {
    setXLSX(null);
  };

  return {
    xlsx,
    uploadXLSX,
    reset,
    headers,
    data,
  };
}
