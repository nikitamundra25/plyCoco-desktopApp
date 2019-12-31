import React, { Component } from "react";
import { Button, Col, Row, Form, Nav, NavItem, NavLink } from "reactstrap";
import { RouteComponentProps } from "react-router";
import EmailMenus from "./EmailMenus";
class Email extends Component<RouteComponentProps, any> {
  render() {
    return (
      <div className="email-content">
        <EmailMenus {...this.props} />
        <p>Sent Email</p>{" "}
      </div>
    );
  }
}
export default Email;
