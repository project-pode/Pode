const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const api = supertest(app);

describe('Login API', () => {
    beforeAll(async () => {
        await User.deleteMany({});

        const password = 'password';
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({ username: 'testuser', passwordHash });
        await user.save();
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
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