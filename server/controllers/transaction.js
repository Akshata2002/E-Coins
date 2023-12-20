const Transaction = require('../models/transaction');
const User = require('../models/user');
const mongoose = require('mongoose');

const getUserTransactionsHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: `User with id ${userId} doesn't exist` });
        }

        const transactions = await Transaction.find({
            $or: [{ sender: userId }, { receiver: userId }],
        }).populate('sender').populate('receiver')
        .sort({ createdAt: -1 })
        .select('sender receiver amount message remainingBalance createdAt'); 

        res.status(200).json({ transactions, message: "Transactions fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const sendEcoins = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { receiverId, amount, message } = req.body;
        const senderId = req.user.id;

        if (senderId === receiverId) {
            return res.status(400).json({ message: "You cannot send eCoins to yourself" });
        }

        const sender = await User.findById(senderId).session(session);
        if (!sender) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: `User with id ${senderId} doesn't exist` });
        }

        const receiver = await User.findById(receiverId).session(session);
        if (!receiver) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: `User with id ${receiverId} doesn't exist` });
        }

        if (sender.eCoins < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: `Insufficient eCoins` });
        }

        const transaction = new Transaction({
            sender: senderId,
            receiver: receiverId,
            amount: amount,
            message: message,
            remainingBalance: sender.eCoins - parseInt(amount),
        }); 

        await transaction.save({ session });

        sender.eCoins -= parseInt(amount);
        await sender.save({ session });

        receiver.eCoins += parseInt(amount);
        await receiver.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Transaction completed successfully" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
};



module.exports = {getUserTransactionsHistory, sendEcoins};