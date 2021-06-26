import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUser {
  _id: string;
  display_name: string;
  email: string;
  posts: string[];
  isAdmin: boolean;
  since: Date;
}
const user = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  since: {
    type: Date,
    default: Date.now,
  },
});

const User: mongoose.Model<IUser, {}, {}> = mongoose.models.User
  ? mongoose.models.User
  : mongoose.model<IUser>("User", user);

export default User;
