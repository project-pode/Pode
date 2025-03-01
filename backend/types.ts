import mongoose from "mongoose";

export interface BaseExercise {
    title: string;
    description?: string;
    lesson: mongoose.Types.ObjectId;
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