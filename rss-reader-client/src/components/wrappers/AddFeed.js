import React, { useState } from 'react';
import { useError } from './ErrorContext';
import axios from 'axios';

function AddFeed({ onFeedAdded }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [url, setUrl] = useState('');
  const { addError } = useError();

  const handleAddFeed = async () => {
    try{
        await axios.post(`${apiUrl}/add-feed`, { url });
        onFeedAdded();
    } catch (error) {
        addError('Failed to add feed ' + url);
    }
    setUrl('');
  };

    return(
        <div className="container">
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