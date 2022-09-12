const logger = require('../config/logger');
const redisService = require('../redis/index');
const { questionService } = require('../services');

const publishQuiz = async () => {
  logger.info("I'm executed on a schedule!");
  const newQuestion = await questionService.getRandomQuestion();
  await redisService.handleSetRedis('currentQuestion', newQuestion[0]);
  await redisService.publishToTopic('quizSession', newQuestion[0]);
  logger.info('pub sub ran');
};

const setQuizTimer = () => setTimeout(publishQuiz, 60000);

const startQuizTimer = () => {
  publishQuiz();
  setQuizTimer();
};

exports.initQuizTimer = () => {
  startQuizTimer();
};
exports.restartQuizTimer = () => {
  clearTimeout(setQuizTimer);
  startQuizTimer();
};
