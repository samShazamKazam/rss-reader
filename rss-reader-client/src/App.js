import React from 'react';
import Feeds from './components/wrappers/Feeds.js';
import { ErrorProvider } from './components/wrappers/ErrorContext.js';

function App() {
    return (
        <div className="App">
          <h1 style={{"text-align": "center"}}>RSS Reader</h1>
          <ErrorProvider>
            <Feeds/>
          </ErrorProvider>
        </div>
    );
}

export default App