const request = require('supertest');
const app = require('../../../src/index');
const Transfer = require('../../../src/models/transferModel');
const { setupDatabase, makerOne, makerOneToken, transferOne } = require('../../fixtures/db');

beforeEach(setupDatabase);

describe('Transfer Routes', () => {
    
    // Test for creating a transfer request by a maker
    it('should allow maker to create a transfer request', async () => {
        const response = await request(app)
            .post('/api/transfers')
            .set('Authorization', `Bearer ${makerOneToken}`)
            .send({
                amount: 1000,
                beneficiary: 'Beneficiary Name',
                status: 'pending'
            })
            .expect(201);

        const transfer = await Transfer.findById(response.body._id);
        expect(transfer).not.toBeNull();
        expect(transfer.status).toEqual('pending');
    });

    // Test for approver approving a transfer request
    it('should allow approver to approve a transfer request', async () => {
        // Assuming you have an approverTwoToken fixture for an authenticated approver
        await request(app)
            .put(`/api/transfers/${transferOne._id}/approve`)
            .set('Authorization', `Bearer ${approverTwoToken}`)
            .send()
            .expect(200);

        const transfer = await Transfer.findById(transferOne._id);
        expect(transfer.status).toEqual('approved');
    });

    // Test for admin deleting a transfer request
    it('should allow admin to soft delete a transfer request', async () => {
        // Assuming you have an adminToken fixture for an authenticated admin
        await request(app)
            .delete(`/api/transfers/${transferOne._id}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send()
            .expect(204);

        const transfer = await Transfer.findById(transferOne._id);
        expect(transfer.deleted).toEqual(true); // Assuming you have a 'deleted' boolean field in the transfer model for soft deletes
    });

    // Test for fetching list of transfer requests
    it('should fetch a list of transfer requests', async () => {
        await request(app)
            .get('/api/transfers')
            .set('Authorization', `Bearer ${makerOneToken}`)
            .send()
            .expect(200);
    });

    // ... other transfer-related route tests
});
