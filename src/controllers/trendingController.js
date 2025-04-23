import { getTopHashtags } from '../models/hashtags.js';

export const getTrendingHashtags = async (req, res) => {
    try {
        // Get top 25 hashtags from the model (which fetches from Redis)
        const trendingHashtags = await getTopHashtags();  

        res.status(200).json({ hashtags: trendingHashtags });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};
