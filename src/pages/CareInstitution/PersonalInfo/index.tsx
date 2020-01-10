import React, { Component } from "react";
import { FormGroup, Card, Label, Input, Col, Row, Form } from "reactstrap";
import Select from "react-select";
import { RouteComponentProps } from "react-router";

import { State, Region, Salutation, Country } from "../../../config";
import { languageTranslation } from "../../../helpers";

class PersonalInformation extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: ""
    };
  }
  handleChange = (date: any) => {
    this.setState({
      startDate: date
    });
  };
  onFocus = () => {
    this.setState({
      error: true
    });
  };
  handleOnClick = () => {
    this.setState({
      addRemark: true
    });
  };
  render() {
    return (
      <Form className="form-section forms-main-section">
        <Row className=" ">
          <Col lg={"4"}>
            <div className="form-card">
              <Row>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("USER_ID")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <Row className="custom-col inner-no-padding-col">
                          <Col sm="4">
                            <div>
                              <Input
                                type="text"
                                name={"lastName"}
                                placeholder={languageTranslation("USER_ID")}
                                className="width-common"
                              />
                            </div>
                          </Col>
                          <Col sm="8">
                            <FormGroup>
                              <Row className="custom-col inner-no-padding-col">
                                <Col sm="6">
                                  <Label className="form-label col-form-label inner-label">
                                    {languageTranslation("REG_SINCE")}
                                    <span className="required">*</span>
                                  </Label>
                                </Col>
                                <Col sm="6">
                                  <div>
                                    <Input
                                      type="text"
                                      name={"lastName"}
                                      placeholder="Reg Since"
                                      className="width-common"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("REGION")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation("REGION", "STATE")}
                            options={State}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row className="">
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("GENDER")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <Row className="custom-col inner-no-padding-col">
                          <Col sm="5">
                            <div>
                              <Select
                                placeholder={languageTranslation("GENDER")}
                                options={State}
                              />
                            </div>
                          </Col>
                          <Col sm="7">
                            <FormGroup>
                              <Row className="custom-col inner-no-padding-col d-flex align-items-center">
                                <Col sm="6">
                                  <Label className="form-label col-form-label inner-label">
                                    {languageTranslation("TITLE")}
                                    <span className="required">*</span>
                                  </Label>
                                </Col>
                                <Col sm="6">
                                  <div>
                                    <Input
                                      type="text"
                                      name={"lastName"}
                                      placeholder={languageTranslation("TITLE")}
                                      className="width-common"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("SALUTATION")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation("SALUTATION")}
                            options={Salutation}
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
                          {languageTranslation("FIRST_NAME")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"firstName"}
                            placeholder={languageTranslation("FIRST_NAME")}
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
                          {languageTranslation("SURNAME")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"lastName"}
                            placeholder={languageTranslation("SURNAME")}
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
                          {languageTranslation("COMPANY_NAME")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"lastName"}
                            placeholder={languageTranslation("COMPANY_NAME")}
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
                          {languageTranslation("ANONYMOUS_NAME")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"lastName"}
                            placeholder={languageTranslation("ANONYMOUS_NAME")}
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
                          {languageTranslation("ANONYMOUS_NAME2")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"lastName"}
                            placeholder={languageTranslation("ANONYMOUS_NAME2")}
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
                        <Label className="form-label col-form-label ">
                          {languageTranslation("STREET")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"address"}
                            placeholder={languageTranslation("STREET")}
                            className=" width-common"
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
                        <Label className="form-label col-form-label ">
                          {languageTranslation("CITY")}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"address"}
                            placeholder={languageTranslation("CITY")}
                            className=" width-common"
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
                        <Label className="form-label col-form-label ">
                          {languageTranslation("ZIP")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"street"}
                            placeholder={languageTranslation("ZIP")}
                            className=" width-common"
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
                        <Label className="form-label col-form-label ">
                          {languageTranslation("COUNTRY")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation("COUNTRY")}
                            options={Country}
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
                        <Label className="form-label col-form-label ">
                          {languageTranslation("STATE")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation("STATE")}
                            options={State}
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
                        <Label className="form-label col-form-label ">
                          {languageTranslation("PHONE")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"phone"}
                            placeholder={languageTranslation("FAX")}
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
                          {languageTranslation("FAX")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"phone"}
                            placeholder={languageTranslation("FAX")}
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
                          {languageTranslation("MOBILE")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"fax"}
                            placeholder={languageTranslation("MOBILE")}
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
                          {languageTranslation("EMAIL")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"mobilePhone"}
                            placeholder={languageTranslation("EMAIL")}
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
                          {languageTranslation("USERNAME")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"email"}
                            placeholder={languageTranslation("USERNAME")}
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
                          {languageTranslation("DEFAULT_QAULIFICATION")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation(
                              "DEFAULT_QAULIFICATION"
                            )}
                            options={State}
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
                          {languageTranslation("WEBSITE")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"Username"}
                            placeholder={languageTranslation("WEBSITE")}
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
                          {languageTranslation("LIKED_TO")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation("LIKED_TO")}
                            options={State}
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
                          {languageTranslation("REMARKS")} (
                          {languageTranslation("FOR_CANSTITUTION_VIEWBLE")})
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="textarea"
                            name={"additionalText "}
                            placeholder={languageTranslation("REMARKS")}
                            className="textarea-custom"
                            rows="4"
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Col>

          <Col lg={"4"}>
            <div className="form-card minheight-auto">
              <Row>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("HEALTH_CARE_FEE")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <Row className="custom-col inner-no-padding-col">
                          <Col sm="4">
                            <div>
                              <Input
                                type="text"
                                name={"lastName"}
                                placeholder={languageTranslation(
                                  "HEALTH_CARE_FEE"
                                )}
                                className="width-common"
                              />
                            </div>
                          </Col>
                          <Col sm="8">
                            <FormGroup>
                              <Row className="custom-col inner-no-padding-col">
                                <Col sm="6">
                                  <Label className="form-label col-form-label inner-label">
                                    {languageTranslation("DOCTOR_FEE")}
                                    <span className="required">*</span>
                                  </Label>
                                </Col>
                                <Col sm="6">
                                  <div>
                                    <Input
                                      type="text"
                                      name={"lastName"}
                                      placeholder={languageTranslation(
                                        "DOCTOR_FEE"
                                      )}
                                      className="width-common"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("PERSONAL_DATA")}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation("PERSONAL_DATA")}
                            isMulti
                            options={Region}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <div className="form-card minheight-auto">
              <Row>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("LEASING_PRICE_LIST")}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation(
                              "LEASING_PRICE_LIST"
                            )}
                            isMulti
                            options={Region}
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
                          {languageTranslation("INVOICE_TYPE")}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation("INVOICE_TYPE")}
                            isMulti
                            options={Region}
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
                          {languageTranslation("Interval")}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation("Interval")}
                            isMulti
                            options={Region}
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
                          {languageTranslation("ADRESS_INVOICE")}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="textarea"
                            name={"additionalText "}
                            placeholder={languageTranslation("ADRESS_INVOICE")}
                            className="textarea-custom"
                            rows="4"
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <div className="common-list-card">
              <h5 className="content-title">
                {languageTranslation("QUALIFICATIONS")}
              </h5>
              <div className="common-list-wrap">
                <div className="common-list-header d-flex align-items-cente justify-content-between">
                  <div className="common-list-title align-middle">
                    {" "}
                    {languageTranslation("QUALIFICATION")}
                  </div>
                  <div className=" align-middle toggle-icon">
                    <i className="fa fa-angle-down"></i>
                  </div>
                </div>
                <div className="common-list-body">
                  <ul className="common-list list-unstyled">
                    <li>Dialysis </li>
                    <li>Home Management</li>
                    <li>Nurse/carer</li>
                  </ul>
                </div>
                <div className="common-list-footer form-section ">
                  <FormGroup className="mb-0">
                    <Select
                      placeholder={languageTranslation("REGION", "STATE")}
                      options={State}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="common-list-card">
              <h5 className="content-title">
                {languageTranslation("ATTRIBUTES")}
              </h5>
              <div className="common-list-wrap">
                <div className="common-list-header d-flex align-items-cente justify-content-between">
                  <div className="common-list-title align-middle">
                    {" "}
                    {languageTranslation("ATTRIBUTES")}
                  </div>
                  <div className=" align-middle toggle-icon">
                    <i className="fa fa-angle-down"></i>
                  </div>
                </div>
                <div className="common-list-body">
                  <ul className="common-list list-unstyled">
                    <li>Dialysis </li>
                    <li>Home Management</li>
                    <li>Nurse/carer</li>
                  </ul>
                </div>
                <div className="common-list-footer form-section ">
                  <FormGroup className="mb-0">
                    <Select
                      placeholder={languageTranslation("REGION", "STATE")}
                      options={State}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="remark-details">
              <div className="remark-header d-flex align-items-center justify-content-between">
                <h5 className="my-2 text-left activity-title">
                  {" "}
                  {languageTranslation("REMARKS")}
                </h5>
                <div onClick={this.handleOnClick} className="edit-remark my-2">
                  <i className="icon-note mr-2" />{" "}
                  {languageTranslation("ADD_REMARKS")}
                </div>
              </div>
              <div className="remark-body">
                <div className="activity-logs ">
                  {this.state.addRemark ? (
                    <div className="activity-block py-2 px-3">
                      <div className="pr-3 text-left">
                        <div className="remark-section">
                          <Input
                            type="textarea"
                            name={"Remarks"}
                            placeholder="Remarks"
                            className="height-textarea "
                          />
                          <div className="add-remark-btn">
                            {" "}
                            {languageTranslation("ADD_REMARKS")}
                          </div>
                        </div>
                      </div>
                      <div className="text-left activity-date">
                        <span>
                          <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                          2:54 PM
                        </span>
                        <span>
                          <i className="fa fa-user mr-2"></i>Mark Smith
                        </span>
                      </div>
                      <span className="activity-icon activity-set"></span>
                    </div>
                  ) : null}
                  <div className="activity-block py-2 px-3">
                    <div className="pr-3 text-left">
                      <span className="text-capitalize">
                        Called a few days before the registration (they
                        repeatedly asked to register), is KS and wants to make
                        some extra money, preferably in clinics, has 2 children
                        and currently no PC because the children broke it, is
                        coming on 09/18 at 11 a.m. for the info call, email
                        office address + Stegemann sent, Jenny
                      </span>
                    </div>
                    <div className="text-left activity-date">
                      <span>
                        <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                        2:54 PM
                      </span>
                      <span>
                        <i className="fa fa-user mr-2"></i>Mark Smith
                      </span>
                    </div>
                    <span className="activity-icon activity-set"></span>
                  </div>
                  <div className="activity-block  py-2 px-3">
                    <div className="pr-3 text-left">
                      <span className="text-capitalize">
                        She came to the info talk with her little son (about 3
                        years). But everyone ran quietly. She had a lot of
                        questions, generally freelance. She is exam. AP. The
                        little one gets his daycare place in October and so she
                        wants to get started with us in November. In January she
                        wants to see if she wants to work part-time at a
                        hospital. She is very friendly and bright, new password
                        sent. WV Doks, set to October because it only wants to
                        start in November. Norma
                      </span>
                    </div>
                    <div className="text-left activity-date">
                      <span>
                        <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                        2:54 PM
                      </span>
                      <span>
                        <i className="fa fa-user mr-2"></i>Mark Smith
                      </span>
                    </div>
                    <span className="activity-icon activity-set"></span>
                  </div>
                  <div className="activity-block  py-2 px-3">
                    <div className="pr-3 text-left">
                      <span className="text-capitalize">
                        she called (yesterday on the phone again with Norma and
                        asked everything again, apparently hadn't listened to
                        the conversation), now she asked questions again and
                        explained to me that she couldn't remember everything,
                        so she is now writing, Then she wanted to make another
                        appointment just to talk about the NV, offered to ask
                        her questions or end it by email, and then she thought I
                        sounded annoyed and she just wanted to speak to Norma,
                        that she would like to ask her questions, but then she
                        was no longer willing to do so, Jenny
                      </span>
                    </div>
                    <div className="text-left activity-date">
                      <span>
                        <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                        2:54 PM
                      </span>
                      <span>
                        <i className="fa fa-user mr-2"></i>Mark Smith
                      </span>
                    </div>
                    <span className="activity-icon activity-set"></span>
                  </div>
                  <div className="activity-block  py-2 px-3">
                    <div className="pr-3 text-left">
                      <span className="text-capitalize">
                        Although she still wants to become a freelancer, her
                        child has to get used to kindergarten and this takes 1
                        to 2 months. She knows which docs we need and will send
                        them and then, but only as soon as her little one has
                        settled in and she has come to a rest., Carolin
                      </span>
                    </div>
                    <div className="text-left activity-date">
                      <span>
                        <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                        2:54 PM
                      </span>
                      <span>
                        <i className="fa fa-user mr-2"></i>Mark Smith
                      </span>
                    </div>
                    <span className="activity-icon activity-set"></span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default PersonalInformation;
