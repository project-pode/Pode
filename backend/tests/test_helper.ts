import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Lesson } from '../models/lesson';
import { Exercise } from '../models/exercise';
import mongoose from 'mongoose';

export const createTestLesson = async () => {
    const lesson = new Lesson({ title: 'Test Lesson', description: 'Test Description' });
    await lesson.save();
    const lessonId = lesson._id;

    return { lesson, lessonId };
};

export const createTestLessonWithExercise = async () => {
    const { lesson, lessonId } = await createTestLesson();
    const exercise = new Exercise({ 
        title: 'Test Exercise', 
        lesson: lessonId, 
        description: 'Test Description',
        type: 'simple',
        correctAnswer: 'correct',
     });
    await exercise.save();
    const exerciseId = exercise._id as mongoose.Types.ObjectId;

    lesson.exercises.push(exercise);
    await lesson.save();

    return { lessonId, exerciseId };
};

export const createTestUser = async () => {
    await User.deleteMany({});
    const password = 'password';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username: 'testuser', passwordHash });
    await user.save();
    const userId = user._id as mongoose.Types.ObjectId;

    const userForToken = {
        username: user.username,
        id: userId,
    };
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });
    return { userId, token };
};


export const cleanupDatabase = async () => {
    await User.deleteMany({});
    await Lesson.deleteMany({});
    await Exercise.deleteMany({});
    await mongoose.connection.close();
};