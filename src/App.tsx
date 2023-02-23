import React, { useEffect, useState } from 'react';
import './App.scss';
import Album from './Album';
import axios from 'axios';

function App() {
  const [feed, setFeed] = useState<Array<any> | null>(null);
  // TODO: Add typing and interfaces everywhere
  // TODO: Extract axios to service
  // TODO: Prepare entry object, add interface to it, pass complete needed data

  useEffect(() => {
    axios
      .get(`https://itunes.apple.com/us/rss/topalbums/limit=100/json`)
      .then((res) => {
        setFeed(res.data.feed.entry);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // @ts-ignore
  // @ts-ignore
    // @ts-ignore
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>iTunes top 100 albums</h1>
        </header>
        {feed && (
          <div>
            {feed.map((entry: any, index: number) => (
              <Album
                key={index}
                name={entry['im:name'].label}
                artist={entry['im:artist'].label}
                image={entry['im:image'][2].label}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    )
}

export default App;
