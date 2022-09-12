const redis = require('redis');

const client = redis.createClient();

(async () => {
  await client.connect();
})();

const publishToTopic = (topic, payload) => {
  client.publish(topic, JSON.stringify(payload));
};

module.exports = {
  publishToTopic,
};
