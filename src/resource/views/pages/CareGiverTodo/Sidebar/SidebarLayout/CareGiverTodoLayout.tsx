import React, { FunctionComponent } from 'react';
import { languageTranslation } from '../../../../../../helpers';
import reminder_on from '../../../../../assets/img/reminder-on.svg';
import reminder_off from '../../../../../assets/img/reminder-off.svg';

const CareGiverTodoLayout: FunctionComponent = () => {
  return (
    <div className='common-topheader d-flex align-items-center pb-2 px-2'>
      <div className='header-nav-item active'>
        <span className='header-nav-icon'>
          <img src={reminder_off} alt='' />
        </span>
        <span className='header-nav-text'>
          {languageTranslation('HIDE_DONE')}
        </span>
      </div>
      <div className='header-nav-item'>
        <span className='header-nav-icon'>
          <img src={reminder_on} alt='' />
        </span>
        <span className='header-nav-text'>
          {languageTranslation('HIDE_FUTURE_ONES')}
        </span>
      </div>
    </div>
  );
};

export default CareGiverTodoLayout;
