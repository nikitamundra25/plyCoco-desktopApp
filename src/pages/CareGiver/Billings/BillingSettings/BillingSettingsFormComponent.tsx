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
import { State, Region, Salutation, LegalForm, Country } from "../../../../config";
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
import { FormikSelectField, FormikTextField } from "../../../../common/forms/FormikFields";
import { NightAllowancePerHour, CalculationInterval } from "../../../../config";
import { IBillingSettingsValues } from "../../../../interfaces";


const BillingSettingsFormComponent: any = (
  props: FormikProps<IBillingSettingsValues>
) => {
  const { values } = props;
  return (
    <div>
    <Form className="form-section">
      <Row>
        <Col lg={"5"}>
          <h5 className="main-title ">Price Range</h5>
          <div className="form-card">
            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="4">
                      <Label className="form-label col-form-label ">
                        Fee per hour
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div className="d-flex align-items-center">
                        <Field
                          component={FormikTextField}
                          name={"feePerHour"}
                          placeholder=""
                          className="custom-input-width"
                        />
                        <div className="mx-2">EUR</div>
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
                        Night allowance per hour
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div className="d-flex align-items-center">
                        <Field
                          component={FormikTextField}
                          name={"nightAllowancePerHour"}
                          placeholder=" "
                          className="custom-input-width"
                        />
                        <div className="mx-2">EUR</div>
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
                        Weekend allowance per hour
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div className="d-flex align-items-center">
                        <Field
                          component={FormikTextField}
                          name={"weekendAllowancePerHour"}
                          placeholder="	"
                          className="custom-input-width"
                        />
                        <div className="mx-2">EUR</div>
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
                        Holiday allowance per hour
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div className="d-flex align-items-center">
                        <Field
                          component={FormikTextField}
                          name={"holidayAllowancePerHourFee"}
                          placeholder="  "
                          className="custom-input-width"
                        />
                        <div className="mx-2">EUR</div>
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
                        Night allowance
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div className="d-flex align-items-center">
                        <div>
                          <Field
                            options={NightAllowancePerHour}
                            component={FormikSelectField}                
                            className="custom-input-width"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={"7"}>
          <h5 className="main-title ">Bill</h5>
          <div className="form-card">
            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="4">
                      <Label className="form-label col-form-label ">
                        Calculation interval
                        <br />
                        <small>
                          interval The actual interval can vary depending on
                          the specification of the facility.
                        </small>
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Select options={CalculationInterval} />
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
                        Next Invoice number
                        <br />
                        <small>
                          only numbers possible. Number is automatically
                          increased by 1 after each invoice.
                        </small>
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"nextInvoiceNumber"}
                          placeholder="Next Invoice number "
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
                        Statements Maturity
                        <br />
                        <small>
                          due Your invoice is due so many days after it has
                          been created.
                        </small>{" "}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"statementsMaturity "}
                          placeholder="Statements Maturity "
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
                        Supplements
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div className="custom-radio-block">
                        <FormGroup check inline>
                          <CustomInput
                            type="radio"
                            id="Exclusive"
                            name="supplements"
                            label="Exclusive"
                            className="pt-2"
                          />
                        </FormGroup>
                        <FormGroup check inline>
                          <CustomInput
                            type="radio"
                            id="Cumulative"
                            name="supplements"
                            label="Cumulative"
                            className="pt-2"
                          />
                        </FormGroup>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={"12"}>
          <h5 className="main-title"> Account Information</h5>
          <div className="form-card">
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label ">
                      Bank Name<span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"bankName"}
                        placeholder="Bank Name"
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
                      Account Holder Name
                      <br />
                      <small>(only if different)</small>
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"accountHolderName "}
                        placeholder="Account Holder Name "
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
                      IBAN<span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input type="text" name={"iban"} placeholder="IBAN" />
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
                      BIC
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input type="text" name={"bic"} placeholder=" BIC" />
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
                      Additional text
                      <br />
                      <small>
                        This text appears below the bank details on the
                        invoice. In the case of ceded invoices (factoring),
                        the cession can be added here.
                      </small>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="textarea"
                        name={"additionalText "}
                        placeholder="Additional text "
                        className="textarea-custom"
                        rows="4"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4"></Col>
                  <Col sm="8">
                    <CustomInput
                      type="checkbox"
                      id="exampleCustomCheckbox"
                      label="Mark as Primary"
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </div>
        </Col>

        <Col lg={"12"}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="mandatory-text">* Required Fields</div>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
  );
}

export default BillingSettingsFormComponent;
