import React from 'react';
import '../../styles/App.css';

interface SearchBarProps {
  search: (query: string) => void;
}

function SearchBar({ search }: SearchBarProps) {
  return (
      <input
        type='text'
        className='bg-gray-400 block my-8 w-full rounded-md border-0 py-0.5 px-12 text-gray-50 ring-1 ring-inset ring-gray-200 placeholder:text-gray-100 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6'
        placeholder='Search by album name or by artist'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          search(e.target.value);
        }}
      />
  );
}

export default SearchBar;
