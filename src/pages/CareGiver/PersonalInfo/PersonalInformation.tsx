import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  Card
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import InputMask from "react-input-mask";
import {
  State,
  Region,
  Salutation,
  LegalForm,
  Country,
  NightAllowancePerHour
} from "../../../config";
import { languageTranslation } from "../../../helpers";

class PersonalInformation extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: "",
      addRemark: false
    };
  }
  handleChange = (date: any) => {
    this.setState({
      startDate: date
    });
  };
  handleOnClick = () => {
    this.setState({
      addRemark: true
    });
  };
  render() {
    return (
      <div>
        <Form className="form-section forms-main-section">
          {/* <div>
            <div className="custom-control custom-switch mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="switch1"
              />

              <Label className="custom-control-label" for="switch1">
                To Edit
              </Label>
            </div>
          </div> */}
          <Row>
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
                            {languageTranslation("CAREGIVER_STATE_LABEL")}
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
                              placeholder="Region/State"
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
                                        placeholder={languageTranslation(
                                          "TITLE"
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
                          {/* <Button  className="alfabate-btn btn">S</Button> */}
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
                          {/* <Button  className="alfabate-btn btn">N</Button> */}
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
                      <Row className="">
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Birthday Date
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="7">
                              <div>
                                <Select
                                  placeholder="06/09/2020"
                                  options={State}
                                />
                              </div>
                            </Col>
                            <Col sm="5">
                              <FormGroup>
                                <Row className="custom-col inner-no-padding-col d-flex align-items-center">
                                  <Col sm="6">
                                    <Label className="form-label col-form-label inner-label">
                                      Age
                                      <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="6">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder="123"
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
                          <Label className="form-label col-form-label ">
                            Street<span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"address"}
                              placeholder="Street"
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
                            City
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"address"}
                              placeholder="City"
                              className=" width-common"
                            />
                          </div>
                          {/* <Button  className="alfabate-btn btn">N</Button> */}
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                            ZIP
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"street"}
                              placeholder="ZIP"
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
                            Country
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select placeholder="Germany" options={Country} />
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
                            State
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select placeholder="Bavaria" options={State} />
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
                            Phone
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"phone"}
                              placeholder=" Phone Number"
                              className="width-common"
                            />
                          </div>
                          {/* <Button  className="alfabate-btn btn">M</Button> */}
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Fax
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"fax"}
                              placeholder=" Fax"
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
                            Mobile
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"mobilePhone"}
                              placeholder="Mobile Phone"
                              className="width-common"
                            />
                          </div>
                          {/* <Button  className="alfabate-btn btn">T</Button> */}
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Email
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder=" Email"
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
                            Tax Number
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Tax Number"
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
                            Bank
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Bank"
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
                            IBAN
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="IBAN"
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
                            Username
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Username"
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
                            Belongs to
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select placeholder="Belongs to" options={State} />
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
                            Legal Form
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select placeholder="Legal Form" options={State} />
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
                            Company Name
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Company Name"
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
                            Register Court
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Register Court"
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
                            Register Name
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Register Name"
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
                            Manage Director
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Manage Director"
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
                            Employed
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <div className=" checkbox-custom mb-0">
                              <input type="checkbox" id="check" className="" />
                              <Label for="check"></Label>
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
                            Comments (Internally)
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="textarea"
                              name={"additionalText "}
                              placeholder="Comments (Internally)"
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
                            Fee
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
                                  placeholder="Fee"
                                  className="width-common"
                                />
                              </div>
                            </Col>
                            <Col sm="8">
                              <FormGroup>
                                <Row className="custom-col inner-no-padding-col">
                                  <Col sm="6">
                                    <Label className="form-label col-form-label inner-label">
                                      Night
                                      <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="6">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder="Night"
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
                            Weekend Allowance
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
                                  placeholder="Weekend Allowance"
                                  className="width-common"
                                />
                              </div>
                            </Col>
                            <Col sm="8">
                              <FormGroup>
                                <Row className="custom-col inner-no-padding-col">
                                  <Col sm="6">
                                    <Label className="form-label col-form-label inner-label">
                                      Holiday
                                      {/* <span className="required">*</span> */}
                                    </Label>
                                  </Col>
                                  <Col sm="6">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder="Holiday"
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
                            Night Allowance
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="8">
                              <div>
                                <Select
                                  options={NightAllowancePerHour}
                                  className="custom-input-width"
                                />
                              </div>
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
                            Invoice interval
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
                              placeholder="Invoice interval"
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
                            Leasing Price List
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
                              placeholder="Lessing Price List"
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
                  <div
                    onClick={this.handleOnClick}
                    className="edit-remark my-2"
                  >
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
                          some extra money, preferably in clinics, has 2
                          children and currently no PC because the children
                          broke it, is coming on 09/18 at 11 a.m. for the info
                          call, email office address + Stegemann sent, Jenny
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
                          little one gets his daycare place in October and so
                          she wants to get started with us in November. In
                          January she wants to see if she wants to work
                          part-time at a hospital. She is very friendly and
                          bright, new password sent. WV Doks, set to October
                          because it only wants to start in November. Norma
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
                          she called (yesterday on the phone again with Norma
                          and asked everything again, apparently hadn't listened
                          to the conversation), now she asked questions again
                          and explained to me that she couldn't remember
                          everything, so she is now writing, Then she wanted to
                          make another appointment just to talk about the NV,
                          offered to ask her questions or end it by email, and
                          then she thought I sounded annoyed and she just wanted
                          to speak to Norma, that she would like to ask her
                          questions, but then she was no longer willing to do
                          so, Jenny
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
                          to 2 months. She knows which docs we need and will
                          send them and then, but only as soon as her little one
                          has settled in and she has come to a rest., Carolin
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

          {/* <Row>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      First Name
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Select
                            placeholder="Salutation"
                            options={Salutation}
                            className="custom-select-width"
                          />
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name={"firstGivenName"}
                          placeholder="First Given Name"
                          className="width-common"
                        />
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Surname
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"lastName"}
                        placeholder="Surname"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Street
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"street"}
                        placeholder=" Street"
                        className=" width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      City
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"city"}
                        placeholder=" City"
                        className=" width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Post code
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"postCode"}
                        placeholder="Post Code"
                        className=" width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Region/State
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select placeholder="Region/State" options={State} />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Country
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select
                        // value={this.state.selectedOption}
                        placeholder="Select Country"
                        options={Country}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Date of Birth
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <DatePicker
                        placeholderText="Select Date"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Phone
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"phone"}
                        placeholder=" Phone Number"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Fax
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"fax"}
                        placeholder=" Fax"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Mobile Phone
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"mobilePhone"}
                        placeholder="Mobile Phone"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Email address
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"email"}
                        placeholder=" Email address"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Driver's license
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div className="custom-radio-block">
                      <Row>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="yes"
                            name="driversLicense"
                            label="Yes"
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="no"
                            name="driversLicense"
                            label="No"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Own vehicle available
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div className="custom-radio-block">
                      <Row>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="yes_v"
                            name="vehicleavailable"
                            label="Yes"
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="no_v"
                            name="vehicleavailable"
                            label="No"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Driver's License Number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="driverLicenseNumber"
                        placeholder="Driver's License Number"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}></Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Legal Form
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select placeholder="Legal Form" options={LegalForm} />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}></Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Company Name <small>(Including GMBH, UG)</small>
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Registration Number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="registrationNumber"
                        placeholder="Registration number"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Register Court
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="registerCourt"
                        placeholder="Register Court"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Executive Director
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="executiveDirector"
                        placeholder="Executive Director"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="7">
                    <Label className="form-label col-form-label">
                      Employee subject to social security contribution
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="5">
                    <div className="custom-radio-block">
                      <Row>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="yes_s"
                            name="socialSecurityContribution"
                            label="Yes"
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="no_s"
                            name="socialSecurityContribution"
                            label="No"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Tax Number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="taxNumber"
                        placeholder="Tax Number"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Working zones
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select
                        placeholder=" Working zones"
                        isMulti
                        options={Region}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Remarks
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="textarea"
                        name={"Remarks"}
                        placeholder="Remarks"
                        className="height-auto "
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <div className={"text-right"}>
                <Button color="primary" type="submit" className="btn-sumbit">
                  Next Step
                </Button>
              </div>
            </Col>
          </Row> */}
        </Form>
      </div>
    );
  }
}
export default PersonalInformation;
