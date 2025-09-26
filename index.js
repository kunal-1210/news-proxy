const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Route: fetch news
app.get('/top-headlines', async (req, res) => {
  try {
    const { country, category, q } = req.query;
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: country || 'us',
        category: category || 'general',
        q: q || '',
        apiKey: process.env.NEWS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
