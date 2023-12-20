const User = require('../models/user');
const Transaction = require('../models/transaction');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateverificationToken, sendVerificationEmail} = require('../utils/email');
const {successFullVerification} = require('../utils/emailTemplate');


const extractUserInfoFromEmail = (email) => {
    const regex = /^([a-zA-Z]+)\.(\d+)@vcet\.edu\.in$/;
    const match = email.match(regex);

    if (match) {
        const [, username, studentId] = match;
        return { username, studentId };
    }

    return null;
};



const register = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        if (!email.toLowerCase().endsWith('@vcet.edu.in')) {
            return res.status(400).json({ message: 'Only email addresses from @vcet.edu.in are allowed.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: `User with email ${email} already exists` });
        }

        const doesPhoneNumberExists = await User.findOne({ phone });
        if (doesPhoneNumberExists) {
            return res.status(400).json({ message: `Phone number ${phone} already exists` });
        }


        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = generateverificationToken(email);

        const retrivedValue = extractUserInfoFromEmail(email);

        let upiId;
        if (!retrivedValue) {
            upiId = `upi@${email.split('@')[0]}`;
        }else{
            upiId = `upi@${retrivedValue.studentId}_${retrivedValue.username}`;
        }

    

        const result = await User.create({ email, password: hashedPassword, username, phone, upiId, verificationCode: verificationToken });

        await sendVerificationEmail(email, verificationToken, username);

        res.status(201).json({ user: result, message: `Verification email has been sent to ${email}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const verifyemail = async (req, res) => {
    try {
        const tokenId = req.params.tokenId;
        const user = await User.findOne({ verificationCode: tokenId });

        if (!user) {
            return res.status(404).json({ error: 'Invalid verification token.' });
        }

        user.verified = true;
        user.verificationCode = null;
        await user.save();

        const congratulationContent = successFullVerification(user.username);

        res.send(congratulationContent);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during email verification.' });
        console.log(error);
    }
};

const login = async (req, res) => {

    try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email}).select('-__v -createdAt -updatedAt -verificationCode');
        if(!existingUser) return res.status(404).json({message: "User doesn't exist"});
        if(!existingUser.verified) return res.status(400).json({message: `Please verify your ${email} first`});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        existingUser.password = undefined;        
        res.status(200).json({user: existingUser, token: token, message: "Logged in successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }

}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({
            verified: true,
            _id: { $ne: req.user.id } 
        }).select('-password -verificationCode -verified -__v -createdAt -updatedAt');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentUserCoins = async (req, res) => {

    try{

        const user = await User.findById(req.user.id)
        if(!user) return res.status(404).json({message: "User doesn't exist"});
        res.status(200).json({coins: user.eCoins});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}
const getUsersWithMostCoins = async (req, res) => {
    try {
        const usersWithMostCoins = await User.find({
            verified: true
        })
        .select('-password -verificationCode -verified -__v -createdAt -updatedAt')
        .sort({ eCoins: -1 })

        const currentUserPosition = await User.findById(req.user.id).sort({ eCoins: -1 }).select('eCoins')

        const position = usersWithMostCoins.findIndex(user => user._id.equals(req.user.id)) + 1;
        res.status(200).json({
            users: usersWithMostCoins,
            currentUserPosition: {
                position,
                eCoins: currentUserPosition.eCoins
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const coinsGainedndLossed = async (req, res) => {

    try{

        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({message: "User doesn't exist"});
        const transactionsBenefit = await Transaction.find({receiver: req.user.id});
        let received_coins = 0;
        transactionsBenefit.forEach(transaction => {
            received_coins += transaction.amount;
        });
        const transactionsLoss = await Transaction.find({sender: req.user.id});
        let sent_coins = 0;
        transactionsLoss.forEach(transaction => {
            sent_coins += transaction.amount;
        });
        res.status(200).json({received_coins: received_coins, sent_coins: sent_coins});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {register, verifyemail, login, getUsers, getCurrentUserCoins, getUsersWithMostCoins,coinsGainedndLossed};