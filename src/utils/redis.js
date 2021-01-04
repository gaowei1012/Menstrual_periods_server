const Redis = require('ioredis')
const {redisbase} = require('../config')

const redis = {
    port: redisbase.PORT,
    host: redisbase.HOST,
    prefix: 'sam:',
    ttl: 60 * 60 * 23,   
    family: 4,
    db: 1
}
const RedisClient = new Redis(redis)
module.exports = RedisClient
