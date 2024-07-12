const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const feedFilePath = 'feeds.json';
const fs = require('fs');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const parseRSS = async (url) => {
  const response = await axios.get(url);
  const data = await xml2js.parseStringPromise(response.data);
  return data.rss.channel[0].item.map(item => ({
    title: item.title[0],
    link: item.link[0],
    pubDate: item.pubDate[0],
    isRead: false
  }));
};

let feeds = [];

// Read feeds from file on startup
const loadFeeds = () => {
  if (fs.existsSync(feedFilePath)) {
    const data = fs.readFileSync(feedFilePath, 'utf8');
    feeds = JSON.parse(data);
  }
};

// Write feeds to file on shutdown
const saveFeeds = () => {
  const data = JSON.stringify(feeds, null, 2);
  fs.writeFileSync(feedFilePath, data, 'utf8');
};

// Handle shutdown
const handleShutdown = () => {
  console.log('Saving feeds to file...');
  saveFeeds();
  process.exit();
};

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);


app.post('/mark-article', async (req, res) => {
  const { feedUrl, articleLink, readStatus } = req.body;

  feed = feeds.find(feed => feed.url === feedUrl);
  if (feed) {
    const article = feed.articles.find(a => a.link === articleLink);
    if (article) {
      article.isRead = readStatus;
      res.status(200).send('Article status updated');
    } else {
      res.status(404).send('Article not found');
    }
  } else {
    res.status(404).send('Feed not found');
  }
});

app.post('/add-feed', async (req, res) => {
  const { url } = req.body;
  try {
    if (feeds.find(feed => feed.url === url)) {
         res.status(200).json({ message: 'Feed already added', feeds });
         return;
    }
    const articles = await parseRSS(url);
    feeds.push({ url, articles });
    res.status(200).json({ message: 'Feed added successfully', feeds });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add feed', error });
  }});

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
  loadFeeds(); // Load feeds when the server starts
  console.log(`Server running on http://localhost:${port}`);
});

