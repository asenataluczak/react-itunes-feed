import React, { useState } from 'react';
import Album from '../Album';
import AlbumInterface from '../../interfaces/album.interface';
import SearchBar from '../search-bar/SearchBar';

interface AlbumListProps {
  albums: Array<AlbumInterface> | undefined;
}

function AlbumList({ albums }: AlbumListProps) {
  const [filteredAlbums, setFilteredAlbums] = useState<Array<AlbumInterface>>(albums || []);

  const searchAlbum = (query: string) => {
    setFilteredAlbums(
      albums
        ? albums.filter(({ name, artist }) =>
          (`${name.toLowerCase()} ${artist.name.toLowerCase()}`).includes(query.toLowerCase()),
        )
        : [],
    );
  };

  return (
    <>
      <SearchBar search={searchAlbum}></SearchBar>
      <div>
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
              <div className='text-gray-200 text-xl text-center py-10'>No albums found</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AlbumList;
