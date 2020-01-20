import React, {
  useState,
  ChangeEvent,
  FunctionComponent,
  useEffect
} from "react";
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
import MaskedInput from "react-text-mask";
import { FormikProps, Form } from "formik";
import {
  Region,
  IBANRegex,
  DateMask,
  AppConfig,
  PAGE_LIMIT
} from "../../../config";
import routes from "../../../routes/routes";
import {
  IEmployeeFormValues,
  IReactSelectInterface,
  IRegion
} from "../../../interfaces";
import { logger, languageTranslation } from "../../../helpers";
import InputFieldTooltip from "../../../common/Tooltip/InputFieldTooltip";
import { RegionQueries } from "../../../queries/Region";

const [, GET_REGIONS] = RegionQueries;

const EmployeeFormComponent: FunctionComponent<FormikProps<
  IEmployeeFormValues
> & {
  imageUrl: string;
  countriesOpt: IReactSelectInterface[];
  statesOpt: IReactSelectInterface[];
  getStatesByCountry: any;
}> = (
  props: FormikProps<IEmployeeFormValues> & {
    imageUrl: string;
    countriesOpt: IReactSelectInterface[];
    statesOpt: IReactSelectInterface[];
    getStatesByCountry: any;
  }
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
      region,
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
    setFieldTouched,
    imageUrl,
    countriesOpt,
    statesOpt,
    getStatesByCountry,
    setFieldError
  } = props;
  console.log(props, "propsssssssssssssss");

  const [imagePreviewUrl, setUrl] = useState<string | ArrayBuffer | null>("");
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS
  );
  const regionOptions: IReactSelectInterface[] | undefined = [];
  if (RegionData && RegionData.getRegions && RegionData.getRegions.regionData) {
    RegionData.getRegions.regionData.forEach(({ id, regionName }: IRegion) =>
      regionOptions.push({
        label: regionName,
        value: id
      })
    );
  }
  useEffect(() => {
    console.log(imageUrl, "countryName", country);
    if (imageUrl) {
      setUrl(`${AppConfig.FILES_ENDPOINT}${imageUrl}`);
    }
  }, [imageUrl, country]);
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
  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: PAGE_LIMIT
      }
    });
  }, []);
  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, "selectOptionvalue");
    setFieldValue(name, selectOption);
    if (name === "country") {
      setFieldValue("state", { label: "", value: "" });
      getStatesByCountry({
        variables: {
          countryid: selectOption ? selectOption.value : "82"
        } // default code is for germany
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
          <Button
            color={"primary"}
            disabled={isSubmitting}
            className={"btn-add"}
            onClick={handleSubmit}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin loader" /> : ""}
            {languageTranslation("SAVE_BUTTON")}
          </Button>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs={"12"} lg={"12"}>
              <Form onSubmit={handleSubmit} className="form-section">
                <Row>
                <Col lg={"6"}>
                    <div className="form-card minheight-auto">
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
                                      setFieldError("userName", " ");
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

                        <Col lg={"12"}>
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
                        <Col lg={"12"}>
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
                                    className="textarea-custom form-control"
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
                        <Col lg={"12"}>
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
                        <Col lg={"12"}>
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
                        <Col lg={"12"}>
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
                        <Col lg={"12"}>
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
                                        mask={DateMask}
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
                        <Col lg={"12"}>
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
                      </Row>
                    </div>
                  </Col>

                  <Col lg={"6"}>
                  <h5 className='main-title '>
                  {languageTranslation(
                                  "EMPLOYEE_ADD_PROFILE_IMAGE_LABEL"
                                )}
                    </h5>
                    <div className="form-card minheight-auto file-preview-section p-0">
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
                
                    </div>
                    <h5 className='main-title '>
                      {languageTranslation('BANK_ACCOUNT_INFORMATION')}
                    </h5>
                    <div className="form-card minheight-auto">
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
                                  mask={IBANRegex}
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
