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
import EmailMenus from "./EmailMenus";
import { RouteComponentProps } from "react-router";
class Email extends Component<RouteComponentProps, any> {
  render() {
    return (
      <div className="email-section">
        <EmailMenus {...this.props} />
        <div className="email-content">
          <Row>
            <Col lg={"6"}>
              <ul className="mail-listing">
                <li className="mail-listing-item">
                  <div className="mail-inbox-content d-flex align-items-center justify-content-start">
                    <div className="mail-inbox-info">
                      <div className="inbox-action d-flex align-items-center">
                        <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>
                        <div className="flag-icon">
                          <i className="fa fa-flag"></i>
                        </div>
                        <div className="unread-icon">
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
                      <div className="mail-inbox-date-time">12:20 PM</div>
                    </div>
                  </div>
                </li>
                <li className="mail-listing-item">
                  <div className="mail-inbox-content d-flex align-items-center justify-content-start">
                    <div className="mail-inbox-info">
                      <div className="inbox-action d-flex align-items-center">
                        <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>
                        <div className="flag-icon">
                          <i className="fa fa-flag"></i>
                        </div>
                        <div className="unread-icon">
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
                      <div className="mail-inbox-date-time">12:20 PM</div>
                    </div>
                  </div>
                </li>
                <li className="mail-listing-item">
                  <div className="mail-inbox-content d-flex align-items-center justify-content-start">
                    <div className="mail-inbox-info">
                      <div className="inbox-action d-flex align-items-center">
                        <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>
                        <div className="flag-icon">
                          <i className="fa fa-flag"></i>
                        </div>
                        <div className="unread-icon">
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
                      <div className="mail-inbox-date-time">12:20 PM</div>
                    </div>
                  </div>
                </li>
                <li className="mail-listing-item">
                  <div className="mail-inbox-content d-flex align-items-center justify-content-start">
                    <div className="mail-inbox-info">
                      <div className="inbox-action d-flex align-items-center">
                        <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>
                        <div className="flag-icon">
                          <i className="fa fa-flag"></i>
                        </div>
                        <div className="unread-icon">
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
                      <div className="mail-inbox-date-time">12:20 PM</div>
                    </div>
                  </div>
                </li>
                <li className="mail-listing-item">
                  <div className="mail-inbox-content d-flex align-items-center justify-content-start">
                    <div className="mail-inbox-info">
                      <div className="inbox-action d-flex align-items-center">
                        <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>
                        <div className="flag-icon">
                          <i className="fa fa-flag"></i>
                        </div>
                        <div className="unread-icon">
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
                      <div className="mail-inbox-date-time">12:20 PM</div>
                    </div>
                  </div>
                </li>
                <li className="mail-listing-item">
                  <div className="mail-inbox-content d-flex align-items-center justify-content-start">
                    <div className="mail-inbox-info">
                      <div className="inbox-action d-flex align-items-center">
                        <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>
                        <div className="flag-icon">
                          <i className="fa fa-flag"></i>
                        </div>
                        <div className="unread-icon">
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
                      <div className="mail-inbox-date-time">12:20 PM</div>
                    </div>
                  </div>
                </li>
                <li className="mail-listing-item">
                  <div className="mail-inbox-content d-flex align-items-center justify-content-start">
                    <div className="mail-inbox-info">
                      <div className="inbox-action d-flex align-items-center">
                        <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>
                        <div className="flag-icon">
                          <i className="fa fa-flag"></i>
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
                      <div className="mail-inbox-date-time">12:20 PM</div>
                    </div>
                  </div>
                </li>
                <li className="mail-listing-item">
                  <div className="mail-inbox-content d-flex align-items-center justify-content-start">
                    <div className="mail-inbox-info">
                      <div className="inbox-action d-flex align-items-center">
                        <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>

                        <div className="unread-icon">
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
                      <div className="mail-inbox-date-time">12:20 PM</div>
                    </div>
                  </div>
                </li>
                <li className="mail-listing-item">
                  <div className="mail-inbox-content d-flex align-items-center justify-content-start">
                    <div className="mail-inbox-info">
                      <div className="inbox-action d-flex align-items-center">
                        <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
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
                      <div className="mail-inbox-date-time">12:20 PM</div>
                    </div>
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
