const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    amount: {
        type: Number,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    remainingBalance: {
        type: Number,
        required: true
    }



}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;