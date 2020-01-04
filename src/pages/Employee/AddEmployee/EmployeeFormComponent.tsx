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
  Row
} from "reactstrap";
import Select from "react-select";
import { State, Region, City } from "../../../config";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../routes/routes";
import InputMask from "react-input-mask";
import { IEmployeeFormValues } from "../../../interfaces";
import { FormikProps, Field, Form } from "formik";
import PictureInput from "./PictureInput";
import { languageTranslation } from "../../../helpers/LangauageTranslation";
const EmployeeFormComponent: any = (
  props: FormikProps<IEmployeeFormValues>
) => {
  const {
    values: {
      email,
      firstName,
      lastName,
      userName,
      telephoneNumber,
      accountHolderName,
      bankName,
      IBAN,
      BIC,
      additionalText,
      address1,
      address2,
      country,
      zip,
      joiningDate,
      bankAccountNumber,
      image
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  console.log("language labels", languageTranslation("PERSONAL_DATA"));

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
                  <Form onSubmit={handleSubmit} className="form-section">
                    <Row>
                      <Col lg={"6"}>
                        <h5 className="main-title ">
                          {languageTranslation("PERSONAL_DATA")}
                        </h5>
                        <div className="form-card">
                          <Row>
                            <Col lg={"12"}>
                              <FormGroup>
                                <Row>
                                  <Col sm="4">
                                    <Label className="form-label col-form-label">
                                      {languageTranslation(
                                        "EMPLOYEE_FIRST_NAME_LABEL"
                                      )}
                                      <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"firstName"}
                                        placeholder={languageTranslation(
                                          "EMPLOYEE_FIRST_NAME_PLACEHOLDER"
                                        )}
                                        onChange={handleChange}
                                        maxLength="20"
                                        onBlur={handleBlur}
                                        value={firstName}
                                        className={
                                          errors.firstName && touched.firstName
                                            ? "text-input error"
                                            : "text-input"
                                        }
                                      />
                                      {errors.firstName &&
                                        touched.firstName && (
                                          <div className="">
                                            {errors.firstName}
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
                                      {languageTranslation(
                                        "EMPLOYEE_SURNAME_LABEL"
                                      )}
                                      <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder={languageTranslation(
                                          "EMPLOYEE_SURNAME_PLACEHOLDER"
                                        )}
                                        onChange={handleChange}
                                        maxLength="20"
                                        onBlur={handleBlur}
                                        value={lastName}
                                        className={
                                          errors.lastName && touched.lastName
                                            ? "text-input error"
                                            : "text-input"
                                        }
                                      />
                                      {errors.lastName && touched.lastName && (
                                        <div className="">
                                          {errors.lastName}
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
                                    <Label className="form-label col-form-label ">
                                      {languageTranslation(
                                        "EMPLOYEE_EMAIL_ADDRESS_LABEL"
                                      )}
                                      <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"email"}
                                        placeholder={languageTranslation(
                                          "EMPLOYEE_EMAIL_ADDRESS_PLACEHOLDER"
                                        )}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={email}
                                        className={
                                          errors.email && touched.email
                                            ? "text-input error"
                                            : "text-input"
                                        }
                                      />
                                      {errors.email && touched.email && (
                                        <div className="">{errors.email}</div>
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={userName}
                                        className={
                                          errors.userName && touched.userName
                                            ? "text-input error"
                                            : "text-input"
                                        }
                                      />
                                      {errors.userName && touched.userName && (
                                        <div className="">
                                          {errors.userName}
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
                                    <Label className="form-label col-form-label ">
                                    {languageTranslation(
                                          "EMPLOYEE_EMAIL_ADDRESS_PLACEHOLDER"
                                        )}
                                      <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <InputMask
                                        name={"telephoneNumber"}
                                        placeholder={languageTranslation(
                                          "EMPLOYEE_EMAIL_ADDRESS_PLACEHOLDER"
                                        )}
                                        mask="999-999-9999"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={telephoneNumber}
                                        className={`form-control ${
                                          errors.telephoneNumber &&
                                          touched.telephoneNumber
                                            ? "text-input error"
                                            : "text-input"
                                        }`}
                                      />
                                      {errors.telephoneNumber &&
                                        touched.telephoneNumber && (
                                          <div className="">
                                            {errors.telephoneNumber}
                                          </div>
                                        )}
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
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={bankName}
                                      className={`width-common ${
                                        errors.bankName && touched.bankName
                                          ? "text-input error"
                                          : "text-input"
                                      }`}
                                    />
                                    {errors.bankName && touched.bankName && (
                                      <div className="">{errors.bankName}</div>
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
                                  <Label className="form-label col-form-label ">
                                    Bank account number
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <div>
                                    <Input
                                      type="text"
                                      name={"bankAccountNumber"}
                                      placeholder="Bank Name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={bankAccountNumber}
                                      className={`width-common ${
                                        errors.bankName && touched.bankName
                                          ? "text-input error"
                                          : "text-input"
                                      }`}
                                    />
                                    {errors.bankName && touched.bankName && (
                                      <div className="">{errors.bankName}</div>
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
                                    Account Holder Name
                                    <br />
                                    <small>(only if different)</small>
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <div>
                                    <Input
                                      type="text"
                                      name={"accountHolderName"}
                                      placeholder="Account Holder Name "
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={accountHolderName}
                                      className={`width-common ${
                                        errors.accountHolderName &&
                                        touched.accountHolderName
                                          ? "text-input error"
                                          : "text-input"
                                      }`}
                                    />
                                    {errors.accountHolderName &&
                                      touched.accountHolderName && (
                                        <div className="">
                                          {errors.accountHolderName}
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
                                  <Label className="form-label col-form-label ">
                                    IBAN
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <div>
                                    <InputMask
                                      name={"IBAN"}
                                      value={IBAN}
                                      placeholder="DE91 1000 0000 0123 4567 89"
                                      // mask=\d{3}"
                                      mask={" 99 9999 999 999"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={`form-control ${
                                        errors.IBAN && touched.IBAN
                                          ? "text-input error"
                                          : "text-input"
                                      }`}
                                    />
                                    {errors.IBAN && touched.IBAN && (
                                      <div className="">{errors.IBAN}</div>
                                    )}
                                    {/* <Input type="text" name={"IBAN"} /> */}
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
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={BIC}
                                      className={
                                        errors.BIC && touched.BIC
                                          ? "text-input error"
                                          : "text-input"
                                      }
                                    />
                                    {errors.BIC && touched.BIC && (
                                      <div className="">{errors.BIC}</div>
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
                                      name={"additionalText"}
                                      className="textarea-custom"
                                      placeholder="Additional text "
                                      rows="4"
                                      onChange={handleChange}
                                      value={additionalText}
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
                                        className="textarea-custom"
                                        onChange={handleChange}
                                        value={address1}
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
                                        placeholder="Address 2"
                                        onChange={handleChange}
                                        value={address2}
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
                                        onChange={handleChange}
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
                                        name={"zip"}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Zip"
                                        value={zip}
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
                                            name={"joiningDate"}
                                            placeholder="DD/MM/YYYY"
                                            mask="99/99/9999"
                                            onChange={handleChange}
                                            value={joiningDate}
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
                                      <Field
                                        name="image"
                                        component={PictureInput}
                                      />
                                      {/* <Input
                                        type="file"
                                        name={"image"}
                                        onChange={(event : any) => {
                                          form.setFieldValue(field.name, e.target.files[0]);
                                        }}
                                        value={image}
                                      /> */}
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
                        <div className="mandatory-text">* Required Fields</div>
                        <div className={"text-right"}>
                          <Button
                            disabled={isSubmitting}
                            color="primary"
                            type={"submit"}
                            className="btn-sumbit"
                            // onClick={(e: any) => {
                            //   e.preventDefault();
                            //   handleSubmit();
                            // }}
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
};

export default EmployeeFormComponent;
