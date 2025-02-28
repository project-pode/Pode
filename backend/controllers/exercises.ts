import express from 'express';
import { Exercise } from '../models/exercise';
import { Lesson } from '../models/lesson';
const router = express.Router();

// Get all exercises
router.get('/:userId/lessons/:lessonId/exercises', async (request, response) => {
    const lesson = await Lesson.findById(request.params.lessonId);
    const exercises = await Exercise.find({ lesson });
    response.json(exercises);
});

// Get specific exercise. Id params to be changed
router.get('/:userId/lessons/:lessonId/exercises/:exerciseId', async (request, response) => {
    const lesson = await Lesson.findById(request.params.lessonId);
    if (!lesson) {
        return response.status(404).json({ error: 'Lesson not found' });
    }
    const exercise = await Exercise.findOne({ _id: request.params.exerciseId, lesson: lesson._id });

    return response.json(exercise);
});

router.put('/:userId/lessons/:lessonId/exercises/:exerciseId/complete', async (request, response) => {
    try {
      const user = request.user;

      // Find the exercise
      const lesson = await Lesson.findById(request.params.lessonId).populate('exercises');
      if (!lesson) {
        return response.status(404).json({ error: 'Lesson not found' });
      }
      const exercise = lesson.exercises.find(ex => ex.id.toString() === request.params.exerciseId);
      if (!exercise) return response.status(404).json({ error: 'Exercise not found' });

      // Mark the exercise as completed if not already
      if (!user.completedExercises.includes(exercise.id)) {
        user.completedExercises.push(exercise.id);
        await user.save();
      }

      return response.status(200).json({ message: 'Exercise marked as completed', user });
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  });




export default router;