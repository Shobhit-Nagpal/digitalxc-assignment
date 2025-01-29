"use client";
import { useState } from "react";

export function useXLSX() {
  const [xlsx, setXLSX] = useState<File | null>(null);

  const uploadXLSX = (xlsx: File) => {
    setXLSX(xlsx);
  };

  const reset = () => {
    setXLSX(null);
  };

  return {
    xlsx,
    uploadXLSX,
    reset,
  };
}
