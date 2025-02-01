import demoData from '../demo/demoData.json';

const getOne = async (userId, lessonId, exerciseId) => {
    const user = demoData.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found');

    const lesson = demoData.lessons.find(lesson => lesson.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    const exercise = lesson.exercises.find(exercise => exercise.id === exerciseId);
    if (!exercise) throw new Error('Exercise not found');

    return exercise;
};

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