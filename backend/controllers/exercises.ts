import express, { Request, Response } from 'express';
import { Exercise } from '../models/exercise';
import { Lesson } from '../models/lesson';

const router = express.Router();

/**
 * @route   GET /:lessonId/exercises
 * @desc    Get all exercises for a given lesson
 * @access  Public
 */
router.get('/:lessonId/exercises', async (request: Request, response: Response): Promise<void> => {
    try {
        // Find the lesson by its ID
        const lesson = await Lesson.findById(request.params.lessonId);
        
        // If the lesson is not found, return a 404 response
        if (!lesson) {
            response.status(404).json({ error: 'Lesson not found' });
            return;
        }

        // Find all exercises associated with the lesson
        const exercises = await Exercise.find({ lesson: lesson._id });

        // Return the exercises as JSON
        response.json(exercises);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route   GET /:lessonId/exercises/:exerciseId
 * @desc    Get a specific exercise by ID
 * @access  Public
 */
router.get('/:lessonId/exercises/:exerciseId', async (request: Request, response: Response): Promise<void> => {
    try {
        // Find the lesson by its ID
        const lesson = await Lesson.findById(request.params.lessonId);
        
        // If the lesson is not found, return a 404 response
        if (!lesson) {
            response.status(404).json({ error: 'Lesson not found' });
            return;
        }

        // Find the specific exercise within the lesson
        const exercise = await Exercise.findOne({ _id: request.params.exerciseId, lesson: lesson._id });

        // If the exercise is not found, return a 404 response
        if (!exercise) {
            response.status(404).json({ error: 'Exercise not found' });
            return;
        }

        // Return the exercise as JSON
        response.json(exercise);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route   PUT /:lessonId/exercises/:exerciseId/complete
 * @desc    Mark an exercise as completed
 * @access  Private (User must be authenticated)
 */
router.put('/:lessonId/exercises/:exerciseId/complete', async (request: Request, response: Response): Promise<void> => {
    try {
        const user = request.user; // Retrieve the authenticated user from the request

        // Find the lesson and populate its exercises
        const lesson = await Lesson.findById(request.params.lessonId).populate('exercises');
        
        // If the lesson does not exist, return a 404 response
        if (!lesson) {
            response.status(404).json({ error: 'Lesson not found' });
            return;
        }

        // Find the specific exercise within the lesson
        const exercise = lesson.exercises.find(ex => ex.id.toString() === request.params.exerciseId);
        
        // If the exercise does not exist, return a 404 response
        if (!exercise) {
            response.status(404).json({ error: 'Exercise not found' });
            return;
        }

        // If the exercise is not already marked as completed by the user, add it
        if (!user.completedExercises.includes(exercise.id)) {
            user.completedExercises.push(exercise.id);
            await user.save(); // Save the updated user data
        }

        // Return a success response
        response.status(200).json({ message: 'Exercise marked as completed', user });
    } catch (error) {
        // Handle unexpected errors
        response.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
