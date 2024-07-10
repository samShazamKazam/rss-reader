import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AddFeed from './components/wrappers/AddFeed.js';
import FeedList from './components/wrappers/FeedList.js';

function App() {
  const [feeds, setFeeds] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(60); // default 60 seconds
  const intervalRef = useRef(null);
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

const removeFeed = async (feedUrl) => {
    setFeeds((prevFeeds) => prevFeeds.filter(feed => feed.url !== feedUrl));
}


 const handleRefreshFeeds = async () => {
    fetchFeeds();
  };



        return (
            <div className="App">
              <h1>RSS Reader</h1>
              <AddFeed onFeedAdded={fetchFeeds} />
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
                  <FeedList feeds={feeds} onFeedRemoved={removeFeed} />
              </div>
            </div>
        );
}

export default App