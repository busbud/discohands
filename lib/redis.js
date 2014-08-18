var url = require('url');

var redis = require('redis');

var redis_url = url.parse(
  process.env.REDISCLOUD_URL ||
  process.env.REDIS_URL ||
  'redis://localhost:6379'
);

var client = redis.createClient(redis_url.port, redis_url.hostname);
if (redis_url.auth) {
  client.auth(redis_url.auth.split(':')[1]);
}

module.exports = client;
