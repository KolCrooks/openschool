// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "../../models";
import Problem from "../../models/problem";

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

  const { content, solution, token, unitId } = req.body;
  if (!content || !solution || !token || !unitId)
    return res.status(400).send("");

  const v = new Problem({ content, solution, authorId: "", unitId });
  await v.save();

  res.status(200).send("");
}
