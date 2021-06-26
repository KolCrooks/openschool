// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "../../../models";
import Course from "../../../models/course";
import type { ICourse } from "../../../models/course";
import Problem from "../../../models/problem";
import Unit from "../../../models/unit";
import type { IUnit } from "../../../models/unit";
import Video from "../../../models/video";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const units = await Unit.find();

  const o = await Promise.all(
    units.map(async (u) => ({
      _id: u.id,
      name: u.name,
      course: await Course.findById(u.course),
      videos: u.videos,
      problems: u.problems,
    }))
  );
  res.status(200).json(o);
}
