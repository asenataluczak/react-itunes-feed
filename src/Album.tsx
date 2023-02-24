import React from 'react';
import './styles/Album.scss';
import AlbumInterface from './interfaces/album.interface';

interface AlbumPropsInterface extends Partial<AlbumInterface> {
  index: number;
}

function Album(album: AlbumPropsInterface) {
  return (
    <div className='flex gap-4 '>
      <div className='Album-index text-2xl text-right'>{album.index + 1}.</div>
      <div className='Album flex rounded-md w-full gap-x-4 text-base mb-6'>
        <img src={album.coverImg} className='rounded-l-md' />
        <div>
          <div className='text-xl mt-1'>{album.name}</div>
          <div>{album.artist?.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Album;
