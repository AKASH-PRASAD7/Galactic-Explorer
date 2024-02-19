"use client";
import React, { useEffect, useState } from "react";
import filterType from "@/utils/filtertType";

interface params {
  category: string;
  id: string;
}

const About = ({ category, id }: params): JSX.Element => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<any>({});

  const getData = async (cat: string, ind: string) => {
    try {
      const res = await fetch(
        `https://galactic-explorer.vercel.app/api/get/${cat}/${ind}`
      );
      const resData = await res.json();

      if (resData?.data?.detail === "Not found") {
        setError(`Following ${cat} details not found`);
      }

      const res1 = filterType(resData.data, cat);
      setData(res1);
    } catch (err) {
      setError("Error fetching: " + err);
    }
  };

  useEffect(() => {
    setError("");
    getData(category, id);
  }, [category, id]);
  return (
    <div>
      {error ? (
        <p className="m-8 text-center font-xl font-semibold text-red-500">
          {error}
        </p>
      ) : (
        <>
          <div className="max-w-md mx-auto  p-6 rounded-md ">
            <h2 className="text-2xl font-semibold mb-4">Character Details</h2>

            <div className="flex flex-col glass-table p-8 text-white">
              {Object.keys(data).map((item, index: number) => (
                <p key={index} className="text-lime-500">
                  <span className="font-semibold text-white">{item}:</span>{" "}
                  {data[item]}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default About;
