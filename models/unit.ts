import mongoose from "mongoose";
const Schema = mongoose.Schema;

const unit = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  videos: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
  problems: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
});

const Unit = mongoose.model("Unit", unit);

export default Unit;
