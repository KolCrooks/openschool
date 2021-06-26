import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  display_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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

const User = mongoose.model("User", user);

export default User;
