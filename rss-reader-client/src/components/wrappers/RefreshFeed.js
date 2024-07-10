import React from 'react';

function RefreshFeed({ onRefreshFeed }) {
    const [refreshInterval, setRefreshInterval] = useState(60); // default 60 seconds

    return (
          <button onClick={handleRefreshFeeds}>Refresh Feeds</button>
          <div>
            <label>
              Refresh Interval (seconds):
              <input
                type="number"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
              />
            </label>
          </div>
          <div>
            {lastRefreshTime && <p>Last refreshed: {lastRefreshTime}</p>}
          </div>
    );
}