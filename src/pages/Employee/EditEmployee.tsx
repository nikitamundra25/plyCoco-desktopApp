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
  Form
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Status, State, Department, Region, City } from "../../config";

class EditEmployee extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // startDate: ""
      error: false
    };
  }

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
    return (
      <>
        <Row>
          <Col xs={"12"} lg={"12"}>
            <Card>
              <CardHeader>
                <h4>
                  <i className="fa fa-users" />
                  <span className="ml-1">Edit Employee</span>
                </h4>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs={"12"} lg={"8"} className="mx-auto">
                    <Form className="form-section">
                      <Row>
                        <Col sm="3"></Col>
                        <Col sm="9">
                          <h5 className="main-title mb-4">
                            {" "}
                            Personal Information
                          </h5>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              First Name<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col>
                                <Input
                                  type="text"
                                  name={"firstName"}
                                  placeholder="First Name"
                                  onChange={() =>
                                    this.setState({ error: false })
                                  }
                                  className="width-common"
                                  onFocus={this.onFocus}
                                  value="John"
                                />
                                {this.state.error ? (
                                  <div className="required-error">
                                    Please Enter First Name
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Col>

                              <Col className="label-width">
                                <Label className="form-label col-form-label">
                                  Surname<span className="required">*</span>
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="text"
                                  name={"lastName"}
                                  placeholder="Surname"
                                  className="width-common"
                                  value="Doe"
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
                              Email Address<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col>
                                <Input
                                  type="text"
                                  name={"email"}
                                  placeholder=" Email"
                                  value="john@gmail.com"
                                />
                              </Col>
                              <Col className="label-width">
                                <Label className="form-label col-form-label ">
                                  UserName
                                  <span className="required">*</span>
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="text"
                                  name={"userName"}
                                  placeholder=" UserName"
                                  value="johnDoe_123"
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
                              Telephone number
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input
                              type="text"
                              name={"telephoneNumber"}
                              placeholder=" Telephone number"
                              value="1212-344-434"
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      {/* <FormGroup>
                        <Row>
                          <Col sm="3">
                            
                          </Col>
                          <Col sm="9">
                           
                          </Col>
                        </Row>
                      </FormGroup> */}

                      {/* <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Password<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col>
                                <Input
                                  type="text"
                                  name={"password"}
                                  placeholder=" Password"
                                  className="width-common"
                                />
                              </Col>
                              <Col>
                                <Label className="form-label col-form-label ">
                                  Confirm Password
                                  <span className="required">*</span>
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="text"
                                  name={"password"}
                                  placeholder=" Confirm Password"
                                  className="width-common"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup> */}

                      {/* <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label ">
                              Confirm Password
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8">
                            
                          </Col>
                        </Row>
                      </FormGroup> */}

                      <Row>
                        <Col sm="3"></Col>
                        <Col sm="9">
                          <h5 className="main-title mb-4">
                            {" "}
                            Bank Account Information
                          </h5>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Row>
                          {" "}
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Bank Name
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
                                  value="World Bank"
                                />
                              </Col>
                              <Col className="label-width">
                                <Label className="form-label col-form-label">
                                  Bank Address
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="text"
                                  name={"bankAddress"}
                                  placeholder=" Bank Address"
                                  className="width-common"
                                  value="World Bank germany"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup>
                        <Row>
                          {" "}
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Account Number
                            </Label>
                          </Col>{" "}
                          <Col sm="9">
                            <Row>
                              <Col>
                                <Input
                                  type="text"
                                  name={"accountNumber"}
                                  placeholder=" Bank account number"
                                  className="width-common"
                                  value="5596-5856-4855"
                                />
                              </Col>
                              <Col className="label-width">
                                <Label className="form-label col-form-label ">
                                  IFSC
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="text"
                                  name={"IFSC"}
                                  placeholder=" IFSC"
                                  className="width-common"
                                  value="WSD5596"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup>
                      {/* <FormGroup>
                        <Row>
                          <Col sm="3"></Col> <Col sm="9"></Col>
                        </Row>
                      </FormGroup>*/}
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Swift Code
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col>
                                <Input
                                  type="text"
                                  name={"swiftCode"}
                                  placeholder=" Swift code"
                                  className="width-common"
                                  value="SBININBB371"
                                />
                              </Col>
                              <Col className="label-width">
                                <Label className="form-label col-form-label ">
                                  Status<span className="required">*</span>
                                </Label>
                              </Col>
                              <Col>
                                <Select
                                  placeholder="Select Status"
                                  // value="Active"
                                  defaultValue={{
                                    label: "Active",
                                    value: 0
                                  }}
                                  options={Status}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup>
                      {/* <FormGroup>
                        <Row>
                          <Col sm="3">
                           
                          </Col>
                          <Col sm="9">
                            
                          </Col>
                        </Row>
                      </FormGroup> */}

                      <Row>
                        <Col sm="3"></Col>
                        <Col sm="9">
                          <h5 className="main-title mb-4">
                            {" "}
                            Other Information
                          </h5>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Department<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col>
                                <Select
                                  defaultValue={[Department[2], Department[0]]}
                                  // value={"this.state.selectedOption"}
                                  placeholder="Select Department"
                                  isMulti
                                  options={Department}
                                />
                              </Col>
                              <Col className="label-width">
                                <Label className="form-label col-form-label ">
                                  Region<span className="required">*</span>
                                </Label>
                              </Col>
                              <Col>
                                <Select
                                  defaultValue={[Region[1], Region[2]]}
                                  placeholder="Select Region"
                                  isMulti
                                  options={Region}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup>
                      {/* <FormGroup>
                        <Row>
                          <Col sm="3">
                            
                          </Col>
                          <Col sm="9">
                            
                          </Col>
                        </Row>
                      </FormGroup> */}
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Address 1
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col>
                                <Input
                                  type="textarea"
                                  name={"address1"}
                                  placeholder=" Address 1"
                                  className="height-auto width-common"
                                  value="Prager Str 80, Röhrmoos"
                                />
                              </Col>
                              <Col className="label-width">
                                <Label className="form-label col-form-label ">
                                  Address 2
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="textarea"
                                  name={"address2"}
                                  placeholder=" Address 2"
                                  className="height-auto width-common"
                                  value="Fasanenstrasse 10, Hamburg Neuland"
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
                                <Input
                                  type="text"
                                  name={"country"}
                                  placeholder=" Country"
                                  className="width-common"
                                  value=" ‎Berlin"
                                />
                              </Col>

                              <Col className="label-width">
                                <Label className="form-label col-form-label ">
                                  State
                                </Label>
                              </Col>
                              <Col>
                                <Select
                                  defaultValue={{
                                    label: "Hambug",
                                    value: 0
                                  }}
                                  placeholder="Select State"
                                  options={State}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup>
                      {/* <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Country
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input
                              type="text"
                              name={"country"}
                              placeholder=" Country"
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup> */}
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              City
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col>
                                <Select
                                  defaultValue={{
                                    label: "Bochum",
                                    value: 0
                                  }}
                                  placeholder="Select City"
                                  options={City}
                                />
                              </Col>
                              <Col className="label-width">
                                <Label className="form-label col-form-label ">
                                  Zip
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="text"
                                  name={"zip"}
                                  placeholder=" Zip Code"
                                  className="width-common"
                                  value="80331"
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
                              Employee rights
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col sm="3">
                                <div className="checkbox-custom">
                                  <Input
                                    type="checkbox"
                                    name="check1"
                                    id="exampleCheck1"
                                    checked
                                  />
                                  <Label for="exampleCheck1" check>
                                    Rights 1
                                  </Label>
                                </div>
                              </Col>
                              <Col sm="3">
                                <div className="checkbox-custom">
                                  <Input
                                    type="checkbox"
                                    name="check2"
                                    id="exampleCheck2"
                                  />
                                  <Label for="exampleCheck2" check>
                                    Rights 2
                                  </Label>
                                </div>
                              </Col>
                              <Col sm="3">
                                <div className="checkbox-custom">
                                  <Input
                                    type="checkbox"
                                    name="check3"
                                    id="exampleCheck3"
                                    checked
                                  />
                                  <Label for="exampleCheck3" check>
                                    Rights 3
                                  </Label>
                                </div>
                              </Col>
                              <Col sm="3">
                                <div className="checkbox-custom">
                                  <Input
                                    type="checkbox"
                                    name="check4"
                                    id="exampleCheck4"
                                  />
                                  <Label for="exampleCheck4" check>
                                    Rights 4
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
                              Joining Date
                            </Label>
                          </Col>
                          <Col sm="9">
                            <DatePicker
                              placeholderText="Select Date"
                              selected={new Date()}
                              onChange={this.handleChange}
                            />
                            {/* <Input
                              type="date"
                              name={"joiningDate"}
                              placeholder=" Joining Date"
                            /> */}
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Add Profile image
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input type="file" name={"image"} />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Any other information
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input
                              type="textarea"
                              name={"otherinformation"}
                              placeholder=" Any other information"
                              className="height-auto"
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default EditEmployee;
