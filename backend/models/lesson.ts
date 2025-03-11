import { IExercise } from "./exercise";
import mongoose, { Document } from 'mongoose';

/**
 * @interface ILesson
 * @description Represents a lesson that contains multiple exercises.
 */
export interface ILesson extends Document {
  title: string;
  description: string;
  exercises: IExercise[]; // Array of related exercises
}

/**
 * @schema lessonSchema
 * @description Defines the structure of a lesson document in MongoDB.
 */
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Lesson must have a title
  },
  description: {
    type: String, // Optional field for lesson description
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise', // References Exercise documents
    }
  ],
});

/**
 * @description Transforms the Mongoose document to JSON format.
 * Removes `_id` and `__v` fields and converts `_id` to `id`.
 */
lessonSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

/**
 * @constant Lesson
 * @description Mongoose model for the Lesson schema.
 */
export const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema);