import React, { useState, useEffect, useRef }  from 'react';

function RefreshFeed({ onRefreshFeed }) {
    const [refreshInterval, setRefreshInterval] = useState(60); // default 60 seconds
    const intervalRef = useRef(null);

      useEffect(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(onRefreshFeed, refreshInterval * 1000);
        return () => clearInterval(intervalRef.current);
      }, [refreshInterval]);

    return (
        <div>
          <button onClick={onRefreshFeed}>Refresh Feeds</button>
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
        </div>
    );
}

export default RefreshFeed;