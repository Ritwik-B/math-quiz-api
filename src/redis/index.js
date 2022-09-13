const redis = require('redis');

const client = redis.createClient();

(async () => {
  await client.connect();
})();

const publishToTopic = (topic, payload) => {
  client.publish(topic, JSON.stringify(payload));
};

const handleSetRedis = async (key, value) => client.set(key, JSON.stringify(value));

const handleGetRedis = async (key) => client.get(key);

module.exports = {
  publishToTopic,
  handleSetRedis,
  handleGetRedis,
};
