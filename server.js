const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');

const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your client URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const parseRSS = async (url) => {
  const response = await axios.get(url);
  console.log('response: ' + response)
  const data = await xml2js.parseStringPromise(response.data);
  return data.rss.channel[0].item.map(item => ({
    title: item.title[0],
    link: item.link[0],
    pubDate: item.pubDate[0]
  }));
};

let feeds = [];

app.post('/add-feed', async (req, res) => {
  const { url } = req.body;
  try {
    console.log('url:' + url)
    const articles = await parseRSS(url);
    feeds.push({ url, articles });
    res.status(200).json({ message: 'Feed added successfully', feeds });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add feed', error });
  }
});

app.post('/remove-feed', (req, res) => {
  const { url } = req.body;
  feeds = feeds.filter(feed => feed.url !== url);
  res.status(200).json({ message: 'Feed removed successfully', feeds });
});

app.get('/feeds', (req, res) => {
  res.status(200).json(feeds);
});

app.post('/fetch-feed', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    const articles = await parseRSS(response.data);
    res.json({ url, articles });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

