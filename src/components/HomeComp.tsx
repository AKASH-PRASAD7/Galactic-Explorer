"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loader from "./Loader";
import TableComp from "./TableComp";
import { People, TableColumn } from "@/types";
import { attributes, people } from "@/schema";
import filterData from "@/utils/filterData";
import handleTypeChange from "@/utils/typeChange";
import { Input } from "@/components/ui/input";

const HomeComp = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("people");
  const [data, setData] = useState<People[]>([]);
  const [error, setError] = useState<string>("");
  const [column, setColumn] = useState<TableColumn[]>(people);
  const [next, setNext] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const getData = async (type: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/${type}/${page}`, {
        method: "GET",
      });
      const dataObj = await res.json();

      setPrevious(dataObj.data.previous ? dataObj.data.previous : "");
      setNext(dataObj.data.next ? dataObj.data.next : "");
      const finalResult: People[] = filterData(dataObj, type);
      setData(finalResult);
    } catch (error) {
      setError(`Error fetching data:${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleType = (typeParam: string): void => {
    setType(typeParam);
    setColumn(handleTypeChange(typeParam));
  };

  const handleSearch = (searchString: string) => {
    setSearch(searchString);

    // setTimeout(async () => {
    //   setLoading(true);
    //   try {
    //     const res = await fetch(
    //       `http://localhost:3000/api/search/${type}/${searchString}`,
    //       {
    //         method: "GET",
    //       }
    //     );
    //     // const dataObj = await res.json();
    //   } catch (error) {
    //   } finally {
    //     setLoading(false);
    //   }
    // }, 1000);
  };

  useEffect(() => {
    setError("");
    getData(type);
  }, [type, page]);

  if (error) {
    return <p className="text-red-500 text-center text-3xl m-8 ">{error}</p>;
  }

  return (
    <>
      <main className="min-h-screen">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Input
              type="text"
              className="text-lime-500 font-semibold font-sans bg-black shadow-xl shadow-slate-950 border-none outline-none"
              placeholder={`Search ${type}`}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <h1 className="text-center m-4">
              {" "}
              List Of All Star Wars {type.toUpperCase()}
            </h1>
            <section className="flex justify-between w-full ">
              {Object.values(attributes).map((each) => (
                <button
                  onClick={() => handleType(each)}
                  className={`${
                    type === each ? `bg-cyan-400` : `bg-gray-700`
                  }  rounded-xl p-4`}
                  key={each}
                >
                  {each}
                </button>
              ))}
            </section>
            <TableComp column={column} data={data} />

            <section className="flex justify-center mt-4 gap-4 mb-8">
              {previous && (
                <Button
                  onClick={() => setPage((prev) => prev - 1)}
                  variant="secondary"
                >
                  Prev
                </Button>
              )}
              {next && (
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  variant="secondary"
                >
                  Next
                </Button>
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default HomeComp;
