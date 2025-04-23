import express from 'express';
import tweetRoutes from './routes/tweetRoutes.js';
import trendingRoutes from './routes/trendingRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();
const port = 8080;

//Middleware to parse JSON
app.use(express.json());

// rate limiting middleware
app.use(rateLimiter(1000, 15 * 60 * 1000)); // Ex: Max 1000 requests in 15 minutes

app.get('/', (req, res) => {
    res.send('Hello, Charter take home assignment!');
})

// Use routes
app.use('/tweet', tweetRoutes);
app.use('/trending-hashtags', trendingRoutes);

//Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})