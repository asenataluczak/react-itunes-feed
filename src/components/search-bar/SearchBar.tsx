import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface SearchBarProps {
  search: (query: string) => void;
}

function SearchBar({ search }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const update = (value: string) => {
    setQuery(value);
    search(value);
  };

  return (
    <div className='relative mt-8 mb-4'>
      <MagnifyingGlassIcon className='absolute inset-y-1 left-3.5 h-5 w-5 text-gray-200'></MagnifyingGlassIcon>

      {query && (
        <button
          className='absolute inset-y-0 right-3.5 text-gray-100 '
          onClick={() => update('')}
        >
          <XMarkIcon className='h-5 w-5 text-gray-200 hover:text-gray-100'></XMarkIcon>
        </button>
      )}
      <input
        type='text'
        className='block w-full rounded-md border-0 bg-gray-400 py-0.5 px-12 text-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-200 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6'
        placeholder='Search by album name or by artist...'
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          update(e.target.value)
        }
      ></input>
    </div>
  );
}

export default SearchBar;
