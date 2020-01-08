import React, { Component } from "react";
import { FormGroup, Label, Col, Row, Input, Button, Form } from "reactstrap";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import {
  Status,
  Nationality,
  MaritalStatus,
  HealthInsuranceType,
  HealthInsuranceProvider,
  Religion,
  Preoccupation
} from "../../../config";

class LeasingPersonalData extends Component {
  render() {
    return (
      <div>
        <Form className="form-section">
          <Row>
            <Col lg={"12"}>
              <h5 className="main-title ">Leasing Personal Data</h5>
              <div className="form-card">
                <Row>
                  <Col lg={"6"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                            Place of Birth <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
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
                            Nationality<span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            {" "}
                            <Input
                              type="text"
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select options={Status} placeholder="Status" />
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
                              type="text"
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
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
                            <Select options={Religion} placeholder="Religion" />
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
                            Control Id
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"controlId"}
                              placeholder="Control Id"
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
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
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
                              (only necessary if an account other than the one
                              in the profile is required.)
                            </small>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Input
                            type="text"
                            name={"PayrollIBAN"}
                            placeholder="Payroll IBAN"
                          />
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
                {/* <div className={"text-right"}>
                  <Button color="primary" type="submit" className="btn-sumbit">
                    Save
                  </Button>
                </div> */}
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default LeasingPersonalData;
