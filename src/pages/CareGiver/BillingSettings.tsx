import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Row,
  Input,
  Button,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import {
  Hours,
  CalculationInterval,
  Supplements,
  NightAllowancePerHour
} from "../../config";

class BillingSettings extends Component {
  render() {
    return (
      <div>
        <Form className="form-section">
          <Row>
            <Col lg={"6"}>
              <h5 className="main-title mb-4">Price Range</h5>
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
                            <Input
                              type="text"
                              name={"feePerHour"}
                              placeholder="Fee per hour"
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
                            <Input
                              type="text"
                              name={"nightSupplementsPerHour"}
                              placeholder=" Night allowance per hour"
                              className="custom-input-width"
                            />
                            <div className="mx-2">EUR</div>
                            <div>
                              <Select
                                options={NightAllowancePerHour}
                                className="custom-input-width"
                              />
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
                          <Label className="form-label col-form-label ">
                            Weekend allowance per hour
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div className="d-flex align-items-center">
                            <Input
                              type="text"
                              name={"weeklySupplementsPerHour"}
                              placeholder=" Weekend allowance per hour	"
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
                            <Input
                              type="text"
                              name={"holidaySllowancePerHourFee "}
                              placeholder=" Holiday allowance per hour "
                              className="custom-input-width"
                            />
                            <div className="mx-2">EUR</div>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={"6"}>
              <h5 className="main-title mb-4">Bill</h5>
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
                              />
                            </FormGroup>
                            <FormGroup check inline>
                              <CustomInput
                                type="radio"
                                id="Cumulative"
                                name="supplements"
                                label="Cumulative"
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
            <Col lg={"6"}>
              <h5 className="main-title mb-4"> Account Information</h5>
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
                          <Input type="text" name={"IBAN"} placeholder="IBAN" />
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
                          <Input type="text" name={"BIC"} placeholder=" BIC" />
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
                <div className={"text-right"}>
                  <Button color="primary" type="submit" className="btn-sumbit">
                    Submit
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          {/* <h5 className="main-title mb-4"> Hourly Fee Management</h5>
          <Row>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Fee per hour
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
                    <Label className="form-label col-form-label ">
                      Night supplements per hour
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
                    <Label className="form-label col-form-label ">
                      Weekly supplements per hour
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
            <Col lg={"12"}>
              <h5 className="main-title mb-4"> Bank Account information</h5>
            </Col>
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
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"} className="mb-4">
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox"
                label="Mark as Primary"
              />
            </Col>
            <Col lg={"12"}>
              <h5 className="main-title mb-4"> Billing cycle settings</h5>
            </Col>
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
                      <Select options={CalculationInterval} />
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
            <Col lg={"12"}>
              <div className={"text-right"}>
                <Button color="primary" type="submit" className="btn-sumbit">
                  Next Step
                </Button>
              </div>
            </Col>
          </Row> */}
        </Form>
        {/* <h5>Hourly Fee Management</h5>
        <FormGroup>
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
        </FormGroup> */}
      </div>
    );
  }
}
export default BillingSettings;
