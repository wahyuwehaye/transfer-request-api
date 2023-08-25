const { generateToken, verifyToken } = require('../../src/utils/jwtHelpers');

describe('JWT Helpers', () => {
    it('should correctly generate and verify a JWT token', () => {
        const payload = { userId: '123', role: 'admin' };
        const token = generateToken(payload);

        expect(token).toBeTruthy();

        const decodedPayload = verifyToken(token);
        expect(decodedPayload.userId).toBe('123');
        expect(decodedPayload.role).toBe('admin');
    });

    // ... you can add more tests for edge cases or error scenarios
});
