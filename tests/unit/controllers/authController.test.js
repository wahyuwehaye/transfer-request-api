const authController = require('../../src/controllers/authController');
const User = require('../../src/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

describe('AuthController', () => {
    // Mocking the models and other methods for testing
    beforeEach(() => {
        jest.mock('../../src/models/user');
        jwt.sign = jest.fn();
        bcrypt.compare = jest.fn();

        // Reset the mock functions' behavior before each test
        User.create.mockClear();
        jwt.sign.mockClear();
        bcrypt.compare.mockClear();
    });

    // Test: Register a new user
    it('should allow a user to register successfully', async () => {
        const mockUser = {
            _id: 'mockUserId',
            username: 'testUser',
            password: 'password1234',
            role: 'maker'
        };
        User.create.mockResolvedValue(mockUser);

        const mockReq = {
            body: mockUser
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await authController.register(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'User registered successfully',
            user: mockUser
        });
    });

    // Test: User login
    it('should allow a user to login and return a token', async () => {
        const mockUser = {
            _id: 'mockUserId',
            username: 'testUser',
            password: 'password1234',
            role: 'maker'
        };

        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('mockToken');

        const mockReq = {
            body: {
                username: 'testUser',
                password: 'password1234'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await authController.login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Logged in successfully',
            token: 'mockToken',
            user: mockUser
        });
    });

    // Test: Failed login due to wrong password
    it('should not allow a user to login with a wrong password', async () => {
        const mockUser = {
            _id: 'mockUserId',
            username: 'testUser',
            password: 'password1234',
            role: 'maker'
        };

        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);  // wrong password

        const mockReq = {
            body: {
                username: 'testUser',
                password: 'wrongPassword'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await authController.login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Authentication failed'
        });
    });

    // Test: Failed login due to user not found
    it('should not allow login if the user is not found', async () => {
        User.findOne.mockResolvedValue(null);

        const mockReq = {
            body: {
                username: 'nonexistentUser',
                password: 'somePassword'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await authController.login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Authentication failed'
        });
    });

    // ... you can add more tests for edge cases or other methods

});
