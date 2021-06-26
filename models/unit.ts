import mongoose, { Document } from "mongoose";
import { ICourse } from "./course";
import { IProblem } from "./problem";
import { IVideo } from "./video";
const Schema = mongoose.Schema;

export interface IUnit {
  name: string;
  course: string;
  videos: string[];
  problems: string[];
}

export interface FullUnit {
  name: string;
  course: ICourse;
  videos: IVideo[];
  problems: IProblem[];
}

const unit = new Schema<IUnit>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
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

const Unit: mongoose.Model<IUnit, {}, {}> = mongoose.models.Unit
  ? mongoose.models.Unit
  : mongoose.model<IUnit>("Unit", unit);

export default Unit;
