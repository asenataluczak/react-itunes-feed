import React from 'react';
import './Album.scss';

// @ts-ignore
function Album(props) {
  return (
    <div className='test'>
      <div className='Album-index'>{props.index + 1}.</div>
      <div className='Album'>
        <img src={props.image} />
        <div>
          <div className='Album-header'>{props.name}</div>
          <div>{props.artist}</div>
        </div>
      </div>
    </div>
  )
}

export default Album;
