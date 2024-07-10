import React, { useState } from 'react';
import axios from 'axios';

function Feed({ feed, onFeedRemoved  }) {
    const [readArticles, setReadArticles] = useState(new Set());

    const handleRemoveFeed = async (feedUrl) => {
        await axios.post('http://localhost:3001/remove-feed', { url: feedUrl });
        onFeedRemoved(feedUrl);
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
    <div>
      <h2>
        {feed.url}
        <button onClick={() => handleRemoveFeed(feed.url)}>Remove</button>
      </h2>
      <ul>
        {feed.articles.map((article, idx) => (
          <li key={idx}>
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
  );
}

export default Feed;