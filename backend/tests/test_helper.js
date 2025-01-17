const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Lesson = require('../models/lesson');
const Exercise = require('../models/exercise');
const mongoose = require('mongoose');

const createTestLesson = async () => {
    const lesson = new Lesson({ title: 'Test Lesson' });
    await lesson.save();
    const lessonId = lesson._id;

    return { lesson, lessonId };
};

const createTestLessonWithExercise = async () => {
    const { lesson, lessonId } = await createTestLesson();
    const exercise = new Exercise({ title: 'Test Exercise', lesson: lessonId });
    await exercise.save();
    const exerciseId = exercise._id;

    lesson.exercises.push(exercise);
    await lesson.save();

    return { lessonId, exerciseId };
};

const createTestUser = async () => {
    await User.deleteMany({});
    const password = 'password';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username: 'testuser', passwordHash });
    await user.save();
    const userId = user._id;

    const userForToken = {
        username: user.username,
        id: userId,
    };
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });
    return { userId, token };
};


const cleanupDatabase = async () => {
    await User.deleteMany({});
    await Lesson.deleteMany({});
    await Exercise.deleteMany({});
    await mongoose.connection.close();
};

module.exports = {
    createTestLesson,
    createTestLessonWithExercise,
    createTestUser,
    cleanupDatabase,
};