import React, { Component, FunctionComponent } from 'react';
import { AppSidebarToggler } from '@coreui/react';
import {
  Nav,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';
import { useHistory } from 'react-router';
import logo from '../../assets/img/plycoco-orange.png';
import { AppRoutes } from '../../config';

const DefaultHeader: FunctionComponent = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <AppSidebarToggler className='d-lg-none' display='md' mobile />
      <div className='brand-logo'>
        <img src={logo} alt='' />
        {/* <span className="logo-text">Plycoco</span> */}
      </div>
      <AppSidebarToggler className='d-md-down-none' display='lg' />

      <Nav className='ml-auto profile-dropdown' navbar>
        <UncontrolledDropdown setActiveFromChild>
          <DropdownToggle
            id='dropdown-basic'
            color='link'
            className='profile-button'
            caret
          >
            <div className='user-name'>
              <i className='fa fa-user'></i>
            </div>
          </DropdownToggle>

          <DropdownMenu className='profile-dropdown'>
            <DropdownItem className='user-box'>
              <div className='user-text'>
                <h6>
                  <b>Super Admin</b>
                </h6>
                <p className='mb-0'>superadmin@plycoco.com</p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <i className='fa fa-user' /> Profile
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                localStorage.removeItem('token');
                history.push(AppRoutes.LOGIN);
              }}
            >
              <i className='fa fa-lock' /> Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </React.Fragment>
  );
};

export default DefaultHeader;
