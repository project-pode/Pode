const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const { createTestUser, cleanupDatabase, createTestLesson } = require('./test_helper');

describe('Lessons API', () => {
    let lessonId;
    let userId;
    let token = null;

    beforeAll(async () => {
        const lesson = await createTestLesson();
        const user = await createTestUser();
        userId = user.userId;
        lessonId = lesson.lessonId;
        token = user.token;
    });

    afterAll(async () => {
        await cleanupDatabase();
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