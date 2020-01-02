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
            <Col lg={"6"}>
              <div className="mail-details">
                <div className="mail-header">
                  <h5> Your iBuy.com grocery shopping confirmation</h5>
                  <div>12:20 PM</div>
                </div>
                <div className="mail-body">
               <p> Hello Denis,</p>

<p>we have the following offer for you: Searched for</p>

<p>qualification: Elderly care</p>

<p>01.01. ND 8.0h: old people's home near Bielefeld (code: Q9T3M) Services by arrangement. Accommodation is provided. Double services possible. Please let us know your availability by email ! Fee: freely negotiable Best regards Marc Erdtmann Tel: +49.30.644 99 444 Fax: +49.30.644 99 445 E-Mail: Kontakt@plycoco.de www.plycoco.de Plycoco GmbH Am Borsigturm 6 13507 Berlin Entry in the commercial register: Register court : District court Berlin-Charlottenburg, registration number: HRB 150746, managing</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Email;
