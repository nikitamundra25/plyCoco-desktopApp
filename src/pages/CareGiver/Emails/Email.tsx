import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Form,
  Nav,
  NavItem,
  NavLink,
  Label
} from "reactstrap";
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
          {/* <NavItem>
            <NavLink className="">
              <span className="icon">
                <i className="fa fa-cogs"></i>
              </span>
              <span>Settings</span>
            </NavLink>
          </NavItem> */}
        </Nav>

        <div className="email-content">
          <Row>
            <Col lg={"6"}>
              <ul className="mail-listing">
                <li className="mail-listing-item">
                  <div className="mail-inbox-content">
                    <div className="mail-inbox-info">
                      <div className="inbox-action">
                        <div className=" checkbox-custom">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>
                        <div>
                          <i className="fa fa-flag"></i>
                        </div>
                        <div>
                          <i className="fa fa-circle "></i>
                        </div>
                      </div>
                    </div>
                    <div className="mail-inbox-detail">
                      <div className="mail-inbox-subject">
                        Your iBuy.com grocery shopping confirmation
                      </div>
                      <div className="mail-inbox-summary">
                        Please make sure that you have one of the following
                        cards...
                      </div>
                    </div>
                    <div className="mail-inbox-date-time">12:20 PM</div>
                  </div>
                </li>
              </ul>
            </Col>
            <Col lg={"6"}></Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Email;
