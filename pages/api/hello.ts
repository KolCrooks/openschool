// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "../../models";
import Course from "../../models/course";

console.log("hi", process.env.mongodb);
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const a = new Course({ name: "Algebra" });
  await a.save();
  console.log("CONNECTED!");

  res.status(200).json({ name: "John Doe" });
}
