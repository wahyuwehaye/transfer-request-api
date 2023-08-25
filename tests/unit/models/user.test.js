const mongoose = require('mongoose');
const User = require('../../src/models/user');

describe('User Model', () => {
    it('should validate a valid user', () => {
        const user = new User({
            username: 'testUser',
            password: 'testPassword123',
            role: 'maker'
        });
        
        const validationRes = user.validateSync();
        expect(validationRes).toBeUndefined();
    });

    it('should invalidate a user with a short password', () => {
        const user = new User({
            username: 'testUser',
            password: 'short',
            role: 'maker'
        });
        
        const validationRes = user.validateSync();
        expect(validationRes.errors.password).toBeDefined();
    });

    // ... Additional tests (e.g., role validations, unique username, etc.)
});
