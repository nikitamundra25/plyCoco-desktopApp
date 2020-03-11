import React, { FunctionComponent, useState } from 'react';
import { Input } from 'reactstrap';
import Select from 'react-select';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { languageTranslation } from '../../../../helpers';
import { Without_Appointments, filterUserById } from '../../../../config';
import { IAppointmentNav, IReactSelectInterface } from '../../../../interfaces';
import AttributeFilter from './AttributeFilter';
import right_arrow from '../../../assets/img/rightarrow.svg';
import left_arrow from '../../../assets/img/leftarrow.svg';
import refresh from '../../../assets/img/refresh.svg';
import filter from '../../../assets/img/filter.svg';
import caregiver from '../../../assets/img/caregiver.svg';
import careinstitution from '../../../assets/img/careinstitution.svg';
import 'react-day-picker/lib/style.css';
import './index.scss';

const AppointmentNav: FunctionComponent<IAppointmentNav> = (
  props: IAppointmentNav
) => {
  const {
    handleNext,
    handlePrevious,
    daysData,
    qualificationList,
    handleQualification,
    careGiversList,
    careInstitutionList,
    handleDayClick,
    handleToday,
    qualification,
    handleSelectUserList,
    careGiversListArr,
    careInstitutionListArr,
    applyFilter,
    handleSelectAppointment
  } = props;

  const { month = '', year = '' } = daysData ? daysData : {};

  const [attributeSearch, setShowAttribute] = useState<boolean>(false);
  const [attributeFilter, setAttributeFilter] = useState<string | null>(null);
  const [user, setuser] = useState<string>('');

  const handleUserList = (
    selectedOption: IReactSelectInterface,
    name: string
  ) => {
    let data: any =
      name === 'caregiver' ? careGiversListArr : careInstitutionListArr;
    if (selectedOption && selectedOption.value) {
      if (name === 'caregiver') {
        data = careGiversListArr.filter(
          (x: any) => x.id === selectedOption.value
        );
      } else {
        data = careInstitutionListArr.filter(
          (x: any) => x.id === selectedOption.value
        );
      }
    }
    handleSelectUserList(data, name);
  };

  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    if (selectOption && selectOption.value && name === 'user') {
      setuser(selectOption.value);
    } else {
    }
  };

  return (
    <>
      <div className='sticky-common-header'>
        <div className='common-topheader d-flex align-items-center px-2 mb-1'>
          <div className='header-nav-item'>
            <span className='header-nav-icon'>
              <img src={refresh} alt='' />
            </span>
            <span className='header-nav-text'>
              {languageTranslation('REFRESH')}
            </span>
          </div>
          <div
            className='common-label px-1 cursor-pointer'
            onClick={handleToday}
          >
            Today
          </div>
          <div className='header-nav-item' onClick={handlePrevious}>
            <span className='header-nav-icon pr-0'>
              <img src={left_arrow} alt='' />
            </span>
          </div>
          <div className='common-header-input pr-1'>
            {/* <Input
              className='form-control'
              placeholder={'February 2020'}
              type='input'
              value={`${month} ${year}`}
              name='text'
            /> */}
            <DayPickerInput
              onDayChange={handleDayClick}
              value={`${month} ${year}`}
            />
          </div>
          <div className='header-nav-item' onClick={handleNext}>
            <span className='header-nav-icon pr-0'>
              <img src={right_arrow} alt='' />
            </span>
          </div>
          <div className='user-select mx-1'>
            <Select
              classNamePrefix='custom-inner-reactselect'
              className={'custom-reactselect '}
              placeholder='Select'
              options={Without_Appointments}
              isClearable={true}
              onChange={(value: any) =>
                handleSelectAppointment(value, 'appointments')
              }
            />
          </div>

          <div className='user-select mx-1'>
            <div className='custom-select-checkbox'>
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel={languageTranslation(
                  'CAREGIVER_QUALIFICATION_PLACEHOLDER'
                )}
                options={qualificationList}
                placeholder={languageTranslation(
                  'CAREGIVER_QUALIFICATION_PLACEHOLDER'
                )}
                value={qualification ? qualification : undefined}
                className={'custom-reactselect custom-reactselect-menu-width'}
                classNamePrefix='custom-inner-reactselect'
                onChange={handleQualification}
              />
            </div>
          </div>

          <div className='header-nav-item'>
            <span className='header-nav-icon  pr-0'>
              <img src={caregiver} alt='' />
            </span>
          </div>
          <div
            className='header-nav-item'
            onClick={() => {
              setShowAttribute(true);
              setAttributeFilter('caregiver');
              // applyFilter('caregiver', [], []);
            }}
          >
            <span className='header-nav-icon'>
              <img src={filter} alt='' />
            </span>
            <span className='header-nav-text'>
              {languageTranslation('ATTRIBUTES')}
            </span>
          </div>

          <div className='user-select mx-1'>
            <Select
              classNamePrefix='custom-inner-reactselect'
              className={'custom-reactselect custom-reactselect-menu-width'}
              placeholder='Select Caregiver'
              options={careGiversList}
              onChange={(value: any) => handleUserList(value, 'caregiver')}
              isClearable={true}
            />
          </div>
          <div className='header-nav-item'>
            <span className='header-nav-icon  pr-0'>
              <img src={careinstitution} alt='' />
            </span>
          </div>
          <div
            className='header-nav-item'
            onClick={() => {
              setShowAttribute(true);
              setAttributeFilter('careInstitution');
              // applyFilter('careInstitution', [], []);
            }}
          >
            <span className='header-nav-icon'>
              <img src={filter} alt='' />
            </span>
            <span className='header-nav-text'>
              {languageTranslation('ATTRIBUTES')}
            </span>
          </div>
          <div className='user-select mx-1'>
            <Select
              classNamePrefix='custom-inner-reactselect'
              className={'custom-reactselect custom-reactselect-menu-width'}
              placeholder='Select Care Institution'
              options={careInstitutionList}
              onChange={(value: any) =>
                handleUserList(value, 'careinstitution')
              }
              isClearable={true}
            />
          </div>
          <div className='common-header-input pr-1'>
            <div className='user-select mx-1'>
              <Select
                classNamePrefix='custom-inner-reactselect'
                className={'custom-reactselect '}
                placeholder='Select User'
                options={filterUserById}
                isClearable={true}
                // value={user ? user : ''}
                onChange={(value: any) => handleSelect(value, 'user')}
              />
            </div>
            {/* <Input placeholder={''} type='input' name='text' /> */}
          </div>
        </div>
      </div>
      <AttributeFilter
        show={attributeSearch ? true : false}
        handleClose={() => {
          setShowAttribute(false);
          setAttributeFilter(null);
        }}
        setAttributeFilter={setAttributeFilter}
        attributeFilter={attributeFilter}
        applyFilter={applyFilter}
      />
    </>
  );
};

export default AppointmentNav;
