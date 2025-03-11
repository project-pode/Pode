import mongoose, { Document } from 'mongoose';
import { BaseExercise } from '../types';

/**
 * @interface IExercise
 * @description Represents an exercise entity with various types and structures.
 */
export interface IExercise extends BaseExercise, Document {
  correctAnswer: string | string[];
  question?: string | string[];
}

/**
 * @schema exerciseSchema
 * @description Defines the structure of an exercise document in MongoDB.
 */
const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Exercise must have a title
  },
  description: {
    type: String,
    default: '', // Default value for description if not provided
  },
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed, // Can be string or array, depending on exercise type
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson', // References the associated lesson
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['simple', 'box', 'blanks'], // Restricts allowed values
  },
  options: [String], // Possible answers for multiple-choice exercises
  question: mongoose.Schema.Types.Mixed, // Can be a string or array (e.g., for blanks)
});

/**
 * @description Transforms the Mongoose document to JSON format.
 * Removes `_id` and `__v` fields and converts `_id` to `id`.
 */
exerciseSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

/**
 * @constant Exercise
 * @description Mongoose model for the Exercise schema.
 */
export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);