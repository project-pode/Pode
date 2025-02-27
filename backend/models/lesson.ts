import { IExercise } from "./exercise";

import mongoose from 'mongoose';

export interface ILesson extends Document {
  title: string;
  description: string;
  exercises: IExercise[];
}
const lessonSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true,
  },
  description: String,
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ]
});

lessonSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema);