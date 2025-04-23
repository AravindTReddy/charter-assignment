import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from '../redisClient.js';

// Middleware for rate limiting using Redis as the store
const rateLimiter = (maxRequests, windowMs) => {
    return rateLimit({
        store: new RedisStore({
            sendCommand: (...args) => redisClient.sendCommand(args),
        }),
        windowMs,
        max: maxRequests,
        message: 'Rate limit exceeded. Try again later.',
    });
};

export default rateLimiter;
