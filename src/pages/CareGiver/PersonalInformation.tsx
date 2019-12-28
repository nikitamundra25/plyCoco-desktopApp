import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";

import { State, Region, Salutation, LegalForm, Country } from "../../config";

class PersonalInformation extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: ""
    };
  }
  handleChange = (date: any) => {
    this.setState({
      startDate: date
    });
  };
  render() {
    return (
      <div>
        <Form className="form-section">
          <Row>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Salutation
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select placeholder="Salutation" options={Salutation} />
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
                      First Given Name
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"firstGivenName"}
                        placeholder="First Given Name"
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
                      Surname
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"lastName"}
                        placeholder="Surname"
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
                      Street
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"street"}
                        placeholder=" Street"
                        className=" width-common"
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
                      City
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"city"}
                        placeholder=" City"
                        className=" width-common"
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
                      Post code
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"postCode"}
                        placeholder="Post Code"
                        className=" width-common"
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
                      Region/State
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select placeholder="Region/State" options={State} />
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
                      Country
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select
                        // value={this.state.selectedOption}
                        placeholder="Select Country"
                        options={Country}
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
                      Date of Birth
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <DatePicker
                        placeholderText="Select Date"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
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
                      Phone
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"phone"}
                        placeholder=" Phone Number"
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
                      Fax
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"fax"}
                        placeholder=" Fax"
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
                      Mobile Phone
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"mobilePhone"}
                        placeholder="Mobile Phone"
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
                      Email address
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"email"}
                        placeholder=" Email address"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}></Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Driver's license
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div className="custom-radio-block">
                      <Row>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="yes"
                            name="driversLicense"
                            label="Yes"
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="no"
                            name="driversLicense"
                            label="No"
                          />
                        </Col>
                      </Row>
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
                      Own vehicle available
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div className="custom-radio-block">
                      <Row>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="yes_v"
                            name="vehicleavailable"
                            label="Yes"
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="no_v"
                            name="vehicleavailable"
                            label="No"
                          />
                        </Col>
                      </Row>
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
                      Driver's License Number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
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
            <Col lg={"12"}></Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Legal Form
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select placeholder="Legal Form" options={LegalForm} />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}></Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Company Name <small>(Including GMBH, UG)</small>
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
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
                      Register Court
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="registerCourt"
                        placeholder="Register Court"
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
                      Registration Number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="registrationNumber"
                        placeholder="Registration number"
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
                      Executive Director
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="executiveDirector"
                        placeholder="Executive Director"
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
                  <Col sm="7">
                    <Label className="form-label col-form-label">
                      Employee subject to social security contribution
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="5">
                    <div className="custom-radio-block">
                      <Row>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="yes_s"
                            name="socialSecurityContribution"
                            label="Yes"
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="no_s"
                            name="socialSecurityContribution"
                            label="No"
                          />
                        </Col>
                      </Row>
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
                      Tax Number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="taxNumber"
                        placeholder="Tax Number"
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
                      Working zones
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select
                        placeholder=" Working zones"
                        isMulti
                        options={Region}
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
                      Remarks
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="textarea"
                        name={"Remarks"}
                        placeholder="Remarks"
                        className="height-auto "
                      />
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
        {/* <Row>
          <Col xs={"12"} lg={"8"} className="mx-auto">
            <Form className="form-section">
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Salutation
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Row>
                      <Col>
                        <Select placeholder="Salutation" options={Salutation} />
                      </Col>
                      <Col className="label-width">
                        <Label className="form-label col-form-label">
                          First Given Name
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col>
                        <Input
                          type="text"
                          name={"firstGivenName"}
                          placeholder="First Given Name"
                          className="width-common"
                        />
                      </Col>

                      <Col className="label-width">
                        <Label className="form-label col-form-label">
                          Surname
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col>
                        <Input
                          type="text"
                          name={"lastName"}
                          placeholder="Surname"
                          className="width-common"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormGroup>
              <Row>
                <Col sm="3"></Col>
                <Col sm="9">
                  <h5 className="main-title mb-4">Address</h5>
                </Col>
              </Row>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">Street</Label>
                  </Col>
                  <Col sm="9">
                    <Row>
                      <Col>
                        <Input
                          type="text"
                          name={"street"}
                          placeholder=" Street"
                          className="height-auto width-common"
                        />
                      </Col>
                      <Col className="label-width">
                        <Label className="form-label col-form-label ">
                          City
                        </Label>
                      </Col>
                      <Col>
                        <Input
                          type="text"
                          name={"city"}
                          placeholder=" City"
                          className="height-auto width-common"
                        />
                      </Col>
                      <Col className="label-width">
                        <Label className="form-label col-form-label ">
                          Post Code
                        </Label>
                      </Col>
                      <Col>
                        <Input
                          type="text"
                          name={"postCode"}
                          placeholder="Post Code"
                          className="height-auto width-common"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="label-width">
                        <Label className="form-label col-form-label ">
                          Region/State
                        </Label>
                      </Col>
                      <Col>
                        <Select placeholder="Region/State" options={State} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Country
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Row>
                      <Col>
                        <Select
                          // value={this.state.selectedOption}
                          placeholder="Select Country"
                          options={Country}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col>
                    <Row>
                      <Col sm="3">
                        <Label className="form-label col-form-label ">
                          Date of Birth
                        </Label>
                      </Col>
                      <Col sm="9">
                        <DatePicker
                          placeholderText="Select Date"
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">Phone</Label>
                  </Col>
                  <Col sm="9">
                    <Row>
                      <Col>
                        <Input
                          type="text"
                          name={"phone"}
                          placeholder=" Phone Number"
                          className="width-common"
                        />
                      </Col>
                      <Col className="label-width">
                        <Label className="form-label col-form-label ">
                          Fax
                        </Label>
                      </Col>
                      <Col>
                        <Input
                          type="text"
                          name={"fax"}
                          placeholder=" Fax"
                          className="width-common"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm="3">
                      <Label className="form-label col-form-label ">
                        Mobile Phone
                      </Label>
                    </Col>
                    <Col sm="9">
                      <Row>
                        <Col>
                          <Input
                            type="text"
                            name={"mobilePhone"}
                            placeholder="Mobile Phone"
                            className="width-common"
                          />
                        </Col>
                        <Col className="label-width">
                          <Label className="form-label col-form-label ">
                            Email address
                          </Label>
                        </Col>
                        <Col>
                          <Input
                            type="text"
                            name={"email"}
                            placeholder=" Email address"
                            className="width-common"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Driver’s license
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Row>
                      <Col sm="3">
                        <div>
                          <Label>
                            <Input
                              id="yes"
                              type="radio"
                              name="driversLicense"
                            />
                            Yes
                          </Label>
                          <br></br>
                          <Label>
                            <Input id="no" type="radio" name="driversLicense" />
                            No
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Label>Add Driver’s License Number</Label>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="driverLicenseNumber"
                      placeholder="Driver’s License Number"
                      className="width-common"
                    />
                  </Col>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Own vehicle available
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Row>
                      <Col sm="3">
                        <div className="checkbox-custom">
                          <Input type="checkbox" name="yes" id="yes" />
                          <Label for="yes" check>
                            Yes
                          </Label>
                        </div>
                      </Col>
                      <Col sm="3">
                        <div className="checkbox-custom">
                          <Input type="checkbox" name="no" id="no" />
                          <Label for="no" check>
                            No
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Legal Form
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Select placeholder="Legal Form" options={LegalForm} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Company Name (Including GMBH, UG)
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      className="width-common"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Register Court
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Input
                      type="text"
                      name="registerCourt"
                      placeholder="Register Court"
                      className="width-common"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Registration number
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Input
                      type="text"
                      name="registrationNumber"
                      placeholder="Registration number"
                      className="width-common"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Executive Director
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Input
                      type="text"
                      name="executiveDirector"
                      placeholder="Executive Director"
                      className="width-common"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label ">
                      Employee subject to social security contribution
                    </Label>
                  </Col>
                  <Col sm="7">
                    <Label>
                      <Input
                        id="yes"
                        type="radio"
                        name="socialSecurityContribution"
                      />
                      Yes
                    </Label>
                    <br></br>
                    <Label>
                      <Input
                        id="no"
                        type="radio"
                        name="socialSecurityContribution"
                      />
                      No
                    </Label>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Tax Number
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Input
                      type="text"
                      name="taxNumber"
                      placeholder="Tax Number"
                      className="width-common"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Working zones
                    </Label>
                  </Col>
                  <Col sm="9">
                    <Select
                      placeholder=" Working zones"
                      isMulti
                      options={Region}
                    />
                  </Col>
                </Row>
              </FormGroup>

              <div className={"text-right"}>
                <Button color="primary" type="submit" className="btn-sumbit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row> */}
      </div>
    );
  }
}
export default PersonalInformation;
