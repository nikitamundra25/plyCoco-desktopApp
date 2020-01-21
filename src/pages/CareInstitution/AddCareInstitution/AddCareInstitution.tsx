import React, { Component, useEffect } from "react";
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
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../routes/routes";
import { FormikProps, Field, Form, Formik, FormikHelpers } from "formik";
import { languageTranslation, logger } from "../../../helpers";
import { State, Region, Salutation, Country, Gender } from "../../../config";
import {
  ICareInstitutionFormValues,
  ICountries,
  IReactSelectInterface,
  ICountry,
  IStates,
  IState,
  IRegion
} from "../../../interfaces";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
// import CareInstitutionContact from "../PersonalInfo/CareInstitutionContact";
import { CountryQueries } from "../../../queries";
import CommissionFormData from "../PersonalInfo/PersonalInfoForm/CommissionFormData";
import InvoiceFormData from "../PersonalInfo/PersonalInfoForm/InvoiceFormData";
import QuallificationAttribute from "../PersonalInfo/PersonalInfoForm/QuallificationAttribute";
import RemarkFormData from "../PersonalInfo/PersonalInfoForm/RemarkFormData";
import "../careinstitution.scss";
import { RegionQueries } from "../../../queries/Region";

const [, GET_REGIONS] = RegionQueries
const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const AddCareInstitution: any = (
  props: FormikProps<ICareInstitutionFormValues>
) => {
  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );
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
  // Region Data
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS
  );
  //Region List Data
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
    // call query
    fetchRegionList({
      variables: {
        limit: 200,
        sortBy: 3
      }
    });
  }, []);

  const {
    values: {
      email,
      firstName,
      lastName,
      userName,
      phoneNumber,
      mobileNumber,
      salutation,
      country,
      street,
      state,
      city,
      zipCode,
      shortName,
      companyName,
      remarksViewable,
      title,
      gender,
      website,
      linkedTo,
      fax,
      anonymousName2,
      anonymousName,
      id,
      regionId,
      createdAt
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

  return (
    <Row className=" ">
      <Button
        disabled={isSubmitting}
        id={"caregiver-add-btn"}
        onClick={handleSubmit}
        color={"primary"}
        className={"save-button"}
      >
        {isSubmitting ? <i className="fa fa-spinner fa-spin loader" /> : ""}
        {languageTranslation("SAVE_BUTTON")}
      </Button>
      <Col lg={"4"}>
        <div className="form-card h-100">
          <Row>
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
                        placeholder={languageTranslation("REGION", "STATE")}
                        value={regionId ? regionId : undefined}
                        onChange={(value: any) =>
                          handleSelect(value, "regionId")
                        }
                        options={regionOptions}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row className="">
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("GENDER")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <Row className="custom-col inner-no-padding-col">
                      <Col sm="5">
                        <div>
                          <Select
                            placeholder={languageTranslation("GENDER")}
                            value={gender ? gender : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, "gender")
                            }
                            options={Gender}
                          />
                        </div>
                      </Col>
                      <Col sm="7">
                        <FormGroup>
                          <Row className="custom-col inner-no-padding-col d-flex align-items-center">
                            <Col sm="6">
                              <Label className="form-label col-form-label inner-label">
                                {languageTranslation("TITLE")}
                              </Label>
                            </Col>
                            <Col sm="6">
                              <div>
                                <Input
                                  type="text"
                                  name={"title"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={title}
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
                      <Select
                        placeholder={languageTranslation("SALUTATION")}
                        value={salutation ? salutation : undefined}
                        onChange={(value: any) =>
                          handleSelect(value, "salutation")
                        }
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={firstName}
                        placeholder={languageTranslation("FIRST_NAME")}
                        className={
                          errors.firstName && touched.firstName
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.firstName && touched.firstName && (
                        <div className="required-error">{errors.firstName}</div>
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={lastName}
                        placeholder={languageTranslation("SURNAME")}
                        className={
                          errors.lastName && touched.lastName
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.lastName && touched.lastName && (
                        <div className="required-error">{errors.lastName}</div>
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
                      {languageTranslation("SHORT_NAME")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"shortName"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={shortName}
                        placeholder={languageTranslation("SHORT_NAME")}
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
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"companyName"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={companyName}
                        placeholder={languageTranslation("COMPANY_NAME")}
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
                      {languageTranslation("ANONYMOUS_NAME")}
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
                        placeholder={languageTranslation("ANONYMOUS_NAME")}
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
                        placeholder={languageTranslation("ANONYMOUS_NAME2")}
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
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"street"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={street}
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
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"city"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={city}
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
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"zipCode"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={zipCode}
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
                    <Label className="form-label col-form-label ">
                      {languageTranslation("COUNTRY")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Select
                        placeholder={languageTranslation("COUNTRY")}
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
                    <Label className="form-label col-form-label ">
                      {languageTranslation("STATE")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Select
                        placeholder={languageTranslation("STATE")}
                        options={statesOpt}
                        value={state ? state : undefined}
                        onChange={(value: any) => handleSelect(value, "state")}
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
                    <Label className="form-label col-form-label ">
                      {languageTranslation("PHONE")}
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
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"fax"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={fax}
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
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"mobileNumber"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={mobileNumber}
                        placeholder={languageTranslation("MOBILE")}
                        className={
                          errors.mobileNumber && touched.mobileNumber
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.mobileNumber && touched.mobileNumber && (
                        <div className="required-error">
                          {errors.mobileNumber}
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
                      {languageTranslation("EMAIL")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"email"}
                        onChange={handleChange}
                        value={email}
                        onBlur={(e: any) => {
                          //get string before a @ to set username
                          const username = email
                            ? email.substring(0, email.indexOf("@"))
                            : "";

                          setFieldValue("userName", username);
                          handleBlur(e);
                        }}
                        placeholder={languageTranslation("EMAIL")}
                        className={
                          errors.email && touched.email
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.email && touched.email && (
                        <div className="required-error">{errors.email}</div>
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
                      {languageTranslation("USERNAME")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"userName"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={userName}
                        placeholder={languageTranslation("USERNAME")}
                        className={
                          errors.userName && touched.userName
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.userName && touched.userName && (
                        <div className="required-error">{errors.userName}</div>
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
                      {languageTranslation("DEFAULT_QAULIFICATION")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Select
                        placeholder={languageTranslation(
                          "DEFAULT_QAULIFICATION"
                        )}
                        value={state ? state : undefined}
                        onChange={(value: any) => handleSelect(value, "state")}
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
                      {languageTranslation("WEBSITE")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"website"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={website}
                        placeholder={languageTranslation("WEBSITE")}
                        className={
                          errors.website && touched.website
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.website && touched.website && (
                        <div className="required-error">{errors.website}</div>
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
                      {languageTranslation("LIKED_TO")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Select
                        placeholder={languageTranslation("LIKED_TO")}
                        value={state ? state : undefined}
                        onChange={(value: any) => handleSelect(value, "state")}
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
                      {languageTranslation("REMARKS")} (
                      {languageTranslation("FOR_CANSTITUTION_VIEWBLE")})
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="textarea"
                        name={"remarksViewable"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={remarksViewable}
                        placeholder={languageTranslation("REMARKS")}
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
      <Col lg={"4"}>
        <div className="common-col">
          <CommissionFormData {...props} handleSelect={handleSelect} />
          <InvoiceFormData {...props} handleSelect={handleSelect} />
          <QuallificationAttribute {...props} handleSelect={handleSelect} />
        </div>
      </Col>
      <RemarkFormData {...props} />
    </Row>
  );
};
export default AddCareInstitution;
