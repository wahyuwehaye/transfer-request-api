const { hashPassword, verifyPassword } = require('../../src/utils/passwordHelpers');

describe('Password Helpers', () => {
    it('should hash and then correctly verify a password', async () => {
        const originalPassword = 'secureP@ssw0rd';
        const hashed = await hashPassword(originalPassword);
        
        expect(hashed).not.toBe(originalPassword);
        expect(await verifyPassword(originalPassword, hashed)).toBeTruthy();
    });

    // ... more tests
});
