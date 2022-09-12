const logger = require('../config/logger');
const redisPubSub = require('../redis/index');

const publishQuiz = () => {
  logger.info("I'm executed on a schedule!");
  redisPubSub.publishToTopic('quizSession', { id: 1, question: 'What is 1 + 1?' });
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
