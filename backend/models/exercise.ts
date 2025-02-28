import mongoose, { Document } from 'mongoose';

export interface IExercise extends Document {
  title: string;
  description?: string;
  correctAnswer: string | string[];
  lesson: mongoose.Types.ObjectId;
  type: string;
  options: string[];
  question?: string | string[];  //not needed for all types of exercises
}
const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed, //can be any type, since we have different exercises
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  options: [String],
  question: mongoose.Schema.Types.Mixed, //should be any type, since blanks questions are formed as arrays
});

exerciseSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Exercise = mongoose.model('Exercise', exerciseSchema);