import { NextResponse as res } from "next/server";
import config from "@/config/config";

export const GET = async (req: Request, type: any) => {
  try {
    const { params } = type;

    const resData = await fetch(
      `${config.starWarsUrl}${params.type}/${params.id}?format=json`
    );
    const data = await resData.json();

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
};
