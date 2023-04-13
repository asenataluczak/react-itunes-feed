import React, { useState } from 'react';
import Album from '../Album';
import AlbumInterface from '../../interfaces/album.interface';
import SearchBar from '../search-bar/SearchBar';
import Filter from '../filter/Filter';

interface AlbumListProps {
  albums: Array<AlbumInterface> | undefined;
}

function AlbumList({ albums }: AlbumListProps) {
  const [filteredAlbums, setFilteredAlbums] = useState<Array<AlbumInterface>>(
    albums || [],
  );

  const searchAlbum = (query: string) => {
    setFilteredAlbums(
      albums
        ? albums.filter(({ name, artist }) =>
          `${name.toLowerCase()} ${artist.name.toLowerCase()}`.includes(
            query.toLowerCase(),
          ),
        )
        : [],
    );
  };

  const getGenres = () => {
    let genres = albums?.map((album: AlbumInterface) => album.category);
    genres = Array.from(new Set(genres));
    return genres.sort();
  };

  return (
    <>
      <SearchBar search={searchAlbum}></SearchBar>
      <Filter genres={getGenres()}></Filter>
      <div className='mt-10'>
        {albums && (
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
              <div className='text-gray-200 text-xl text-center py-10'>
                No albums found
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AlbumList;
