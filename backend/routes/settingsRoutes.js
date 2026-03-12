const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Get settings - accessible to users (for feature toggles etc)
router.get('/', protect, settingsController.getSettings);

// Update settings - Admin only
router.patch('/', protect, restrictTo('admin'), settingsController.updateSettings);

module.exports = router;
