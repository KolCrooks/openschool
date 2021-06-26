import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface IVideo {
  authorId: string;
  content: string;
  score: number;
  created: Date;
}

const video = new Schema<IVideo>({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  score: { type: Number },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model<IVideo>("Video", video);

export default Video;
