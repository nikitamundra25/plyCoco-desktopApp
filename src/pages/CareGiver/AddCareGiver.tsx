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
import { RouteComponentProps } from "react-router";
import {
  Status,
  State,
  Department,
  Region,
  City,
  Salutation
} from "../../config";

class AddCareGiver extends Component<any, any> {
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
                  <span className="ml-1">Add Care Giver</span>
                </h4>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs={"12"} lg={"8"} className="mx-auto">
                    <Form className="form-section">
                      <FormGroup>
                        <Row>
                          <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Salutation<span className="required">*</span>
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
                                  Surname<span className="required">*</span>
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
                                <Input
                                  type="text"
                                  name={"country"}
                                  placeholder=" Country"
                                  className="width-common"
                                />
                              </Col>

                              <Col className="label-width">
                                <Label className="form-label col-form-label ">
                                  State
                                </Label>
                              </Col>
                              <Col>
                                <Select
                                  // value={this.state.selectedOption}
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
                                  // value={this.state.selectedOption}
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
                              selected={this.state.startDate}
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
export default AddCareGiver;
