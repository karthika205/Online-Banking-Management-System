const express = require('express');
const router = express.Router();
const { getProfile, getAllUsers, toggleUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/profile',       protect, getProfile);
router.get('/all',           protect, adminOnly, getAllUsers);
router.put('/toggle/:id',    protect, adminOnly, toggleUser);

module.exports = router;
