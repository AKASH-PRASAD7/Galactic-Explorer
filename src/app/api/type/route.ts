import { NextApiRequest, NextApiResponse } from "next";
import config from "@/config/config";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body);
    const { type } = body;

    let resData = await fetch(`${config.starWarsUrl}${type}/format=json`);
    const data = await resData.json();
    console.log(data);
    return new Response("hi", {
      status: 200,
    });
  } catch (error) {
    return new Response("hi", {
      status: 500,
    });
  }
};
