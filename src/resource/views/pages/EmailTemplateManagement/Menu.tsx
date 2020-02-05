import React, { FunctionComponent } from 'react';
import Select from 'react-select';
import { languageTranslation } from '../../../../helpers';
import save from '../../../assets/img/save.svg';
import clear from '../../../assets/img/clear.svg';
import newEmail from '../../../assets/img/new-email.svg';
import { IEmailTemplateMenu } from '../../../../interfaces';
// import EmailSeparator from '../../assets/img/mail.svg';

export const EmailTemplateMenu: FunctionComponent<IEmailTemplateMenu> = (
  props: IEmailTemplateMenu,
) => {
  const {
    typeListOptions,
    templateType,
    activeTemplate,
    handleSubmit,
    onAddNewTemplate,
    onTypeChange,
    onDeleteEmailTemplate,
  } = props;
  return (
    <div className='sticky-common-header'>
      <div className='common-topheader d-flex align-items-center mb-2 '>
        <div className='template-lable'>
          {languageTranslation('TEMPLATE_TYPE')}
        </div>
        <div className='user-select'>
          <Select
            placeholder='Select Template'
            options={typeListOptions}
            value={templateType}
            onChange={onTypeChange}
          />
        </div>
        <div className='header-nav-item' onClick={onAddNewTemplate}>
          <span className='header-nav-icon'>
            <img src={newEmail} alt='' />
          </span>
          <span className='header-nav-text'>
            {languageTranslation('NEW_EMAIL_TEMPLATE')}
          </span>
        </div>
        {/* <div className='header-nav-item'>
          <span className='header-nav-icon'>
            <img src={EmailSeparator} alt='' />
          </span>
          <span className='header-nav-text'>New Email Separator</span>
        </div> */}
        <div
          className={`header-nav-item ${!activeTemplate ? 'disable' : ''}`}
          onClick={onDeleteEmailTemplate}
        >
          <span className='header-nav-icon'>
            <img src={clear} alt='' />
          </span>
          <span className='header-nav-text'>
            {languageTranslation('CLEAR')}
          </span>
        </div>
        <div className='header-nav-item' onClick={handleSubmit}>
          <span className='header-nav-icon'>
            <img src={save} alt='' />
          </span>
          <span className='header-nav-text'>
            {languageTranslation('SAVE_BUTTON')}
          </span>
        </div>
      </div>
    </div>
  );
};
