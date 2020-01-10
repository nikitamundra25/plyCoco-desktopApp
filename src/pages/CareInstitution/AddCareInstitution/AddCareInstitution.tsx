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
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import { Status, State, Department, Region, City, Country } from "../../../config";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../routes/routes";
import InputMask from "react-input-mask";

class AddCareInstitution extends Component<any, any> {
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
                <Row className={"m-0"}>
                  <Col xs={"12"} lg={"12"}>
                    <Form className="form-section">
                      <Col lg={"6"}>
                        <h5 className="main-title ">Personal Data</h5>
                        <div className="form-card">
                          <Row>
                            <Col lg={"12"}>
                              <FormGroup>
                                <Row>
                                  <Col sm="4">
                                    <Label className="form-label col-form-label">
                                      Salutation
                                        <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Input
                                        type="select"
                                        name={"salutation"}
                                        placeholder="Sir"
                                        // onChange={() =>
                                        //   this.setState({ error: false })
                                        // }
                                        className="width-common"
                                        onFocus={this.onFocus}
                                      >
                                        <option value={"Sir"}>Sir</option>
                                        <option value={"Woman"}>Woman</option>
                                      </Input>
                                      {/* {this.state.error ? (
                                          <div className="required-error">
                                            Please Enter Salutation.
                                          </div>
                                        ) : (
                                            ""
                                          )} */}
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
                          </Row>
                        </div>
                      </Col>
                      <Col md={"12"}>
                        <Row>
                          <Col lg={"6"}>
                            <h5 className="main-title">Reachability</h5>
                            <div className="form-card minheight-auto">
                              <Row>
                                <Col lg={"12"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Phone
                                    <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
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
                                <Col lg={"12"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Fax
                                        <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
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
                                <Col lg={"12"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Mobile Phone
                                          <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
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
                                <Col lg={"12"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Email address
                                    <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
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
                                <Col lg={"12"}>
                                  <FormGroup>
                                    <Row>
                                      <Col sm="4">
                                        <Label className="form-label col-form-label">
                                          Username
                                        <span className="required">*</span>
                                        </Label>
                                      </Col>
                                      <Col sm="8">
                                        <div>
                                          <Input
                                            type="text"
                                            name={"Username"}
                                            placeholder=" Username"
                                            className="width-common"
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
                            <div>
                              <h5 className="main-title">Data of Canstitution</h5>
                              <div className="form-card">
                                <Row>
                                  <Col lg={"12"}>
                                    <FormGroup>
                                      <Row>
                                        <Col sm="4">
                                          <Label className="form-label col-form-label">
                                            Short Name of Canstitution
                                            <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
                                          <div>
                                            <Input
                                              type="text"
                                              name={"shortName"}
                                              placeholder=" Short Name"
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
                                            Full Business name of Canstitution
                                            <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
                                          <div>
                                            <Input
                                              type="text"
                                              name="fullBusinessname"
                                              placeholder="Full Business name of Canstitution"
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
                                            Street
                                            <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
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
                                  <Col lg={"12"}>
                                    <FormGroup>
                                      <Row>
                                        <Col sm="4">
                                          <Label className="form-label col-form-label ">
                                            City
                                            <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
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
                                  <Col lg={"12"}>
                                    <FormGroup>
                                      <Row>
                                        <Col sm="4">
                                          <Label className="form-label col-form-label ">
                                            Post code
                                    <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
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
                                  <Col lg={"12"}>
                                    <FormGroup>
                                      <Row>
                                        <Col sm="4">
                                          <Label className="form-label col-form-label">
                                            Region/State
                                    <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
                                          <div>
                                            <Select
                                              placeholder="Region/State"
                                              options={State}
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
                                            Country
                                      <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="8">
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
                                </Row>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
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
      </div >
    );
  }
}
export default AddCareInstitution;
