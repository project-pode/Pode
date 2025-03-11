import express, { Response, Request } from 'express';
import { Lesson } from '../models/lesson';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * @route   GET /
 * @desc    Get all lessons
 * @access  Public
 */
router.get('/', async (_request: Request, response: Response): Promise<void> => {
    try {
        // Fetch all lessons from the database
        const lessons = await Lesson.find({});

        // Return the lessons as JSON
        response.json(lessons);
    } catch (error) {
        // Log the error and return a 500 response
        console.error('Error fetching lessons:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route   GET /:lessonId
 * @desc    Get a specific lesson by ID
 * @access  Public
 */
router.get('/:lessonId', async (request: Request, response: Response): Promise<void> => {
    try {
        // Find the lesson by ID and populate its exercises
        const lesson = await Lesson.findById(request.params.lessonId).populate('exercises');

        // If the lesson exists, return it; otherwise, return 404
        if (lesson) {
            response.json(lesson);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route   PUT /:lessonId/complete
 * @desc    Mark a lesson as completed if all exercises are done
 * @access  Private (User must be authenticated)
 */
router.put('/:lessonId/complete', async (request: Request, response: Response): Promise<void> => {
    try {
        const user = request.user; // Get the authenticated user

        // Find the lesson and populate exercises
        const lesson = await Lesson.findById(request.params.lessonId).populate('exercises');

        // If the lesson does not exist, return a 404 response
        if (!lesson) {
            response.status(404).json({ error: 'Lesson not found' });
            return;
        }

        // Get the list of completed exercises for the user
        const completedExerciseIds = user.completedExercises.map(ex => ex.toString());

        // Check if all exercises in the lesson are completed by the user
        const allExercisesCompleted = lesson.exercises.every(exercise => completedExerciseIds.includes(exercise.id.toString()));

        // If not all exercises are completed, return a 400 response
        if (!allExercisesCompleted) {
            response.status(400).json({ error: 'Not all exercises are completed' });
            return;
        }

        // Convert lessonId to ObjectId for consistency
        const lessonId = new mongoose.Types.ObjectId(request.params.lessonId);

        // If the lesson is not already marked as completed, add it to the user's list
        if (!user.completedLessons.includes(lessonId)) {
            user.completedLessons.push(lessonId);

            // Save the updated user data
            await user.save();
        }

        // Return success response
        response.status(200).json({ message: 'Lesson marked as completed', user });
    } catch (error) {
        // Handle internal server errors
        response.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
