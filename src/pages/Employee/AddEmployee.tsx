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
import { Status, State, Department, Region, City } from "../../config";

class AddEmployee extends Component<any, any> {
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
      <div>
        <Card>
          <Row>
            <Col xs={"12"} lg={"12"}>
              <Card>
                <CardHeader>
                  <h4>
                    <i className="fa fa-users" />
                    <span className="ml-1">Add Employee</span>
                  </h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs={"12"} lg={"12"}>
                      <Form className="form-section">
                        <Row>
                          <Col lg={"6"}>
                            <h5 className="main-title mb-4">Personal Data</h5>
                            <div className="form-card">
                              <Row>
                                <Col lg={"12"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          First Name
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"firstName"}
                                            placeholder="First Name"
                                            onChange={() =>
                                              this.setState({ error: false })
                                            }
                                            className="width-common"
                                            onFocus={this.onFocus}
                                          />
                                          {this.state.error ? (
                                            <div className="required-error">
                                              Please Enter First Name
                                            </div>
                                          ) : (
                                            ""
                                          )}
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
                                          Surname
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
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
                                <Col lg={"12"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label ">
                                          Email Address
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"email"}
                                            placeholder=" Email"
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
                                          UserName
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"userName"}
                                            placeholder=" UserName"
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
                                          Telephone number
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"telephoneNumber"}
                                            placeholder=" Telephone number"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          </Col>

                          <Col lg={"6"}>
                            <h5 className="main-title mb-4">
                              {" "}
                              Bank Account Information
                            </h5>
                            <div className="form-card">
                              <Row>
                                <Col lg={"12"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Bank Name
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"bankName"}
                                            placeholder=" Bank Name"
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
                                          Bank Address
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"bankAddress"}
                                            placeholder=" Bank Address"
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
                                          Account Number
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"accountNumber"}
                                            placeholder=" Bank account number"
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
                                          IFSC
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"IFSC"}
                                            placeholder=" IFSC"
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
                                          Swift Code
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"swiftCode"}
                                            placeholder=" Swift code"
                                            className="width-common"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Col>
                                {/* <Col lg={"12"}>
                                    <FormGroup>
                                      <Row>
                                        <Col sm="4">
                                          <Label className="form-label col-form-label">
                                            Status
                                            <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
                                          <div>
                                            <Select
                                              placeholder="Select Status"
                                              options={Status}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                    </FormGroup>
                                  </Col> */}
                              </Row>
                            </div>
                          </Col>

                          <Col lg={"12"}>
                            <h5 className="main-title mb-4">
                              {" "}
                              Other Information
                            </h5>
                            <div className="form-card">
                              <Row>
                                {/* <Col lg={"6"}>
                                    <FormGroup>
                                      <Row>
                                        <Col sm="4">
                                          <Label className="form-label col-form-label">
                                            Department
                                            <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
                                          <div>
                                            <Select
                                              // value={this.state.selectedOption}
                                              placeholder="Select Department"
                                              isMulti
                                              options={Department}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                    </FormGroup>
                                  </Col> */}

                                <Col lg={"6"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Address 1
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="textarea"
                                            name={"address1"}
                                            placeholder=" Address 1"
                                            className="height-auto width-common"
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
                                          Address 2
                                        </Label>
                                      </Col>

                                      <Col sm="8">
                                        <div className="custom-radio-block">
                                          <Input
                                            type="textarea"
                                            name={"address2"}
                                            placeholder=" Address 2"
                                            className="height-auto width-common"
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
                                          Region
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Select
                                            placeholder="Select Region"
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
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Country
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"country"}
                                            placeholder=" Country"
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
                                          State
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Select
                                            // value={this.state.selectedOption}
                                            placeholder="Select State"
                                            options={State}
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
                                          City
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Select
                                            // value={this.state.selectedOption}
                                            placeholder="Select City"
                                            options={City}
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
                                          Zip
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"zip"}
                                            placeholder=" Zip Code"
                                            className="width-common"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Col>
                                {/* <Col lg={"12"}>
                                    <FormGroup>
                                      <Row>
                                        <Col sm="3">
                                          <Label className="form-label col-form-label">
                                            Employee rights
                                            <span className="required">*</span>
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
                                                <Label
                                                  for="exampleCheck1"
                                                  check
                                                >
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
                                                <Label
                                                  for="exampleCheck2"
                                                  check
                                                >
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
                                                <Label
                                                  for="exampleCheck3"
                                                  check
                                                >
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
                                                <Label
                                                  for="exampleCheck4"
                                                  check
                                                >
                                                  Rights 4
                                                </Label>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </FormGroup>
                                  </Col> */}
                                <Col lg={"6"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Joining Date
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Row>
                                            <Col>
                                              <DatePicker
                                                placeholderText="Select Date"
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
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
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Any other information
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="textarea"
                                            name={"otherinformation"}
                                            placeholder=" Any other information"
                                            className="textarea-custom "
                                            rows="4"
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
                                          Add Profile image
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input type="file" name={"image"} />
                                        </div>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                        <div className="text-right">
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
        </Card>
      </div>
    );
  }
}
export default AddEmployee;
