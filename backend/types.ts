// Importing mongoose to use its Types functionality (e.g., ObjectId)
import mongoose from "mongoose";

/**
 * BaseExercise interface defines the common properties for all exercise types.
 * It is extended by the specific exercise types like Dropdown, Box, and Blanks.
 */
export interface BaseExercise {
  /**
   * The title of the exercise (e.g., "Math Question 1").
   */
  title: string;
  
  /**
   * An optional description of the exercise.
   * Can be used to provide additional context or instructions for the exercise.
   */
  description?: string;
  
  /**
   * The lesson associated with this exercise.
   * It's stored as an ObjectId, which links to the 'Lesson' collection in the database.
   */
  lesson: mongoose.Types.ObjectId;

  /**
   * A list of options that may be used in the exercise, such as multiple-choice options.
   */
  options: string[];

  /**
   * The type of exercise.
   * Can be 'simple', 'box', or 'blanks'. This helps define the structure of the exercise.
   */
  type: 'simple' | 'box' | 'blanks';
}

/**
 * DropdownExercise extends BaseExercise and represents an exercise with a single question
 * and a correct answer. This is used when the exercise type is 'simple'.
 */
interface DropdownExercise extends BaseExercise {
  /**
   * The question for the dropdown exercise.
   * A single string containing the question.
   */
  question: string;

  /**
   * The correct answer for the dropdown exercise.
   * A single string representing the correct answer.
   */
  correctAnswer: string;
}

/**
 * BoxExercise extends BaseExercise and represents an exercise with multiple correct answers,
 * typically used when the exercise type is 'box'.
 */
interface BoxExercise extends BaseExercise {
  /**
   * The correct answers for the box exercise.
   * This is an array of strings, where each string represents one correct answer.
   */
  correctAnswer: string[];
}

/**
 * BlanksExercise extends BaseExercise and represents an exercise with fill-in-the-blank questions,
 * used when the exercise type is 'blanks'.
 */
interface BlanksExercise extends BaseExercise {
  /**
   * The question for the blanks exercise.
   * This is an array of strings, where each string represents a part of the question with blanks.
   */
  question: string[];

  /**
   * The correct answers for the blanks exercise.
   * This is an array of strings, where each string represents a correct answer for the corresponding blank.
   */
  correctAnswer: string[];
}

/**
 * Exercise type is a union type of the specific exercise interfaces (Dropdown, Box, Blanks).
 * This allows an exercise to be one of these three types, each having its own specific structure.
 */
export type Exercise = DropdownExercise | BoxExercise | BlanksExercise;