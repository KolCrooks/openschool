// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "../../../models";
import Course, { ICourse } from "../../../models/course";
import Unit from "../../../models/unit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.name) return res.status(400).send("");

  const course = await Course.findOne().where({
    name: { $regex: new RegExp(req.query.name as string, "i") },
  });
  if (!course) return res.status(404).send("");

  const o = {
    _id: course?.id,
    name: course.name,
    units: await Promise.all(course.units.map((p) => Unit.findById(p))),
  };

  res.status(200).json(o);
}
