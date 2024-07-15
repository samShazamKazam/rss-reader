import React, { useState } from 'react';
import axios from 'axios';

function Article({ feedUrl, article }) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isRead, setIsRead] = useState(article.isRead)

    const toggleReadStatus = async (url, link, readStatus) => {
        try {
            axios.post(`${apiUrl}/mark-article`, {
              feedUrl: url,
              articleLink: link,
              readStatus: !readStatus
            });
        } catch (error) {
        }
        setIsRead(!readStatus);
    };

  return (
        <li style={{ textDecoration: isRead ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={isRead}  className="mark-as-read-button"
                    onChange={() =>  toggleReadStatus(feedUrl, article.link, isRead)}
                    title={isRead ? 'Mark as unread' : 'Mark as read'}
            />
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.pubDate}</p>
        </li>
  );
}

export default Article;