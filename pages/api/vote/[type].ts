import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Unit from "../../models/unit";
import Video from "../../models/video";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).send("");

  const { url, unitId } = req.body;
  if (!url || !unitId) return res.status(400).send("");
  const session = await getSession({ req });
  if (!session?.user) return res.status(401).send("");
  console.log("AAA");
  const v = new Video({ content: url, authorId: session.user._id, unitId });
  const p = await v.save();
  console.log("bbbb");
  await Unit.findByIdAndUpdate(unitId, { $push: { videos: p._id } });

  res.status(200).send("");
}
