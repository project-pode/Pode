import app from '../app';
import supertest from 'supertest';
const api = supertest(app);
import { createTestUser, cleanupDatabase, createTestLesson } from './test_helper';
import mongoose from 'mongoose';

describe('Lessons API', () => {
    let lessonId: mongoose.Types.ObjectId
    let token: string;

    beforeAll(async () => {
        const lesson = await createTestLesson();
        const user = await createTestUser();
        lessonId = lesson.lessonId;
        token = user.token;
    });

    afterAll(async () => {
        await cleanupDatabase();
    });

    test('should get all lessons for a user', async () => {
        const response = await api
            .get(`/api/lessons`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('Test Lesson');
    });

    test('should get a specific lesson', async () => {
        const response = await api
            .get(`/api/lessons/${lessonId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.title).toBe('Test Lesson');
    });

    test('should mark a lesson as complete', async () => {
        const response = await api
            .put(`/api/lessons/${lessonId}/complete`)
            .set('Authorization', `Bearer ${token}`)
            .send({ completed: true })
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.message).toBe('Lesson marked as completed');
    });
});