import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { People, TableColumn } from "@/types";
import Link from "next/link";

interface TableCompProps {
  column: TableColumn[];
  data: People[];
  category: string;
}

const TableComp = ({ column, data, category }: TableCompProps): JSX.Element => {
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
        {data.map((row: People, index) => (
          <TableRow key={row.name}>
            {Object.values(row).map(
              (cell, ind): JSX.Element => (
                <TableCell key={ind}>
                  <Link href={`/about/${category}/${index + 1}`}>{cell}</Link>
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComp;
