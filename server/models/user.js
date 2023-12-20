const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: false
    },

    upiId: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    eCoins: {
        type: Number,
        default: 5
    },

    verified: {
        type: Boolean,
        default: false
    },

    verificationCode: {
        type: String,
    },

    role: {
        type: String,
        enum: ['teacher', 'student', 'admin'],
        default: 'student'
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;