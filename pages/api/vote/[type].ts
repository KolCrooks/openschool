import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Problem from "../../../models/problem";
import Video from "../../../models/video";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).send("");

  const { type } = req.query;
  const { vote, id } = req.body;
  if (!type || !vote || !id) return res.status(400).send("");

  if (type === "problem")
    await Problem.findByIdAndUpdate(id, { $inc: { score: vote } });
  else if (type === "video")
    await Video.findByIdAndUpdate(id, { $inc: { score: vote } });

  res.status(200).send("");
}
