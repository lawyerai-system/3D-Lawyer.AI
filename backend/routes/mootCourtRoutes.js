const express = require('express');
const router = express.Router();
const { startSession, sendMessage, endSession } = require('../controllers/mootCourtController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect);
router.use(restrictTo('law_student', 'lawyer'));

router.post('/start', startSession);
router.post('/message', sendMessage);
router.post('/end', endSession);

module.exports = router;
