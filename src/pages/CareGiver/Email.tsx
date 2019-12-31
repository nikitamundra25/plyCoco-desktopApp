import React, { Component } from "react";
import { Button, Col, Row, Form, Nav, NavItem, NavLink } from "reactstrap";
class Email extends Component {
  render() {
    return (
      <div className="email-section">
        <Nav tabs className="custom-tabs">
          <NavItem>
            <NavLink className="active">
              <span className="icon">
                <i className="fa fa-inbox"></i>
              </span>
              <span>Inbox</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="">
              <span className="icon">
                <i className="fa fa-send"></i>
              </span>
              <span>Sent Email</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="">
              <span className="icon">
                <i className="fa fa-edit"></i>
              </span>
              <span>New Email</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="">
              <span className="icon">
                <i className="fa fa-cogs"></i>
              </span>
              <span>Settings</span>
            </NavLink>
          </NavItem>
        </Nav>

        <div className="email-content"></div>
      </div>
    );
  }
}
export default Email;
