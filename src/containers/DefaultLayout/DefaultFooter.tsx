import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Select from 'react-select';
import { Region } from '../../config';

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <div className='footer-nav'>
            <Nav>
              <NavItem>
                <NavLink href='#'>Attribute: Login Possible</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#'>Unlocked</NavLink>
              </NavItem>
            </Nav>
          </div>
          <div className='region-select'>
            <Select
              defaultValue={{
                label: "Central Germany",
                value: "0"
              }}
              className={'menu-outer-top'}
              placeholder='Select Region'
              options={Region}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DefaultFooter;
