  const [feeds, setFeeds] = useState([]);
  const [url, setUrl] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(60); // default 60 seconds
  const intervalRef = useRef(null);
  const [readArticles, setReadArticles] = useState(new Set());
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

export const fetchFeeds = async () => {
    const response = await axios.get('http://localhost:3001/feeds');
    setFeeds(response.data);
    setLastRefreshTime(new Date().toLocaleString());
  };

export const handleAddFeed = async () => {
    const response = await axios.post('http://localhost:3001/add-feed', { url });
    setFeeds(response.data.feeds);
    setUrl('');
  };

export const handleRemoveFeed = async (feedUrl) => {
    await axios.post('http://localhost:3001/remove-feed', { url: feedUrl });
    setFeeds((prevFeeds) => prevFeeds.filter(feed => feed.url !== feedUrl));
  };

export const handleRefreshFeeds = async () => {
    fetchFeeds();
  };

export const toggleReadStatus = (link) => {
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