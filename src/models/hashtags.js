import redisClient from '../redisClient.js';

// Function to increment hashtag count in Redis
export const incrementHashtag = async (hashtag) => {
    try {
        if (typeof hashtag === 'string' && hashtag.trim() !== '') {
            // Increment the hashtag count in Redis using ZINCRBY
            await redisClient.zIncrBy('hashtags', 1, hashtag);
        } else {
            console.error('Invalid hashtag:', hashtag); 
        }
    } catch (err) {
        console.error(`Error incrementing hashtag: ${hashtag}`, err);
    }
};

// Function to get top 25 trending hashtags from Redis
export const getTopHashtags = async () => {
    try {
        const result = await redisClient.zRange('hashtags', 0, 24, { REV: true });
        return result;
    } catch (err) {
        console.error('Error getting top hashtags', err);
        return [];
    }
};
