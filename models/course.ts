import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface ICourse {
  name: string;
  topics: string;
}

const course = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  topics: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
});

const Course = mongoose.model<ICourse>("Course", course);

export default Course;
