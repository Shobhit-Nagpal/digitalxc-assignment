import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Headers } from "@/consts";
import type { SecretSantaResult } from "@/types";
import * as XLSX from "xlsx";

interface SecretSantaResultProps {
  data: SecretSantaResult[];
}

export function SecretSantaResult({ data }: SecretSantaResultProps) {
  const headers = [
    Headers.EmployeeName,
    Headers.EmployeeEmail,
    Headers.SecretChildName,
    Headers.SecretChildEmail,
  ];

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(
      data.map((row) => ({
        [Headers.EmployeeName]: row.employeeName,
        [Headers.EmployeeEmail]: row.employeeEmail,
        [Headers.SecretChildName]: row.childName,
        [Headers.SecretChildEmail]: row.childEmail,
      })),
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Secret Santa Assignments");

    XLSX.writeFile(wb, "secret-santa-assignments.xlsx");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Result</h1>
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Excel
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, idx) => (
              <TableHead key={idx} className="text-center">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-center">{row.employeeName}</TableCell>
              <TableCell className="text-center">{row.employeeEmail}</TableCell>
              <TableCell className="text-center">{row.childName}</TableCell>
              <TableCell className="text-center">{row.childEmail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
