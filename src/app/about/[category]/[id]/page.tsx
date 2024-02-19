"use client";
import Image from "next/image";
import star from "@/assests/starwars.jpg";
import React, { useEffect, useState } from "react";
import filterType from "@/utils/filtertType";
import Link from "next/link";
const page = ({ params }: any): JSX.Element => {
  const { category, id } = params;
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<object>({});

  const getData = async (cat: string, ind: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/get/${cat}/${ind}`);
      const resData = await res.json();
      console.log(resData);
      if (resData?.data.detail === "Not found") {
        setError(`Following ${cat} details not found`);
      }
      const res1 = filterType(resData.data, cat);
      console.log(res1);
    } catch (err) {
      setError("Error fetching: " + err);
    }
  };

  useEffect(() => {
    setError("");
    getData(category, id);
  }, [category, id]);

  if (error) {
    return (
      <p className="m-8 text-center font-xl font-semibold text-red-500">
        {error}
      </p>
    );
  }
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
        <p>Category: {category}</p>
        <p>ID: {id}</p>
      </section>
    </main>
  );
};

export default page;
