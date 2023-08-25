const express = require('express');
const router = express.Router();

const { protectMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const transferController = require('../controllers/transferController');

// Create a transfer request
router.post('/', protectMiddleware, roleMiddleware('maker', 'approver', 'admin'), transferController.createTransfer);

// Approve or reject a transfer request
router.put('/approve-reject/:transferId', protectMiddleware, roleMiddleware('approver', 'admin'), transferController.approveOrRejectTransfer);

// Soft delete a transfer
router.delete('/soft-delete/:transferId', protectMiddleware, roleMiddleware('admin'), transferController.softDeleteTransfer);

// Fetch transfer details by ID
router.get('/:transferId', protectMiddleware, transferController.getTransferDetails);

// Update a transfer's details
router.put('/update/:transferId', protectMiddleware, roleMiddleware('maker', 'approver', 'admin'), transferController.updateTransferDetails);

// List all transfers of a specific user
router.get('/user-transfers', protectMiddleware, transferController.listUserTransfers);

// Restore a transfer that was soft-deleted
router.put('/restore/:transferId', protectMiddleware, roleMiddleware('admin'), transferController.restoreSoftDeletedTransfer);

// Mark an approved transfer as done
router.put('/mark-done/:transferId', protectMiddleware, roleMiddleware('approver', 'admin'), transferController.markTransferAsDone);

// List all soft-deleted transfers (only for admins)
router.get('/deleted-transfers', protectMiddleware, roleMiddleware('admin'), transferController.listDeletedTransfers);

// Fetch all pending transfers
router.get('/pending-transfers', protectMiddleware, roleMiddleware('approver', 'admin'), transferController.listPendingTransfers);

// Any other routes for transfers can be added here...

module.exports = router;
