import mongoose, { Document } from "mongoose";
import { IUnit } from "./unit";
const Schema = mongoose.Schema;

export interface ICourse {
  name: string;
  units: string[];
}

export interface FullCourse {
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
      unique: true,
    },
  ],
});

const Course: mongoose.Model<ICourse, {}, {}> = mongoose.models.Course
  ? mongoose.models.Course
  : mongoose.model<ICourse>("Course", course);

export default Course;
