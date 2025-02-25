import demoData from '../demo/demoData.json';

/**
 * Fetches a specific exercise for a user from the demo data.
 * @param {string} userId - The ID of the user.
 * @param {string} lessonId - The ID of the lesson.
 * @param {string} exerciseId - The ID of the exercise.
 * @returns {Object} - The exercise object.
 * @throws {Error} - If the user, lesson, or exercise is not found.
 */
const getOne = async (userId, lessonId, exerciseId) => {
    const user = demoData.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found');

    const lesson = demoData.lessons.find(lesson => lesson.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    const exercise = lesson.exercises.find(exercise => exercise.id === exerciseId);
    if (!exercise) throw new Error('Exercise not found');

    return exercise;
};

/**
 * Marks a specific exercise as completed for a user in the demo data.
 * @param {string} userId - The ID of the user.
 * @param {string} lessonId - The ID of the lesson.
 * @param {string} exerciseId - The ID of the exercise.
 * @returns {Object} - The updated exercise object.
 * @throws {Error} - If the user, lesson, or exercise is not found.
 */
const completeExercise = async (userId, lessonId, exerciseId) => {
    const user = demoData.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found');

    const lesson = demoData.lessons.find(lesson => lesson.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    const exercise = lesson.exercises.find(exercise => exercise.id === exerciseId);
    if (!exercise) throw new Error('Exercise not found');

    exercise.completed = true;
    return exercise;
};

export default { getOne, completeExercise };