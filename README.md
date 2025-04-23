# Charter Take Home Assignment – Twitter Trending Hashtags

## Overview

This Node.js application receives tweet-like requests, extracts hashtags, and tracks the top 25 trending hashtags in real time. It is designed for scalability, durability, and efficiency, using Redis for both data storage and deduplication.

## Prerequisites

- **Node.js** (v18 or later recommended)
- **Redis** server running locally (default: `localhost:6379`)

## Setup

1. **Clone or download** this repository.

2. **Install dependencies:**
``` npm install ```

3. **Start Redis** (if not already running).  
    -- On most systems: ``` redis-server ```

## Running the Application

**Start the Server** 
``` npm start ```

You should see output like:

Server running at http://localhost:8080
Connected to Redis

## Features

- **Deduplication:**  
  Tweets are deduplicated based on their exact text content only.  
  This means if the same tweet message is posted multiple times (regardless of who posts it), it will only be processed once within the deduplication window (currently 1 hour).  
  Note: Since user information is not tracked, identical tweets from different users are treated as duplicates and counted only once.

- **Persistence:**  
  Hashtag counts and deduplication survive server restarts as long as Redis persistence is enabled.

- **Scalability:**  
  Uses Redis sorted sets for efficient, real-time top-25 queries even with millions of unique hashtags.

- **Rate Limiting:**  
  API is protected by rate limiting to prevent abuse.

## Testing

- This project does not include automated tests (e.g., Jest, Vitest).  
- Adding automated tests can be a future enhancement for improved code quality and reliability.


