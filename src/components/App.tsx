import React, { useEffect, useState } from 'react';
import FeedInterface from '../interfaces/feed.interface';
import fetchITunesFeed from '../services/services';
import transformITunesFeed from '../utils/utils';
import AlbumInterface from '../interfaces/album.interface';
import AlbumList from './album-list/AlbumList';
import DarkModeToggler from './dark-mode-toggler/DarkModeToggler';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../store/albumListSlice';
import { RootState } from '../store/store';

function App() {
  const [feed, setFeed] = useState<FeedInterface>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const updated = useSelector((state: RootState) => state.albumList.updated);
  const albums = useSelector((state: RootState) => state.albumList.albums);
  const dispatch = useDispatch();

  function getPositionShift(album: AlbumInterface): string | number {
    const oldAlbum = albums.find(
      (oldAlbum: AlbumInterface) =>
        oldAlbum.name + oldAlbum.artist.name === album.name + album.artist.name,
    );
    if (!oldAlbum) return 'new';
    let shift: string | number = album.index - oldAlbum.index;
    if (shift > 0) shift = '+' + shift;
    return shift.toString();
  }

  useEffect(() => {
    let fetchedFeed: any;
    fetchITunesFeed().then((res: any) => {
      fetchedFeed = transformITunesFeed(res.data.feed);
      fetchedFeed.albums = fetchedFeed.albums.map(
        (value: AlbumInterface, index: number) => {
          fetchedFeed.albums[index]['index'] = index;
          if (updated && updated !== fetchedFeed.updated) {
            fetchedFeed.albums[index]['positionShift'] =
              getPositionShift(value);
          }
          return fetchedFeed.albums[index];
        },
      );
      if (updated && updated !== fetchedFeed.updated) {
        dispatch(
          update({
            updated: fetchedFeed.updated,
            albums: fetchedFeed.albums,
          }),
        );
      }
      setFeed({ ...fetchedFeed, albums });
    });
  }, []);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <DarkModeToggler
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      ></DarkModeToggler>
      <div className='mx-6 my-0 md:mx-auto md:w-3/4 xl:w-3/5 2xl:w-1/2'>
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
