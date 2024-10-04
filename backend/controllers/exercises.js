const exercisesRouter = require('express').Router();
const Exercise = require('../models/exercise');
const Lesson = require('../models/lesson');

exercisesRouter.get('/:id/exercises', async (request, response) => {
    const lesson = await Lesson.findById(request.params.id);
    const exercises = await Exercise.find({ lesson });
    response.json(exercises);
});

exercisesRouter.get('/:id/exercises/:id2', async (request, response) => {
    const lesson = await Lesson.findById(request.params.id);
    const exercise = await Exercise.findOne({ _id: request.params.id2, lesson: lesson._id });

    response.json(exercise);
});

module.exports = exercisesRouter;