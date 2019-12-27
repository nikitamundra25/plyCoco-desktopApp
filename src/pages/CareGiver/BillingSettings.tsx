import React, { Component } from "react";
import { FormGroup, Label, Col, Row, Input } from "reactstrap";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import { Hours, CalculationInterval, Supplements } from "../../config";

class BillingSettings extends Component {
  render() {
    return (
      <div>
        <h5>Hourly Fee Management</h5>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label className="form-label col-form-label ">
                Fee per hour<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Row>
                <Col>
                  <Input
                    type="text"
                    name={"feePerHour"}
                    placeholder="Fee per hour"
                  />
                </Col>
                <Col className="label-width">
                  <Label className="form-label col-form-label">
                    Night supplements per hour
                    <span className="required">*</span>
                  </Label>
                </Col>
                <Col>
                  <Input
                    type="text"
                    name={"nightSupplementsPerHour"}
                    placeholder="Night supplements per hour"
                    className="width-common"
                  />
                </Col>

                <Col className="label-width">
                  <Label className="form-label col-form-label">
                    Hours<span className="required">*</span>
                  </Label>
                </Col>
                <Col>
                  <Select options={Hours} />
                </Col>
              </Row>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label className="form-label col-form-label ">
                Weekly supplements per hour
                <span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Row>
                <Col>
                  <Input
                    type="text"
                    name={"weeklySupplementsPerHour"}
                    placeholder=" Weekly supplements per hour"
                  />
                </Col>
                <Col className="label-width">
                  <Label className="form-label col-form-label ">
                    Holiday allowance per hour fee
                    <span className="required">*</span>
                  </Label>
                </Col>
                <Col>
                  <Input
                    type="text"
                    name={"holidaySllowancePerHourFee "}
                    placeholder=" Holiday allowance per hour fee "
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </FormGroup>
        <h5>Bank Account Information</h5>

        <FormGroup>
          <Row>
            <Col sm="3">
              <Label className="form-label col-form-label ">
                Bank Name<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Row>
                <Col>
                  <Input
                    type="text"
                    name={"bankName"}
                    placeholder="Bank Name"
                    className="width-common"
                  />
                </Col>
                <Col className="label-width">
                  <Label className="form-label col-form-label">
                    Account Holder Name <span className="required">*</span>
                  </Label>
                </Col>
                <Col>
                  <Input
                    type="text"
                    name={"accountHolderName "}
                    placeholder="Account Holder Name "
                    className="width-common"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label className="form-label col-form-label ">
                IBAN<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Row>
                <Col>
                  <Input type="text" name={"IBAN"} placeholder="IBAN" />
                </Col>
                <Col className="label-width">
                  <Label className="form-label col-form-label ">
                    BIC
                    <span className="required">*</span>
                  </Label>
                </Col>
                <Col>
                  <Input type="text" name={"BIC"} placeholder=" BIC" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="label-width">
              <Label className="form-label col-form-label ">
                Additional text
              </Label>
            </Col>
            <Col>
              <Input
                type="textarea"
                name={"additionalText "}
                placeholder="Additional text "
              />
            </Col>
            <Col className="label-width">
              <Label className="form-label col-form-label ">
                Mark as primary
                <span className="required">*</span>
              </Label>
            </Col>
            <Col>
              <Input type="checkbox" name={"primary"}></Input>
            </Col>
          </Row>
        </FormGroup>
        <h5>Billing cycle settings</h5>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label className="form-label col-form-label ">
                Calculation interval
                <span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Row>
                <Col>
                  <Select options={CalculationInterval} />
                </Col>
                <Col className="label-width">
                  <Label className="form-label col-form-label">
                    Next Invoice number
                    <span className="required">*</span>
                  </Label>
                </Col>
                <Col>
                  <Input
                    type="text"
                    name={"nextInvoiceNumber"}
                    placeholder="Next Invoice number "
                    className="width-common"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label className="form-label col-form-label ">
                Statements Maturity <span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Row>
                <Col>
                  <Input
                    type="text"
                    name={"statementsMaturity "}
                    placeholder="Statements Maturity "
                  />
                </Col>
                <Col className="label-width">
                  <Label className="form-label col-form-label ">
                    Supplements
                    <span className="required">*</span>
                  </Label>
                </Col>
                <Col>
                  <Select options={Supplements} />
                </Col>
              </Row>
            </Col>
          </Row>
        </FormGroup>
      </div>
    );
  }
}
export default BillingSettings;
