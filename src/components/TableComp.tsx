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
    <div className="overflow-x-auto">
      <Table className="glass-table mt-4">
        <TableHeader>
          <TableRow className="bg-black  hover:bg-black">
            {column.map((header) => (
              <TableHead
                className="text-cyan-500  font-bold"
                key={header.accessor}
              >
                {header.Header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: People, index) => (
            <TableRow
              className="hover:bg-cyan-400 text-lime-500 hover:text-white"
              key={row.name}
            >
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
    </div>
  );
};

export default TableComp;
