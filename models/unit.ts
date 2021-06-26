import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface IUnit {
  name: string;
  category: string;
  videos: string[];
  problems: string[];
}

const unit = new Schema<IUnit>({
  name: {
    type: String,
    required: true,
    unique: true,
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

const Unit = mongoose.model<IUnit>("Unit", unit);

export default Unit;
