import express, { Request, Response } from 'express';
import { Exercise } from '../models/exercise';
import { Lesson } from '../models/lesson';
const router = express.Router();

// Get all exercises
router.get('/:userId/lessons/:lessonId/exercises', async (request: Request, response: Response): Promise<void> => {
    const lesson = await Lesson.findById(request.params.lessonId);
    const exercises = await Exercise.find({ lesson });
    response.json(exercises);
});

// Get specific exercise. Id params to be changed
router.get('/:userId/lessons/:lessonId/exercises/:exerciseId', async (request: Request, response: Response): Promise<void> => {
    const lesson = await Lesson.findById(request.params.lessonId);
    if (!lesson) {
        response.status(404).json({ error: 'Lesson not found' });
        return;
    }
    const exercise = await Exercise.findOne({ _id: request.params.exerciseId, lesson: lesson._id });

    response.json(exercise);
});

router.put('/:userId/lessons/:lessonId/exercises/:exerciseId/complete', async (request: Request, response: Response): Promise<void> => {
    try {
      const user = request.user;

      // Find the exercise
      const lesson = await Lesson.findById(request.params.lessonId).populate('exercises');
      if (!lesson) {
        response.status(404).json({ error: 'Lesson not found' });
        return;
      }
      const exercise = lesson.exercises.find(ex => ex.id.toString() === request.params.exerciseId);
      if (!exercise){
        response.status(404).json({ error: 'Exercise not found' });
        return;
      }

      // Mark the exercise as completed if not already
      if (!user.completedExercises.includes(exercise.id)) {
        user.completedExercises.push(exercise.id);
        await user.save();
      }

      response.status(200).json({ message: 'Exercise marked as completed', user });
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });




export default router;