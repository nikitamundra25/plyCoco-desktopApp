import React, { Component } from "react";
import { FormGroup, Label, Col, Row, Input, Button, Form } from "reactstrap";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { Hours, CalculationInterval, Supplements } from "../../config";

class BillingSettings extends Component {
  render() {
    return (
      <div>
        <h5>Hourly Fee Management</h5>
        <Form className="form-section">
          <Row>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Fee per hour<span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"feePerHour"}
                        placeholder="Fee per hour"
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
                      Night supplements per hour
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"nightSupplementsPerHour"}
                        placeholder="Night supplements per hour"
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
                      Hours<span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select options={Hours} placeholder="Hours" />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Weekly supplements per hour
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"weeklySupplementsPerHour"}
                        placeholder=" Weekly supplements per hour"
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
                      Holiday allowance per hour fee
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"holidaySllowancePerHourFee "}
                        placeholder=" Holiday allowance per hour fee "
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <h5>Bank Account Information</h5>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Bank Name<span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      {" "}
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
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Account Holder Name <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
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
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      IBAN<span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input type="text" name={"IBAN"} placeholder="IBAN" />
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
                      BIC
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input type="text" name={"BIC"} placeholder=" BIC" />
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
                      Additional text
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="textarea"
                        name={"additionalText "}
                        placeholder="Additional text "
                      />
                    </div>
                  </Col>
                  <Col className="label-width">
                    <Label className="form-label col-form-label ">
                      Mark as primary
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col>
                    <div>
                      <Input type="checkbox" name={"primary"}></Input>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <h5>Billing cycle settings</h5>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Calculation interval
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select
                        options={CalculationInterval}
                        placeholder="Calculation Interval"
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
                      Next Invoice number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
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
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Statements Maturity <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Input
                      type="text"
                      name={"statementsMaturity "}
                      placeholder="Statements Maturity "
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Supplements
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select options={Supplements} placeholder="Supplements" />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <div className={"text-right"}>
                <Button color="primary" type="submit" className="btn-sumbit">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default BillingSettings;
