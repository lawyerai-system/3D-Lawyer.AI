const express = require('express');
const router = express.Router();
const { analyzeDocument } = require('../controllers/documentController');
const { generateStrategy } = require('../controllers/strategyController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/generate-strategy', protect, restrictTo('law_student', 'lawyer'), generateStrategy);

module.exports = router;
