import React, { FunctionComponent } from 'react';
import Select from 'react-select';
import { languageTranslation } from '../../../../../helpers';
import { IInvoiceNavBar } from '../../../../../interfaces';
import pen from '../../../../assets/img/header-icons/pen.svg';
import { InvoiceSummaryFilter } from '../../../../../config';
import '../index.scss';
import right_arrow from '../../../../assets/img/rightarrow.svg';
import left_arrow from '../../../../assets/img/leftarrow.svg';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import CaregiverCustomAsyncList from '../../../components/DropdownList/CareGiverCustomAsyncSelect';
import CareinstitutionCustomAsyncList from '../../../components/DropdownList/CareInstitutionCustomAsyncSelect';

const LeasingNavbar: FunctionComponent<IInvoiceNavBar & any> = (
  props: IInvoiceNavBar & any
) => {
  const {
    onhandleSelection,
    careinstitutionFilter,
    careInstitutionDepartmentOption,
    departmentFilter,
    caregiverFilter,
    handleDayClick,
    handleArrowDayChange,
    dateFilter,
    handleCreateInvoice,
    handleReset,
    createInvoiceLoading,
  } = props;

  return (
    <div className='common-topheader d-flex  px-2 pb-1 invoice-header'>
      <div className='header-nav-item' onClick={handleReset}>
        <span className='header-nav-icon'>
          <i className='fa fa-refresh '></i>
        </span>
        <span className='header-nav-text'>
          {languageTranslation('RESET_LABEL')}
        </span>
      </div>

      <div className='user-select mx-1 '>
        <CaregiverCustomAsyncList
          placeholderLabel={languageTranslation('SELECT_CAREGIVER')}
          onChange={(value: any) => onhandleSelection(value, 'caregiver')}
          value={
            caregiverFilter && caregiverFilter.value !== ''
              ? caregiverFilter
              : null
          }
        />
      </div>
      <div className='user-select mx-1 '>
        <CareinstitutionCustomAsyncList
          placeholderLabel={languageTranslation('SELECT_CARE_INSTITUTION')}
          onChange={(value: any) => onhandleSelection(value, 'careinstitution')}
          value={
            careinstitutionFilter && careinstitutionFilter.value !== ''
              ? careinstitutionFilter
              : null
          }
        />
      </div>
      <div className='user-select mx-1 '>
        <Select
          classNamePrefix='custom-inner-reactselect'
          className={'custom-reactselect '}
          placeholder={languageTranslation('SELECT_DEPARTMENT')}
          options={careInstitutionDepartmentOption}
          noOptionsMessage={() => {
            return careinstitutionFilter && careinstitutionFilter.value !== ''
              ? languageTranslation('NO_OPTIONS')
              : languageTranslation('SELECT_CAREINSTITUTION_FIRST');
          }}
          value={
            departmentFilter && departmentFilter.value !== ''
              ? departmentFilter
              : null
          }
          onChange={(value: any) => onhandleSelection(value, 'department')}
          isClearable={true}
        />
      </div>
      <div className='header-nav-item'>
        {createInvoiceLoading ? (
          <i className='fa fa-spinner fa-spin mr-2' />
        ) : (
          <span className='header-nav-icon'>
            <img src={pen} alt='' />
          </span>
        )}
        <span onClick={handleCreateInvoice} className='header-nav-text'>
          {languageTranslation('CREATE')}
        </span>
      </div>
      <div className='header-nav-item'>
        <span className='header-nav-icon pr-0'>
          {languageTranslation('WORKING_TIMES')}
        </span>
      </div>
      <div className='user-select mx-1 '>
        <Select
          classNamePrefix='custom-inner-reactselect'
          className={'custom-reactselect '}
          placeholder='Select Month Summary'
          options={InvoiceSummaryFilter}
          isClearable={true}
          onChange={(value: any) => onhandleSelection(value, 'monthSummary')}
          defaultValue={{ value: 'all', label: languageTranslation('ALL') }}
        />
      </div>
      <div
        className='header-nav-item'
        onClick={() => handleArrowDayChange('previous')}
      >
        <span className='header-nav-icon pr-0'>
          <img src={left_arrow} alt='' />
        </span>
      </div>
      <div className='common-header-input pr-1'>
        <DayPickerInput
          onDayChange={handleDayClick}
          //  formatDate={formatDate}
          value={dateFilter ? `${dateFilter}` : ''}
          clickUnselectsDay ={true}
          dayPickerProps={{
            //  month: setNewDate,
            canChangeMonth: false,
          }}
          inputProps={{ readOnly: true }}
        />
      </div>
      <div
        className='header-nav-item'
        onClick={() => handleArrowDayChange('next')}
      >
        <span className='header-nav-icon pr-0'>
          <img src={right_arrow} alt='' />
        </span>
      </div>
    </div>
  );
};

export default LeasingNavbar;
