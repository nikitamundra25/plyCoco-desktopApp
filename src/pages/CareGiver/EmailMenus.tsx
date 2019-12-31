import React, { Component } from "react";
import { Button, Col, Row, Form, Nav, NavItem, NavLink } from "reactstrap";
import { AppRoutes } from "../../config";
import { RouteChildrenProps, RouteComponentProps } from "react-router";
class EmailMenus extends Component<RouteComponentProps, any> {
  render() {
    return (
      <>
        <Nav tabs className="custom-tabs">
          <NavItem>
            <NavLink
              className="active"
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
              className=""
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
              className=""
              onClick={() => this.props.history.push(AppRoutes.NEW_EMAIL)}
            >
              <span className="icon">
                <i className="fa fa-edit"></i>
              </span>
              <span>New Email</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className=""
              onClick={() => this.props.history.push(AppRoutes.EMAIL_SETTINGS)}
            >
              <span className="icon">
                <i className="fa fa-cogs"></i>
              </span>
              <span>Settings</span>
            </NavLink>
          </NavItem>
        </Nav>
      </>
    );
  }
}
export default EmailMenus;
