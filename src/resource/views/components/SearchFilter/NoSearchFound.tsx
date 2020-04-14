import React from 'react';
import { languageTranslation } from '../../../../helpers';

export const NoSearchFound: React.FC = () => {
  return (
    <div className='no-search-section'>
      <div className='no-data-icon'>
        <i className='icon-magnifier' />
      </div>
      <h4 className='mb-1'>{languageTranslation("NO_SEARCH_FOUND")} </h4>
      <div className='text-left search-text'>
        <p>
          <span className='pr-2'>&#8226;</span>{languageTranslation("SIMPLIFY_SEARCH")}
        </p>
        <p>
          <span className='pr-2'>&#8226;</span>{languageTranslation("DIFFERENT_KEYWORDS")}
        </p>
        <p>
          <span className='pr-2'>&#8226;</span> {languageTranslation("SEARCH_CORRECTLY_SPELLED")}
        </p>
      </div>
    </div>
  );
};
