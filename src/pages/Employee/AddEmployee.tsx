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
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";

class AddEmployee extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
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
        <Row>
          <Col xs={"12"} lg={"12"}>
            <Card>
              <CardHeader>
                <AppBreadcrumb appRoutes={routes} className="w-100" />
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs={"12"} lg={"12"}>
                    <Form className="form-section">
                      <Row>
                        <Col lg={"6"}>
                          <h5 className="main-title ">Personal Data</h5>
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
                                        Username
                                        <span className="required">*</span>
                                      </Label>
                                    </Col>
                                    <Col sm="8">
                                      <div>
                                        <Input
                                          type="text"
                                          name={"userName"}
                                          placeholder=" Username"
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
                          <h5 className="main-title ">
                            {" "}
                            Bank Account Information
                          </h5>
                          <div className="form-card">
                            <Col lg={"12"}>
                              <FormGroup>
                                <Row>
                                  <Col sm="4">
                                    <Label className="form-label col-form-label ">
                                      Bank Name
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
                                      IBAN
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"IBAN"}
                                        placeholder="IBAN"
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
                                      BIC
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"BIC"}
                                        placeholder=" BIC"
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
                                      Additional text
                                      <br />
                                      <small>
                                        This text appears below the bank details
                                        on the invoice. In the case of ceded
                                        invoices (factoring), the cession can be
                                        added here.
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
                          </div>
                        </Col>

                        <Col lg={"12"}>
                          <h5 className="main-title "> Other Information</h5>
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
                                        Address Line 1
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
                                        Address Line 2
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
                      <Col lg={"12"}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="mandatory-text">
                            * Required Fields
                          </div>
                          <div className={"text-right"}>
                            <Button
                              color="primary"
                              type="submit"
                              className="btn-sumbit"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AddEmployee;
