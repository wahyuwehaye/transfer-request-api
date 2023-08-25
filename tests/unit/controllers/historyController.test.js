const historyController = require('../../src/controllers/historyController');
const TransferRequest = require('../../src/models/transferRequest');

describe('HistoryController', () => {
    // Mocking the models for testing
    beforeEach(() => {
        jest.mock('../../src/models/transferRequest');
        // Reset the mock functions' behavior before each test
        TransferRequest.find.mockClear();
    });

    // Test: Fetch transfer requests within a date range
    it('should fetch transfer requests based on a date range', async () => {
        const mockTransferRequests = [
            { _id: '1', status: 'pending', createdAt: '2023-08-10' },
            { _id: '2', status: 'approved', createdAt: '2023-08-15' }
        ];
        TransferRequest.find.mockResolvedValue(mockTransferRequests);

        const mockReq = {
            query: {
                startDate: '2023-08-01',
                endDate: '2023-08-20'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await historyController.getTransferHistory(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            data: mockTransferRequests
        });
    });

    // Test: Fetch transfer requests based on status
    it('should fetch transfer requests based on status', async () => {
        const mockTransferRequests = [
            { _id: '1', status: 'approved', createdAt: '2023-08-10' },
            { _id: '2', status: 'approved', createdAt: '2023-08-15' }
        ];
        TransferRequest.find.mockResolvedValue(mockTransferRequests);

        const mockReq = {
            query: {
                status: 'approved'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await historyController.getTransferHistory(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            data: mockTransferRequests
        });
    });

    // Test: No transfer requests found for a given filter
    it('should return a 404 if no transfer requests are found based on the given filters', async () => {
        TransferRequest.find.mockResolvedValue([]);

        const mockReq = {
            query: {
                startDate: '2023-08-21',
                endDate: '2023-08-30'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await historyController.getTransferHistory(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'No transfer requests found for the given filters'
        });
    });

    // ... you can add more tests for edge cases or other methods in the historyController
});
