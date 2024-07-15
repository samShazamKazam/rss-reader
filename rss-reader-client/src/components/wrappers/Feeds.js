import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import AddFeed from './AddFeed.js';
import FeedList from './FeedList.js';
import RefreshFeed from './RefreshFeed.js';
import ErrorDisplay from './ErrorDisplay.js';
import { useError } from './ErrorContext';

function Feeds() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [feeds, setFeeds] = useState([]);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const { addError } = useError();

  // Initial fetch on component mount
  useEffect(() => {
    fetchFeeds();
  }, []);

   const fetchFeeds = async () => {
      try {
        const response = await axios.get(`${apiUrl}/feeds`);
        setFeeds(response.data);
      } catch (error) {
        addError('Failed to fetch feeds: ' + error);
      }
      setLastRefreshTime(new Date().toLocaleString());
    };

   const updateFeeds = async () => {
        try{
            const response = await axios.post(`${apiUrl}/update-feeds`);
            setFeeds(response.data.feeds);
        } catch (error) {
            addError('Failed to refresh feeds: ' + error);
        }
        setLastRefreshTime(new Date().toLocaleString());
    };

    const removeFeed = async (feedUrl) => {
      setFeeds((prevFeeds) => prevFeeds.filter(feed => feed.url !== feedUrl));
    }

    return(
      <div>
          <ErrorDisplay />
          <AddFeed onFeedAdded={fetchFeeds} />
          <RefreshFeed onRefreshFeed={updateFeeds} />
          <div>
            {<p>Last refreshed: {lastRefreshTime || 'Never'}</p>}
          </div>
          <FeedList feeds={feeds} onFeedRemoved={removeFeed}  />
      </div>
    );
}

export default Feeds;