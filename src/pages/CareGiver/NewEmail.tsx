import React, { Component } from "react";
import { Button, Col, Row, Form, Nav, NavItem, NavLink } from "reactstrap";
import EmailMenus from "./EmailMenus";
import { RouteComponentProps } from "react-router";
class Email extends Component<RouteComponentProps, any> {
  render() {
    return (
      <div className="email-content">
        <EmailMenus {...this.props} />
        <p>New Email</p>{" "}
      </div>
    );
  }
}
export default Email;
