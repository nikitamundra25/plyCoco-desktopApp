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
  Form,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";

import {
  Status,
  State,
  Department,
  Region,
  City,
  Salutation,
  LegalForm,
  Country
} from "../../config";

class AddCareGiver extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: "1",
      error: false
    };
  }

  onToggle = (tab: any) => {
    const { activeTab } = this.state;
    console.log("activeTab value", activeTab);
    console.log("tab value is", tab);
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab.toString()
      });
    }
  };

  handleChange = (date: any) => {
    this.setState({
      startDate: date
    });
  };
  onFocus = () => {
    this.setState({
      error: true
    });
  };

  render() {
    const { activeTab } = this.state;
    console.log("active tab in render is", activeTab);

    return (
      <>
        <Row>
          <Col xs={"12"} lg={"12"}>
            <Card>
              <CardHeader>
                <h4>
                  <i className="fa fa-users" />
                  <span className="ml-1">Add Care Giver</span>
                </h4>
              </CardHeader>
              <CardBody>
                <div className="caregiver-form-section">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "1" }}
                        onClick={() => this.onToggle(1)}
                      >
                        Personal Information
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "2" }}
                        onClick={() => this.onToggle(2)}
                      >
                        Qualification Attributes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "3" }}
                        onClick={() => this.onToggle(3)}
                      >
                        Billing Settings
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "4" }}
                        onClick={() => this.onToggle(4)}
                      >
                        Leasing Personal Data
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <div>
                        <Row>
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
                                        <Select
                                          placeholder="Salutation"
                                          options={Salutation}
                                        />
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
                                    <Label className="form-label col-form-label ">
                                      Street
                                    </Label>
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
                                        <Select
                                          placeholder="Region/State"
                                          options={State}
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
                                    <Label className="form-label col-form-label ">
                                      Phone
                                    </Label>
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
                                            <Input
                                              id="no"
                                              type="radio"
                                              name="driversLicense"
                                            />
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
                                          <Input
                                            type="checkbox"
                                            name="yes"
                                            id="yes"
                                          />
                                          <Label for="yes" check>
                                            Yes
                                          </Label>
                                        </div>
                                      </Col>
                                      <Col sm="3">
                                        <div className="checkbox-custom">
                                          <Input
                                            type="checkbox"
                                            name="no"
                                            id="no"
                                          />
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
                                    <Select
                                      placeholder="Legal Form"
                                      options={LegalForm}
                                    />
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
                                      Employee subject to social security
                                      contribution
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
                                <Button
                                  color="primary"
                                  type="submit"
                                  className="btn-sumbit"
                                >
                                  Submit
                                </Button>
                              </div>
                            </Form>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div>
                        <h4>Tab 2 Contents</h4>
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <h4>Tab 3 Contents</h4>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                          <h4>Tab 4 Contents</h4>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default AddCareGiver;
