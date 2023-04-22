import React from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, SparklesIcon } from '@heroicons/react/20/solid';

interface PositionTrackerProps {
  shift: string;
}

function PositionTracker({ shift }: PositionTrackerProps) {
  return (
    <div className='relative top-5 -right-4 text-center'>
      <span className='text-xs text-sand-400 dark:text-gray-100'>{shift}</span>
      {shift === 'new' ? (
        <SparklesIcon className='mx-auto h-4 w-4 text-green-100 dark:text-green-50'></SparklesIcon>
      ) : shift.toString().includes('-') ? (
        <ChevronDoubleUpIcon className='mx-auto h-4 w-4 text-green-100 dark:text-green-50'></ChevronDoubleUpIcon>
      ) : (
        <ChevronDoubleDownIcon className='mx-auto h-4 w-4 text-red-50'></ChevronDoubleDownIcon>
      )}
    </div>
  );
}

export default PositionTracker;
