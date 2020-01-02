import React, { Component } from "react";
import { Button, Col, Row, Form, Nav, NavItem, NavLink } from "reactstrap";
import { AppRoutes } from "../../config";
import { RouteChildrenProps, RouteComponentProps } from "react-router";
class EmailMenus extends Component<RouteComponentProps, any> {
  render() {
    const {
      location: { pathname }
    } = this.props;
    console.log("path", this.props.location.pathname);
    // const path = pathname
    console.log("path", pathname);
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
                pathname === "/caregiver/email/sent_email" ? "active" : null
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
                pathname === "/caregiver/email/new_email" ? "active" : null
              }
              onClick={() => this.props.history.push(AppRoutes.NEW_EMAIL)}
            >
              <span className="icon">
                <i className="fa fa-edit"></i>
              </span>
              <span>New Email</span>
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={
                pathname === "/caregiver/email/settings" ? "active" : null
              }
              onClick={() => this.props.history.push(AppRoutes.EMAIL_SETTINGS)}
            >
              <span className="icon">
                <i className="fa fa-cogs"></i>
              </span>
              <span>Settings</span>
            </NavLink>
          </NavItem> */}
        </Nav>
      </>
    );
  }
}
export default EmailMenus;
