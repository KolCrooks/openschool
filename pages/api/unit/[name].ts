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
  if (!req.query.name) return res.status(400).send("");

  const unit = await Unit.findOne().where({
    name: { $regex: new RegExp(req.query.name as string, "i") },
  });
  if (!unit) return res.status(404).send("");

  const o = {
    _id: unit?.id,
    name: unit.name,
    course: await Course.findById(unit.course),
    videos: await Promise.all(unit.videos.map((v) => Video.findById(v))),
    problems: await Promise.all(unit.problems.map((p) => Problem.findById(p))),
  };
  console.log(unit);
  res.status(200).json(o);
}
