import React, { useState } from 'react';

interface FilterProps {
  genres: Array<string>;
}

function Filter({ genres }: FilterProps) {
  const [showPanel, setShowPanel] = useState<boolean>(false);

  return (
    <div className='flex flex-col mt-7'>
      <button
        className='relative top-4 self-center justify-self-center rounded-md border-gray-50 bg-gray-400 py-1.5 px-16 text-sm font-semibold text-gray-100 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 hover:ring-gray-300'
        onClick={() => setShowPanel(!showPanel)}
      >
        Filters
      </button>
      <div
        className={`${
          showPanel ? 'rounded-xl border' : 'border-t'
        } h-full border-gray-400 bg-gray-600 p-5`}
      >
        {showPanel && (
          <div className='w-1/2'>
            <div className='font-semibold text-gray-200'>Genres:</div>
            {genres?.map((genre) => (
              <span
                key={genre}
                className='m-1 inline-block cursor-pointer rounded-2xl border border-gray-400 bg-gray-500 py-1 px-3 text-sm text-gray-100 hover:bg-gray-400'
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
