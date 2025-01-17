const app = require('../app');
const supertest = require('supertest');
const { createTestUser, cleanupDatabase, createTestLessonWithExercise } = require('./test_helper');
const api = supertest(app);

describe('Exercises API', () => {
    let lessonId;
    let exerciseId;
    let userId;
    let token = null;

    beforeAll(async () => {
        const lesson = await createTestLessonWithExercise();
        const user = await createTestUser();
        userId = user.userId;
        lessonId = lesson.lessonId;
        token = user.token;
        exerciseId = lesson.exerciseId;
    });

    afterAll(async () => {
        await cleanupDatabase();
    });

    test('should get all exercises for a lesson', async () => {
        const response = await api
            .get(`/api/users/${userId}/lessons/${lessonId}/exercises`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('Test Exercise');
    });

    test('should get a specific exercise', async () => {
        const response = await api
            .get(`/api/users/${userId}/lessons/${lessonId}/exercises/${exerciseId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.title).toBe('Test Exercise');
    });

    test('should mark an exercise as complete', async () => {
        const response = await api
            .put(`/api/users/${userId}/lessons/${lessonId}/exercises/${exerciseId}/complete`)
            .set('Authorization', `Bearer ${token}`)
            .send({ completed: true })
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.message).toBe('Exercise marked as completed');
    });
});