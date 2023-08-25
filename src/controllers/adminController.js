const TransferRequest = require('../models/transferModel');

// Create a Transfer Request
exports.createTransferRequest = async (req, res) => {
    try {
        const { fromAccount, toAccount, amount, status } = req.body;
        const transferRequest = new TransferRequest({
            fromAccount,
            toAccount,
            amount,
            status
        });

        await transferRequest.save();
        res.status(201).json({ message: 'Transfer request created successfully', transferRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error creating transfer request', error });
    }
};

// Approve or Reject a Transfer Request
exports.updateTransferStatus = async (req, res) => {
    try {
        const transferId = req.params.id;
        const { status } = req.body; 

        const updatedTransfer = await TransferRequest.findByIdAndUpdate(transferId, { status }, { new: true });
        if (!updatedTransfer) {
            return res.status(404).json({ message: 'Transfer request not found' });
        }
        res.status(200).json({ message: 'Transfer status updated', transfer: updatedTransfer });
    } catch (error) {
        res.status(500).json({ message: 'Error updating transfer request', error });
    }
};

// Soft Delete a Transfer Request (except those with 'done' status)
exports.softDeleteTransfer = async (req, res) => {
    try {
        const transferId = req.params.id;
        const transfer = await TransferRequest.findById(transferId);
        if (!transfer) {
            return res.status(404).json({ message: 'Transfer request not found' });
        }
        if (transfer.status === 'done') {
            return res.status(400).json({ message: 'Cannot delete a transfer request with "done" status' });
        }
        
        transfer.isDeleted = true;
        await transfer.save();
        res.status(200).json({ message: 'Transfer request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting transfer request', error });
    }
};

// Fetch Transfer Request History based on filters
exports.getTransferHistory = async (req, res) => {
    try {
        const { startDate, endDate, status } = req.query;

        let filters = { isDeleted: false }; // Only fetch undeleted transfers by default

        if (startDate && endDate) {
            filters.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (status) {
            filters.status = { $in: status.split(",") };
        }

        const transferHistory = await TransferRequest.find(filters);
        res.status(200).json({ transferHistory });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching transfer history', error });
    }
};

module.exports = exports;
