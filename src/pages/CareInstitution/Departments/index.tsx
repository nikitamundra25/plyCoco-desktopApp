import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Table,
  Jumbotron,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { State, Region, Salutation, Country } from "../../../config";
import Select from "react-select";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { languageTranslation } from "../../../helpers";

class Departments extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: ""
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
        <Form className="form-section forms-main-section">
          <Row className="">
            <Col lg={"4"}>
              <div>
                <h5 className="content-title">
                  {languageTranslation("DEPARTMENT")}
                </h5>
              </div>

              <div className="form-card ">
                <FormGroup>
                  <Row>
                    <Col sm="12">
                      <div>
                        <Select
                          placeholder={languageTranslation("BLOCKED")}
                          // options={State}
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </div>
            </Col>

            <Col lg={"4"}>
              <div>
                <h5 className="content-title">
                  {" "}
                  {languageTranslation("DETAILS")}
                </h5>
              </div>

              <div className="form-card ">
                <Row>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            {languageTranslation("ID")}
                            {/* <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="4">
                              <div>
                                <Input
                                  type="text"
                                  name={"lastName"}
                                  placeholder={languageTranslation("USER_ID")}
                                  className="width-common"
                                />
                              </div>
                            </Col>
                            <Col sm="8">
                              <div className="edit-remark ml-2">
                                {languageTranslation("COPY_FORM_PROFILES")}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            {languageTranslation("NAME")}
                            {/*  <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={languageTranslation("")}
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
                            {languageTranslation("ANONYMNAME")}
                            {/*  <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={languageTranslation("")}
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
                            {languageTranslation("ANONYMNAME_2")}
                            {/*  <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={languageTranslation("")}
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
                            {languageTranslation("ADRESS")}
                            {/*  <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={languageTranslation("")}
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
                            {languageTranslation("CONTACT_PERSON")}
                            {/*  <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={languageTranslation("")}
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
                            {/*  <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={languageTranslation("")}
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
                            {/*  <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={languageTranslation("")}
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
                            {/*  <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={languageTranslation("")}
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
                            {languageTranslation(
                              "REMARKS_VISIBLE_TO_SPECIALIST"
                            )}
                            {/* <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="textarea"
                              name={"additionalText "}
                              placeholder={languageTranslation("")}
                              className="textarea-custom"
                              rows="4"
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
                            {languageTranslation("COMMENTS_OFFER")}
                            {/* <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="textarea"
                              name={"additionalText "}
                              placeholder={languageTranslation("")}
                              className="textarea-custom"
                              rows="4"
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
                            {languageTranslation(
                              "COMMENT_ONLY_VISIBLE_INTERNALLY"
                            )}
                            {/* <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="textarea"
                              name={"additionalText "}
                              placeholder={languageTranslation("")}
                              className="textarea-custom"
                              rows="4"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={4}>
              <div>
                <h5 className="content-title">
                  {" "}
                  {languageTranslation("TIMES")}
                </h5>
              </div>
              <Table bordered hover responsive>
                <thead className="thead-bg">
                  <tr>
                    <th>{languageTranslation("BEGINNING")}</th>
                    <th>{languageTranslation("THE_END")}</th>
                    <th>{languageTranslation("REMARKS")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20.08.2019</td>
                    <td>22.2020</td>
                    <td>She Came To The Info</td>
                  </tr>
                  <tr>
                    <td>20.08.2019 12:08:20</td>
                    <td>23.2020</td>
                    <td>She Came To The Info</td>
                  </tr>

                  <tr>
                    <td>20.08.2019 12:08:20</td>
                    <td>24.2020</td>
                    <td>She Came To The Info</td>
                  </tr>
                </tbody>
              </Table>
              <div className="common-col">
                <div className="form-card minheight-auto">
                  <Row>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="2">
                            <Label className="form-label col-form-label">
                              {languageTranslation("ID")}
                              {/* <span className="required">*</span> */}
                            </Label>
                          </Col>

                          <Col sm="10">
                            <div>
                              <Input
                                type="text"
                                name={"lastName"}
                                placeholder={languageTranslation("USER_ID")}
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
                          <Col lg={"12"}></Col>
                          <Col sm="2">
                            <Label className="form-label col-form-label">
                              {languageTranslation("BEGINNING")}
                              {/* <span className="required">*</span> */}
                            </Label>
                          </Col>
                          <Col sm="10">
                            <Row className="custom-col">
                              <Col sm="6">
                                <div className="common-list-footer form-section ">
                                  <FormGroup className="mb-0">
                                    <Select
                                      // placeholder={languageTranslation(
                                      //   "REGION",
                                      //   "STATE"
                                      // )}
                                      options={State}
                                    />
                                  </FormGroup>
                                </div>
                              </Col>
                              <Col sm="6">
                                <div className="common-list-footer form-section ">
                                  <FormGroup className="mb-0">
                                    <Select
                                      // placeholder={languageTranslation(
                                      //   "REGION",
                                      //   "STATE"
                                      // )}
                                      options={State}
                                    />
                                  </FormGroup>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col lg={"12"}></Col>
                          <Col sm="2">
                            <Label className="form-label col-form-label">
                              {languageTranslation("END")}
                              {/* <span className="required">*</span> */}
                            </Label>
                          </Col>
                          <Col sm="10">
                            <Row className="custom-col">
                              <Col sm="6">
                                <div className="common-list-footer form-section ">
                                  <FormGroup className="mb-0">
                                    <Select
                                      // placeholder={languageTranslation(
                                      //   "REGION",
                                      //   "STATE"
                                      // )}
                                      options={State}
                                    />
                                  </FormGroup>
                                </div>
                              </Col>
                              <Col sm="6">
                                <div className="common-list-footer form-section ">
                                  <FormGroup className="mb-0">
                                    <Select
                                      // placeholder={languageTranslation(
                                      //   "REGION",
                                      //   "STATE"
                                      // )}
                                      options={State}
                                    />
                                  </FormGroup>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="2">
                            <Label className="form-label col-form-label">
                              {languageTranslation("COMMENT")}
                              {/* <span className="required">*</span> */}
                            </Label>
                          </Col>

                          <Col sm="10">
                            <div>
                              <Input
                                type="text"
                                name={"lastName"}
                                // placeholder={languageTranslation("USER_ID")}
                                className="width-common"
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg={"12"}>
                      <div className="edit-remark ml-2 text-center">
                        {languageTranslation("STORAGE_PANEL")}
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="quality-attribute-section d-flex flex-column">
                  <div className="common-list-card">
                    <h5 className="content-title">
                      {languageTranslation("QUALIFICATIONS")}
                    </h5>
                    <div className="common-list-wrap">
                      <div className="common-list-header d-flex align-items-cente justify-content-between">
                        <div className="common-list-title align-middle">
                          {" "}
                          {languageTranslation("QUALIFICATION")}
                        </div>
                        <div className=" align-middle toggle-icon">
                          <i className="fa fa-angle-down"></i>
                        </div>
                      </div>
                      <div className="common-list-body">
                        <ul className="common-list list-unstyled">
                          <li>Dialysis </li>
                          <li>Home Management</li>
                          <li>Nurse/carer</li>
                        </ul>
                      </div>
                      <div className="common-list-footer form-section ">
                        <FormGroup className="mb-0">
                          <Select
                            placeholder={languageTranslation("REGION", "STATE")}
                            options={State}
                            menuPlacement={"top"}
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  <div className="common-list-card">
                    <h5 className="content-title">
                      {languageTranslation("ATTRIBUTES")}
                    </h5>
                    <div className="common-list-wrap">
                      <div className="common-list-header d-flex align-items-cente justify-content-between">
                        <div className="common-list-title align-middle">
                          {" "}
                          {languageTranslation("ATTRIBUTES")}
                        </div>
                        <div className=" align-middle toggle-icon">
                          <i className="fa fa-angle-down"></i>
                        </div>
                      </div>
                      <div className="common-list-body">
                        <ul className="common-list list-unstyled">
                          <li>Dialysis </li>
                          <li>Home Management</li>
                          <li>Nurse/carer</li>
                        </ul>
                      </div>
                      <div className="common-list-footer form-section ">
                        <FormGroup className="mb-0">
                          <Select
                            placeholder={languageTranslation("REGION", "STATE")}
                            options={State}
                            menuPlacement={"top"}
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}
export default Departments;
