import React, { useEffect, useState } from 'react';
import FeedInterface from '../interfaces/feed.interface';
import fetchITunesFeed from '../services/services';
import { getPositionShift, transformITunesFeed } from '../utils/utils';
import AlbumInterface from '../interfaces/album.interface';
import AlbumList from './album-list/AlbumList';
import DarkModeToggler from './dark-mode-toggler/DarkModeToggler';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../store/albumListSlice';
import { RootState } from '../store/store';

function App() {
  const [feed, setFeed] = useState<FeedInterface>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const selectUpdated = useSelector((state: RootState) => state.albumList.updated);
  const selectAlbums = useSelector((state: RootState) => state.albumList.albums);
  const dispatch = useDispatch();

  useEffect(() => {
    let fetchedFeed: any;
    fetchITunesFeed().then((res: any) => {
      fetchedFeed = transformITunesFeed(res.data.feed);
      fetchedFeed.albums = fetchedFeed.albums.map(
        (value: AlbumInterface, index: number) => {
          fetchedFeed.albums[index]['index'] = index;
          if (selectUpdated && selectUpdated !== fetchedFeed.updated) {
            fetchedFeed.albums[index]['positionShift'] = getPositionShift(
              value,
              selectAlbums,
            );
          }
          return fetchedFeed.albums[index];
        },
      );
      if (selectUpdated && selectUpdated !== fetchedFeed.updated) {
        dispatch(
          update({
            updated: fetchedFeed.updated,
            albums: fetchedFeed.albums,
          }),
        );
      }
      setFeed({ ...fetchedFeed, albums: selectAlbums });
    });
  }, []);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <DarkModeToggler
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      ></DarkModeToggler>
      <div className='mx-6 my-0 mt-12 md:mx-auto md:w-3/4 xl:w-3/5 2xl:w-1/2'>
        <header className='my-8 text-center text-4xl font-semibold text-blue dark:font-normal'>
          <h1>{feed?.title}</h1>
        </header>
        {feed && <AlbumList albums={feed.albums}></AlbumList>}
      </div>
      <div className='flex justify-center pb-2'>
        <img src={feed?.icon} width='32px' alt='Rights icon' />
      </div>
      <footer
        className='bottom-0 left-0 right-0 -mt-12 flex items-end justify-between px-2 pb-2 text-sand-300 dark:text-gray-100 xl:fixed'>
        <div>{feed?.rights}</div>
        <div className='text-right'>
          Updated:
          <br />
          {new Date(feed?.updated || '').toLocaleString()}
        </div>
      </footer>
    </div>
  );
}

export default App;
