const express = require('express');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const simulationController = require('../controllers/simulationController');

const router = express.Router();

router.post('/simulate', protect, restrictTo('lawyer'), simulationController.simulateJudicialProcess);

module.exports = router;
