import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export interface ICourse {
  name: string;
  units: string[];
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
