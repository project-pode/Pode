const exercisesRouter = require('express').Router();
const Exercise = require('../models/exercise');
const Lesson = require('../models/lesson');

// Get all exercises
exercisesRouter.get('/:userId/lessons/:lessonId/exercises', async (request, response) => {
    const lesson = await Lesson.findById(request.params.lessonId);
    const exercises = await Exercise.find({ lesson });
    response.json(exercises);
});

// Get specific exercise. Id params to be changed
exercisesRouter.get('/:userId/lessons/:lessonId/exercises/:exerciseId', async (request, response) => {
    const lesson = await Lesson.findById(request.params.lessonId);
    const exercise = await Exercise.findOne({ _id: request.params.exerciseId, lesson: lesson._id });

    response.json(exercise);
});

exercisesRouter.put('/:userId/lessons/:lessonId/exercises/:exerciseId/complete', async (request, response) => {
    try {
      const user = request.user;

      // Find the exercise
      const lesson = await Lesson.findById(request.params.lessonId).populate('exercises');
      const exercise = lesson.exercises.find(ex => ex._id.toString() === request.params.exerciseId);
      if (!exercise) return response.status(404).json({ error: 'Exercise not found' });

      // Mark the exercise as completed if not already
      if (!user.completedExercises.includes(exercise._id)) {
        user.completedExercises.push(exercise._id);
        await user.save();
      }

      response.status(200).json({ message: 'Exercise marked as completed', user });
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  });




module.exports = exercisesRouter;