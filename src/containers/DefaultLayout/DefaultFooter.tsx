import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Select from "react-select";
import { AppRoutes } from "../../config";
import routes from "../../routes/routes";
import { Region } from "../../config";

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="footer-nav">
            <Nav>
              <NavItem>
                <NavLink href="#">Attribute: Login Possible</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Unlocked</NavLink>
              </NavItem>
            </Nav>
          </div>
          <div className="region-select">
            <div>
              <div className=""></div>
              <div></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DefaultFooter;
