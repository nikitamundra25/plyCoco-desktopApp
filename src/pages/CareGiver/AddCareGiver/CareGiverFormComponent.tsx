import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Label,
  CardBody,
  Input,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  CustomInput,
  BreadcrumbItem,
  Breadcrumb,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { State, Region, Salutation, LegalForm, Country } from "../../../config";
import InputMask from "react-input-mask";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FormikValues
} from "formik";
import { CareGiverValues } from "../../../interfaces";
import { FormikSelectField, FormikTextField } from "../../../common/forms/FormikFields";


const CareGiverFormComponent: any = (
  props: FormikProps<CareGiverValues>
) => {
  const { values, handleChange } = props;
  return (
    <>
      <Row>
        <Col xs={"12"} lg={"12"}>
          <Card>
            <CardHeader className="detail-card">
              {/* <h4>
                  <i className="fa fa-users" />
                  <span className="ml-1">Add Care Giver</span>
                </h4> */}
              <Breadcrumb className="w-100">
                <BreadcrumbItem>
                  <a href="#">Home</a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="#">Caregiver</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>Add Caregiver</BreadcrumbItem>
              </Breadcrumb>
            </CardHeader>
            <CardBody>
              <Form className="form-section">
                <Row>

                  <Col lg={"6"}>
                    <h5 className="main-title">Personal Data</h5>
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
                                      <Field
                                        placeholder="Salutation"
                                        name={'salutation'}
                                        options={Salutation}
                                        className="custom-select-width"
                                        component={FormikSelectField}
                                      />
                                    </InputGroupAddon>
                                    <Field
                                      name={"firstName"}
                                      className="width-common"
                                      component={FormikTextField}
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
                                  <Field
                                    name={"lastName"}
                                    className="width-common"
                                    placeholder="Surname"
                                    component={FormikTextField}
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
                                  Address Line 1
                                    <span className="required">*</span>
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Field
                                    name={"address1"}
                                    placeholder="Address Line 1"
                                    className=" width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    type="text"
                                    name={"address2"}
                                    placeholder="Address Line 2"
                                    className=" width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name={"street"}
                                    placeholder=" Street"
                                    className=" width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name={"city"}
                                    placeholder=" City"
                                    className=" width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name={"postCode"}
                                    placeholder="Post Code"
                                    className=" width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name={'state'}
                                    placeholder="Region/State"
                                    options={State}
                                    component={FormikSelectField}
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
                                  <Field
                                    // value={this.state.selectedOption}
                                    placeholder="Select Country"
                                    name={"country"}
                                    options={Country}
                                    component={FormikSelectField}
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
                                    name={'dob'}
                                    //   value={this.state.date}
                                    placeholder="DD/MM/YYYY"
                                    mask="99/99/9999"
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
                    <h5 className="main-title">Reachability</h5>
                    <div className="form-card">
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
                                  <Field
                                    name={"phone"}
                                    placeholder=" Phone Number"
                                    className="width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name={"fax"}
                                    placeholder=" Fax"
                                    className="width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name={"mobilePhone"}
                                    placeholder="Mobile Phone"
                                    className="width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name={"email"}
                                    placeholder=" Email address"
                                    className="width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name={"username"}
                                    placeholder=" Username"
                                    className="width-common"
                                    component={FormikTextField}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <h5 className="main-title">Vehicle Information</h5>
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
                                  <div className="custom-radio-block">
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
                                    <Field
                                      name="driverLicenseNumber"
                                      placeholder="Driver's License Number"
                                      className="width-common"
                                      component={FormikTextField}
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
                                  <div className="custom-radio-block">
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
                    <h5 className="main-title">Other Information</h5>
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
                                  <Field
                                    name={"legalForm"}
                                    placeholder="Legal Form"
                                    options={LegalForm}
                                    component={FormikSelectField}
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
                                  Company Name
                                    <span className="required">*</span>
                                  <br />
                                  <small>(Including GMBH, UG)</small>
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Field
                                    name="companyName"
                                    placeholder="Company Name"
                                    className="width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name="registrationNumber"
                                    placeholder="Registration number"
                                    className="width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name="registerCourt"
                                    placeholder="Register Court"
                                    className="width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name="executiveDirector"
                                    placeholder="Executive Director"
                                    className="width-common"
                                    component={FormikTextField}
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
                                  Employee subject to social security
                                  contribution
                                    <span className="required">*</span>
                                </Label>
                              </Col>
                              <Col sm="5">
                                <div className="custom-radio-block">
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
                                  <Field
                                    name="taxNumber"
                                    placeholder="Tax Number"
                                    className="width-common"
                                    component={FormikTextField}
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
                                  <Field
                                    name={'workZones'}
                                    placeholder=" Working zones"
                                    isMulti
                                    options={Region}
                                    component={FormikSelectField}
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
                                  <Field
                                    type="textarea"
                                    name={"remarks"}
                                    placeholder="Remarks"
                                    rows="4"
                                    component={FormikTextField}
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
                        <Button
                          color="primary"
                          type="submit"
                          className="btn-sumbit"
                          disabled={props.isSubmitting || props.isValid || !props.dirty}
                          onClick={props.handleSubmit}
                        >
                          Submit
                          </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CareGiverFormComponent;
