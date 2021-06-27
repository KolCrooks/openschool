import mongoose, { Document } from "mongoose";
import { IUnit } from "./unit";
const Schema = mongoose.Schema;

export interface ICourse {
  _id: string;
  name: string;
  units: string[];
}

export interface FullCourse {
  _id: string;
  name: string;
  units: IUnit[];
}

const course = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  units: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
});

const Course: mongoose.Model<ICourse, {}, {}> = mongoose.models.Course
  ? mongoose.models.Course
  : mongoose.model<ICourse>("Course", course);
export default Course;
