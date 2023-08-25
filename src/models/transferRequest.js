const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required for the transfer'],
        min: [0, 'Amount should be positive']
    },
    targetAccount: {
        type: String,
        required: [true, 'Target account is required']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'done'],
        default: 'pending'
    },
    requester: { // Assuming this is the user who initiated the request
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    approver: { // Assuming this will be filled when an approver/admin approves/rejects the transfer
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: { // Field for soft delete
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// Before update, set the updatedAt date
transferSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
