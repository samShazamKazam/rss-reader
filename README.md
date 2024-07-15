# RSS Reader

RSS reader to fetch and display RSS feeds

# Features
-   Add Feed: Users can add new RSS feed URLs to the reader to start receiving updates.
-   Remove Feed: Users can remove RSS feed URLs they no longer wish to follow.
-   Automatic Refresh: The reader periodically checks for new content and updates the list of articles automatically.
-   Manual Refresh: Users can manually refresh the feed list to get the latest updates.
-   List View: Displays a list of articles from the subscribed feeds, usually with the title, publication date, and a brief summary.
-   Mark as Read/Unread: Users can mark articles as read or unread to keep track of what they have or haven't read.
-   Read Indicators: The reader visually distinguishes between read and unread articles.
-   Add a display for the last refreshed time
-   Expand/collapse the feeds
-   Add a display for error messages

# Components
There are two components: the server which keeps track of the feeds and the client/frontend 
react app which fetches and updates the feed

### server
to run the server

 ```
 npm install express axios body-parser rss-parser
 node server.js
 ```

### client
to run the client
 
```
cd rss-reader-client
npm install axios react-scripts 
npm start
```

# Improvement Wishlist
- Saving to a file is fine, but if we want to offer a service, then we would remove saving the feeds to a file and 
save it to a database. This way the same feed can be shared with multiple users. It can also be updated in a central service.

- There would be a table for the feeds globally shared (of columns ID, url, article, update timestamp) and a table to save the user's feed state (for example Mark as Read) (of columns feed ID, article ID, Read status)
- The workload of fetching the list of articles for feeds should be distributed among workers 
which update the feeds in the feed table (content and timestamp). 
- The client can then periodically fetch the feeds whose update timestamp is after a given last refresh timestamp. 
- User experience can be improved by adding loading indicators and hover effects
