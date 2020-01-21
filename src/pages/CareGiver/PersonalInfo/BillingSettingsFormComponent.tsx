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
  FormGroup
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  State,
  Region,
  Salutation,
  LegalForm,
  Country,
  NightAllowancePerHour
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
import { CareGiverValues } from "../../../interfaces";
import {
  FormikSelectField,
  FormikTextField
} from "../../../common/forms/FormikFields";
import { languageTranslation } from "../../../helpers";
import FormikCheckbox from "../../../common/forms/FormikFields/FormikCheckbox";

const BillingSettingsFormComponent: any = (
  props: FormikProps<CareGiverValues>
) => {
  const { values } = props;
  console.log("errorrrrrssssssssss==========>", props.errors);
  return (
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
                      <Field
                        component={FormikTextField}
                        name={"fee"}
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
                            <Field
                              component={FormikTextField}
                              name={"night"}
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
                      <Field
                        component={FormikTextField}
                        name={"weekendAllowancePerHour"}
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
                            <Field
                              component={FormikTextField}
                              name={"holidayAllowancePerHourFee"}
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
  );
};

export default BillingSettingsFormComponent;
