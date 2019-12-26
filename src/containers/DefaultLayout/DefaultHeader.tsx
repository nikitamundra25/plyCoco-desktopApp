import React, { Component } from 'react';
import { AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';
import { Nav, Dropdown } from 'react-bootstrap';
import { AppRoutes } from '../../config';
import logo from '../../assets/img/logo.png';

class DefaultHeader extends Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <div className="brand-logo">
          {/* <img src={logo} alt='logo' /> */}
          <span className="logo-text">Plyoco</span>
        </div>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto profile-dropdown" navbar>
          <AppHeaderDropdown direction="down">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                variant="link"
                className="profile-button"
              >
                <div className="user-name">
                  <i className="fa fa-user"></i>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="profile-dropdown">
                <Dropdown.Item className="user-box">
                  <div className="user-text">
                    <h6>
                      <b>Super Admin</b>
                    </h6>
                    <p className="mb-0">superadmin@plycoco.com</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="fa fa-user" /> Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.props.onLogout()}>
                  <i className="fa fa-lock" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

export default DefaultHeader;
