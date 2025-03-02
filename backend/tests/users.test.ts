import app from '../app';
import { User } from '../models/user';
import supertest from 'supertest';
import { cleanupDatabase } from './test_helper';
const api = supertest(app);

describe('Users API', () => {
    beforeAll(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await cleanupDatabase();
    });

    test('should create a new user with valid data', async () => {
        const newUser = {
            username: 'newuser',
            name: 'New User',
            password: 'password123'
        };

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        expect(response.body.username).toBe('newuser');
        expect(response.body.name).toBe('New User');
    });

    test('should not create a user with an existing username', async () => {
        const existingUser = {
            username: 'existinguser',
            name: 'Existing User',
            password: 'password123'
        };

        await api.post('/api/users').send(existingUser);

        const response = await api
            .post('/api/users')
            .send(existingUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toBe('This username already exists');
    });

    test('should not create a user without a password', async () => {
        const newUser = {
            username: 'nopassworduser',
            name: 'No Password User'
        };

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toBe('no password given');
    });

    test('should not create a user with a password shorter than 3 characters', async () => {
        const newUser = {
            username: 'shortpassworduser',
            name: 'Short Password User',
            password: 'pw'
        };

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toBe('password minimum length is 3 characters');
    });
});