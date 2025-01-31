import demoData from '../demo/demoData.json';

const getLessons = async (userId) => {
    const user = demoData.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found');

    const lessons = demoData.lessons;
    return lessons;
};

const getLesson = async (userId, lessonId) => {
    const user = demoData.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found');

    const lesson = demoData.lessons.find(lesson => lesson.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    return lesson;
};

const completeLesson = async (userId, lessonId) => {
    const user = demoData.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found');

    const lesson = demoData.lessons.find(lesson => lesson.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    if (!user.completedLessons.includes(lessonId)) {
        user.completedLessons.push(lessonId);
    }

    return lesson;
};

export default { getLessons, getLesson, completeLesson };