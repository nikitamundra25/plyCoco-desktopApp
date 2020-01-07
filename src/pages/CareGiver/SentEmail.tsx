import React, { Component } from "react";
import {
  Col,
  Row,
  Label,
  Collapse,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { RouteComponentProps } from "react-router";
import Select from "react-select";
import EmailMenus from "./EmailMenus";
class Email extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false,
      Opened: false,

    };
  }
  options = [
    { value: 'Denis', label: 'Aaron, Hank' },
    { value: 'Denis', label: 'Bergman, Ingmar' },
    { value: 'Beck, Glenn', label: 'Berle, Milton' },
  ];
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  onEntered = () => {
    this.setState({
      Opened: !this.state.Opened
    });
  };
  render() {
    return (
      <div className="email-section">
        <EmailMenus {...this.props} />
        <div className="email-content">
          <Row className="custom-col">
            <Col lg={"6"}>
              <div className="email-inbox-section">
                <div className="email-row-wrap align-items-center email-attributes-wrap">
                  <div className="email-attributes-content d-flex align-items-center">
                    <i className="fa fa-refresh mr-1"></i>
                    <span>Refresh</span>
                  </div>
                  <span className="email-attributes-seprator">|</span>
                  <div className="email-attributes-content" >
                    <i className="fa fa-hourglass-end mr-1"></i>
                    <span>Expired</span>
                  </div>
                </div>
                <div className="email-row-wrap email-heading-wrap ">
                  <div className="email-date-time-block toggle-filter hover-short-select-section">
                    Date
                    <Select
                      placeholder="Select Region"
                      options={this.options}
                      classNamePrefix="react-select"
                      className="hover-short-select"
                    />
                  </div>
                  <div className="email-subject-block toggle-filter`   hover-short-select-section">
                    <span>To</span>
                    <Select

                      placeholder="Select Region"
                      options={this.options}
                      classNamePrefix="react-select"
                      className="hover-short-select"
                    />
                  </div>
                  <div className="email-text-wrap" >
                    <span>Subject</span>
                  </div>
                </div>
                <ul className="m-0 p-0 list-group">
                  <li className={`email-wrap `}  >
                    <div
                      className={`email-date-block ${this.state.Opened ? "opened" : "closed"}`}
                      onClick={this.toggle}> Date: january 2020</div>
                    <Collapse isOpen={this.state.isOpen}
                      onEntered={this.onEntered}
                      onExiting={this.onEntered}
                    >
                      <div className="email-row-wrap">
                        <div className="email-date-time-block">
                          22.01.2020 20.33.33
                      </div>
                        <div className="email-subject-block">
                          Blalock, Jolene
                        </div>
                        <div className="email-text-wrap" >
                          Blalock, Jolene
                        </div>
                      </div>
                    </Collapse>

                  </li>


                </ul>

              </div>

              {/* <ul className="mail-listing">
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
                <li className="mail-listing-item active">
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
            */}
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

                  <p>
                    01.01. ND 8.0h: old people's home near Bielefeld (code:
                    Q9T3M) Services by arrangement. Accommodation is provided.
                    Double services possible. Please let us know your
                    availability by email ! Fee: freely negotiable Best regards
                    Marc Erdtmann Tel: +49.30.644 99 444 Fax: +49.30.644 99 445
                    E-Mail: Kontakt@plycoco.de www.plycoco.de Plycoco GmbH Am
                    Borsigturm 6 13507 Berlin Entry in the commercial register:
                    Register court : District court Berlin-Charlottenburg,
                    registration number: HRB 150746, managing
                  </p>
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
