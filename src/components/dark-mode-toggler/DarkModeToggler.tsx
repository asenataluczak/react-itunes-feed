import React from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

interface DarkModeTogglerProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

function DarkModeToggler({ isDarkMode, setIsDarkMode }: DarkModeTogglerProps) {
  return (
    <div
      className='absolute top-6 right-14 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl bg-gray-300 dark:bg-sand-300'
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? (
        <SunIcon className='h-8 w-8 text-sand-50'></SunIcon>
      ) : (
        <MoonIcon className='h-8 w-8 text-gray-100'></MoonIcon>
      )}
    </div>
  );
}

export default DarkModeToggler;
