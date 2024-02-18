import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { People, TableColumn } from "@/types";

interface TableCompProps {
  column: TableColumn[];
  data: People[];
}

const TableComp = ({ column, data }: TableCompProps): JSX.Element => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {column.map((header) => (
            <TableHead key={header.accessor}>{header.Header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: People) => (
          <TableRow key={row.name}>
            {Object.values(row).map(
              (cell, index): JSX.Element => (
                <TableCell key={index}>{cell}</TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComp;
