import { RedisClientType, createClient } from "redis";
let redisClient: RedisClientType

async function connectRedis(): Promise<RedisClientType> {
    redisClient = createClient()
    await redisClient.connect()
    redisClient.on('connect', () => console.log('Redis connected'))
    redisClient.on('error', err => console.log('Redis Client Error', err));
    return redisClient
}

export {
    connectRedis
}