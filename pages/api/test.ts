// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "../../models";
import Course from "../../models/course";
import Unit from "../../models/unit";
import Video from "../../models/video";

function matchYoutubeUrl(url: string) {
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)?.[1];
  }
  return false;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).send("");

  const { unit } = req.body;
  if (!unit) return res.status(400).send("");
  console.log(unit);
  const v = await Unit.create({
    course: "60d7278498520e2ba9eca8a0",
    name: unit,
  });
  await v.save();

  res.status(200).send("");
}
