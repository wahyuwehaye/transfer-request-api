const request = require('supertest');
const app = require('../../../src/index');
const Transfer = require('../../../src/models/transferModel');
const { setupDatabase, adminOne, adminOneToken, transferTwo } = require('../../fixtures/db');

beforeEach(setupDatabase);

describe('Admin Routes', () => {
    
    // Test for admin creating a transfer request
    it('should allow admin to create a transfer request', async () => {
        const response = await request(app)
            .post('/api/transfers')
            .set('Authorization', `Bearer ${adminOneToken}`)
            .send({
                amount: 2000,
                beneficiary: 'New Beneficiary',
                status: 'pending'
            })
            .expect(201);

        const transfer = await Transfer.findById(response.body._id);
        expect(transfer).not.toBeNull();
        expect(transfer.status).toEqual('pending');
    });

    // Test for admin approving a transfer request
    it('should allow admin to approve a transfer request', async () => {
        await request(app)
            .put(`/api/transfers/${transferTwo._id}/approve`)
            .set('Authorization', `Bearer ${adminOneToken}`)
            .send()
            .expect(200);

        const transfer = await Transfer.findById(transferTwo._id);
        expect(transfer.status).toEqual('approved');
    });

    // Test for admin soft deleting a transfer request
    it('should allow admin to soft delete a transfer request', async () => {
        await request(app)
            .delete(`/api/transfers/${transferTwo._id}`)
            .set('Authorization', `Bearer ${adminOneToken}`)
            .send()
            .expect(204);

        const transfer = await Transfer.findById(transferTwo._id);
        expect(transfer.deleted).toEqual(true);
    });

    // Test for admin fetching list of transfer requests
    it('should allow admin to fetch a list of transfer requests', async () => {
        await request(app)
            .get('/api/transfers')
            .set('Authorization', `Bearer ${adminOneToken}`)
            .send()
            .expect(200);
    });

    // Test for admin fetching the transfer history based on filters
    it('should allow admin to fetch the transfer history', async () => {
        await request(app)
            .get('/api/history?startDate=2023-08-01&endDate=2023-08-21&status=approved,rejected')
            .set('Authorization', `Bearer ${adminOneToken}`)
            .send()
            .expect(200);
    });

    // ... other admin-related route tests
});
