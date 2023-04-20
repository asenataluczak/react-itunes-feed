import React, { useEffect, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import ReactSlider from 'react-slider';
import FilterQuery from '../../interfaces/filter-query.interface';

interface FilterProps {
  entryData: {
    genres: Array<string>;
    maxPrice: number;
  };
  filter: (filterQuery: FilterQuery) => void | undefined;
}

function Filter({ entryData, filter }: FilterProps) {
  const { genres, maxPrice } = entryData;
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<Array<number>>(
    [],
  );

  const addRemoveGenre = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([genre, ...selectedGenres]);
    }
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((val: string) => val !== genre));
    }
  };

  const updatePriceRange = (values: Array<number>) => {
    setSelectedPriceRange(values);
  };

  const ifPriceRangeChanged = ([start, end]: Array<number>) => {
    if (!start && !end) {
      return false;
    }
    return start !== 0 || end !== maxPrice;
  };

  const resetGenres = () => {
    setSelectedGenres([]);
    setSelectedPriceRange([]);
  };

  useEffect(() => {
    filter({
      genres: selectedGenres,
      priceRange: ifPriceRangeChanged(selectedPriceRange)
        ? selectedPriceRange
        : [],
    });
    setFilterOn(
      !!selectedGenres.length || ifPriceRangeChanged(selectedPriceRange),
    );
  }, [selectedGenres, selectedPriceRange]);

  return (
    <div className='mt-7 flex flex-col'>
      <div className='relative top-4 self-center justify-self-center '>
        <button
          className={`${
            filterOn
              ? 'ring-2 ring-blue dark:ring-1'
              : 'ring-1 ring-sand-200 dark:ring-gray-300'
          } relative rounded-md bg-sand-100 py-1.5 px-12 align-middle text-sm font-semibold text-sand-400  ring-inset hover:bg-sand-200 dark:bg-gray-400 dark:text-gray-100 dark:hover:bg-gray-300 `}
          onClick={() => setShowPanel(!showPanel)}
        >
          {filterOn
            ? 'Filtered by: ' +
              (selectedGenres.length ? 'genre' : '') +
              (selectedGenres.length && selectedPriceRange.length ? ', ' : '') +
              (selectedPriceRange.length ? 'price' : '')
            : 'Filter'}
          {showPanel ? (
            <ChevronUpIcon className='absolute inset-y-2 right-3 h-4 w-4'></ChevronUpIcon>
          ) : (
            <ChevronDownIcon className='absolute inset-y-2 right-3 h-4 w-4'></ChevronDownIcon>
          )}
        </button>
        {filterOn && (
          <button
            className={`${
              filterOn
                ? 'ring-2 ring-blue dark:ring-1'
                : 'ring-1 ring-sand-200 dark:ring-gray-300'
            } ml-2 h-8 rounded-md bg-sand-100 px-1.5 align-middle text-sm font-semibold text-sand-400 ring-2 ring-inset hover:bg-sand-200 dark:bg-gray-400 dark:text-gray-100 dark:hover:bg-gray-300 `}
            onClick={() => resetGenres()}
          >
            <ArrowPathIcon className='h-5 w-5'></ArrowPathIcon>
          </button>
        )}
      </div>
      <div
        className={`${showPanel ? 'rounded-xl border' : 'border-t'} ${
          filterOn ? 'border-blue ' : 'border-sand-200 dark:border-gray-400'
        } ${!showPanel && filterOn ? 'border-t-2 dark:border-t' : ''}
         ${
          showPanel && filterOn ? 'border-2 dark:border' : ''
        } h-full bg-sand-50 p-5 dark:bg-gray-600`}
      >
        {showPanel && (
          <div className='mt-3 flex lg:flex-row flex-col'>
            <div className='lg:w-3/5'>
              <div className='font-semibold text-sand-300 dark:text-gray-200'>
                Genres:
              </div>
              {genres?.map((genre) => (
                <span
                  key={genre}
                  className={`${
                    selectedGenres.includes(genre)
                      ? 'border-2 border-blue dark:border'
                      : 'border border-sand-200 dark:border-gray-400'
                  } m-1 inline-block cursor-pointer rounded-2xl bg-sand-100 py-0.5 px-2.5 text-sm text-sand-400 hover:bg-sand-200 dark:bg-gray-500 dark:text-gray-100 dark:hover:bg-gray-400`}
                  onClick={() => addRemoveGenre(genre)}
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className='lg:ml-4 lg:mt-0 mt-3 md:w-2/5 w-full'>
              <div className='mb-9 font-semibold text-sand-300 dark:text-gray-200'>
                Price ($):
              </div>
              <ReactSlider
                className='horizontal-slider mb-12 cursor-pointer'
                thumbClassName='dark:text-gray-50 text-sand-300 text-center custom-thumb relative -top-8 w-4 overflow-visible'
                trackClassName='dark:bg-gray-200 bg-sand-200 h-1 rounded'
                pearling
                min={0}
                max={maxPrice}
                step={0.01}
                defaultValue={[0, maxPrice]}
                value={selectedPriceRange}
                renderMark={(props) => <span {...props} />}
                renderThumb={(props, state) => (
                  <div {...props}>{state.valueNow}</div>
                )}
                onAfterChange={(values) => updatePriceRange(values)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
