import React, { useEffect, useState } from 'react';
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
  const [genres, setGenres] = useState<Array<string>>([]);

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

  const filterByGenre = (genres: Array<string>) => {
    setGenres(genres);
  };

  useEffect(() => {
    if (!genres.length && albums) {
      setFilteredAlbums(albums);
      return;
    }
    setFilteredAlbums(
      albums?.filter((album: AlbumInterface) =>
        genres.includes(album.category),
      ) || [],
    );
  }, [genres]);

  return (
    <>
      <SearchBar search={searchAlbum}></SearchBar>
      <Filter genres={getGenres()} filter={filterByGenre}></Filter>
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
              <div className='py-10 text-center text-xl text-gray-200'>
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
