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
                pathname === "/caregiver/email/inbox" ? "active" : null
              }
              onClick={() => this.props.history.push(AppRoutes.INBOX)}
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
                pathname === "/caregiver/email/sent-email" ? "active" : null
              }
              onClick={() => this.props.history.push(AppRoutes.SENT_EMAIL)}
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
                pathname === "/caregiver/email/new-email" ? "active" : null
              }
              onClick={() => this.props.history.push(AppRoutes.NEW_EMAIL)}
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
