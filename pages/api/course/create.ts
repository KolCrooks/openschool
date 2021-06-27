// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "../../../models";
import Course from "../../../models/course";
import type { ICourse } from "../../../models/course";
import Problem from "../../../models/problem";
import Unit from "../../../models/unit";
import type { IUnit } from "../../../models/unit";
import Video from "../../../models/video";
import { getSession } from "next-auth/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).send("");
  const { name } = req.body;
  if (!name) return res.status(400).send("");
  // const session = await getSession({ req });
  // if (!session?.user?.isAdmin) return res.status(401).send("");

  const v = new Course({ name });
  const created = await v.save();

  res.status(200).send("");
}
