"use client";

import React, { useEffect, useState } from "react";
import filterType from "@/utils/filtertType";

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
    <div>
      <p>Category: {category}</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default page;
