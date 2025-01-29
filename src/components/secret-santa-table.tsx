import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SecretSantaTable() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Table>
        <TableCaption>List of employees for secret santa.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-center">INV001</TableCell>
            <TableCell className="text-center">Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
