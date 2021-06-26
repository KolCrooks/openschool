import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const problem = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  content: {
      type: String,
      required: true
  },
  solution: {
    type: String,
    required: true
  },
  score: {type: Number},
  created: {
    type: Date,
    default: Date.now
  }
});


const Problem = mongoose.model('Problem', problem);

export default Problem;