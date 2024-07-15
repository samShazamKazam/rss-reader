import React, { useState } from 'react';
import axios from 'axios';
import ArticleList from './ArticleList.js';
import { useError } from './ErrorContext';

function Feed({ feed, onFeedRemoved  }) {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [isCollapsed, setIsCollapsed] = useState(false);
    const { addError } = useError();

    const handleRemoveFeed = async (feedUrl) => {
        try {
            await axios.post(`${apiUrl}/remove-feed`, { url: feedUrl });
            onFeedRemoved(feedUrl);
        } catch (error) {
            addError('Failed to remove feed: ' + feedUrl);
        }
    };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };


  return (
    <div>
      <div className="feed-header">
          <h3>{feed.url}</h3>
          <div className="feed-buttons">
            <button onClick={() => handleRemoveFeed(feed.url)}>Remove</button>
            <button onClick={toggleCollapse}>{isCollapsed ? 'Expand' : 'Collapse'}</button>
          </div>
      </div>
      <div>
            {!isCollapsed &&
                <ArticleList feedUrl={feed.url} articles={feed.articles} />
            }
      </div>
    </div>
  );
}

export default Feed;