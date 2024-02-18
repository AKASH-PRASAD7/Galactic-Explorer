"use client";
import { useState, useEffect } from "react";
import config from "@/config/config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import peopleHeader from "@/schema/people";

const TableComp = (): JSX.Element => {
  const [type, setType] = useState<string>("people");

  const getData = async (type: string) => {
    // let res = await fetch(`${config.starWarsUrl}${type}/format=json`)
    let res = await fetch(`http://localhost:3000/api/type`, {
      method: "POST",
      body: JSON.stringify({
        type,
      }),
    });
    // const data = await res.json();
    console.log(res);
  };

  useEffect(() => {
    getData(type);
  }, []);

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {peopleHeader.map((header) => (
              <TableHead key={header.accessor}>{header.Header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default TableComp;
