import React from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { languageTranslation } from "../../../helpers";
import Select from "react-select";
import { State, Country } from "../../../config";
import { FormikProps, Field, Form } from "formik";
import { ICareInstitutionContact } from "../../../interfaces";

const CareInstitutionConstForm: any = (
  props: FormikProps<ICareInstitutionContact>
) => {
  return (
    <Col lg={12} className={"form-section"}>
      <div className="d-flex align-items-center justify-content-between my-3">
        <Nav tabs className="contact-tabs">
          <NavItem>
            <NavLink className="active">New Contact</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>New Contact 2</NavLink>
          </NavItem>
        </Nav>
        <Button color={"primary"} className={"btn-save"}>
          {languageTranslation("SAVE_BUTTON")}
        </Button>
      </div>
      <div className="form-flex-section mt-3 form-card minheight-auto">
        {/* <h5 className="main-title">Add New contact </h5> */}

        <div className="form-flex-block">
          <div className="form-flex-tile">
            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        {languageTranslation("ID")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          disable
                          name={"firstName"}
                          placeholder={languageTranslation("ID")}
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
                        {languageTranslation("GENDER")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <Row className="custom-col inner-no-padding-col">
                        <Col sm="4">
                          <div>
                            <Select
                              placeholder={languageTranslation("GENDER")}
                              options={State}
                            />
                          </div>
                        </Col>
                        <Col sm="8">
                          <FormGroup>
                            <Row className="custom-col inner-no-padding-col">
                              <Col sm="6">
                                <Label className="form-label col-form-label inner-label">
                                  {languageTranslation("TITLE")}
                                </Label>
                              </Col>
                              <Col sm="6">
                                <div>
                                  <Input
                                    type="text"
                                    name={"lastName"}
                                    placeholder={languageTranslation("TITLE")}
                                    className="width-common"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
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
                        {languageTranslation("SALUTATION")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"firstName"}
                          placeholder={languageTranslation("SALUTATION")}
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
                        {languageTranslation("FIRST_NAME")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"firstName"}
                          placeholder={languageTranslation("FIRST_NAME")}
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
                        {languageTranslation("SURNAME")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"firstName"}
                          placeholder={languageTranslation("SURNAME")}
                          className="width-common"
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="form-flex-tile">
            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        {languageTranslation("CONTACT_TYPE")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Select
                          placeholder={languageTranslation("CONTACT_TYPE")}
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
                        {languageTranslation("STREET")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"firstName"}
                          placeholder={languageTranslation("STREET")}
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
                        {languageTranslation("CITY")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"firstName"}
                          placeholder={languageTranslation("CITY")}
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
                        {languageTranslation("ZIP")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"firstName"}
                          placeholder={languageTranslation("ZIP")}
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
                        {languageTranslation("COUNTRY")}
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
          <div className="form-flex-tile">
            <Row>
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
                          name={"firstName"}
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
                        {languageTranslation("PHONE2")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"firstName"}
                          placeholder={languageTranslation("PHONE2")}
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
                          name={"firstName"}
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
                          name={"firstName"}
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
                          name={"firstName"}
                          placeholder={languageTranslation("EMAIL")}
                          className="width-common"
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </div>

          <div className="form-flex-tile">
            <div className="d-flex align-items-center justify-content-between">
              <div>{languageTranslation("ADD_REMARKS")} </div>
              <div className="edit-remark mb-1">
                <i className="icon-note" />
              </div>
            </div>

            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="12">
                      <div>
                        <Input
                          type="textarea"
                          name={"additionalText "}
                          placeholder={languageTranslation("REMARKS")}
                          className="textarea-care-institution"
                          rows="4"
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="form-flex-tile">
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
  );
};
export default CareInstitutionConstForm;
