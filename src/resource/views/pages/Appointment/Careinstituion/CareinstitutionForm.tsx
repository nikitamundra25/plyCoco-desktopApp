import React, { FunctionComponent, useState } from "react";

import "../index.scss";
import {
  IAppointmentCareInstitutionForm,
  IDaysArray,
  ICareinstitutionFormValue
} from "../../../../../interfaces";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import "../index.scss";
import { languageTranslation } from "../../../../../helpers";
import MaskedInput from "react-text-mask";
import { NightAllowancePerHour, State, ShiftTime } from "../../../../../config";
import Select from "react-select";
import { FormikProps } from "formik";

const CareinstitutionFormView: FunctionComponent<FormikProps<
  ICareinstitutionFormValue
> &
  IAppointmentCareInstitutionForm> = (
  props: FormikProps<ICareinstitutionFormValue> &
    IAppointmentCareInstitutionForm
) => {
  const {
    values: { firstName, lastName },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    selectedCareinstitution
  } = props;
  return (
    <>
      <div className="form-section ">
        <div className="form-card custom-height custom-scrollbar">
          <h5 className="content-title">
            {languageTranslation("MENU_INSTITUTION")}
          </h5>
          <Row>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("APPOINTMENT_ID")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"id"}
                        placeholder={languageTranslation("APPOINTMENT_ID")}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("NAME")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          name={"id"}
                          placeholder={languageTranslation("NAME")}
                          value={
                            selectedCareinstitution
                              ? `${
                                  selectedCareinstitution.firstName
                                    ? selectedCareinstitution.firstName
                                    : ""
                                } ${
                                  selectedCareinstitution.lastName
                                    ? selectedCareinstitution.lastName
                                    : ""
                                }`
                              : ""
                          }
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("DATE")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="text-value mb-1">SUN 08.03.2020</div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col sm={"12"} lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm={"5"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("SHIFT")}
                    </Label>
                  </Col>
                  <Col sm={"7"}>
                    <div>
                      <Select
                        placeholder="Select"
                        options={ShiftTime}
                        classNamePrefix="custom-inner-reactselect"
                        className={"custom-reactselect"}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("START_WORKING")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          name={"id"}
                          placeholder={languageTranslation("START_WORKING")}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>Uhr</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("END_WORKING")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          name={"id"}
                          placeholder={languageTranslation("END_WORKING")}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>Uhr</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("QUALIFICATION")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Select
                        placeholder="Select Qualifications"
                        options={State}
                        classNamePrefix="custom-inner-reactselect"
                        className={"custom-reactselect"}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("QUALIFICATION_FOR_BILLING")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <div className="required-input">
                        <Select
                          placeholder="Select Qualifications"
                          options={State}
                          classNamePrefix="custom-inner-reactselect"
                          className={"custom-reactselect"}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("DEPARTMENT")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Select
                        placeholder="Select Qualifications"
                        options={State}
                        classNamePrefix="custom-inner-reactselect"
                        className={"custom-reactselect"}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("ADDRESS")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"id"}
                        placeholder={languageTranslation("ADDRESS")}
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
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("CONTACT_PERSON")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"id"}
                        placeholder={languageTranslation("CONTACT_PERSON")}
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
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("REMARKS_OFFER_DEPARTMENT")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        type="textarea"
                        name="text"
                        id="exampleText"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("REMARKS_BOOKING_DEPARTEMENT")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        type="textarea"
                        name="text"
                        id="exampleText"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation(
                        "REMARK_DEPARTMENT_VISIBLE_INTERNALLY"
                      )}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        type="textarea"
                        name="text"
                        id="exampleText"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("WORKING_PROOF_NECESSARY")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <FormGroup check inline>
                        <div className=" checkbox-custom mb-0">
                          <input
                            type="checkbox"
                            id="check1"
                            className=""
                            name={""}
                          />
                          <Label for="check1"></Label>
                        </div>
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("REMARK_OFFER")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        type="textarea"
                        name="text"
                        id="exampleText"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("REMARK_BOOKING")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        type="textarea"
                        name="text"
                        id="exampleText"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="5">
                    <Label className="form-label col-form-label">
                      {languageTranslation("COMMENT_ONLY_VISIBLE_INTERNALLY")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        type="textarea"
                        name="text"
                        id="exampleText"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <Button className="btn-save" color="danger">
                  {languageTranslation("CLEAR")}
                </Button>
                <Button className="btn-save" color="primary">
                  {languageTranslation("SAVE_BUTTON")}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CareinstitutionFormView;
