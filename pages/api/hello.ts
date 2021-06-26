// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../models";

console.log("hi", process.env.mongodb);
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { db } = await connectToDatabase();
  console.log("CONNECTED!");
  res.status(200).json({ name: "John Doe" });
}
