const app = require('../app');
const mongoose = require('mongoose');
const Lesson = require('../models/lesson');
const User = require('../models/user');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const api = supertest(app);

describe('Lessons API', () => {
    let lessonId;
    let userId;
    let token = null;

    beforeAll(async () => {
        const password = "password";
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({ username: 'testuser', passwordHash });
        await user.save();
        userId = user._id;

        const userForToken = {
            username: user.username,
            id: userId,
        };

        const lesson = new Lesson({ title: 'Test Lesson' });
        await lesson.save();
        lessonId = lesson._id;

        token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });
    });

    afterAll(async () => {
        // Clean up the test database
        await User.deleteMany({});
        await Lesson.deleteMany({});
        await mongoose.connection.close();
    });

    test('should get all lessons for a user', async () => {
        const response = await api
            .get(`/api/users/${userId}/lessons`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('Test Lesson');
    });

    test('should get a specific lesson', async () => {
        const response = await api
            .get(`/api/users/${userId}/lessons/${lessonId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.title).toBe('Test Lesson');
    });

    test('should mark a lesson as complete', async () => {
        const response = await api
            .put(`/api/users/${userId}/lessons/${lessonId}/complete`)
            .set('Authorization', `Bearer ${token}`)
            .send({ completed: true })
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.message).toBe('Lesson marked as completed');
    });
});