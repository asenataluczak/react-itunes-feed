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

  // dark mode przeniósłbym do store, nie musiałabyś wtedy również przekazywać później tego w dół
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Te selectory sugerowałbym wyciągnąć na zewnątrz, albo zrobić dedykowane np. useAlbums, albo samą tylko funkcję przekazywaną do useSelector
  const selectUpdated = useSelector((state: RootState) => state.albumList.updated);
  const selectAlbums = useSelector((state: RootState) => state.albumList.albums);
  const dispatch = useDispatch();

  useEffect(() => {
    let fetchedFeed: any;
    // zastanowiłbym się nad wyciągnięciem tej logiki, pierwsze wrażenie: ściana tekstu
    fetchITunesFeed().then((res: any) => {
      fetchedFeed = transformITunesFeed(res.data.feed); // fajnie, że zrobiłaś warstwę abstrakcji mapującą dane z API na model dla view
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
      // a może by tak spróbować użyć dedykowanego narzędzia do pracy z API reduxa? https://redux-toolkit.js.org/rtk-query/overview
    });
  }, []); // jesteś pewna, że nie powinnaś tutaj dodać żadnych depsów do tablicy?


  // poświęciłbym trochę więcej pracy nad samą strukturą HTML/komponentów. Część komponentów nie ma sensu renderować wcale, jeśli np. feed === null. Zabezpieczaj się przed tym jak najwyżej, a w komponentach wymagaj przekazania paramu już nie jako Nullable
  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <DarkModeToggler // ten komponent imo po prostu trzeba by podpiąć do store, powinien on mutować isDarkModeEnabled w storze
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
