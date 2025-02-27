import express from 'express';

import { Lesson } from '../models/lesson';
const router = express.Router();

// get the users uncompleted lessons
router.get('/:userId/lessons', async (_request, response) => {
    try {
        const lessons = await Lesson.find({});
        response.json(lessons); // all lessons
    } catch (error) {
        console.error('Error fetching lessons:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:userId/lessons/:lessonId', async (request, response) => {
    //const user = await User.findById(request.params.id)
    const lesson = await Lesson.findById(request.params.lessonId).populate('exercises');

    //const isLessonCompleted = user.completedLessons.includes(request.params.lessonId)
    if (lesson) {
        response.json(lesson);
    } else {
        response.status(404).end();
    }
});

// PUT /api/users/:userId/lessons/:lessonId/complete
router.put('/:userId/lessons/:lessonId/complete', async (request, response) => {

    try {
        const user = request.user;

        // Find the lesson
        const lesson = await Lesson.findById(request.params.lessonId).populate('exercises');
        if (!lesson) return response.status(404).json({ error: 'Lesson not found' });

         // Check if all exercises are completed
        const completedExerciseIds = user.completedExercises.map(ex => ex.toString());
        const allExercisesCompleted = lesson.exercises.every(exercise => completedExerciseIds.includes(exercise.id.toString()));

        if (!allExercisesCompleted) {
            return response.status(400).json({ error: 'Not all exercises are completed' });
        }

        // Mark the lesson as completed if not already
        if (!user.completedLessons.includes(request.params.lessonId)) {
            user.completedLessons.push(request.params.lessonId);
            // Save the updated user
            await user.save();
        }

        return response.status(200).json({ message: 'Lesson marked as completed', user });
    } catch (error) {
        return response.status(500).json({ error: 'Internal server error' });
    }
});

export default router;