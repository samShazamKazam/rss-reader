import React, { useState } from 'react';
import axios from 'axios';

function AddFeed({ onFeedAdded }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [url, setUrl] = useState('');

  const handleAddFeed = async () => {
    await axios.post(`${apiUrl}/add-feed`, { url });

    onFeedAdded();
    setUrl('');
  };

    return(
        <div>
          <input
            className="add-url-txt-field"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter RSS feed URL"
          />
          <button className="add-url-btn" onClick={handleAddFeed}>Add Feed</button>
        </div>
    )
}

export default AddFeed;