const request = require('supertest');
const app = require('../../../src/index');
const Transfer = require('../../../src/models/transferModel');
const { setupDatabase, userOne, userAdmin, userAdminToken, transferOne } = require('../../fixtures/db');

beforeEach(setupDatabase);

describe('History Routes', () => {

    // Test: Retrieve transfer history with date filters
    it('should fetch transfer history within a date range', async () => {
        const response = await request(app)
            .get('/api/history')
            .set('Authorization', `Bearer ${userAdminToken}`)
            .query({
                startDate: '2023-08-01',
                endDate: '2023-08-21'
            })
            .expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0]).toMatchObject({
            status: transferOne.status,
            createdAt: expect.any(String)
        });
    });

    // Test: Retrieve transfer history with status filters
    it('should fetch transfer history with specific statuses', async () => {
        const response = await request(app)
            .get('/api/history')
            .set('Authorization', `Bearer ${userAdminToken}`)
            .query({
                statuses: ['approved', 'rejected']
            })
            .expect(200);

        // Modify this based on your test database setup and expected response
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    // Test: Ensure only admin role can access the history
    it('should prevent non-admin users from accessing transfer history', async () => {
        await request(app)
            .get('/api/history')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)  // Token for a non-admin user
            .send()
            .expect(403); // Forbidden
    });

    // ... any other history-related route tests you need

});
