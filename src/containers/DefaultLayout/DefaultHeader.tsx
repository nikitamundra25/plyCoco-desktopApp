import React, { Component } from "react";
import { AppHeaderDropdown, AppSidebarToggler } from "@coreui/react";
import {
  Nav,
  Dropdown,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  NavItem,
  NavLink
} from "reactstrap";
import { AppRoutes } from "../../config";
import logo from "../../assets/img/plycoco-white.png";

class DefaultHeader extends Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <div className="brand-logo">
          {/* <img src={logo} alt='logo' /> */}
          <span className="logo-text">Plycoco</span>
        </div>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        {/* <Form className="search-form">
          <InputGroup>
            <Input placeholder="Search.." />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <i className="fa fa-search"></i>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Form> */}
        <Nav className="ml-auto profile-dropdown" navbar>
          {/* <NavItem>
            <NavLink href="#">
              <i className="fa fa-refresh mr-2"></i>Clear Cache
            </NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle
                id="dropdown-basic"
                color="link"
                className="profile-button"
                caret
              >
                <div className="user-name">
                  <i className="fa fa-user"></i>
                </div>
              </DropdownToggle>

              <DropdownMenu className="profile-dropdown">
                <DropdownItem className="user-box">
                  <div className="user-text">
                    <h6>
                      <b>Super Admin</b>
                    </h6>
                    <p className="mb-0">superadmin@plycoco.com</p>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-user" /> Profile
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-lock" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* <Dropdown>
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
            </Dropdown> */}
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

export default DefaultHeader;
