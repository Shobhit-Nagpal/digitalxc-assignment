import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SecretSantaTableProps {
  headers: string[];
  data: string[][];
}

export function SecretSantaTable({ headers, data }: SecretSantaTableProps) {
  console.log("DATA: ", data)
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Table>
        <TableCaption>List of employees for secret santa.</TableCaption>
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
              {row.map((value, idx) => (
                <TableCell key={idx} className="text-center">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
