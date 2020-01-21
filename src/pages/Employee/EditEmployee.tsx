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
import "react-datepicker/dist/react-datepicker.css";
import { State, Region, City } from "../../config";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
import InputMask from "react-input-mask";

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
        <Card>
          <CardHeader>
            <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
            <Button color={"primary"} className={"btn-add"}>
              Save
            </Button>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs={"12"} lg={"12"}>
                <Form className="form-section">
                  <Row>
                    <Col lg={"6"}>
                      <h5 className="main-title">Personal Data </h5>
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
                                    Username
                                    <span className="required">*</span>
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <div>
                                    <Input
                                      type="text"
                                      name={"username"}
                                      value="johnDoe_123"
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
                      <h5 className="main-title "> Account Information</h5>
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
                                    This text appears below the bank details on
                                    the invoice. In the case of ceded invoices
                                    (factoring), the cession can be added here.
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
                      <h5 className="main-title"> Other Information</h5>
                      <div className="form-card">
                        <Row>
                          <Col lg={"6"}>
                            <FormGroup>
                              <Row>
                                <Col sm="4">
                                  <Label className="form-label col-form-label">
                                    Address Line 1
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
                                    Address Line 2
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
                                      defaultValue={[Region[1], Region[2]]}
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
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <div>
                                    <Select
                                      defaultValue={{
                                        label: "Hambug",
                                        value: "0"
                                      }}
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
                                      defaultValue={{
                                        label: "Bochum",
                                        value: "0"
                                      }}
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
                                      value="80331"
                                      placeholder=" Zip Code"
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
                                    Joining Date
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <div>
                                    <Row>
                                      <Col>
                                        <InputMask
                                          value="12/03/2007"
                                          placeholder="DD/MM/YYYY"
                                          mask="99/99/9999"
                                          className="form-control"
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

                  <div className="d-flex align-items-center justify-content-between">
                    <div className="mandatory-text">* Required Fields</div>
                  </div>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default AddEmployee;
