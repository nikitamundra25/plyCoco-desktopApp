import React, { FunctionComponent } from "react";
import { FormGroup, Label, Input, Col, Row, Button } from "reactstrap";
import { FormikProps } from "formik";
import { languageTranslation } from "../../../../../helpers";
import { IAddDepartmentFormValues } from "../../../../../interfaces";
import Loader from "../../../containers/Loader/Loader";

const AddDepartmentForm: FunctionComponent<FormikProps<
  IAddDepartmentFormValues
> &
  any> = (props: FormikProps<IAddDepartmentFormValues> & any) => {
  const {
    values: {
      userId,
      name,
      anonymousName,
      anonymousName2,
      address,
      contactPerson,
      phoneNumber,
      faxNumber,
      email,
      commentsCareGiver,
      commentsOffer,
      commentsVisibleInternally,
      locked
    },
    isLoading,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = props;

  return (
    <>
      <div id={"caregiver-add-btn"}>
        <Button
          color={"primary"}
          disabled={isSubmitting}
          className={"save-button"}
          onClick={handleSubmit}
          id={"department-save-btn"}
        >
          {isSubmitting ? (
            <i className="fa fa-spinner fa-spin loader mr-1" />
          ) : (
            ""
          )}
          {languageTranslation("SAVE_BUTTON")}
        </Button>
      </div>
      <div>
        <h5 className="content-title"> {languageTranslation("DETAILS")}</h5>
      </div>

      <div className="form-card department-card-height">
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : null}
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
                          name={"userId"}
                          disabled
                          value={userId}
                          placeholder={languageTranslation("ID")}
                          className="width-common"
                        />
                      </div>
                    </Col>
                    {/* <Col sm="8">
                      <div className="edit-remark ml-2 text-center">
                        {languageTranslation("COPY_FORM_PROFILES")}
                      </div>
                    </Col> */}
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
                    <span className="required">*</span>
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <Input
                      type="text"
                      name={"name"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={name}
                      placeholder={languageTranslation("")}
                      className={
                        errors.name && touched.name
                          ? "text-input error text-capitalize"
                          : "text-input text-capitalize"
                      }
                    />
                    {errors.name && touched.name && (
                      <div className="required-tooltip">{errors.name}</div>
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
                    {languageTranslation("ANONYMOUS_NAME")}
                    {/*  <span className="required">*</span> */}
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <Input
                      type="text"
                      name={"anonymousName"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={anonymousName}
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
                    {languageTranslation("ANONYMOUS_NAME2")}
                    {/*  <span className="required">*</span> */}
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <Input
                      type="text"
                      name={"anonymousName2"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={anonymousName2}
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
                    {languageTranslation("ADDRESS")}
                    {/*  <span className="required">*</span> */}
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <Input
                      type="text"
                      name={"address"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={address}
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
                      name={"contactPerson"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={contactPerson}
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
                    {/* <span className="required">*</span> */}
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <Input
                      type="text"
                      name={"phoneNumber"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={phoneNumber}
                      placeholder={languageTranslation("")}
                      className={
                        errors.phoneNumber && touched.phoneNumber
                          ? "text-input error "
                          : "text-input "
                      }
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className="required-tooltip">
                        {errors.phoneNumber}
                      </div>
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
                    {languageTranslation("FAX")}
                    {/* <span className="required">*</span> */}
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <Input
                      type="text"
                      name={"faxNumber"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={faxNumber}
                      placeholder={languageTranslation("")}
                      className={
                        errors.faxNumber && touched.faxNumber
                          ? "text-input error "
                          : "text-input "
                      }
                    />
                    {errors.faxNumber && touched.faxNumber && (
                      <div className="required-tooltip">{errors.faxNumber}</div>
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
                    {languageTranslation("EMPLOYEE_EMAIL_ADDRESS_LABEL")}
                    <span className="required">*</span>
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <Input
                      type="text"
                      name={"email"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={email}
                      placeholder={languageTranslation("")}
                      className={
                        errors.email && touched.email
                          ? "text-input error "
                          : "text-input "
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="required-tooltip">{errors.email}</div>
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
                    {languageTranslation("COMMENTS_VISIBLE_FOE_CARE-GIVER")}
                    {/* <span className="required">*</span> */}
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <Input
                      type="textarea"
                      name={"commentsCareGiver"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={commentsCareGiver}
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
                      name={"commentsOffer"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={commentsOffer}
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
                    {languageTranslation("COMMENT_ONLY_VISIBLE_INTERNALLY")}
                    {/* <span className="required">*</span> */}
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <Input
                      type="textarea"
                      name={"commentsVisibleInternally"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={commentsVisibleInternally}
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
                    {languageTranslation("LOCKED")}
                    {/* <span className="required">*</span> */}
                  </Label>
                </Col>
                <Col sm="8">
                  <div>
                    <div className=" checkbox-custom mb-0">
                      <input
                        type="checkbox"
                        id="check"
                        className=""
                        name={"locked"}
                        checked={locked}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const {
                            target: { checked }
                          } = e;
                          setFieldValue("locked", checked);
                        }}
                      />
                      <Label for="check"></Label>
                    </div>
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          {/* <Col lg={"12"} className="text-right">
            <Button
              color={"primary"}
              disabled={isSubmitting}
              className={"btn-save"}
              onClick={handleSubmit}
              id={"department-save-btn"}
            >
              {isSubmitting ? (
                <i className="fa fa-spinner fa-spin loader" />
              ) : (
                ""
              )}
              <i className={"fa fa-floppy-o"} />
              &nbsp;{languageTranslation("SAVE_BUTTON")}
            </Button>
          </Col> */}
        </Row>
      </div>
    </>
  );
  // }
};
export default AddDepartmentForm;
