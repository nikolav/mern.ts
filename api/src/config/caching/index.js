const connectRedis = require('./redis');
const { redis } = require('../vars');
const { identity } = require('../../utils');

module.exports = {
  cached: async ({ key, data = () => '', decode = identity }) => {
    const client = await connectRedis();
    const cache = await client.get(key);

    // cache exists, parse/return
    if (null != cache) return decode(cache);

    // get new string.cache
    const newCache = await data();
    await client.set(key, newCache, { EX: redis.exiration });

    return newCache;
  },
};
