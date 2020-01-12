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
  Button,
  TabPane,
  TabContent,
  CustomInput,
  BreadcrumbItem,
  Breadcrumb,
  InputGroup,
  InputGroupAddon,
  FormGroup
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
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
  const { values } = props;
  console.log("errorrrrrssssssssss==========>", props.errors)
  return (
    <>

      <Card>
        <CardHeader className="detail-card">
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
                                    name={'salutation'}
                                    placeholder="Salutation"
                                    options={Salutation}
                                    className="custom-select-width"
                                    component={FormikSelectField}
                                  />
                                </InputGroupAddon>
                                <Field
                                  component={FormikTextField}
                                  name={"firstName"}
                                  key={"firstName"}
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
                              <Field
                                component={FormikTextField}
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
                              Address Line 1
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Field
                                component={FormikTextField}
                                name={"address1"}
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
                              <Field
                                component={FormikTextField}
                                name={"address2"}
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
                              <Field
                                component={FormikTextField}
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
                              <Field
                                component={FormikTextField}
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
                              <Field
                                component={FormikTextField}
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
                              <Field
                                placeholder="Region/State"
                                options={State}
                                name={"state"}
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
                                name={"country"}
                                component={FormikSelectField}
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
                              <Field
                                // component={FormikTextField}
                                type="date"
                                placeholder="DD/MM/YYYY"
                                mask="99/99/9999"
                                className="form-control"
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
                              <Field
                                component={FormikTextField}
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
                              <Field
                                component={FormikTextField}
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
                              <Field
                                component={FormikTextField}
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
                              <Field
                                component={FormikTextField}
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
                              <Field
                                component={FormikTextField}
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
                                  component={FormikTextField}
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
                                component={FormikTextField}
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
                              <Field
                                component={FormikTextField}
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
                              <Field
                                component={FormikTextField}
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
                              <Field
                                component={FormikTextField}
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
                                component={FormikTextField}
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
                              <Field
                                placeholder=" Working zones"
                                isMulti
                                key={"sds"}
                                name={"workZones"}
                                component={FormikSelectField}
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
                              <Field
                                component={FormikSelectField}
                                type="textarea"
                                name={"remarks"}
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
                </div>
                <Button
                  color="primary"
                  type="submit"
                  className="btn-sumbit"
                  onClick={props.handleSubmit}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default CareGiverFormComponent;
