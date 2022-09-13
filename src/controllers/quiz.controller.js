const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const redisService = require('../redis/index');
const scheduledTimers = require('../timer/quiz');

const submitAnswer = catchAsync(async (req, res) => {
  const currentQuestion = redisService.handleGetRedis('currentQuestion');
  console.log({ currentQuestion, req });
  const { answer } = req.body;
  let responseText;
  if (currentQuestion.answer === answer) {
    scheduledTimers.restartQuizTimer();
    responseText = 'Correct answer';
  } else {
    responseText = 'Wrong answer';
  }
  res.status(httpStatus.OK).send({ responseText });
});

module.exports = {
  submitAnswer,
};
