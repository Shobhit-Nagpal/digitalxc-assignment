import { useXLSX } from "@/hooks/use-xlsx";
import { FileUpload } from "./file-upload";
import { SecretSantaTable } from "./secret-santa-table";
import { Button } from "./ui/button";
import { FilePreview } from "./file-preview";
import { useSecretSanta } from "@/hooks/use-secret-santa";
import { SecretSantaResult } from "./secret-santa-result";
import { useEffect, useRef } from "react";
import { LoadingSpinner } from "./loading-spinner";

export function SecretSanta() {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const { xlsx, headers, data, uploadXLSX, reset } = useXLSX();
  const {
    result,
    loading,
    generateSecretSanta,
    reset: resetSecretSanta,
  } = useSecretSanta();

  // Reset secret santa when we remove file
  useEffect(() => {
    resetSecretSanta();
  }, [xlsx]);

  // Auto-scroll when result appears
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  if (!xlsx) {
    return (
      <section className="mt-10">
        <FileUpload uploadFile={uploadXLSX} />
      </section>
    );
  }

  return (
    <section className="my-10">
      <div className="flex flex-col items-center space-y-4">
        <FilePreview name={xlsx.name} onClick={() => reset()} />
        <SecretSantaTable headers={headers} data={data} />
        <Button onClick={() => generateSecretSanta(data)} disabled={loading}>
          {loading ? "Generate" : "Generating..."}
        </Button>
        {loading && <LoadingSpinner />}
        {result && <SecretSantaResult data={result} ref={resultRef} />}
      </div>
    </section>
  );
}
