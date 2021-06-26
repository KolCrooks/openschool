// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "../../models";
import Course from "../../models/course";
import Unit from "../../models/unit";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const courses = await Course.find();
  const o = await Promise.all(
    courses.map(async (c) => ({
      name: c.name,
      units: await Promise.all(c.units.map((t) => Unit.findById(t))),
    }))
  );
  console.log(courses, o);
  res.status(200).json(o);
}
