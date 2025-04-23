import express from 'express';
import { getTrendingHashtags } from '../controllers/trendingController.js';

const router = express.Router();

// GET /trending-hashtags - Return the top 25 hashtags
router.get('/', getTrendingHashtags);

export default router;
