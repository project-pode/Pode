import demoData from '../demo/demoData.json';

/**
 * Fetches all lessons for a user from the demo data.
 * @param {string} userId - The ID of the user.
 * @returns {Array} - The list of lessons.
 * @throws {Error} - If the user is not found.
 */
const getLessons = async (userId) => {
    const user = demoData.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found');

    const lessons = demoData.lessons;
    return lessons;
};

/**
 * Fetches a specific lesson for a user from the demo data.
 * @param {string} userId - The ID of the user.
 * @param {string} lessonId - The ID of the lesson.
 * @returns {Object} - The lesson object.
 * @throws {Error} - If the user or lesson is not found.
 */
const getLesson = async (userId, lessonId) => {
    const user = demoData.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found');

    const lesson = demoData.lessons.find(lesson => lesson.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    return lesson;
};

/**
 * Marks a specific lesson as completed for a user in the demo data.
 * @param {string} userId - The ID of the user.
 * @param {string} lessonId - The ID of the lesson.
 * @returns {Object} - The updated lesson object.
 * @throws {Error} - If the user or lesson is not found.
 */
const completeLesson = async (userId, lessonId) => {
    const user = demoData.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found');

    const lesson = demoData.lessons.find(lesson => lesson.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    lesson.completed = true;
    return lesson;
};

export default { getLessons, getLesson, completeLesson };