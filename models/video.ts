import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IVideo {
  authorId: string;
  content: string;
  score: number;
  unitId: string;
  created: Date;
}

const video = new Schema<IVideo>({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  unitId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
    unique: true,
  },
  score: { type: Number, default: 0 },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Video: mongoose.Model<IVideo, {}, {}> = mongoose.models.Video
  ? mongoose.models.Video
  : mongoose.model<IVideo>("Video", video);

export default Video;
