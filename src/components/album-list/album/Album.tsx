import React, { useState } from 'react';
import AlbumInterface from '../../../interfaces/album.interface';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import PositionTracker from './position-tracker/PositionTracker';

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
      <div>
        <div className='w-8 shrink-0 text-right text-2xl font-semibold text-blue dark:font-normal'>
          {album.index + 1}.
        </div>
        {album.positionShift != undefined && album.positionShift !== '0' && (
          <PositionTracker shift={album.positionShift}></PositionTracker>
        )}
      </div>
      <div
        className='mb-6 flex w-full gap-x-4 rounded-md border border-sand-200 bg-sand-100 text-base text-sand-400 dark:border-gray-300 dark:bg-gray-500 dark:text-gray-50'>
        <img
          src={album.coverImg}
          className={`rounded-l-md transition-all ${
            isExpanded ? 'h-48 w-48' : 'h-24 w-24'
          }`}
        />
        <div className='flex h-full flex-col'>
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
              Release Date:{' '}
              {new Date(album.releaseDate || '').toLocaleDateString()}
            </div>
          )}
        </div>
        <button className='ml-auto mt-auto p-1' onClick={toggleExpandable}>
          {isExpanded ? (
            <ChevronUpIcon className='mr-1 h-5 w-5'></ChevronUpIcon>
          ) : (
            <ChevronDownIcon className='mr-1 h-5 w-5'></ChevronDownIcon>
          )}
        </button>
      </div>
    </div>
  );
}

export default Album;
