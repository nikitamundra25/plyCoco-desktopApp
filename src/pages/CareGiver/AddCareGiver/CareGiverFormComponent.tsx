import React, { Component, FunctionComponent } from "react";
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
import { CareGiverValues, IReactSelectInterface, ICountry, ICountries, IStates, IState } from "../../../interfaces";
import { FormikSelectField, FormikTextField } from "../../../common/forms/FormikFields";
import { CountryQueries } from '../../../queries';
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const CareGiverFormComponent: FunctionComponent<FormikProps<
  CareGiverValues
>> = (props: FormikProps<CareGiverValues>) => {
  const { values } = props;
  console.log("+++++++++++", props.errors)
  // To fetch the list of countries
  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  // To fetch the states of selected contry & don't want to query on initial load
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY,
  );
  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({
        label: name,
        value: id,
      }),
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({
        label: name,
        value: id,
      }),
    );
  }
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
                                options={statesOpt}
                                name={"stateId"}
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
                                name={"countryId"}
                                component={FormikSelectField}
                                placeholder="Select Country"
                                options={countriesOpt}
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
                                component={FormikTextField}
                                type="date"
                                name={"dateOfBirth"}
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
                                name={"phoneNumber"}
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
                              Mobile Number
                                    <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Field
                                component={FormikTextField}
                                name={"mobileNumber"}
                                placeholder="Mobile Number"
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
                                name={"userName"}
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
                                    name="vehicleAvailable"
                                    label="Yes"
                                  />
                                </FormGroup>
                                <FormGroup check inline>
                                  <CustomInput
                                    type="radio"
                                    id="no_v"
                                    name="vehicleAvailable"
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
