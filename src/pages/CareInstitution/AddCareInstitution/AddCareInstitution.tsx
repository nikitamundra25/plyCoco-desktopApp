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
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../routes/routes";

import { languageTranslation } from "../../../helpers";
import { State, Region, Salutation, Country } from "../../../config";

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
        <Card>
          <CardHeader>
            <AppBreadcrumb appRoutes={routes} className="w-100" />
          </CardHeader>
          <CardBody>
            <Form className="form-section">
              <Row>
                <Col lg={"6"} className="mb-3">
                  <div className="form-card h-100">
                    <Row>
                      <Col lg={"12"}>
                        <FormGroup>
                          <Row>
                            <Col sm="4">
                              <Label className="form-label col-form-label">
                                {languageTranslation("SALUTATION")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Select
                                  placeholder={languageTranslation(
                                    "SALUTATION"
                                  )}
                                  options={Salutation}
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
                                {languageTranslation("FIRST_NAME")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"firstName"}
                                  placeholder={languageTranslation(
                                    "FIRST_NAME"
                                  )}
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
                                {languageTranslation("SURNAME")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"lastName"}
                                  placeholder={languageTranslation("SURNAME")}
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
                                {languageTranslation("PHONE")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"phone"}
                                  placeholder={languageTranslation("PHONE")}
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
                                {languageTranslation("FAX")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"fax"}
                                  placeholder={languageTranslation("FAX")}
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
                                {languageTranslation("MOBILE")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"mobilePhone"}
                                  placeholder={languageTranslation("MOBILE")}
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
                                {languageTranslation("EMAIL")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"email"}
                                  placeholder={languageTranslation("EMAIL")}
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
                                {languageTranslation("USERNAME")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"Username"}
                                  placeholder={languageTranslation("USERNAME")}
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
                <Col lg={"6"} className="mb-3">
                  <div className="form-card h-100">
                    <Row>
                      <Col lg={"12"}>
                        <FormGroup>
                          <Row>
                            <Col sm="4">
                              <Label className="form-label col-form-label">
                                {languageTranslation("SHORT_NAME")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"shortName"}
                                  placeholder={languageTranslation(
                                    "SHORT_NAME"
                                  )}
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
                                {languageTranslation("COMPANY_NAME")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name="fullBusinessname"
                                  placeholder={languageTranslation(
                                    "COMPANY_NAME"
                                  )}
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
                                {languageTranslation("STREET")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"street"}
                                  placeholder={languageTranslation("STREET")}
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
                                {languageTranslation("CITY")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"city"}
                                  placeholder={languageTranslation("CITY")}
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
                                {languageTranslation("ZIP")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"postCode"}
                                  placeholder={languageTranslation("ZIP")}
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
                                {languageTranslation("STATE")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Select
                                  placeholder={languageTranslation("STATE")}
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
                                {languageTranslation("COUNTRY")}
                                <span className="required">*</span>
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Select
                                  placeholder={languageTranslation("COUNTRY")}
                                  options={Country}
                                />
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={"12"}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="mandatory-text">
                      {" "}
                      {languageTranslation("REQUIRED_FIELDS")}
                    </div>
                    <div className={"text-right"}>
                      <Button
                        color="primary"
                        type="submit"
                        className="btn-sumbit"
                      >
                        {languageTranslation("SAVE_BUTTON")}
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default AddCareInstitution;
