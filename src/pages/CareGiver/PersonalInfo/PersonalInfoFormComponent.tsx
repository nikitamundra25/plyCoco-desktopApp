import React, { Component } from "react";
import Select from "react-select";
import {
  Card,
  CardHeader,
  Label,
  CardBody,
  Col,
  Row,
  Button,
  CustomInput,
  BreadcrumbItem,
  Breadcrumb,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Input
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  State,
  Region,
  Salutation,
  LegalForm,
  Country,
  Gender
} from "../../../config";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FormikValues
} from "formik";
import {
  CareGiverValues,
  IReactSelectInterface,
  IStates,
  ICountries,
  ICountry,
  IState
} from "../../../interfaces";
import {
  FormikSelectField,
  FormikTextField
} from "../../../common/forms/FormikFields";
import { languageTranslation } from "../../../helpers";
import FormikCheckbox from "../../../common/forms/FormikFields/FormikCheckbox";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { CountryQueries } from "../../../queries";

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const PersonalInfoFormComponent: any = (
  props: FormikProps<CareGiverValues>
) => {
  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  // To fetch the states of selected contry & don't want to query on initial load
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );
  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({
        label: name,
        value: id
      })
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({
        label: name,
        value: id
      })
    );
  }

  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    if (name === "country") {
      getStatesByCountry({
        variables: { countryid: selectOption ? selectOption.value : "82" } // default code is for germany
      });
    }
  };

  const { values } = props;
  return (
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
                      <Field
                        component={FormikTextField}
                        name={"userId"}
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
                            <Field
                              component={FormikTextField}
                              name={"registartionSince"}
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
                  {"Region"}
                  <span className="required">*</span>
                </Label>
              </Col>
              <Col sm="8">
                <div className="field-class">
                  <Select
                    placeholder={languageTranslation("REGION", "STATE")}
                    options={statesOpt}
                    onChange={(value: any) => handleSelect(value, "regionId")}
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
                        options={Gender}
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
                            <Field
                              component={FormikTextField}
                              name={"title"}
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
                  <Field
                    component={FormikTextField}
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
                  <Field
                    component={FormikTextField}
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
                      <Field
                        name={"dateOfBirth"}
                        component={FormikTextField}
                        type="date"
                        placeholder="06/09/2020"
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
                            <Field
                              component={FormikTextField}
                              name={"age"}
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
                  <Field
                    component={FormikTextField}
                    name={"street"}
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
                <Label className="form-label col-form-label ">City</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"city"}
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
                  <Field
                    component={FormikTextField}
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
                  <Field
                    component={FormikTextField}
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
                  <Field
                    component={FormikTextField}
                    name={"taxNumber"}
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
                  <Field
                    component={FormikTextField}
                    name={"bankName"}
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
                  <Field
                    component={FormikTextField}
                    name={"iban"}
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
                  <Field
                    component={FormikTextField}
                    name={"username"}
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
                  <Field
                    component={FormikTextField}
                    name={"companyName"}
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
                  <Field
                    component={FormikTextField}
                    name={"registerCourt"}
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
                  Registeration Number
                  <span className="required">*</span>
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Input
                    type="text"
                    name={"email"}
                    placeholder="Registeration Number"
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
                  Executive Director
                  <span className="required">*</span>
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"executiveDirector"}
                    placeholder="Executive Director"
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
                    {/* <Field
                      component={FormikCheckbox}
                      type="checkbox"
                      name={"employed"}
                    /> */}
                    <div className=" checkbox-custom mb-0">
                      <input type="checkbox" id="check" className="" />
                      <Label for="check"></Label>
                    </div>
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
  );
};

export default PersonalInfoFormComponent;
