import app from '../app';
import supertest from 'supertest';
const api = supertest(app);
import { createTestUser, cleanupDatabase } from './test_helper';

describe('Login API', () => {
    beforeAll(async () => {
        await createTestUser();
    });

    afterAll(async () => {
        await cleanupDatabase();
    });

    test('should login with valid credentials', async () => {
        const loginDetails = {
            username: 'testuser',
            password: 'password'
        };

        const response = await api
            .post('/api/login')
            .send(loginDetails)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.token).toBeDefined();
        expect(response.body.username).toBe('testuser');
    });

    test('should not login with invalid credentials', async () => {
        const loginDetails = {
            username: 'testuser',
            password: 'wrongpassword'
        };

        const response = await api
            .post('/api/login')
            .send(loginDetails)
            .expect(401)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toBe('Password or username is incorrect');
    });
});