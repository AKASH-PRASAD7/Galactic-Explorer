import { NextResponse as res } from "next/server";
import config from "@/config/config";

export const GET = async (req: Request, type: any) => {
  try {
    const { params } = type;
    console.log(params);
    // const resData = await fetch(
    //   `${config.starWarsUrl}${params.type}/?page=${params.page}&format=json`
    // );
    // const data = await resData.json();
    return res.json({
      success: true,
      //   data,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
};
