import React, { useState } from 'react';
import axios from 'axios';

function AddFeed({ onFeedAdded }) {

  const [url, setUrl] = useState('');

  const handleAddFeed = async () => {
    const response = await axios.post('http://localhost:3001/add-feed', { url });
//    setFeeds(response.data.feeds);
    onFeedAdded();
    setUrl('');
  };

    return(
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter RSS feed URL"
          />
          <button onClick={handleAddFeed}>Add Feed</button>
        </div>
    )
}

export default AddFeed;