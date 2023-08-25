const TransferRequest = require('../models/transferModel');

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

// Aggregated statistics for Transfer Requests within a certain date range
exports.getAggregatedStatistics = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let filters = { isDeleted: false };

        if (startDate && endDate) {
            filters.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const aggregatedStats = await TransferRequest.aggregate([
            { $match: filters },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        res.status(200).json({ aggregatedStats });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching aggregated statistics', error });
    }
};

module.exports = exports;
