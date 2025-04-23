import crypto from 'crypto';
import redisClient from '../redisClient.js';
import { incrementHashtag } from '../models/hashtags.js';

export const processTweet = async (req, res) => {
    const tweet = req.body?.tweet;

    if (!tweet) {
        return res.status(400).send({ message: 'Tweet content is required' });
    }

    // Generate a SHA-256 hash of the tweet content
    const tweetHash = crypto.createHash('sha256').update(tweet.trim()).digest('hex');
    const redisKey = `tweet:${tweetHash}`;

    try {
        /* Set the hash in Redis with NX (only set if not exists), 
           expire after 1 hour (3600 seconds) */
        const isNewTweet = await redisClient.set(redisKey, '1', { NX: true, EX: 3600 });

        if (!isNewTweet) {
            return res.status(200).send({ message: 'Duplicate tweet ignored' });
        }

        const hashtags = tweet.match(/#\w+/g);
        if (hashtags) {
            for (const hashtag of hashtags) {
                await incrementHashtag(hashtag);
            }
        }

        res.status(200).send({ message: 'Tweet received and hashtags processed' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error. Please try again later.' });
    }
};
