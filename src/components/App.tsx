import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import FeedInterface from '../interfaces/feed.interface';
import fetchITunesFeed from '../services/services';
import transformITunesFeed from '../utils/utils';
import AlbumInterface from '../interfaces/album.interface';
import AlbumList from './album-list/AlbumList';

function App() {
  const [feed, setFeed] = useState<FeedInterface>();

  useEffect(() => {
    fetchITunesFeed().then((res: any) => {
      const transformedFeed = transformITunesFeed(res.data.feed);
      transformedFeed.albums = transformedFeed.albums.map(
        (value: AlbumInterface, index: number) => {
          transformedFeed.albums[index]['index'] = index;
          return transformedFeed.albums[index];
        },
      );
      setFeed(transformedFeed);
    });
  }, []);

  return (
    <>
      <div className='w-1/2 mx-auto my-0'>
        <header className='text-blue text-4xl text-center my-8'>
          <h1>{feed?.title}</h1>
        </header>
        {feed && <AlbumList albums={feed?.albums}></AlbumList>}
      </div>
      <div className='flex justify-center pb-2'>
        <img src={feed?.icon} width='32px' alt='Rights icon' />
      </div>
      <footer className='text-gray-100 flex items-end justify-between px-2 pb-2 fixed bottom-0 left-0 right-0'>
        <div>{feed?.rights}</div>
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
