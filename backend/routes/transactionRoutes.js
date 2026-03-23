const express = require('express');
const router = express.Router();
const { deposit, withdraw, transfer, history } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/deposit',   protect, deposit);
router.post('/withdraw',  protect, withdraw);
router.post('/transfer',  protect, transfer);
router.get('/history',    protect, history);

module.exports = router;
