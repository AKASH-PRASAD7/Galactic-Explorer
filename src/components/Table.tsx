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

import {
  People,
  Films,
  Planets,
  Species,
  Starships,
  Vehicles,
  TableColumn,
} from "@/types";
import {
  attributes,
  films,
  people,
  planets,
  species,
  starships,
  vehicles,
} from "@/schema";
import filterData from "@/utils/filterData";

const TableComp = (): JSX.Element => {
  const [type, setType] = useState<string>("people");
  const [data, setData] = useState<People[]>([]);
  const [error, setError] = useState<string>("");
  const [column, setColumn] = useState<TableColumn[]>(people);

  const getData = async (type: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/${type}`, {
        method: "GET",
      });
      const dataObj = await res.json();

      const finalResult: People[] = filterData(dataObj, type);
      setData(finalResult);
    } catch (error) {
      setError(`Error fetching data:${error}`);
    }
  };

  const handleTypeChange = (typeParam: string): void => {
    setType(typeParam);
    switch (typeParam) {
      case "people":
        setColumn(people);
        break;
      case "films":
        setColumn(films);
        break;
      case "species":
        setColumn(species);
        break;
      case "starships":
        setColumn(starships);
        break;
      case "planets":
        setColumn(planets);
        break;
      case "vehicles":
        setColumn(vehicles);
        break;
      default:
        setColumn(people);
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
                onClick={() => handleTypeChange(each)}
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
        </>
      )}
    </>
  );
};

export default TableComp;
