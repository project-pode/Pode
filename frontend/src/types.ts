import { ImageSourcePropType } from "react-native";

export interface User {
    id: any
    username: string
    password: string
    completedLessons: Lesson[] //not sure if this or string (id)
    completedExercises: Exercise[]
    avatar: string
    token?: string
}
export interface Lesson{
    title: string;
    description: string;
    exercises: Exercise[];
    id: any
}

export interface Avatar {
    name: string,
    source: ImageSourcePropType
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface BaseExercise {
    id: string;
    title: string;
    description?: string;
    lesson: string;
    options: string[];
    type: 'simple' | 'box' | 'blanks';
}

interface DropdownExercise extends BaseExercise {
    type: "simple";
    question: string;
    correctAnswer: string;
}

interface BoxExercise extends BaseExercise {
    type: "box";
    correctAnswer: string[];
}

interface BlanksExercise extends BaseExercise {
    type: "blanks";
    question: string[];
    correctAnswer: string[];
}

export type Exercise = DropdownExercise | BoxExercise | BlanksExercise;