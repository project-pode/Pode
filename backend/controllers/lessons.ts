import express, { Response, Request } from 'express';

import { Lesson } from '../models/lesson';
import mongoose from 'mongoose';
const router = express.Router();

// get the users uncompleted lessons
router.get('/', async (_request: Request, response: Response): Promise<void> => {
    try {
        const lessons = await Lesson.find({});
        response.json(lessons); // all lessons
    } catch (error) {
        console.error('Error fetching lessons:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:lessonId', async (request: Request, response: Response): Promise<void> => {
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
router.put('/:lessonId/complete', async (request: Request, response: Response): Promise<void> => {

    try {
        const user = request.user;

        // Find the lesson
        const lesson = await Lesson.findById(request.params.lessonId).populate('exercises');
        if (!lesson) {
            response.status(404).json({ error: 'Lesson not found' });
            return;
        }
         // Check if all exercises are completed
        const completedExerciseIds = user.completedExercises.map(ex => ex.toString());
        const allExercisesCompleted = lesson.exercises.every(exercise => completedExerciseIds.includes(exercise.id.toString()));

        if (!allExercisesCompleted) {
            response.status(400).json({ error: 'Not all exercises are completed' });
        }

        // Mark the lesson as completed if not already
        const lessonId = new mongoose.Types.ObjectId(request.params.lessonId);
        if (!user.completedLessons.includes(lessonId)) {
            user.completedLessons.push(lessonId);
            // Save the updated user
            await user.save();
        }

        response.status(200).json({ message: 'Lesson marked as completed', user });
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});

export default router;