// Importing ImageSourcePropType from react-native to type the avatar's image source
import { ImageSourcePropType } from "react-native";

// User interface represents a user in the application
export interface User {
    id: any; // The unique identifier for the user, could be a string or number
    username: string; // Username chosen by the user
    password: string; // User's password (ideally, should not be stored in plain text)
    completedLessons: Lesson[]; // List of lessons the user has completed
    completedExercises: Exercise[]; // List of exercises the user has completed
    avatar: string; // Avatar URL or path (for the user's profile picture)
    token?: string; // Optional authentication token (JWT or similar)
}

// Lesson interface represents a lesson in the application
export interface Lesson {
    title: string; // The title of the lesson
    description: string; // A brief description of the lesson
    exercises: Exercise[]; // List of exercises included in the lesson
    id: any; // The unique identifier for the lesson
}

// Avatar interface represents an avatar with a name and image source
export interface Avatar {
    name: string; // The name of the avatar (used for identification or display)
    source: ImageSourcePropType; // The source of the image (can be a local file or URL)
}

// LoginCredentials interface holds the necessary credentials for user login
export interface LoginCredentials {
    username: string; // The username entered by the user
    password: string; // The password entered by the user
}

// BaseExercise is a base interface that all specific exercise types will extend
export interface BaseExercise {
    id: string; // The unique identifier for the exercise
    title: string; // The title of the exercise
    description?: string; // An optional description of the exercise
    lesson: string; // The ID of the lesson to which this exercise belongs
    options: string[]; // A list of possible options/answers for the exercise
    type: 'simple' | 'box' | 'blanks'; // The type of exercise (simple dropdown, box, or blanks)
}

// DropdownExercise extends BaseExercise for exercises with dropdown options
interface DropdownExercise extends BaseExercise {
    type: "simple"; // This is a simple dropdown exercise
    question: string; // The question text for the dropdown exercise
    correctAnswer: string; // The correct answer for the dropdown exercise
}

// BoxExercise extends BaseExercise for exercises where the user selects multiple answers in boxes
interface BoxExercise extends BaseExercise {
    type: "box"; // This is a box-type exercise
    correctAnswer: string[]; // The correct answers in an array
}

// BlanksExercise extends BaseExercise for exercises that use blank spaces for answers
interface BlanksExercise extends BaseExercise {
    type: "blanks"; // This is a blanks-type exercise
    question: string[]; // A list of strings with blanks that need to be filled in
    correctAnswer: string[]; // The correct answers for the blanks
}

// Exercise type can be one of the specific exercise types: Dropdown, Box, or Blanks
export type Exercise = DropdownExercise | BoxExercise | BlanksExercise;
