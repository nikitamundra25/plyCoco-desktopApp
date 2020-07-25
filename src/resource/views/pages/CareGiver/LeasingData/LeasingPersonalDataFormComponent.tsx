import React, { FunctionComponent } from "react";
import { FormGroup, Label, Col, Row, Button, Form } from "reactstrap";
import {
  Status,
  Nationality,
  MaritalStatus,
  HealthInsuranceType,
  HealthInsuranceProvider,
  Religion,
  Preoccupation,
  IBANRegex,
  DateMask,
} from "../../../../../config";
import { FormikProps, Field } from "formik";
import MaskedInput from "react-text-mask";
import { ILeasingValues } from "../../../../../interfaces";
import {
  FormikTextField,
  FormikSelectField,
} from "../../../components/forms/FormikFields";
import { languageTranslation } from "../../../../../helpers";
import "../caregiver.scss";

const LeasingPersonalDataFormComponent: FunctionComponent<FormikProps<
  ILeasingValues
>> = (props: FormikProps<ILeasingValues>) => {
  const {
    values: {
      payrollIBAN,
      placeOfBirth,
      birthName,
      nationality,
      maritalStatus,
      children,
      factorChildAllowance,
      healthInsuranceType,
      healthInsuranceProvider,
      socialSecurityNumber,
      religion,
      controlId,
      taxBracket,
      preoccupation,
      status,
      firstDay,
      lastDay,
      monthlyWorkingHrs,
      weeklyWorkingHrs,
    },
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
  } = props;
  return (
    <div>
      <Form className="form-section">
        <div className="d-none d-md-block" id={"caregiver-add-btn"}>
          <Button
            id={"caregiver-add-btn"}
            onClick={handleSubmit}
            color={"primary"}
            className={"save-button"}
            disabled={
              isSubmitting ||
              (!placeOfBirth &&
                !birthName &&
                !nationality &&
                !maritalStatus &&
                !children &&
                !factorChildAllowance &&
                !healthInsuranceType &&
                !healthInsuranceProvider &&
                !socialSecurityNumber &&
                !religion &&
                !controlId &&
                !taxBracket &&
                !preoccupation &&
                !payrollIBAN &&
                !status &&
                !firstDay &&
                !lastDay &&
                !monthlyWorkingHrs &&
                !weeklyWorkingHrs)
            }
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin mr-2" /> : ""}
            {languageTranslation("SAVE_BUTTON")}
          </Button>
        </div>

        <Row>
          <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
            <h5 className="main-title ">
              {languageTranslation("LEASING_PERSONAL_DATA_HEADING")}
            </h5>
            <div className="form-card minheight-auto">
              <Row>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation(
                            "CAREGIVER_PLACE_OF_BIRTH_LABEL"
                          )}{" "}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"placeOfBirth"}
                            placeholder={languageTranslation(
                              "CAREGIVER_PLACE_OF_BIRTH_LABEL"
                            )}
                            maxLength={50}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row>
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label">
                          {languageTranslation("CAREGIVER_BIRTH_NAME_LABEL")}
                          <br />
                          <small>{languageTranslation("ONLY_IF_DIFFERENT_BIRTH_NAME")} </small>
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"birthName"}
                            placeholder={languageTranslation("CAREGIVER_BIRTH_NAME_LABEL")}
                            className="width-common"
                            maxLength={30}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label">
                          {languageTranslation("CAREGIVER_NATIONALITY_LABEL")}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            name={"nationality"}
                            component={FormikSelectField}
                            options={Nationality}
                            placeholder={languageTranslation("SELECT_NATIONALITY")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation("CAREGIVER_MARITAL_STATUS_LABEL")}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"maritalStatus"}
                            options={MaritalStatus}
                            placeholder= {languageTranslation("CAREGIVER_MARITAL_STATUS_LABEL")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row>
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation("CAREGIVER_CHILDREN_LABEL")}
                          <br />
                          <small>{languageTranslation("O_IF_NONE")}</small>
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"children"}
                            placeholder= {languageTranslation("CAREGIVER_CHILDREN_LABEL")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>

                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row>
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                         {languageTranslation("CHILD_ALLOWANCE_FACTOR")}
                          <br />
                          <small>{languageTranslation("O_IF_NONE")} </small>
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          {" "}
                          <Field
                            component={FormikTextField}
                            name={"factorChildAllowance"}
                            placeholder={languageTranslation("CHILD_ALLOWANCE_FACTOR")}
                            className="width-common"
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation("STATUS")}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"status"}
                            options={Status}
                            placeholder={languageTranslation("STATUS")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation("TAX_BRACKET")}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"taxBracket"}
                            placeholder={languageTranslation("TAX_BRACKET")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>

                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label">
                          {languageTranslation("HEALTH_ISURANCE_TYPE")}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"healthInsuranceType"}
                            options={HealthInsuranceType}
                            placeholder={languageTranslation("HEALTH_ISURANCE_TYPE")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation("HEALTH_ISURANCE_PROVIDER")}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"healthInsuranceProvider"}
                            options={HealthInsuranceProvider}
                            placeholder={languageTranslation("HEALTH_ISURANCE_PROVIDER")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation("SOCIAL_SECURITY_NUMBER")}
                          <br />
                          {/* <small>(example: 65170839J003)</small> */}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"socialSecurityNumber"}
                            placeholder="Ex: 65170839J003"
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation("CAREGIVER_RELIGION_LABEL")}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"religion"}
                            options={Religion}
                            placeholder={languageTranslation("CAREGIVER_RELIGION_LABEL")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label">
                          {languageTranslation("CAREGIVER_PREOCCUPATION_LABEL")}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"preoccupation"}
                            options={Preoccupation}
                            placeholder={languageTranslation("CAREGIVER_PREOCCUPATION_LABEL")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row>
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation("CAREGIVER_PAYROLL_IBAN_LABEL")} <br />
                          <small>
                            {languageTranslation("NECESSARY_ACCOUNT")}
                          </small>
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <Field name="payrollIBAN">
                          {({ field }: any) => (
                            <div className={"required-input"}>
                              <MaskedInput
                                {...field}
                                value={payrollIBAN}
                                placeholder={languageTranslation(
                                  "BANK_IBAN_PLACEHOLDER"
                                )}
                                mask={IBANRegex}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${
                                  errors.payrollIBAN && touched.payrollIBAN
                                    ? "text-input error"
                                    : "text-input"
                                }`}
                              />
                              {errors.payrollIBAN && touched.payrollIBAN && (
                                <div className="required-tooltip">
                                  {errors.payrollIBAN}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Col>

          <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
            <h5 className="main-title ">
              {languageTranslation("LEASING_CONTRACT_DATA_HEADING")}
            </h5>
            <div className="form-card minheight-auto">
              <Row>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation("LEASING_CONTRACT_FIRST_DAY")}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field name="payrollIBAN">
                            {({ field }: any) => (
                              <div className={"required-input"}>
                                <MaskedInput
                                  {...field}
                                  className={`form-control ${
                                    errors.firstDay && touched.firstDay
                                      ? "text-input error"
                                      : "text-input"
                                  }`}
                                  placeholder={languageTranslation(
                                    "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                                  )}
                                  mask={DateMask}
                                  name={"firstDay"}
                                  value={firstDay}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.firstDay && touched.firstDay && (
                                  <div className="required-tooltip">
                                    {errors.firstDay}
                                  </div>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label">
                          {languageTranslation("LEASING_CONTRACT_LAST_DAY")}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field name="payrollIBAN">
                            {({ field }: any) => (
                              <div className={"required-input"}>
                                <MaskedInput
                                  {...field}
                                  className={`form-control ${
                                    errors.lastDay && touched.lastDay
                                      ? "text-input error"
                                      : "text-input"
                                  }`}
                                  placeholder={languageTranslation(
                                    "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                                  )}
                                  mask={DateMask}
                                  name={"lastDay"}
                                  value={lastDay}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.lastDay && touched.lastDay && (
                                  <div className="required-tooltip">
                                    {errors.lastDay}
                                  </div>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label ">
                          {languageTranslation(
                            "LEASING_CONTRACT_MONTHLY_WORKING_HRS"
                          )}
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"monthlyWorkingHrs"}
                            placeholder={languageTranslation(
                              "LEASING_CONTRACT_MONTHLY_WORKING_HRS"
                            )}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"} md={"12"} sm={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                        <Label className="form-label col-form-label">
                          {languageTranslation(
                            "LEASING_CONTRACT_WEEKLY_WORKING_HRS"
                          )}
                          <br />
                        </Label>
                      </Col>
                      <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"weeklyWorkingHrs"}
                            placeholder={languageTranslation(
                              "LEASING_CONTRACT_WEEKLY_WORKING_HRS"
                            )}
                            className="width-common"
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
            <div className="d-block d-md-none text-right">
              <Button
                onClick={handleSubmit}
                color={"primary"}
                className={"submit-common-btn mb-3"}
                disabled={
                  isSubmitting ||
                  (!placeOfBirth &&
                    !birthName &&
                    !nationality &&
                    !maritalStatus &&
                    !children &&
                    !factorChildAllowance &&
                    !healthInsuranceType &&
                    !healthInsuranceProvider &&
                    !socialSecurityNumber &&
                    !religion &&
                    !controlId &&
                    !taxBracket &&
                    !preoccupation &&
                    !payrollIBAN &&
                    !status &&
                    !firstDay &&
                    !lastDay &&
                    !monthlyWorkingHrs &&
                    !weeklyWorkingHrs)
                }
              >
                {isSubmitting ? (
                  <i className="fa fa-spinner fa-spin mr-2" />
                ) : (
                  ""
                )}
                {languageTranslation("SAVE_BUTTON")}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default LeasingPersonalDataFormComponent;
