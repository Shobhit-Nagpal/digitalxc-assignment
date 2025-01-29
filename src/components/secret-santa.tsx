import { useXLSX } from "@/hooks/use-xlsx";
import { FileUpload } from "./file-upload";
import { SecretSantaTable } from "./secret-santa-table";
import { Button } from "./ui/button";
import { FilePreview } from "./file-preview";
import { useSecretSanta } from "@/hooks/use-secret-santa";
import { Loader2 } from "lucide-react";
import { SecretSantaResult } from "./secret-santa-result";
import { useEffect } from "react";

export function SecretSanta() {
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
  }, [xlsx, resetSecretSanta]);

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
          Generate
        </Button>
        {loading && <Loader2 className="h-6 w-6 animate-spin" />}
        {result && <SecretSantaResult data={result} />}
      </div>
    </section>
  );
}
