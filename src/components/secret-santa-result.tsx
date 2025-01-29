import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Headers } from "@/consts";
import type { SecretSantaResult } from "@/types";

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

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="my-4 text-2xl font-bold text-center">Result</h1>
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
