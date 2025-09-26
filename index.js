const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Route: fetch top headlines
app.get('/top-headlines', async (req, res) => {
  try {
    const { country, category, q } = req.query;
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: country || '',       // empty string = all countries
        category: category || '',     // empty string = all categories
        q: q || '',                   // optional search query
        apiKey: process.env.NEWS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Top headlines error:', error.message);
    res.status(500).json({ error: 'Failed to fetch top headlines' });
  }
});

// Route: fetch everything (all news)
app.get('/everything', async (req, res) => {
  try {
    const { q } = req.query;
    const query = q || 'latest';  // fallback if no query is provided
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        apiKey: process.env.NEWS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Everything endpoint error:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
