const Transfer = require('../models/transferModel');

// Create a transfer with 'pending' status
exports.createTransfer = async (req, res) => {
    try {
        const { amount, toAccount } = req.body;

        // Basic validation (expand as needed)
        if (!amount || !toAccount) {
            return res.status(400).send({ message: 'Amount and target account are required.' });
        }

        const transfer = new Transfer({
            fromUser: req.user.id, // Assuming the request includes user data from the JWT authentication
            toAccount,
            amount,
            status: 'pending'
        });

        await transfer.save();
        res.status(201).send({ message: 'Transfer request created successfully', transfer });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Approve a transfer
exports.approveTransfer = async (req, res) => {
    try {
        const { transferId } = req.params; // Getting the transfer ID from the route parameter

        const transfer = await Transfer.findById(transferId);

        if (!transfer) {
            return res.status(404).send({ message: 'Transfer request not found.' });
        }

        // Check if the current user is an approver
        if (req.user.role !== 'approver' && req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Only approvers or admins can approve transfers.' });
        }

        transfer.status = 'approved';
        await transfer.save();

        res.send({ message: 'Transfer approved successfully', transfer });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Reject a transfer
exports.rejectTransfer = async (req, res) => {
    try {
        const { transferId } = req.params; 

        const transfer = await Transfer.findById(transferId);

        if (!transfer) {
            return res.status(404).send({ message: 'Transfer request not found.' });
        }

        if (req.user.role !== 'approver' && req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Only approvers or admins can reject transfers.' });
        }

        transfer.status = 'rejected';
        await transfer.save();

        res.send({ message: 'Transfer rejected successfully', transfer });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// List all pending transfers (visible to makers, approvers, and admins)
exports.listTransfers = async (req, res) => {
    try {
        const transfers = await Transfer.find({ status: 'pending' });
        res.send(transfers);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ... (other methods and imports)

// Soft delete a transfer
exports.softDeleteTransfer = async (req, res) => {
    try {
        const { transferId } = req.params;

        const transfer = await Transfer.findById(transferId);

        if (!transfer) {
            return res.status(404).send({ message: 'Transfer request not found.' });
        }

        if (req.user.role !== 'admin' || transfer.status === 'done') {
            return res.status(403).send({ message: 'Only admins can delete transfers, and transfers with "done" status cannot be deleted.' });
        }

        transfer.isDeleted = true;
        await transfer.save();

        res.send({ message: 'Transfer soft-deleted successfully', transfer });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Fetch transfer details by ID
exports.getTransferDetails = async (req, res) => {
    try {
        const { transferId } = req.params;

        const transfer = await Transfer.findById(transferId).where('isDeleted').equals(false);

        if (!transfer) {
            return res.status(404).send({ message: 'Transfer request not found or has been deleted.' });
        }

        res.send(transfer);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateTransferDetails = async (req, res) => {
    try {
        const { transferId } = req.params;
        const { amount, toAccount } = req.body;

        const transfer = await Transfer.findById(transferId);

        if (!transfer) {
            return res.status(404).send({ message: 'Transfer request not found.' });
        }

        if (transfer.status !== 'pending') {
            return res.status(403).send({ message: 'Only pending transfers can be modified.' });
        }

        if (amount) transfer.amount = amount;
        if (toAccount) transfer.toAccount = toAccount;

        await transfer.save();

        res.send({ message: 'Transfer updated successfully', transfer });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


exports.listUserTransfers = async (req, res) => {
    try {
        const userId = req.user.id;

        const transfers = await Transfer.find({ fromUser: userId, isDeleted: false });
        res.send(transfers);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.restoreSoftDeletedTransfer = async (req, res) => {
    try {
        const { transferId } = req.params;

        const transfer = await Transfer.findById(transferId);

        if (!transfer) {
            return res.status(404).send({ message: 'Transfer request not found.' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Only admins can restore transfers.' });
        }

        transfer.isDeleted = false;
        await transfer.save();

        res.send({ message: 'Transfer restored successfully', transfer });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.markTransferAsDone = async (req, res) => {
    try {
        const { transferId } = req.params;

        const transfer = await Transfer.findById(transferId);

        if (!transfer) {
            return res.status(404).send({ message: 'Transfer request not found.' });
        }

        if (transfer.status !== 'approved') {
            return res.status(403).send({ message: 'Only approved transfers can be marked as done.' });
        }

        transfer.status = 'done';
        await transfer.save();

        res.send({ message: 'Transfer marked as done successfully', transfer });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.listDeletedTransfers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Only admins can view deleted transfers.' });
        }

        const transfers = await Transfer.find({ isDeleted: true });
        res.send(transfers);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Fetch all pending transfers
exports.listPendingTransfers = async (req, res) => {
    try {
        const transfers = await Transfer.find({ status: 'pending', isDeleted: false });
        res.send(transfers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
