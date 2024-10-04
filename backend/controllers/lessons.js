const lessonsRouter = require('express').Router();
const Lesson = require('../models/lesson');

lessonsRouter.get('/', async (request, response) => {
    const lessons = await Lesson.find({});
    response.json(lessons);
});

lessonsRouter.get('/:id',  async (request, response) => {
    const lesson = await Lesson.findById(request.params.id).populate('exercises');
    if (lesson) {
        response.json(lesson);
    } else {
        response.status(404).end();
    }
});

module.exports = lessonsRouter;