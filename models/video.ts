import mongoose from "mongoose";
const Schema = mongoose.Schema;

const video = new Schema({
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

const Video = mongoose.model("Video", video);

export default Video;
