const express = require('express');
const router = express.Router();

const historyController = require('../controllers/historyController');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Ensure all routes in this router are accessible by admins only
router.use(roleMiddleware(['admin']));

// Fetch Transfer Request history based on filters
router.get('/transfer-history', historyController.getTransferHistory);

// Fetch aggregated statistics for Transfer Requests
router.get('/transfer-statistics', historyController.getAggregatedStatistics);

module.exports = router;
