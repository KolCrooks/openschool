// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import "../../models";
import Problem from "../../models/problem";
import Unit from "../../models/unit";

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

  const { content, solution, unitId } = req.body;
  if (!content || !solution || !unitId) return res.status(400).send("");
  const session = await getSession({ req });
  if (!session?.user) return res.status(401).send("");

  const v = new Problem({
    content,
    solution,
    authorId: session.user._id,
    unitId,
  });
  const p = await v.save();

  await Unit.findByIdAndUpdate(unitId, { $push: { problems: p._id } });

  res.status(200).send("");
}
