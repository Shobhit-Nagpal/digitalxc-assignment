"use client";
import { useState } from "react";
import * as XLSX from "xlsx";

export function useXLSX() {
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

      // To satisfy constraint of using previous year's data to avoid repetition
      setHeaders(headers?.slice(0, 2) as string[]);
      const dataRows = rows.map((row) => row.slice(0, 2));
      setData(dataRows);
    };

    reader.onerror = () => {
      console.error("Failed to read file");
    };

    reader.readAsBinaryString(xlsx);

    setXLSX(xlsx);
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
