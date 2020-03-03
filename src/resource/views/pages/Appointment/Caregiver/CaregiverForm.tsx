import React, { FunctionComponent, useState } from "react";

import "../index.scss";
import {
  IAppointmentCareGiverForm,
  IDaysArray,
  ICaregiverFormValue
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
import { NightAllowancePerHour, State } from "../../../../../config";
import Select from "react-select";
import { FormikProps } from "formik";

const CaregiverFormView: FunctionComponent<FormikProps<ICaregiverFormValue> &
  IAppointmentCareGiverForm> = (
  props: FormikProps<ICaregiverFormValue> & IAppointmentCareGiverForm
) => {
  // const { selectedCareGiver } = props;
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
    selectedCareGiver
  } = props;

  return (
    <>
      <div className="form-section">
        <div className="form-card custom-height custom-scrollbar">
          <h5 className="content-title">
            {languageTranslation("MENU_CAREGIVER")}
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
                        placeholder={languageTranslation("APPOINTMENT_ID")}
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
                      {languageTranslation("NAME")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder={languageTranslation("NAME")}
                          value={`${firstName ? firstName : ""} ${
                            lastName ? lastName : ""
                          }`}
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
                    <div className="required-input">
                      <MaskedInput
                        placeholder={languageTranslation(
                          "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                        )}
                        className={"form-control mb-2"}
                      />
                    </div>

                    <div>
                      <FormGroup check inline>
                        <div className=" checkbox-custom mb-1">
                          <input
                            type="checkbox"
                            id="check"
                            className=""
                            name={"early"}
                            checked
                          />
                          <Label for="check">
                            {languageTranslation("EARLY")}
                          </Label>
                        </div>
                      </FormGroup>
                      <FormGroup check inline>
                        <div className=" checkbox-custom mb-1">
                          <input
                            type="checkbox"
                            id="check1"
                            className=""
                            name={"late"}
                          />
                          <Label for="check1">
                            {languageTranslation("LATE")}
                          </Label>
                        </div>
                      </FormGroup>
                      <FormGroup check inline>
                        <div className=" checkbox-custom mb-1">
                          <input
                            type="checkbox"
                            id="check2"
                            className=""
                            name={"night"}
                          />
                          <Label for="check2">
                            {languageTranslation("NIGHT")}
                          </Label>
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
                      {languageTranslation("FEE")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder={languageTranslation("FEE")}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="fa fa-euro" aria-hidden="true"></i>
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
                      {languageTranslation("NIGHT_FEE")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder={languageTranslation("NIGHT_FEE")}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="fa fa-euro" aria-hidden="true"></i>
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
                      {languageTranslation("WEEKEND_FEE")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder={languageTranslation("WEEKEND_FEE")}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="fa fa-euro" aria-hidden="true"></i>
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
                      {languageTranslation("HOLIDAY_FEE")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder={languageTranslation("HOLIDAY_FEE")}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="fa fa-euro" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col sm={"12"} lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm={"5"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("NIGHT_ALLOWANCE")}
                    </Label>
                  </Col>
                  <Col sm={"7"}>
                    <div>
                      <Select
                        placeholder={languageTranslation("NIGHT_ALLOWANCE")}
                        options={NightAllowancePerHour}
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
                      {languageTranslation("FEE_PER_KM")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder={languageTranslation("FEE_PER_KM")}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>km</InputGroupText>
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
                      {languageTranslation("a")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder={languageTranslation("a")}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="fa fa-euro" aria-hidden="true"></i>
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
                      {languageTranslation("EXPENSES")}
                    </Label>
                  </Col>
                  <Col sm="7">
                    <div className="required-input">
                      <Input
                        type="text"
                        placeholder={languageTranslation("EXPENSES")}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm={"5"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("WORKING_HOURS")}
                    </Label>
                  </Col>

                  <Col sm={"7"}>
                    <div className="required-input">
                      <div className="custom-col inner-no-padding-col row">
                        <Col sm={"6"}>
                          <div>
                            <Select
                              classNamePrefix="custom-inner-reactselect"
                              className={
                                "custom-reactselect custom-reactselect-menu-width"
                              }
                              placeholder=""
                              options={State}
                            />
                          </div>
                        </Col>
                        <Col sm={"6"}>
                          <div>
                            <Select
                              classNamePrefix="custom-inner-reactselect"
                              className={
                                "custom-reactselect custom-reactselect-menu-width"
                              }
                              placeholder=""
                              options={State}
                            />
                          </div>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm={"5"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("BREAK")}
                    </Label>
                  </Col>

                  <Col sm={"7"}>
                    <div className="required-input">
                      <div className="custom-col inner-no-padding-col row">
                        <Col sm={"6"}>
                          <div>
                            <Select
                              classNamePrefix="custom-inner-reactselect"
                              className={
                                "custom-reactselect custom-reactselect-menu-width"
                              }
                              placeholder=""
                              options={State}
                            />
                          </div>
                        </Col>
                        <Col sm={"6"}>
                          <div>
                            <Select
                              classNamePrefix="custom-inner-reactselect"
                              className={
                                "custom-reactselect custom-reactselect-menu-width"
                              }
                              placeholder=""
                              options={State}
                            />
                          </div>
                        </Col>
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
                      {languageTranslation("REMARKS_VISIBLE_FOR_CAREGIVER")}
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
                      {languageTranslation("REMARKS_VISIBLE_INTERNALLY")}
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
                  {languageTranslation("DELETE")}
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

export default CaregiverFormView;
