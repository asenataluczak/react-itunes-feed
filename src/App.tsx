import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Album from './Album';
import FeedInterface from './interfaces/feed.interface';
import fetchITunesFeed from './services/services';
import transformITunesFeed from './utils/utils';

function App() {
  const [feed, setFeed] = useState<FeedInterface | null>(null);
  // TODO: Add typing and interfaces everywhere
  // TODO: Fill album component with all data
  // TODO: Add expandable functionality to the album compnent

  useEffect(() => {
    fetchITunesFeed().then((res: any) => {
      const transformedFeed = transformITunesFeed(res.data.feed);
      setFeed(transformedFeed);
    });
  }, []);

  return (
    <>
      <div className='w-1/2 mx-auto my-0'>
        <header className='App-header text-4xl text-center my-8'>
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
      <footer className='footer flex items-end justify-between px-2 pb-2'>
        <div>{feed?.rights}</div>
        <img src={feed?.icon} width='32px' alt='Rights icon' />
        <div className='text-right'>
          Updated:
          <br />
          {new Date(feed?.updated || '').toLocaleString()}
        </div>
      </footer>
    </>
  );
}

export default App;
