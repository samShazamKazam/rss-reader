import React, { useState } from 'react';
import axios from 'axios';

function Article({ feedUrl, article }) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isRead, setIsRead] = useState(article.isRead)

    const toggleReadStatus = async (link, readStatus) => {
        axios.post(`${apiUrl}/mark-article`, {
          feedUrl: feedUrl,
          articleLink: link,
          readStatus: !readStatus
        });
        setIsRead(!readStatus);
    };

  return (
        <li style={{ textDecoration: isRead ? 'line-through' : 'none' }}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}

            </a>
              <button className="mark_as_read_button" onClick={() => toggleReadStatus(article.link, isRead )}>
                  { isRead ? 'Mark as Unread' : 'Mark as Read'}
              </button>
            <p>{article.pubDate}</p>
        </li>
  );
}

export default Article;