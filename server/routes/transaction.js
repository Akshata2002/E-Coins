const router = require('express').Router();
const {sendEcoins, getUserTransactionsHistory} = require('../controllers/transaction');
const validateToken = require('../middlewares/validateToken')

router.post('/sendecoins', validateToken, sendEcoins);
router.get('/getusertransactionhistory', validateToken, getUserTransactionsHistory);

module.exports = router;