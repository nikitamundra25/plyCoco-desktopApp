import React, { FunctionComponent } from "react";
import { FormGroup, Label, Col, Row, Button, Form } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import {
  Status,
  Nationality,
  MaritalStatus,
  HealthInsuranceType,
  HealthInsuranceProvider,
  Religion,
  Preoccupation,
  IBANRegex,
  DateMask
} from "../../../config";
import { FormikProps, Field } from "formik";
import { ILeasingValues } from "../../../interfaces";
import {
  FormikTextField,
  FormikSelectField
} from "../../../common/forms/FormikFields";
import { languageTranslation } from "../../../helpers";
import MaskedInput from "react-text-mask";
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
      weeklyWorkingHrs
    },
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched
  } = props;
  return (
    <div>
      <Form className="form-section">
        <div id={"caregiver-add-btn"}>
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
            {isSubmitting ? <i className="fa fa-spinner fa-spin loader" /> : ""}
            {languageTranslation("SAVE_BUTTON")}
          </Button>
        </div>
        <Row>
          <Col lg={"12"}>
            <h5 className="main-title ">
              {languageTranslation("LEASING_PERSONAL_DATA_HEADING")}
            </h5>
            <div className="form-card">
              <Row>
                <Col lg={"6"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label ">
                          Place of Birth{" "}
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"placeOfBirth"}
                            placeholder="Place of Birth"
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
                          Birth Name
                          <br />
                          <small>(only if different from family name)</small>
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"birthName"}
                            placeholder="Birth Name"
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
                          Nationality{/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            name={"nationality"}
                            component={FormikSelectField}
                            options={Nationality}
                            placeholder="Select Nationality"
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label ">
                          Marital Status
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"maritalStatus"}
                            options={MaritalStatus}
                            placeholder="Marital Status"
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
                        <Label className="form-label col-form-label ">
                          Children
                          <br />
                          <small>(0 if none)</small>
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"children"}
                            placeholder=" Children "
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
                        <Label className="form-label col-form-label ">
                          Factor Child allowance
                          <br />
                          <small>(0 if none)</small>
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          {" "}
                          <Field
                            component={FormikTextField}
                            name={"factorChildAllowance"}
                            placeholder="Factor Child allowance "
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
                        <Label className="form-label col-form-label ">
                          Status
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"status"}
                            options={Status}
                            placeholder="Status"
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
                        <Label className="form-label col-form-label ">
                          Tax Bracket
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"taxBracket"}
                            placeholder="Tax Bracket"
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
                          Health insurance type
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"healthInsuranceType"}
                            options={HealthInsuranceType}
                            placeholder="Health Insurance Type"
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
                        <Label className="form-label col-form-label ">
                          Health insurance provider
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"healthInsuranceProvider"}
                            options={HealthInsuranceProvider}
                            placeholder="Health insurance provider"
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
                        <Label className="form-label col-form-label ">
                          Social Security Number
                          <br />
                          <small>(example: 65170839J003)</small>
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikTextField}
                            name={"socialSecurityNumber"}
                            placeholder=" Social Security Number"
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
                        <Label className="form-label col-form-label ">
                          Religion
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"religion"}
                            options={Religion}
                            placeholder="Religion"
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
                          Preoccupation
                          {/* <span className='required'>*</span> */}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field
                            component={FormikSelectField}
                            name={"preoccupation"}
                            options={Preoccupation}
                            placeholder="Preoccupation "
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
                        <Label className="form-label col-form-label ">
                          Payroll IBAN <br />
                          <small>
                            (only necessary if an account other than the one in
                            the profile is required.)
                          </small>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <Field name="payrollIBAN">
                          {({ field }: any) => (
                            <div>
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
                                <div className="required-error">
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

          <Col lg={"12"}>
            <h5 className="main-title ">
              {languageTranslation("LEASING_CONTRACT_DATA_HEADING")}
            </h5>
            <div className="form-card">
              <Row>
                <Col lg={"6"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label ">
                          {languageTranslation("LEASING_CONTRACT_FIRST_DAY")}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field name="payrollIBAN">
                            {({ field }: any) => (
                              <div>
                                <MaskedInput
                                  {...field}
                                  className={"form-control"}
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
                                  <div className="required-error">
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
                <Col lg={"6"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("LEASING_CONTRACT_LAST_DAY")}
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Field name="payrollIBAN">
                            {({ field }: any) => (
                              <div>
                                <MaskedInput
                                  {...field}
                                  className={"form-control"}
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
                                  <div className="required-error">
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
                <Col lg={"6"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label ">
                          {languageTranslation(
                            "LEASING_CONTRACT_MONTHLY_WORKING_HRS"
                          )}
                        </Label>
                      </Col>
                      <Col sm="8">
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
                <Col lg={"6"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation(
                            "LEASING_CONTRACT_WEEKLY_WORKING_HRS"
                          )}
                          <br />
                        </Label>
                      </Col>
                      <Col sm="8">
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
          <Col lg={"12"}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="mandatory-text">* Required Fields</div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default LeasingPersonalDataFormComponent;
