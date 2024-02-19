"use client";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
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
  const [searchMessage, setSearchMessage] = useState<boolean>(false);

  const getData = async (type: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://galactic-explorer.vercel.app/api/${type}/${page}`,
        {
          method: "GET",
        }
      );
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

  const debouncedSearch = useCallback(
    debounce(async (query: string, typeSearch: string) => {
      setSearchMessage(false);

      try {
        const res = await fetch(
          `https://galactic-explorer.vercel.app/api/search/${typeSearch}/${query}`,
          {
            method: "GET",
          }
        );
        const dataObj = await res.json();

        const finalResult: People[] = filterData(dataObj, typeSearch);

        setData(finalResult);
      } catch (error) {
      } finally {
        setLoading(false);
      }

      console.log(`Performing search for: ${query}`);

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 1000),
    []
  );

  const handleSearch = (inputValue: string) => {
    setSearch(inputValue);

    debouncedSearch.cancel();

    if (inputValue === "") {
      setSearchMessage(false);
      getData(type);
    } else {
      debouncedSearch(inputValue, type);
    }
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
        <Input
          type="text"
          className="text-lime-500 font-semibold font-sans bg-black shadow-xl shadow-slate-950 border-none outline-none"
          placeholder={`Search ${type}`}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <h1 className="text-center m-4 tex-3xl font-semibold drop-shadow-2xl">
          {" "}
          List Of All Star Wars {type.toUpperCase()}
        </h1>
        <section className="flex justify-between w-full ">
          {Object.values(attributes).map((each) => (
            <Button
              variant="secondary"
              onClick={() => handleType(each)}
              className={`${
                type === each
                  ? `bg-cyan-400 hover:bg-gray-700`
                  : `bg-gray-700 hover:bg-cyan-500`
              }  rounded-full text-white font-semibold p-4 `}
              key={each}
            >
              {each}
            </Button>
          ))}
        </section>
        {loading ? (
          <Loader />
        ) : (
          <>
            <TableComp column={column} data={data} category={type} />

            <section className="flex justify-center mt-4 gap-4 mb-8">
              {previous && (
                <Button
                  onClick={() => setPage((prev) => prev - 1)}
                  variant="secondary"
                  className="bg-black hover:bg-lime-500 text-white rounded-2xl"
                >
                  Prev
                </Button>
              )}
              {next && (
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  variant="secondary"
                  className="bg-black hover:bg-lime-500 text-white rounded-2xl"
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
