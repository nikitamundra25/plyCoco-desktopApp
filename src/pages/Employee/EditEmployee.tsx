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
  CustomInput
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
                    <span className="ml-1">Edit Employee</span>
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
                                            value="John"
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
                                            value="Doe"
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
                                            value="john@gmail.com"
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
                                          User Name
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"userName"}
                                            value="johnDoe_123"
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
                                            value="1212-344-434"
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"bankName"}
                                            placeholder=" Bank Name"
                                            value="World Bank"
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"bankAddress"}
                                            placeholder=" Bank Address"
                                            value="World Bank germany"
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"accountNumber"}
                                            placeholder=" Bank account number"
                                            value="5596-5856-4855"
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"IFSC"}
                                            placeholder=" IFSC"
                                            value="WSD5596"
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"swiftCode"}
                                            placeholder=" Swift code"
                                            value="SBININBB371"
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
                                              defaultValue={{
                                                label: "Active",
                                                value: 0
                                              }}
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
                                  defaultValue={[Department[2], Department[0]]}

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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="textarea"
                                            name={"address1"}
                                            value="Prager Str 80, Röhrmoos"
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>

                                      <Col sm="8">
                                        <div className="custom-radio-block">
                                          <Input
                                            type="textarea"
                                            name={"address2"}
                                            value="Fasanenstrasse 10, Hamburg Neuland"
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
                                            defaultValue={[
                                              Region[1],
                                              Region[2]
                                            ]}
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"country"}
                                            value=" ‎Berlin"
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Select
                                            defaultValue={{
                                              label: "Hambug",
                                              value: 0
                                            }}
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Select
                                            defaultValue={{
                                              label: "Bochum",
                                              value: 0
                                            }}
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"zip"}
                                            value="80331"
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
                                        <Col sm="4">
                                          <Label className="form-label col-form-label">
                                            Employee rights
                                            <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Row>
                                            <Col>
                                              <DatePicker
                                                placeholderText="Select Date"
                                                selected={new Date()}
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
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <div className="file-img">
                                            <img
                                              src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                                              className="img-fluid"
                                            />
                                          </div>
                                          <div className="file-input-block">
                                            <CustomInput
                                              type="file"
                                              id="exampleCustomFileBrowser"
                                              name="customFile"
                                            />
                                          </div>
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
