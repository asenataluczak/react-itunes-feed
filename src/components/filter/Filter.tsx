import React, { useEffect, useState } from 'react';

interface FilterProps {
  genres: Array<string>;
  filter: (genres: Array<string>) => void | undefined;
}

function Filter({ genres, filter }: FilterProps) {
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);

  const addRemoveGenre = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([genre, ...selectedGenres]);
    }
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((val: string) => val !== genre));
    }
  };

  useEffect(() => {
    filter(selectedGenres);
    setFilterOn(!!selectedGenres.length);
  }, [selectedGenres]);

  return (
    <div className='mt-7 flex flex-col'>
      <button
        className={`${
          filterOn ? 'ring-blue' : 'ring-gray-300'
        } relative top-4 self-center justify-self-center rounded-md bg-gray-400 py-1.5 px-16 text-sm font-semibold text-gray-100 ring-1 ring-inset hover:bg-gray-300 `}
        onClick={() => setShowPanel(!showPanel)}
      >
        Filters
      </button>
      <div
        className={`${showPanel ? 'rounded-xl border' : 'border-t'} ${
          filterOn ? 'border-blue' : 'border-gray-400'
        } h-full bg-gray-600 p-5`}
      >
        {showPanel && (
          <div className='w-1/2'>
            <div className='font-semibold text-gray-200'>Genres:</div>
            {genres?.map((genre) => (
              <span
                key={genre}
                className={`${
                  selectedGenres.includes(genre)
                    ? 'border-blue'
                    : 'border-gray-400'
                } m-1 inline-block cursor-pointer rounded-2xl border bg-gray-500 py-1 px-3 text-sm text-gray-100 hover:bg-gray-400`}
                onClick={() => addRemoveGenre(genre)}
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
