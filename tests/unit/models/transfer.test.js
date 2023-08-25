const mongoose = require('mongoose');
const Transfer = require('../../src/models/transfer');

describe('Transfer Model', () => {
    it('should validate a valid transfer request', () => {
        const transfer = new Transfer({
            fromAccount: '123456',
            toAccount: '654321',
            amount: 100,
            status: 'pending'
        });
        
        const validationRes = transfer.validateSync();
        expect(validationRes).toBeUndefined();
    });

    // ... Additional tests, e.g., invalid amount, invalid status, etc.
});
