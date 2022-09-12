const CronJob = require('node-cron');
const logger = require('../config/logger');
const redisPubSub = require('../redis/index');

const scheduledJobFunction = CronJob.schedule('*/1 * * * *', () => {
  logger.info("I'm executed on a schedule!");
  redisPubSub.publishToTopic('quizSession', { id: 1, question: 'What is 1 + 1?' });
  logger.info('pub sub ran');
});

exports.initScheduledJobs = () => {
  scheduledJobFunction.start();
};
exports.restartScheduledJobs = () => {
  scheduledJobFunction.stop();
  scheduledJobFunction.start();
};
