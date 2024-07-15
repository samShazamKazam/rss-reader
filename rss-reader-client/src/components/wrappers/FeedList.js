import React from 'react';
import Feed from './Feed.js';

function FeedList({ feeds, onFeedRemoved }) {
  return (
    <div>
      <h2>Feeds:</h2>
      {  feeds.map((feed, index) =>
            <Feed key={index} feed={feed} onFeedRemoved={onFeedRemoved}/>
        )}
    </div>
  );
}

export default FeedList;
