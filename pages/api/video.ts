// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "../../models";
import Course from "../../models/course";
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

  const { url, unitId } = req.body;
  if (!url || !matchYoutubeUrl(url) || !unitId) return res.status(400).send("");

  const v = new Video({ content: url, authorId: "", unitId });
  await v.save();

  res.status(200).send("");
}
