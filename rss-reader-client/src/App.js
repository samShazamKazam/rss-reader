import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [feeds, setFeeds] = useState([]);
  const [url, setUrl] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(60); // default 60 seconds
  const intervalRef = useRef(null);
  const [readArticles, setReadArticles] = useState(new Set());
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  // Initial fetch on component mount
  useEffect(() => {
    fetchFeeds();
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(fetchFeeds, refreshInterval * 1000);
    return () => clearInterval(intervalRef.current);
  }, [refreshInterval]);

  const fetchFeeds = async () => {
    const response = await axios.get('http://localhost:3001/feeds');
    setFeeds(response.data);
    setLastRefreshTime(new Date().toLocaleString());
  };

  const handleAddFeed = async () => {
    const response = await axios.post('http://localhost:3001/add-feed', { url });
    setFeeds(response.data.feeds);
    setUrl('');
  };

  const handleRemoveFeed = async (feedUrl) => {
    await axios.post('http://localhost:3001/remove-feed', { url: feedUrl });
    setFeeds((prevFeeds) => prevFeeds.filter(feed => feed.url !== feedUrl));
  };

  const handleRefreshFeeds = async () => {
    fetchFeeds();
  };

  const toggleReadStatus = (link) => {
      setReadArticles((prevReadArticles) => {
        const newReadArticles = new Set(prevReadArticles);
        if (newReadArticles.has(link)) {
          newReadArticles.delete(link);
        } else {
          newReadArticles.add(link);
        }
        return newReadArticles;
      });
  };



  return (
    <div className="App">
      <h1>RSS Reader</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter RSS feed URL"
      />
      <button onClick={handleAddFeed}>Add Feed</button>
      <button onClick={handleRefreshFeeds}>Refresh Feeds</button>
      <div>
        <label>
          Refresh Interval (seconds):
          <input
            type="number"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        {lastRefreshTime && <p>Last refreshed: {lastRefreshTime}</p>}
      </div>
      <div>
        {feeds.map((feed, index) => (
          <div key={index}>
            <h2>
              {feed.url}
              <button onClick={() => handleRemoveFeed(feed.url)}>Remove</button>
            </h2>
            <ul>
              {feed.articles.map((article, idx) => (
                <li key={idx} style={{ textDecoration: readArticles.has(article.link) ? 'line-through' : 'none' }}>
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                  <p>{article.pubDate}</p>
                  <button onClick={() => toggleReadStatus(article.link)}>
                    {readArticles.has(article.link) ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
