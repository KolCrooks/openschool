import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface IUser {
  display_name: string;
  email: string;
  posts: string[];
  since: Date;
}
const user = new Schema<IUser>({
  display_name: {
    type: String,
    required: true,
    unique: true,
  },
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
  since: {
    type: Date,
    default: Date.now,
  },
});

const User: mongoose.Model<IUser, {}, {}> = mongoose.models.User
  ? mongoose.models.User
  : mongoose.model<IUser>("User", user);

export default User;
