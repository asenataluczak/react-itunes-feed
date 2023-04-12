import React, { useState } from 'react';
import AlbumInterface from '../interfaces/album.interface';

interface AlbumPropsInterface extends Partial<AlbumInterface> {
  index: number;
}

function Album(album: AlbumPropsInterface) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function toggleExpandable() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className='flex gap-4 '>
      <div className='text-blue text-2xl text-right w-8 shrink-0'>{album.index + 1}.</div>
      <div className='text-gray-50 bg-gray-500 border border-gray-300 flex rounded-md w-full gap-x-4 text-base mb-6'>
        <img
          src={album.coverImg}
          className={`rounded-l-md transition-all ${isExpanded ? 'w-48 h-48' : 'w-24 h-24'}`}
        />
        <div className='h-full flex flex-col'>
          <div className='text-xl'>{album.name}</div>
          <div>
            <a href={album.artist?.link}>{album.artist?.name}</a>
          </div>
          {isExpanded && (
            <div className='mt-auto pb-1'>
              Genre: {album.category}
              <br />
              Price: {album.price}
              <br />
              Release Date: {new Date(album.releaseDate || '').toLocaleDateString()}
            </div>
          )}
        </div>
        <button className='ml-auto mt-auto p-1' onClick={toggleExpandable}>
          {isExpanded ? 'See less' : 'See more'}
        </button>
      </div>
    </div>
  );
}

export default Album;
