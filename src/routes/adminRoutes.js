const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Ensure all routes in this router are accessible by admins only
router.use(roleMiddleware(['admin']));

// Create a new Transfer Request
router.post('/transfer-request', adminController.createTransferRequest);

// Update the status of a Transfer Request
router.put('/transfer-request/:id/status', adminController.updateTransferStatus);

// Soft delete a Transfer Request
router.delete('/transfer-request/:id', adminController.softDeleteTransfer);

// Fetch Transfer Request history with filters
router.get('/transfer-history', adminController.getTransferHistory);

module.exports = router;
