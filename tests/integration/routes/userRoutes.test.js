const request = require('supertest');
const app = require('../../../src/index');
const User = require('../../../src/models/userModel');
const { setupDatabase, userOne, userOneToken } = require('../../fixtures/db');

beforeEach(setupDatabase);

describe('User Routes', () => {
    // Test for user registration
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testUser',
                password: 'P@ssw0rd123',
                role: 'maker'
            })
            .expect(201);

        // Check if user was added to the database
        const user = await User.findById(response.body.user._id);
        expect(user).not.toBeNull();

        // Assertions about the response
        expect(response.body).toMatchObject({
            user: {
                username: 'testUser',
                role: 'maker'
            },
            token: expect.any(String)
        });
    });

    it('should not register user with invalid data', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                username: '',  // Invalid username
                password: 'short',
                role: 'invalidRole'
            })
            .expect(400);
    });

    // Test for user login
    it('should login existing user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: userOne.username,
                password: 'P@ssw0rd123'  // Assuming this is the password of userOne in your fixtures
            })
            .expect(200);

        // Validate JWT token in response
        expect(response.body.token).toBeDefined();
    });

    it('should not login nonexistent user', async () => {
        await request(app)
            .post('/api/users/login')
            .send({
                username: 'nonexistentUser',
                password: 'P@ssw0rd123'
            })
            .expect(400);
    });

    // Test for fetching user profile
    it('should get user profile', async () => {
        await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${userOneToken}`)
            .send()
            .expect(200);
    });

    // ... other user-related route tests
});
