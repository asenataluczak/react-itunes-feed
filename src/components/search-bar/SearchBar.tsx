import React, { useState } from 'react';

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
    <div className='relative my-8'>
      {query && (
        <button className='absolute inset-y-0 right-5 text-gray-100' onClick={() => update('')}>
          X
        </button>
      )}
      <input
        type='text'
        className='bg-gray-400 block w-full rounded-md border-0 py-0.5 px-12 text-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-200 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6'
        placeholder='Search by album name or by artist...'
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchBar;
