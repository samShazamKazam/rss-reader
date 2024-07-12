import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AddFeed from './AddFeed.js';
import FeedList from './FeedList.js';
import RefreshFeed from './RefreshFeed.js';

function Feeds() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [feeds, setFeeds] = useState([]);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  // Initial fetch on component mount
  useEffect(() => {
    fetchFeeds();
  }, []);

   const fetchFeeds = async () => {
      const response = await axios.get(`${apiUrl}/feeds`);
      setFeeds(response.data);
      setLastRefreshTime(new Date().toLocaleString());
    };

    const removeFeed = async (feedUrl) => {
      setFeeds((prevFeeds) => prevFeeds.filter(feed => feed.url !== feedUrl));
    }

    return(
      <div>
          <AddFeed onFeedAdded={fetchFeeds} />
          <RefreshFeed onRefreshFeed={fetchFeeds} />
          <div>
            {<p>Last refreshed: {lastRefreshTime || 'Never'}</p>}
          </div>
          <FeedList feeds={feeds} onFeedRemoved={removeFeed}  />
      </div>
    );
}

export default Feeds;