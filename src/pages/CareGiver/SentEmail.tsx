import React, { Component } from "react";
import { Button, Col, Row, Form, Nav, NavItem, NavLink } from "reactstrap";
import { RouteComponentProps } from "react-router";
import EmailMenus from "./EmailMenus";
class Email extends Component<RouteComponentProps, any> {
  render() {
    return (
      <div className="email-section">
        <EmailMenus {...this.props} />
        <div className="email-content">
          <p>Sent Email</p>{" "}
        </div>
      </div>
    );
  }
}
export default Email;
