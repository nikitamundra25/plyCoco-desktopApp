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
  InputGroupAddon
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import InputMask from "react-input-mask";

import { State, Region, Salutation, LegalForm, Country } from "../../config";

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
  render() {
    return (
      <div>
        <Form className="form-section">
          <Row>
            <Col lg={"6"}>
              <h5 className="main-title ">Personal Data</h5>
              <div className="form-card">
                <Row>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            First Name
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
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
                                name={"firstName"}
                                placeholder="First Name"
                                className="width-common"
                              />
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
                            Surname
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
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
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                            Address Line 1<span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"address"}
                              placeholder="Address Line 1"
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
                            Address Line 2
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"address"}
                              placeholder="Address Line 2"
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
                            Street
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
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
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                            City
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
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
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                            Post code
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
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
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Region/State
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
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Country
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
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

                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Date of Birth
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <InputMask
                              value={this.state.date}
                              placeholder="DD/MM/YYYY"
                              mask="99/99/9999"
                              className="form-control"
                              // onChange={this.handleDateOfBirth}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col lg={"6"}>
              <h5 className="main-title ">Reachability</h5>
              <div className="form-card minheight-auto">
                <Row>
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
                            Mobile Phone
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
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Email address
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
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
                              name={"Username"}
                              placeholder=" Username"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <div>
                <h5 className="main-title  ">Vehicle Information</h5>
                <div className="form-card">
                  <Row>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              Driver's license
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div className="custom-radio-block pt-1">
                              <FormGroup check inline>
                                <CustomInput
                                  type="radio"
                                  id="yes"
                                  name="driversLicense"
                                  label="Yes"
                                />
                              </FormGroup>
                              <FormGroup check inline>
                                <CustomInput
                                  type="radio"
                                  id="no"
                                  name="driversLicense"
                                  label="No"
                                />
                              </FormGroup>
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
                              Driver's License Number
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8">
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
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              Own vehicle available
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div className="custom-radio-block pt-1">
                              <FormGroup check inline>
                                <CustomInput
                                  type="radio"
                                  id="yes_v"
                                  name="vehicleavailable"
                                  label="Yes"
                                />
                              </FormGroup>
                              <FormGroup check inline>
                                <CustomInput
                                  type="radio"
                                  id="no_v"
                                  name="vehicleavailable"
                                  label="No"
                                />
                              </FormGroup>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={"12"}>
              <h5 className="main-title ">Other Information</h5>
              <div className="form-card">
                <Row>
                  <Col lg={"6"}>
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
                            <Select
                              placeholder="Legal Form"
                              options={LegalForm}
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
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Company Name<span className="required">*</span>{" "}
                            <br />
                            <small>(Including GMBH, UG)</small>
                          </Label>
                        </Col>
                        <Col sm="8">
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
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Registration Number
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
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
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Executive Director
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
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
                          <div className="custom-radio-block pt-1">
                            <FormGroup check inline>
                              <CustomInput
                                type="radio"
                                id="yes_s"
                                name="socialSecurityContribution"
                                label="Yes"
                              />
                            </FormGroup>
                            <FormGroup check inline>
                              <CustomInput
                                type="radio"
                                id="no_s"
                                name="socialSecurityContribution"
                                label="No"
                              />
                            </FormGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>

                  <Col lg={"6"}>
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
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Working zones
                          </Label>
                        </Col>
                        <Col sm="8">
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
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Remarks
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="textarea"
                              name={"Remarks"}
                              placeholder="Remarks"
                              rows="4"
                              className="textarea-custom "
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="mandatory-text">* Required Fields</div>
                <div className={"text-right"}>
                  <Button color="primary" type="submit" className="btn-sumbit">
                    Save
                  </Button>
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
