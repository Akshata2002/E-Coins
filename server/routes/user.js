const router = require('express').Router();
const {login, register, verifyemail, getUsers, getCurrentUserCoins, getUsersWithMostCoins, coinsGainedndLossed} = require('../controllers/user');
const validateToken = require('../middlewares/validateToken');

router.post('/register', register);
router.get('/verifyemail/:tokenId', verifyemail);
router.post('/login', login);
router.get('/getusers', validateToken, getUsers);
router.get('/coins', validateToken, getCurrentUserCoins);
router.get('/topusers', validateToken, getUsersWithMostCoins);
router.get('/coinsgainedandlossed', validateToken, coinsGainedndLossed);

module.exports = router;