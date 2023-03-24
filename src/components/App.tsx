import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import Album from './Album';
import FeedInterface from '../interfaces/feed.interface';
import fetchITunesFeed from '../services/services';
import transformITunesFeed from '../utils/utils';
import SearchBar from './search-bar/SearchBar';
import AlbumInterface from '../interfaces/album.interface';

function App() {
  const [feed, setFeed] = useState<FeedInterface>();
  const [filteredAlbums, setFilteredAlbums] = useState<Array<AlbumInterface>>();

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
      setFilteredAlbums(transformedFeed.albums);
    });
  }, []);

  const searchAlbum = (query: string) => {
    setFilteredAlbums(
      feed?.albums
        ? feed.albums.filter(({ name, artist }) =>
          (`${name.toLowerCase()} ${artist.name.toLowerCase()}`).includes(query.toLowerCase()),
        )
        : [],
    );
  };

  return (
    <>
      <div className='w-1/2 mx-auto my-0'>
        <header className='text-blue text-4xl text-center my-8'>
          <h1>{feed?.title}</h1>
        </header>
        <SearchBar search={searchAlbum}></SearchBar>
        {feed && (
          <div className='mt-6'>
            {filteredAlbums?.length ? (
              filteredAlbums?.map((album: any, index: number) => (
                <Album
                  key={index}
                  index={album.index}
                  name={album.name}
                  artist={album.artist}
                  coverImg={album.coverImg}
                  category={album.category}
                  releaseDate={album.releaseDate}
                  price={album.price}
                />
              ))
            ) : (
              <div className='text-gray-100 text-xl text-center py-10'>No albums found</div>
            )}
            <div className='flex justify-center pb-2'>
              <img src={feed?.icon} width='32px' alt='Rights icon' />
            </div>
          </div>
        )}
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
