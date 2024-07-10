import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AddFeed from './components/wrappers/AddFeed.js';
import FeedList from './components/wrappers/FeedList.js';
import RefreshFeed from './components/wrappers/RefreshFeed.js';

function App() {
  const [feeds, setFeeds] = useState([]);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  // Initial fetch on component mount
  useEffect(() => {
    fetchFeeds();
  }, []);

     const fetchFeeds = async () => {
        const response = await axios.get('http://localhost:3001/feeds');
        setFeeds(response.data);
        setLastRefreshTime(new Date().toLocaleString());
      };

    const removeFeed = async (feedUrl) => {
        setFeeds((prevFeeds) => prevFeeds.filter(feed => feed.url !== feedUrl));
    }

    return (
        <div className="App">
          <h1>RSS Reader</h1>
          <AddFeed onFeedAdded={fetchFeeds} />
          <RefreshFeed onRefreshFeed={fetchFeeds} />

          <div>
            {<p>Last refreshed: {lastRefreshTime || 'Never'}</p>}
          </div>
          <div>
              <FeedList feeds={feeds} onFeedRemoved={removeFeed} />
          </div>
        </div>
    );
}

export default App