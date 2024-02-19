"use client";
import Image from "next/image";
import star from "@/assests/starwars.jpg";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import filterType from "@/utils/filtertType";

const page = ({ params }: any): JSX.Element => {
  const { category, id } = params;
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<any>({});

  const getData = async (cat: string, ind: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/get/${cat}/${ind}`);
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
    <main className="relative min-h-screen">
      <Image
        src={star}
        className="w-full h-full object-cover fixed inset-0 z-0"
        alt="starwars"
      />
      <section className="relative z-10 text-white">
        <Link href="/">
          <h1 className="text-4xl text-center m-8 font-semibold font-mono">
            Galactic Explorer
          </h1>
        </Link>
        <div>
          {error ? (
            <p className="m-8 text-center font-xl font-semibold text-red-500">
              {error}
            </p>
          ) : (
            <>
              <div className="max-w-md mx-auto  p-6 rounded-md ">
                <h2 className="text-2xl font-semibold mb-4">
                  Character Details
                </h2>

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
      </section>
    </main>
  );
};

export default page;
