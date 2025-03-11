import demoData from './demoData.json';

/**
 * Fetches all lessons for a user from the demo data.
 * @returns {Array} - The list of lessons.
 */
const getLessons = async () => {
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
const getLesson = async (lessonId: string) => {

    const lesson = demoData.lessons.find(lesson => lesson.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    return lesson;
};

/**
 * Marks a specific lesson as completed for a user in the demo data.
 * @param {string} lessonId - The ID of the lesson.
 * @returns {Object} - The updated lesson object.
 * @throws {Error} - If the user or lesson is not found.
 */
const completeLesson = async (lessonId: string) => {

    const lesson = demoData.lessons.find(lesson => lesson.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    return lesson;
};

export default { getLessons, getLesson, completeLesson };