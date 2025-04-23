import { createClient } from 'redis';

// Create Redis client
const client = createClient({
    socket: {
        host: 'localhost',
        port: 6379,
    },
});

const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
};

connectRedis();

export default client;
