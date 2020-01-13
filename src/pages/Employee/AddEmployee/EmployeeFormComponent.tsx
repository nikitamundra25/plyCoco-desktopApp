import React, { Component, useState, ChangeEvent } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { AppBreadcrumb } from "@coreui/react";
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
// import InputMask from 'react-input-mask';
import MaskedInput from "react-text-mask";
import { FormikProps, Form } from "formik";
import { Region } from "../../../config";
import routes from "../../../routes/routes";
import {
  IEmployeeFormValues,
  ICountries,
  IReactSelectInterface,
  ICountry,
  IStates,
  IState
} from "../../../interfaces";
import { logger, languageTranslation } from "../../../helpers";
import InputFieldTooltip from "../../../common/Tooltip/InputFieldTooltip";
import { CountryQueries } from "../../../queries";

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

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
      state,
      city,
      zip,
      joiningDate,
      image
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = props;
  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );
  logger(data);
  logger("data");
  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({ label: name, value: id })
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({ label: name, value: id })
    );
  }
  const [imagePreviewUrl, setUrl] = useState<string | ArrayBuffer | null>("");
  logger("errors**********");
  logger(errors);
  logger(props.values);
  logger("touched*******");
  logger(touched);
  // Custom function to handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFieldTouched("image", true);
    const {
      target: { files }
    } = e;
    let reader = new FileReader();
    let file: any = "";
    if (files) {
      file = files[0];
    }
    if (file) {
      reader.onloadend = () => {
        setUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue("image", file);
    }
  };

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, "value");
    setFieldValue(name, selectOption);
    if (name === "country") {
      getStatesByCountry({
        variables: { countryid: selectOption ? selectOption.value : "82" } // default code is for germany
      });
      logger(statesData, "sdsdsdsd");
    }
  };
  logger(country);
  return (
    <div>
      <Card>
        <CardHeader>
          <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
          <Button
            color={"primary"}
            className={"btn-add"}
            onClick={handleSubmit}
          >
            {languageTranslation("SAVE_BUTTON")}
          </Button>
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
                                      "EMPLOYEE_FIRST_NAME_PLACEHOLDER"
                                    )}
                                    maxLength="20"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={firstName}
                                    className={
                                      errors.firstName && touched.firstName
                                        ? "text-input error"
                                        : "text-input"
                                    }
                                  />
                                  {errors.firstName && touched.firstName && (
                                    <div className="required-error">
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
                                    <div className="required-error">
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
                                    onBlur={(e: any) => {
                                      //get string before a @ to set username
                                      const username = email
                                        ? email.substring(0, email.indexOf("@"))
                                        : "";

                                      setFieldValue("userName", username);
                                      handleBlur(e);
                                    }}
                                    value={email}
                                    className={
                                      errors.email && touched.email
                                        ? "text-input error"
                                        : "text-input"
                                    }
                                  />
                                  {errors.email && touched.email && (
                                    <div className="required-error">
                                      {errors.email}
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
                                    "EMPLOYEE_USER_NAME_LABEL"
                                  )}
                                  <span className="required">*</span>
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Input
                                    type="text"
                                    name={"userName"}
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_USER_NAME_PLACEHOLDER"
                                    )}
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
                                    <div className="required-error">
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
                                    "EMPLOYEE_TELEPHONE_NUMBER_LABEL"
                                  )}
                                  <span className="required">*</span>
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Input
                                    name={"telephoneNumber"}
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_TELEPHONE_NUMBER_PLACEHOLDER"
                                    )}
                                    // mask="999-999-9999"
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
                                      <div className="required-error">
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
                      {languageTranslation("BANK_ACCOUNT_INFORMATION")}
                    </h5>
                    <div className="form-card">
                      <Col lg={"12"}>
                        <FormGroup>
                          <Row>
                            <Col sm="4">
                              <Label className="form-label col-form-label ">
                                {languageTranslation(
                                  "EMPLOYEE_BANK_NAME_LABEL"
                                )}
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"bankName"}
                                  placeholder={languageTranslation(
                                    "EMPLOYEE_BANK_NAME_PLACEHOLDER"
                                  )}
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
                                  <div className="required-error">
                                    {errors.bankName}
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
                                  "BANK_ACCOUNT_HOLDER_NAME_LABEL"
                                )}
                                {/* Account Holder Name */}
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"accountHolderName"}
                                  placeholder={languageTranslation(
                                    "BANK_ACCOUNT_HOLDER_NAME_PLACEHOLDER"
                                  )}
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
                                    <div className="required-error">
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
                                {languageTranslation("BANK_IBAN_LABEL")}
                                {/* IBAN */}
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <MaskedInput
                                  name={"IBAN"}
                                  value={IBAN}
                                  placeholder={languageTranslation(
                                    "BANK_IBAN_PLACEHOLDER"
                                  )}
                                  // "91 1000 0000 0123 4567 89"
                                  mask={[
                                    /[A-Za-z]/,
                                    /[A-Za-z]/,
                                    /\d/,
                                    /\d/,
                                    " ",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    " ",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    " ",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/
                                  ]}
                                  // mask={' 9999 9999 9999 9999 9999 99'}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                    errors.IBAN && touched.IBAN
                                      ? "text-input error"
                                      : "text-input"
                                  }`}
                                />
                                {errors.IBAN && touched.IBAN && (
                                  <div className="required-error">
                                    {errors.IBAN}
                                  </div>
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
                                {languageTranslation("BANK_BIC_LABEL")}
                                {/* BIC */}
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"BIC"}
                                  placeholder={languageTranslation(
                                    "BANK_BIC_PLACEHOLDER"
                                  )}
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
                                  <div className="required-error">
                                    {errors.BIC}
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
                                {languageTranslation("ADDITIONAL_TEXT_LABEL")}
                                &nbsp;
                                <InputFieldTooltip
                                  id="ADDITIONAL_TEXT"
                                  message={languageTranslation(
                                    "ADDITIONAL_TEXT"
                                  )}
                                />
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div>
                                <Input
                                  type="textarea"
                                  name={"additionalText"}
                                  className="textarea-custom"
                                  placeholder={languageTranslation(
                                    "ADDITIONAL_TEXT_PLACEHOLDER"
                                  )}
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
                    <h5 className="main-title ">
                      {languageTranslation("OTHER_INFORMATION")}
                    </h5>
                    <div className="form-card">
                      <Row>
                        <Col lg={"6"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "EMPLOYEE_ADDRESS1_LABEL"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Input
                                    type="textarea"
                                    name={"address1"}
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_ADDRESS1_PLACEHOLDER"
                                    )}
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
                                  {languageTranslation(
                                    "EMPLOYEE_ADDRESS2_LABEL"
                                  )}
                                </Label>
                              </Col>

                              <Col sm="8">
                                <div className="custom-radio-block">
                                  <Input
                                    type="textarea"
                                    name={"address2"}
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_ADDRESS2_PLACEHOLDER"
                                    )}
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
                                  {languageTranslation("REGION")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Select
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_REGION_PLACEHOLDER"
                                    )}
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
                                  {languageTranslation("COUNTRY")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Select
                                    placeholder={languageTranslation(
                                      "COUNTRY_PLACEHOLDER"
                                    )}
                                    options={countriesOpt}
                                    value={country ? country : undefined}
                                    onChange={(value: any) =>
                                      handleSelect(value, "country")
                                    }
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
                                  {languageTranslation("EMPLOYEE_STATE_LABEL")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Select
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_STATE_PLACEHOLDER"
                                    )}
                                    options={statesOpt}
                                    value={state ? state : undefined}
                                    onChange={(value: any) =>
                                      handleSelect(value, "state")
                                    }
                                    noOptionsMessage={() => {
                                      return "Select a country first";
                                    }}
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
                                  {languageTranslation("EMPLOYEE_CITY_LABEL")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Input
                                    name={"city"}
                                    onChange={handleChange}
                                    // className="form-control"
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_CITY_PLACEHOLDER"
                                    )}
                                    value={city}
                                    onBlur={handleBlur}
                                    className={
                                      errors.city && touched.city
                                        ? "text-input error"
                                        : "text-input"
                                    }
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
                                  {languageTranslation("EMPLOYEE_ZIP_LABEL")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Input
                                    name={"zip"}
                                    onChange={handleChange}
                                    // className="form-control"
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_ZIP_PLACEHOLDER"
                                    )}
                                    value={zip}
                                    onBlur={handleBlur}
                                    className={
                                      errors.zip && touched.zip
                                        ? "text-input error"
                                        : "text-input"
                                    }
                                  />
                                  {errors.zip && touched.zip && (
                                    <div className="required-error">
                                      {errors.zip}
                                    </div>
                                  )}
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
                                  {languageTranslation(
                                    "EMPLOYEE_JOINING_DATE_LABEL"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Row>
                                    <Col>
                                      <MaskedInput
                                        name={"joiningDate"}
                                        placeholder={languageTranslation(
                                          "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                                        )}
                                        mask={[
                                          /[0-9]/,
                                          /\d/,
                                          "/",
                                          /\d/,
                                          /\d/,
                                          "/",
                                          /\d/,
                                          /\d/,
                                          /\d/,
                                          /\d/
                                        ]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={joiningDate}
                                        className={`form-control ${
                                          errors.joiningDate &&
                                          touched.joiningDate
                                            ? "text-input error"
                                            : "text-input"
                                        }`}
                                      />
                                      {errors.joiningDate &&
                                        touched.joiningDate && (
                                          <div className="required-error">
                                            {errors.joiningDate}
                                          </div>
                                        )}
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
                                  {languageTranslation(
                                    "EMPLOYEE_ADD_PROFILE_IMAGE_LABEL"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="fileinput-preview d-flex align-items-center justify-content-center">
                                  {!errors.image ? (
                                    imagePreviewUrl &&
                                    typeof imagePreviewUrl === "string" ? (
                                      <img
                                        src={imagePreviewUrl}
                                        // width={100}
                                        // height={100}
                                        className="img-preview "
                                      />
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    ""
                                  )}
                                  <div className="file-upload">
                                    <label
                                      htmlFor="gallery-photo-add"
                                      className="file-upload-label"
                                    >
                                      <div className="icon-upload">
                                        <i className="cui-cloud-upload"></i>
                                      </div>
                                      {/* <div className="icon-text">
                                        Click here to select your profile image
                                      </div> */}
                                      <div className="icon-text">
                                        {!image || errors.image
                                          ? languageTranslation("CHOOSE_IMAGE")
                                          : ""}
                                      </div>
                                    </label>
                                    <input
                                      className="file-upload-input"
                                      type="file"
                                      accept="image/*"
                                      id="gallery-photo-add"
                                      placeholder={languageTranslation(
                                        "EMPLOYEE_ADD_PROFILE_IMAGE_LABEL"
                                      )}
                                      onChange={handleImageChange}
                                    />
                                  </div>
                                </div>
                                {errors.image && touched.image && (
                                  <div className="file-error-text">
                                    {errors.image}
                                  </div>
                                )}
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>

                <div className="d-flex align-items-center justify-content-between">
                  <div className="mandatory-text">
                    {languageTranslation("REQUIRED_FIELDS")}
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeFormComponent;
