import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { AppRoutes } from "../../../config";
import { IEmailMenus } from "../../../interfaces/CareGiver";
class EmailMenus extends Component<IEmailMenus, any> {
  render() {
    const {
      location: { pathname }
    } = this.props;
    return (
      <>
        <Nav tabs className="custom-tabs">
          <NavItem>
            <NavLink
              className={
                pathname === "/care-institution/email/inbox" ? "active" : null
              }
              onClick={() =>
                this.props.history.push(AppRoutes.CARE_INSTITUTION_INBOX_EMAIL)
              }
            >
              <span className="icon">
                <i className="fa fa-inbox"></i>
              </span>
              <span>Inbox</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                pathname === "/care-institution/email/sent-email"
                  ? "active"
                  : null
              }
              onClick={() =>
                this.props.history.push(AppRoutes.CARE_INSTITUTION_SENT_EMAIL)
              }
            >
              <span className="icon">
                <i className="fa fa-send"></i>
              </span>
              <span>Sent Email</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                pathname === "/care-institution/email/new-email"
                  ? "active"
                  : null
              }
              onClick={() =>
                this.props.history.push(AppRoutes.CARE_INSTITUTION_NEW_EMAIL)
              }
            >
              <span className="icon">
                <i className="fa fa-edit"></i>
              </span>
              <span>New Email</span>
            </NavLink>
          </NavItem>
        </Nav>
      </>
    );
  }
}
export default EmailMenus;
