const { Question } = require('../models');

/**
 * Get random question
 *
 * @returns {Promise<Question>}
 */
const getRandomQuestion = async () => {
  return Question.aggregate([{ $sample: { size: 1 } }]);
};

module.exports = {
  getRandomQuestion,
};
