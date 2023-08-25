const adminController = require('../../src/controllers/adminController');
const Transfer = require('../../src/models/transfer');
const User = require('../../src/models/user');

describe('AdminController', () => {

    // Mocking the models methods for testing
    beforeEach(() => {
        jest.mock('../../src/models/transfer');
        jest.mock('../../src/models/user');

        // Reset the mock functions' behavior before each test
        Transfer.create.mockClear();
        Transfer.findByIdAndUpdate.mockClear();
        Transfer.findByIdAndRemove.mockClear();
        User.create.mockClear();
    });

    // Test: Admin Create Transfer Request
    it('should allow admin to create a transfer request successfully', async () => {
        const mockTransfer = {
            _id: 'mockTransferId',
            sender: 'testSender',
            recipient: 'testRecipient',
            amount: 1000,
            status: 'pending'
        };
        Transfer.create.mockResolvedValue(mockTransfer);

        const mockReq = {
            body: mockTransfer
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await adminController.createTransfer(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockTransfer);
    });

    // Test: Admin Approve Transfer Request
    it('should allow admin to approve a transfer request successfully', async () => {
        const mockTransfer = {
            _id: 'mockTransferId',
            status: 'approved'
        };
        Transfer.findByIdAndUpdate.mockResolvedValue(mockTransfer);

        const mockReq = {
            params: { id: 'mockTransferId' },
            body: { status: 'approved' }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await adminController.approveTransfer(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Transfer approved successfully',
            transfer: mockTransfer
        });
    });

    // Test: Admin Soft Delete Transfer Request
    it('should allow admin to soft delete a transfer request', async () => {
        const mockTransfer = {
            _id: 'mockTransferId',
            status: 'pending',
            isDeleted: true
        };
        Transfer.findByIdAndUpdate.mockResolvedValue(mockTransfer);

        const mockReq = {
            params: { id: 'mockTransferId' }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await adminController.softDeleteTransfer(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Transfer soft deleted successfully',
            transfer: mockTransfer
        });
    });

    // Test: Admin Create User
    it('should allow admin to create a user', async () => {
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

        await adminController.createUser(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    // ... Add more tests for other methods and edge cases

});
