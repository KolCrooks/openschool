import mongoose from "mongoose";
const Schema = mongoose.Schema;

const course = new Schema({
  name: {
    type: String,
    required: true,
  },
  topics: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
});

const Course = mongoose.model("Course", course);

export default Course;
