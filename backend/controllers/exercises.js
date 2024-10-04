const exercisesRouter = require('express').Router();
const Exercise = require('../models/exercise');
const Lesson = require('../models/lesson');

exercisesRouter.get('/:id/exercises', async (request, response) => {
    const lesson = await Lesson.findById(request.params.id)
    const exercises = await Exercise.find({lesson});
    response.json(exercises);
});

module.exports = exercisesRouter;