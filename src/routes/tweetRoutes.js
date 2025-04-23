import express from 'express';
import { processTweet } from '../controllers/tweetController.js';

const router = express.Router();

// POST /tweet - Receive a tweet and process hashtags
router.post('/', processTweet);

export default router;
