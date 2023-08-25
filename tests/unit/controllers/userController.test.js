const userController = require('../../src/controllers/userController');
const User = require('../../src/models/user');

describe('UserController', () => {

    // Mocking user model methods for testing
    beforeEach(() => {
        jest.mock('../../src/models/user');

        // Reset the mock functions' behavior before each test
        User.createUser.mockClear();
        User.findUser.mockClear();
        // ... Add more methods to mock if required
    });

    // Test: Create User
    it('should create a user successfully', async () => {
        const mockUser = {
            _id: 'mockUserId',
            username: 'testUser',
            password: 'testPassword123',
            role: 'maker'
        };
        User.createUser.mockResolvedValue(mockUser);

        const mockReq = {
            body: mockUser
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.createUser(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    // Test: User Login
    it('should log in a user successfully', async () => {
        const mockUser = {
            _id: 'mockUserId',
            username: 'testUser',
            password: 'testPassword123',
            role: 'maker'
        };
        User.findUser.mockResolvedValue(mockUser);

        const mockReq = {
            body: {
                username: 'testUser',
                password: 'testPassword123'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.loginUser(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Logged in successfully',
            user: mockUser,
            token: expect.any(String)
        });
    });

    // Test: Fetch User Details
    it('should fetch user details successfully', async () => {
        const mockUser = {
            _id: 'mockUserId',
            username: 'testUser',
            role: 'maker'
        };
        User.findById.mockResolvedValue(mockUser);

        const mockReq = {
            user: {
                _id: 'mockUserId'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.getUserDetails(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    // ... Add more tests for other methods and edge cases

});

