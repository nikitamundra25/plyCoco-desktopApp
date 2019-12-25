import PropTypes from "prop-types";
import React, { Component } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from "reactstrap";

import { AppRoutes } from "../../Config";
import UserIcon from "./../../assets/avatars/user-default.svg";
import { AppHeaderDropdown, AppSidebarToggler } from "@coreui/react";
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line

    let { userDetails } = this.props;
    if (!userDetails) {
      userDetails = {};
    }
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <div className="brand-logo">Graphql Demo</div>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={UserIcon}
                className="img-avatar"
                alt="superadmin@hogwork.com"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>{userDetails.email}</strong>
                <br />
                <strong>{userDetails.fullName}</strong>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  this.props.history.push(AppRoutes.MY_PROFILE);
                }}
              >
                <i className="fa fa-user" /> Profile
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
