import React, { useState } from 'react';
import Album from '../Album';
import AlbumInterface from '../../interfaces/album.interface';
import AlbumListModifier from '../album-list-modifier/AlbumListModifier';

interface AlbumListProps {
  albums: Array<AlbumInterface> | undefined;
}

function AlbumList({ albums }: AlbumListProps) {
  const [filteredAlbums, setFilteredAlbums] = useState<Array<AlbumInterface>>(
    albums || [],
  );

  return (
    <>
      <AlbumListModifier albums={albums} setFilteredAlbums={setFilteredAlbums}></AlbumListModifier>
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
              <div className='py-10 text-center text-xl dark:text-gray-200 text-sand-300'>
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
