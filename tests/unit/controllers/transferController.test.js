const transferController = require('../../src/controllers/transferController');
const Transfer = require('../../src/models/transfer');

describe('TransferController', () => {

    // Mocking the Transfer model methods for testing
    beforeEach(() => {
        jest.mock('../../src/models/transfer');

        // Reset the mock functions' behavior before each test
        Transfer.createTransfer.mockClear();
        Transfer.findById.mockClear();
        Transfer.updateTransfer.mockClear();
        // ... Add more methods to mock if required
    });

    // Test: Create Transfer Request
    it('should create a transfer request successfully', async () => {
        const mockTransfer = {
            _id: 'mockTransferId',
            sender: 'testSender',
            recipient: 'testRecipient',
            amount: 1000,
            status: 'pending'
        };
        Transfer.createTransfer.mockResolvedValue(mockTransfer);

        const mockReq = {
            body: mockTransfer
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await transferController.createTransfer(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockTransfer);
    });

    // Test: Approve Transfer Request
    it('should approve a transfer request successfully', async () => {
        const mockTransfer = {
            _id: 'mockTransferId',
            status: 'approved'
        };
        Transfer.updateTransfer.mockResolvedValue(mockTransfer);

        const mockReq = {
            params: { id: 'mockTransferId' },
            body: { status: 'approved' }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await transferController.approveTransfer(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Transfer approved successfully',
            transfer: mockTransfer
        });
    });

    // Test: Fetch Transfer Details
    it('should fetch transfer details successfully', async () => {
        const mockTransfer = {
            _id: 'mockTransferId',
            sender: 'testSender',
            recipient: 'testRecipient',
            amount: 1000,
            status: 'pending'
        };
        Transfer.findById.mockResolvedValue(mockTransfer);

        const mockReq = {
            params: { id: 'mockTransferId' }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await transferController.getTransferDetails(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockTransfer);
    });

    // ... Add more tests for other methods and edge cases

});

