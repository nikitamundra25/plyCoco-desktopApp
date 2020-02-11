import React, {
  Component,
  FunctionComponent,
  useCallback,
  useState
} from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table
} from "reactstrap";
import MaskedInput from "react-text-mask";

import Select from "react-select";
import { languageTranslation } from "../../../../helpers";
import { State } from "../../../../config";

import displaydoc from "../../../assets/img/display-doc.svg";
import upload from "../../../assets/img/upload.svg";
import visit from "../../../assets/img/visit.svg";
import "./index.scss";
import { LanguageAction } from "../../../../store/actions";

const Appointment: FunctionComponent = () => {
  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="sticky-common-header">
            <div className="common-topheader d-flex align-items-center px-2 mb-1">
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={upload} alt="" />
                </span>
                <span className="header-nav-text">
                  Retrieve new work proofs
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={displaydoc} alt="" />
                </span>
                <span className="header-nav-text">Display different</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-text">Hide mapped</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-text">Hide Locked caregiver</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-text">Hide old files</span>
              </div>
            </div>
          </div>

          <div className="common-content flex-grow-1">
            <div>
              <Row>
                <Col lg={"6"}>
                  <div className="calender-section">
                    <div className="custom-appointment-calendar">
                      <div className="custom-appointment-calendar-head">
                        <div className="custom-appointment-row ">
                          <div className="custom-appointment-col name-col">
                            Caregiver
                          </div>
                          <div className="custom-appointment-col h-col">H</div>
                          <div className="custom-appointment-col s-col text-center">
                            S
                          </div>
                          <div className="custom-appointment-col u-col text-center">
                            U
                          </div>
                          <div className="custom-appointment-col v-col text-center">
                            V
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="custom-appointment-calendar-body">
                        <div className="custom-appointment-row">
                          <div className="custom-appointment-col name-col">
                            Aly Mohhamad
                          </div>
                          <div className="custom-appointment-col h-col">H</div>
                          <div className="custom-appointment-col s-col text-center">
                            <i className="fa fa-star-o" />
                          </div>
                          <div className="custom-appointment-col u-col text-center">
                            <i className="fa fa-star-o" />
                          </div>
                          <div className="custom-appointment-col v-col text-center">
                            <i className="fa fa-arrow-down" />
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >s</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >f</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >n</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >s</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >f</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >n</div>
                          </div>{" "}
                          <div className="custom-appointment-col calender-col text-center">
                            <div >s</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >f</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >n</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >s</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >f</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >s</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >f</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >fsn</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >s</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div >f</div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={"3"} className="px-lg-0">
                  <div>
                    <h5 className="content-title">
                      {languageTranslation("PROFESSIONAL")}
                    </h5>
                  </div>
                  <div className="form-section">
                    <div className="form-card minheight-auto ">
                      <Row>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("APPOINTMENT_ID")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input">
                                  <Input
                                    type="text"
                                    placeholder={languageTranslation(
                                      "APPOINTMENT_ID"
                                    )}
                                    className="width-common"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("NAME")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation("NAME")}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-star"
                                          aria-hidden="true"
                                        ></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("DATE")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input">
                                  <MaskedInput
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                                    )}
                                    className={"form-control mb-2"}
                                  />
                                  <div>
                                    <FormGroup check inline>
                                      <div className=" checkbox-custom mb-0">
                                        <input
                                          type="checkbox"
                                          id="check"
                                          className=""
                                          name={"early"}
                                          checked
                                        />
                                        <Label for="check">
                                          {languageTranslation("EARLY")}
                                        </Label>
                                      </div>
                                    </FormGroup>
                                    <FormGroup check inline>
                                      <div className=" checkbox-custom mb-0">
                                        <input
                                          type="checkbox"
                                          id="check1"
                                          className=""
                                          name={"late"}
                                        />
                                        <Label for="check1">
                                          {languageTranslation("LATE")}
                                        </Label>
                                      </div>
                                    </FormGroup>
                                    <FormGroup check inline>
                                      <div className=" checkbox-custom mb-0">
                                        <input
                                          type="checkbox"
                                          id="check2"
                                          className=""
                                          name={"night"}
                                        />
                                        <Label for="check2">
                                          {languageTranslation("NIGHT")}
                                        </Label>
                                      </div>
                                    </FormGroup>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("FEE")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation("FEE")}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
                                          aria-hidden="true"
                                        ></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("ALLOWANCE_NIGHT")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation(
                                        "ALLOWANCE_NIGHT"
                                      )}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
                                          aria-hidden="true"
                                        ></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("ALLOWANCE_WE")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation(
                                        "ALLOWANCE_WE"
                                      )}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
                                          aria-hidden="true"
                                        ></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("ALLOWANCE_HOLIDAY")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation(
                                        "ALLOWANCE_HOLIDAY"
                                      )}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
                                          aria-hidden="true"
                                        ></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col lg={"3"}></Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
