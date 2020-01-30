import React from 'react';

export const NoSearchFound: React.FC = () => {
  return (
    <div className='no-search-section'>
      <div className='no-data-icon'>
        <i className='icon-magnifier' />
      </div>
      <h4 className='mb-1'>No details found related to your search </h4>
      <div className='text-left search-text'>
        <p>
          <span className='pr-2'>&#8226;</span>Try to simplify your search
        </p>
        <p>
          <span className='pr-2'>&#8226;</span>Use different keywords
        </p>
        <p>
          <span className='pr-2'>&#8226;</span>Make sure words are spelled
          correctly
        </p>
      </div>
    </div>
  );
};
