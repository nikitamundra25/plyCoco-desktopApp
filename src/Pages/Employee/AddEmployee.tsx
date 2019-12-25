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

class AddEmployee extends Component {
  render() {
    return (
      <>
        <Row>
          <Col xs={"12"} lg={"12"}>
            <Card>
              <CardHeader>
                <h4>
                  <i className="icon-people" /> Add Employee
                </h4>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs={"12"} lg={"8"} className="mx-auto">
                    <Form className="form-section">
                      <h5 className="main-title mb-4"> Personal Information</h5>
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Name<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col >
                                <Input
                                  type="text"
                                  name={"firstName"}
                                  placeholder="Please Enter First Name"
                                />
                              </Col>
                              <Col >
                                <Label className="form-label col-form-label ">
                                  Last Name<span className="required">*</span>
                                </Label>
                              </Col>
                              <Col >
                                <Input
                                  type="text"
                                  name={"lastName"}
                                  placeholder="Please Enter Last Name"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup>

                      {/* <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label ">
                              Last Name<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8"></Col>
                        </Row>
                      </FormGroup> */}

                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Email Address<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Please Enter Email"
                            />
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
                              placeholder="Please Enter Telephone number"
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Employee UserName
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input
                              type="text"
                              name={"userName"}
                              placeholder="Please Enter User Name"
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Password<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col >
                                <Input
                                  type="text"
                                  name={"password"}
                                  placeholder="Please Enter Password"
                                />
                              </Col>
                              <Col >
                                <Label className="form-label col-form-label ">
                                  Confirm Password
                                  <span className="required">*</span>
                                </Label>
                              </Col>
                              <Col >
                                <Input
                                  type="text"
                                  name={"password"}
                                  placeholder="Please Confirm Password"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup>

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

                      <h5 className="main-title mb-4">
                        {" "}
                        Bank Account Information
                      </h5>
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
                                  placeholder="Please Enter Bank Name"
                                />
                              </Col>
                              <Col>
                                <Label className="form-label col-form-label ">
                                  Bank Address
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="text"
                                  name={"bankAddress"}
                                  placeholder="Please Enter Bank Address"
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
                                  placeholder="Please Enter Bank account number"
                                />
                              </Col>
                              <Col>
                                <Label className="form-label col-form-label ">
                                  IFSC
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="text"
                                  name={"IFSC"}
                                  placeholder="Please Enter IFSC"
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
                                  placeholder="Please Enter Swift code"
                                />
                              </Col>
                              <Col>
                                <Label className="form-label col-form-label ">
                                  Status
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type="select"
                                  name="Status"
                                  placeholder="Please Select Status"
                                >
                                  <option value={"true"}> Active</option>
                                  <option value={"false"}> Disable</option>
                                </Input>
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
                              Department<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input
                              type="select"
                              name="department"
                              id="department"
                              multiple
                              className="height-auto"
                            >
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option>HR</option>
                              <option>Development</option>
                              <option>Designing</option>
                            </Input>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Region<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input
                              type="select"
                              name="region"
                              id="region"
                              multiple
                              className="height-auto"
                            >
                              <option>Western India</option>
                              <option>East India</option>
                              <option>South India</option>
                              <option>Northeast India</option>
                              <option>Central India</option>
                            </Input>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Address
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col >
                                <Input
                                  type="text"
                                  name={"address1"}
                                  placeholder="Please Enter Address 1"
                                />
                              </Col>
                              <Col >
                                <Label className="form-label col-form-label ">
                                  Address 2<span className="required">*</span>
                                </Label>
                              </Col>
                              <Col >
                                <Input
                                  type="text"
                                  name={"address2"}
                                  placeholder="Please Enter Address 2"
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
                              Address 2
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input
                              type="text"
                              name={"address2"}
                              placeholder="Please Enter Address"
                            />
                          </Col>
                        </Row>
                      </FormGroup> */}

                      {/* <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              State
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input type="select" name="state" id="region">
                              <option>---Select State---</option>
                              <option>Madhya Pradesh</option>
                              <option>Uttar Pradesh</option>
                              <option>Bihar</option>
                              <option>Punjab</option>
                              <option>Gujrat</option>
                            </Input>
                          </Col>
                        </Row>
                      </FormGroup> */}
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Country
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Row>
                              <Col >
                                <Input
                                  type="text"
                                  name={"country"}
                                  placeholder="Please Enter Country"
                                />
                              </Col>

                              <Col >
                                <Label className="form-label col-form-label ">
                                  State
                                </Label>
                              </Col>
                              <Col >
                                <Input type="select" name="state" id="region">
                                  <option>---Select State---</option>
                                  <option>Madhya Pradesh</option>
                                  <option>Uttar Pradesh</option>
                                  <option>Bihar</option>
                                  <option>Punjab</option>
                                  <option>Gujrat</option>
                                </Input>
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
                              placeholder="Please Enter Country"
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
                              <Col >
                                <Input type="select" name="city" id="region">
                                  <option>---Select City---</option>
                                  <option>Indore</option>
                                  <option>Bhopal</option>
                                  <option>Mumbai</option>
                                  <option>Pune</option>
                                  <option>Bangalore</option>
                                </Input>
                              </Col>
                              <Col >
                                <Label className="form-label col-form-label ">
                                  Zip
                                </Label>
                              </Col>
                              <Col >
                                <Input
                                  type="text"
                                  name={"zip"}
                                  placeholder="Please Enter Zip Code"
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
                                  />
                                  <Label for="exampleCheck1" check>
                                    Check me out
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
                                    Check me out
                                  </Label>
                                </div>
                              </Col>
                              <Col sm="3">
                                <div className="checkbox-custom">
                                  <Input
                                    type="checkbox"
                                    name="check3"
                                    id="exampleCheck3"
                                  />
                                  <Label for="exampleCheck3" check>
                                    Check me out
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
                                    Check me out
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
                            <Input
                              type="date"
                              name={"joiningDate"}
                              placeholder="Please Enter Joining Date"
                            />
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
                            <Input
                              type="file"
                              name={"image"}
                              // placeholder="Please Enter Add Profile Image"
                            />
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
                              name={"country"}
                              placeholder="Please Enter Any other information"
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
export default AddEmployee;
