const express = require('express');
const { quizController } = require('../../controllers');

const router = express.Router();

router.post('/submit-answer', quizController.submitAnswer);

module.exports = router;
