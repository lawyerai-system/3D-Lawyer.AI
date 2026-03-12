const express = require('express');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const predictorController = require('../controllers/predictorController');

const router = express.Router();

router.post('/predict', protect, restrictTo('lawyer'), predictorController.predictOutcome);

module.exports = router;
