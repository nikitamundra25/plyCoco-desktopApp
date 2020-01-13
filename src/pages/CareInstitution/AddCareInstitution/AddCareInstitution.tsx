import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  Input,
  Col,
  Row,
} from "reactstrap";
import Select from "react-select";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../routes/routes";
import { FormikProps, Field, Form, Formik, FormikHelpers } from 'formik';
import { languageTranslation, logger } from "../../../helpers";
import { State, Region, Salutation, Country } from "../../../config";
import {
  ICareInstitutionFormValues,
  ICountries,
  IReactSelectInterface,
  ICountry,
  IStates,
  IState,
} from '../../../interfaces';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
// import CareInstitutionContact from "../PersonalInfo/CareInstitutionContact";
import { CountryQueries } from '../../../queries';

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;


const AddCareInstitution: any = (
  props: FormikProps<ICareInstitutionFormValues>
) => {

  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY,
  );
  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({ label: name, value: id }),
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({ label: name, value: id }),
    );
  }

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, 'value');
    setFieldValue(name, selectOption);
    if (name === 'country') {
      getStatesByCountry({
        variables: { countryid: selectOption ? selectOption.value : '82' }, // default code is for germany
      });
      logger(statesData, 'sdsdsdsd');
    }
  };

  const {
    values: {
      email,
      firstName,
      lastName,
      userName,
      phoneNumber,
      mobileNumber,
      fax,
      shortName,
      companyName,
      street,
      city,
      zipCode,
      state,
      country,
      salutaion
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = props;
  console.log("Error", errors);

  return (
    <div>
      <Card>
        <CardHeader>
          <AppBreadcrumb appRoutes={routes} className="w-100" />
        </CardHeader>
        <CardBody>
          <Form className="form-section">
            <Row>
              <Col lg={"6"} className="mb-3">
                <div className="form-card h-100">
                  <Row>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation("SALUTATION")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Select
                                placeholder={languageTranslation(
                                  "SALUTATION"
                                )}
                                value={salutaion ? salutaion : undefined}
                                onChange={(value: any) =>
                                  handleSelect(value, 'salutaion')
                                }
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
                                placeholder={languageTranslation(
                                  "FIRST_NAME"
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={firstName}
                                className={
                                  errors.firstName && touched.firstName
                                    ? "text-input error"
                                    : "text-input"
                                }
                              />
                              {errors.firstName && touched.firstName && (
                                <div className="required-error">
                                  {errors.firstName}
                                </div>
                              )}
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
                                onChange={handleChange}
                                maxLength="20"
                                onBlur={handleBlur}
                                value={lastName}
                                className={
                                  errors.lastName && touched.lastName
                                    ? "text-input error"
                                    : "text-input"
                                }
                              />
                              {errors.lastName && touched.lastName && (
                                <div className="required-error">
                                  {errors.lastName}
                                </div>
                              )}
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
                              {languageTranslation("PHONE")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Input
                                type="text"
                                name={"phoneNumber"}
                                onChange={handleChange}
                                value={phoneNumber}
                                placeholder={languageTranslation("PHONE")}
                                className="text-input"
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
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Input
                                type="text"
                                name={"fax"}
                                onChange={handleChange}
                                value={fax}
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
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Input
                                type="text"
                                name={"mobileNumber"}
                                onChange={handleChange}
                                value={mobileNumber}
                                placeholder={languageTranslation("MOBILE")}
                                className={
                                  errors.mobileNumber && touched.mobileNumber
                                    ? "text-input error"
                                    : "text-input"
                                }
                              />
                              {errors.mobileNumber && touched.mobileNumber && (
                                <div className="required-error">
                                  {errors.mobileNumber}
                                </div>
                              )}
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
                                name={"email"}
                                placeholder={languageTranslation("EMAIL")}
                                onChange={handleChange}
                                onBlur={(e: any) => {
                                  //get string before a @ to set username
                                  const username = email
                                    ? email.substring(0, email.indexOf('@'))
                                    : '';

                                  setFieldValue('userName', username);
                                  handleBlur(e);
                                }}
                                value={email}
                                className={
                                  errors.email && touched.email
                                    ? "text-input error"
                                    : "text-input"
                                }
                              />
                              {errors.email && touched.email && (
                                <div className="required-error">
                                  {errors.email}
                                </div>
                              )}
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
                                name={"userName"}
                                onChange={handleChange}
                                value={userName}
                                placeholder={languageTranslation("USERNAME")}
                                className={
                                  errors.userName && touched.userName
                                    ? "text-input error"
                                    : "text-input"
                                }
                              />
                              {errors.userName && touched.userName && (
                                <div className="required-error">
                                  {errors.userName}
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={"6"} className="mb-3">
                <div className="form-card h-100">
                  <Row>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation("SHORT_NAME")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Input
                                type="text"
                                name={"shortName"}
                                onChange={handleChange}
                                value={shortName}
                                placeholder={languageTranslation(
                                  "SHORT_NAME"
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
                              {languageTranslation("COMPANY_NAME")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Input
                                type="text"
                                name="companyName"
                                placeholder={languageTranslation(
                                  "COMPANY_NAME"
                                )}
                                onChange={handleChange}
                                value={companyName}
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
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Input
                                type="text"
                                name={"street"}
                                onChange={handleChange}
                                value={street}
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
                                name={"city"}
                                onChange={handleChange}
                                value={city}
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
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Input
                                type="text"
                                name={"zipCode"}
                                onChange={handleChange}
                                value={zipCode}
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
                            <Label className="form-label col-form-label">
                              {languageTranslation("STATE")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Select
                                placeholder={languageTranslation("STATE")}
                                options={statesOpt}
                                value={state ? state : undefined}
                                onChange={(value: any) =>
                                  handleSelect(value, 'state')
                                }
                                noOptionsMessage={() => {
                                  return 'Select a country first';
                                }}
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
                              {languageTranslation("COUNTRY")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Select
                                placeholder={languageTranslation("COUNTRY")}
                                options={countriesOpt}
                                value={country ? country : undefined}
                                onChange={(value: any) =>
                                  handleSelect(value, 'country')
                                }
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
                  <div className="mandatory-text">
                    {" "}
                    {languageTranslation("REQUIRED_FIELDS")}
                  </div>
                  <div className={"text-right"}>
                    <Button
                      color="primary"
                      type="submit"
                      onSubmit={handleSubmit}
                      className="btn-sumbit"
                    >
                      {languageTranslation("SAVE_BUTTON")}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* <Formik
        initialValues={constactValues}
        onSubmit={handleSubmitConstact}
        children={(props: FormikProps<ICareInstitutionContact>) => (
          <CareInstitutionContact {...props} />
        )}
        validationSchema={""}
      /> */}
    </div>
  );
}
export default AddCareInstitution;
