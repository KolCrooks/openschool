import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface IProblem {
  authorId: string;
  content: string;
  solution: string;
  score: number;
  created: Date;
}
const problem = new Schema<IProblem>({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  score: { type: Number },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Problem = mongoose.model<IProblem>("Problem", problem);

export default Problem;
