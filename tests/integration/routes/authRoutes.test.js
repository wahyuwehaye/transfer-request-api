const request = require('supertest');
const app = require('../../../src/index');
const User = require('../../../src/models/userModel');
const { setupDatabase, userOne, userOneToken } = require('../../fixtures/db');

beforeEach(setupDatabase);

describe('Auth Routes', () => {

    // Test for user registration
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'Testpass123',
                role: 'maker'
            })
            .expect(201);

        const user = await User.findById(response.body.user._id);
        expect(user).not.toBeNull();

        expect(response.body).toMatchObject({
            user: {
                username: 'testuser',
                role: 'maker'
            },
            token: expect.any(String)
        });
    });

    // Test for user login
    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: userOne.username,
                password: userOne.password
            })
            .expect(200);

        expect(response.body.token).not.toBeNull();
    });

    // Test for login fail due to invalid credentials
    it('should not login a nonexistent user', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({
                username: 'nonexistent',
                password: 'InvalidPass123'
            })
            .expect(400);
    });

    // Test for unauthorized access without a token
    it('should not access protected routes without a token', async () => {
        await request(app)
            .get('/api/transfers')
            .send()
            .expect(401); // Unauthorized
    });

    // Test for access with an invalid/expired token
    it('should not access protected routes with an invalid token', async () => {
        await request(app)
            .get('/api/transfers')
            .set('Authorization', `Bearer InvalidTokenHere`)
            .send()
            .expect(401); // Unauthorized
    });

    // ... other auth-related route tests

});
