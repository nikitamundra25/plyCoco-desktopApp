import React, {
  Component,
  FunctionComponent,
  useCallback,
  useState
} from 'react';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table
} from 'reactstrap';
import MaskedInput from 'react-text-mask';

import Select from 'react-select';
import { languageTranslation } from '../../../../helpers';
import {
  State,
  NightAllowancePerHour,
  Without_Appointments,
  ShiftTime
} from '../../../../config';

import right_arrow from '../../../assets/img/rightarrow.svg';
import left_arrow from '../../../assets/img/leftarrow.svg';
import refresh from '../../../assets/img/refresh.svg';
import filter from '../../../assets/img/filter.svg';
import caregiver from '../../../assets/img/caregiver.svg';
import careinstitution from '../../../assets/img/careinstitution.svg';
import close from '../../../assets/img/close.svg';
import './index.scss';
import { LanguageAction } from '../../../../store/actions';

const AppointmentNav: FunctionComponent = () => {
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
          <div className='common-label px-1'>Today</div>
          <div className='header-nav-item'>
            <span className='header-nav-icon pr-0'>
              <img src={left_arrow} alt='' />
            </span>
          </div>
          <div className='common-header-input pr-1'>
            <Input
              className='form-control'
              placeholder={'February 2020'}
              type='input'
              name='text'
            />
          </div>
          <div className='header-nav-item'>
            <span className='header-nav-icon pr-0'>
              <img src={right_arrow} alt='' />
            </span>
          </div>
          <div className='user-select mx-1'>
            <Select
              classNamePrefix='custom-inner-reactselect'
              className={'custom-reactselect custom-reactselect-menu-width'}
              placeholder='Select'
              options={Without_Appointments}
            />
          </div>

          <div className='user-select mx-1'>
            <Select
              classNamePrefix='custom-inner-reactselect'
              className={'custom-reactselect custom-reactselect-menu-width'}
              placeholder='Select Qualifications'
              options={State}
              isClearable={true}
            />
          </div>

          <div className='header-nav-item'>
            <span className='header-nav-icon  pr-0'>
              <img src={caregiver} alt='' />
            </span>
          </div>
          <div className='header-nav-item'>
            <span className='header-nav-icon'>
              <img src={filter} alt='' />
            </span>
            <span className='header-nav-text'>Attibutes</span>
          </div>

          <div className='user-select mx-1'>
            <Select
              classNamePrefix='custom-inner-reactselect'
              className={'custom-reactselect custom-reactselect-menu-width'}
              placeholder='Select Caregiver'
              options={State}
              isClearable={true}
            />
          </div>
          <div className='header-nav-item'>
            <span className='header-nav-icon  pr-0'>
              <img src={careinstitution} alt='' />
            </span>
          </div>
          <div className='header-nav-item'>
            <span className='header-nav-icon'>
              <img src={filter} alt='' />
            </span>
            <span className='header-nav-text'>Attibutes</span>
          </div>
          <div className='user-select mx-1'>
            <Select
              classNamePrefix='custom-inner-reactselect'
              className={'custom-reactselect custom-reactselect-menu-width'}
              placeholder='Select Care Institution'
              options={State}
              isClearable={true}
            />
          </div>
          <div className='common-header-input pr-1'>
            <Input
              className='form-control'
              placeholder={''}
              type='input'
              name='text'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentNav;
