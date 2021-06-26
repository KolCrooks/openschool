import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export interface IProblem {
  _id: string;
  authorId: string;
  content: string;
  solution: string;
  unitId: string;
  score: number;
  created: Date;
}
const problem = new Schema<IProblem>({
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
  },
  solution: {
    type: String,
    required: true,
  },
  score: { type: Number, default: 0 },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Problem: mongoose.Model<IProblem, {}, {}> = mongoose.models.Problem
  ? mongoose.models.Problem
  : mongoose.model<IProblem>("Problem", problem);

export default Problem;
