"use client";
import { useState, useEffect } from "react";
import Loader from "./Loader";
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
import People from "@/types/people";
import attributes from "@/schema/attributes";

const TableComp = (): JSX.Element => {
  const [type, setType] = useState<string>("people");
  const [data, setData] = useState<People[]>([]);
  const [error, setError] = useState<string>("");

  const getData = async (type: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/${type}`, {
        method: "GET",
      });
      const dataObj = await res.json();

      const finalResult: People[] = dataObj.data.results.map(
        (item: any): People => ({
          name: item.name,
          height: item.height,
          hairColor: item.hair_color,
          birthYear: item.birth_year,
          mass: item.mass,
        })
      );
      setData(finalResult);
    } catch (error) {
      setError(`Error fetching data:${error}`);
    }
  };

  useEffect(() => {
    setError("");
    getData(type);
  }, [type]);

  if (error) {
    return <p className="text-red-500 text-center text-3xl m-8 ">{error}</p>;
  }

  return (
    <>
      {data.length === 0 ? (
        <Loader />
      ) : (
        <>
          <section className="flex justify-between w-full">
            {Object.values(attributes).map((each) => (
              <button
                onClick={() => setType(each)}
                className={`${
                  type === each ? `bg-cyan-400` : `bg-gray-700`
                }  rounded-xl p-4`}
                key={each}
              >
                {each}
              </button>
            ))}
          </section>
          <Table>
            <TableCaption>
              List Of All Star Wars {type.toUpperCase()}
            </TableCaption>
            <TableHeader>
              <TableRow>
                {peopleHeader.map((header) => (
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
        </>
      )}
    </>
  );
};

export default TableComp;
