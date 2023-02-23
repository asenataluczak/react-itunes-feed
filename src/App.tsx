import React, { useEffect, useState } from 'react';
import './App.scss';
import Album from './Album';
import FeedInterface from './interfaces/feed.interface';
import fetchITunesFeed from './services/services';
import transformITunesFeed from './utils/utils';

function App() {
  const [feed, setFeed] = useState<FeedInterface | null>(null);
  // TODO: Add typing and interfaces everywhere

  useEffect(() => {
    fetchITunesFeed().then((res: any) => {
      const transformedFeed = transformITunesFeed(res.data.feed);
      setFeed(transformedFeed);
    });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>{feed?.title}</h1>
      </header>
      {feed && (
        <div>
          {feed.albums.map((album: any, index: number) => (
            <Album
              key={index}
              index={index}
              name={album.name}
              artist={album.artist}
              coverImg={album.coverImg}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
