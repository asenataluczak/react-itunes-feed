import React from 'react';
import './Album.scss';
import AlbumInterface from './interfaces/album.interface';

interface AlbumPropsInterface extends Partial<AlbumInterface> {
  index: number;
}

function Album(album: AlbumPropsInterface) {
  return (
    <div className='test'>
      <div className='Album-index'>{album.index + 1}.</div>
      <div className='Album'>
        <img src={album.coverImg} />
        <div>
          <div className='Album-header'>{album.name}</div>
          <div>{album.artist?.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Album;
