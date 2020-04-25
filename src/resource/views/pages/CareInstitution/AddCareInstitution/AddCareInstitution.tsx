import React, { useEffect, FunctionComponent, useState } from "react";
import { Button, FormGroup, Label, Input, Col, Row } from "reactstrap";
import Select from "react-select";
import { FormikProps } from "formik";
import { languageTranslation, logger } from "../../../../../helpers";
import { Salutation, Gender } from "../../../../../config";
import {
  ICareInstitutionFormValues,
  ICountries,
  IReactSelectInterface,
  ICountry,
  IStates,
  IState,
  IRegion,
  IAttributeOptions,
} from "../../../../../interfaces";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
// import CareInstitutionContact from "../PersonalInfo/CareInstitutionContact";
import {
  CountryQueries,
  CareInstitutionQueries,
} from "../../../../../graphql/queries";
import CommissionFormData from "../PersonalInfo/PersonalInfoForm/CommissionFormData";
import InvoiceFormData from "../PersonalInfo/PersonalInfoForm/InvoiceFormData";
import QuallificationAttribute from "../PersonalInfo/PersonalInfoForm/QuallificationAttribute";
import RemarkFormData from "../PersonalInfo/PersonalInfoForm/RemarkFormData";
import { RegionQueries } from "../../../../../graphql/queries/Region";
import "../careinstitution.scss";
import CustomOption from "../../../components/CustomOptions";

const [, GET_REGIONS] = RegionQueries;
const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;
const [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST,
] = CareInstitutionQueries;

const AddCareInstitution: FunctionComponent<
  FormikProps<ICareInstitutionFormValues> & {
    qualificationList: IReactSelectInterface[] | undefined;
    setRemarksDetail: any;
    remarksDetail: any;
    careInstitutionAttrOpt: IAttributeOptions[] | undefined;
  }
> = (
  props: FormikProps<ICareInstitutionFormValues> & {
    qualificationList: IReactSelectInterface[] | undefined;
    setRemarksDetail: any;
    remarksDetail: any;
    careInstitutionAttrOpt: IAttributeOptions[] | undefined;
  }
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
      setFieldValue("state", undefined);
      getStatesByCountry({
        variables: { countryid: selectOption ? selectOption.value : "" }, // default code is for germany
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
        value: id,
      })
    );
  }
  const [fetchCareInstitutionList, { data: careInstituition }] = useLazyQuery<
    any
  >(GET_CARE_INSTITUTION_LIST);

  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 25,
        sortBy: 3,
      },
    });
    fetchCareInstitutionList({
      variables: {
        searchBy: null,
        sortBy: 3,
        limit: 200,
        page: 1,
        isActive: "",
      },
    });
  }, []);
  let CareInstitutionList: Object[] = [];
  if (careInstituition && careInstituition.getCareInstitutions) {
    const { getCareInstitutions } = careInstituition;
    const { careInstitutionData } = getCareInstitutions;
    careInstitutionData.map((data: any, index: any) => {
      CareInstitutionList.push({
        label: `${data.lastName}${" "}${data.firstName}`,
        value: data.id,
      });
      return true;
    });
  }

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
      createdAt,
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    submitCount,
    setRemarksDetail,
    remarksDetail,
  } = props;

  const scrollParentToChild: any = () => {
    let parent = document.getElementById("care-profile");
    let child = document.getElementsByClassName("error")[0];
    // Where is the parent on page
    if (parent) {
      let parentRect = parent.getBoundingClientRect();

      // Where is the child
      let childRect: any = child ? child.getBoundingClientRect() : {};
      // scroll by offset relative to parent
      parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top - 55;
    }
  };

  //After submission of form
  useEffect(() => {
    setTimeout(() => {
      scrollParentToChild();
    }, 200);
  }, [submitCount]);
  return (
    <Row>
      <div className="d-none d-md-block" id={"caregiver-add-btn"}>
        <Button
          disabled={isSubmitting}
          // id={"caregiver-add-btn"}
          onClick={handleSubmit}
          color={"primary"}
          className={"save-button"}
        >
          {isSubmitting ? <i className="fa fa-spinner fa-spin mr-2" /> : ""}
          {languageTranslation("SAVE_BUTTON")}
        </Button>
      </div>
      <Col lg={"4"} md={"12"} sm={"12"}>
        <div
          className="form-card custom-careinstitution-height custom-scrollbar"
          id={"care-profile"}
        >
          <Row>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("REGION")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className="text-capitalize">
                      <Select
                        placeholder={languageTranslation("REGION", "STATE")}
                        value={regionId ? regionId : undefined}
                        onChange={(value: any) =>
                          handleSelect(value, "regionId")
                        }
                        options={regionOptions}
                        classNamePrefix="custom-inner-reactselect"
                        className={"custom-reactselect"}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("GENDER")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <Row className="custom-col inner-no-padding-col">
                      <Col xs={"12"} sm={"5"} md={"5"} lg={"5"}>
                        <div>
                          <Select
                            placeholder={languageTranslation("GENDER")}
                            value={gender && gender.value ? gender : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, "gender")
                            }
                            options={Gender}
                            classNamePrefix="custom-inner-reactselect"
                            className={"custom-reactselect"}
                          />
                        </div>
                      </Col>
                      <Col xs={"12"} sm={"7"} md={"7"} lg={"7"}>
                        <FormGroup>
                          <Row className="custom-col inner-no-padding-col align-items-center">
                            <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                              <Label className="form-label col-form-label inner-label">
                                {languageTranslation("TITLE")}
                              </Label>
                            </Col>
                            <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                              <div>
                                <Input
                                  type="text"
                                  name={"title"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={title}
                                  placeholder={languageTranslation("TITLE")}
                                  className="width-common"
                                  maxLength={30}
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
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("SALUTATION")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div>
                      <Select
                        placeholder={languageTranslation("SALUTATION")}
                        value={
                          salutation && salutation.value
                            ? salutation
                            : undefined
                        }
                        onChange={(value: any) =>
                          handleSelect(value, "salutation")
                        }
                        options={Salutation}
                        classNamePrefix="custom-inner-reactselect"
                        className={"custom-reactselect"}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("FIRST_NAME")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"firstName"}
                        onChange={handleChange}
                        maxLength={250}
                        onBlur={handleBlur}
                        value={firstName}
                        placeholder={languageTranslation("FIRST_NAME")}
                        className={
                          errors.firstName && touched.firstName
                            ? "text-input error text-capitalize"
                            : "text-input text-capitalize"
                        }
                      />
                      {errors.firstName && touched.firstName && (
                        <div className="required-tooltip">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("SURNAME")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"lastName"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={lastName}
                        maxLength={250}
                        placeholder={languageTranslation("SURNAME")}
                        className={
                          errors.lastName && touched.lastName
                            ? "text-input error text-capitalize"
                            : "text-input text-capitalize"
                        }
                      />
                      {errors.lastName && touched.lastName && (
                        <div className="required-tooltip">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("SHORT_NAME")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div>
                      <Input
                        type="text"
                        name={"shortName"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={shortName}
                        placeholder={languageTranslation("SHORT_NAME")}
                        className="width-common"
                        maxLength={50}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("COMPANY_NAME")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div>
                      <Input
                        type="text"
                        name={"companyName"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={companyName}
                        placeholder={languageTranslation("COMPANY_NAME")}
                        className={
                          errors.companyName && touched.companyName
                            ? "text-input error text-capitalize"
                            : "text-input text-capitalize"
                        }
                        maxLength={50}
                      />
                      {errors.companyName && touched.companyName && (
                        <div className="required-tooltip">
                          {errors.companyName}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("ANONYMOUS_NAME")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div>
                      <Input
                        type="text"
                        name={"anonymousName"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={anonymousName}
                        placeholder={languageTranslation("ANONYMOUS_NAME")}
                        className="width-common"
                        maxLength={30}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("ANONYMOUS_NAME2")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div>
                      <Input
                        type="text"
                        name={"anonymousName2"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={anonymousName2}
                        placeholder={languageTranslation("ANONYMOUS_NAME2")}
                        className="width-common"
                        maxLength={30}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label ">
                      {languageTranslation("STREET")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div>
                      <Input
                        type="text"
                        name={"street"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={street}
                        placeholder={languageTranslation("STREET")}
                        className=" width-common"
                        maxLength={50}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label ">
                      {languageTranslation("ZIP")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div>
                      <Input
                        type="text"
                        name={"zipCode"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={zipCode}
                        placeholder={languageTranslation("ZIP")}
                        className=" width-common"
                        maxLength={15}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label ">
                      {languageTranslation("CITY")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div>
                      <Input
                        type="text"
                        name={"city"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={city}
                        placeholder={languageTranslation("CITY")}
                        className=" width-common"
                        maxLength={30}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label ">
                      {languageTranslation("COUNTRY")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className={"required-input"}>
                      <Select
                        placeholder={languageTranslation("COUNTRY")}
                        options={countriesOpt}
                        isClearable={true}
                        value={country && country.value ? country : undefined}
                        onChange={(value: any) =>
                          handleSelect(value, "country")
                        }
                        classNamePrefix="custom-inner-reactselect"
                        onBlur={handleBlur}
                        className={
                          touched.countryId && errors.country && !country
                            ? "error custom-reactselect"
                            : "custom-reactselect"
                        }
                      />
                      {touched.countryId && errors.country && !country && (
                        <div className="required-tooltip left">
                          {errors.country}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label ">
                      {languageTranslation("STATE")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className={"required-input"}>
                      <Select
                        placeholder={languageTranslation("STATE")}
                        options={statesOpt}
                        isClearable={true}
                        value={state && state.value !== "" ? state : null}
                        onChange={(value: any) => handleSelect(value, "state")}
                        noOptionsMessage={() => {
                          return country && country.value
                            ? "No options"
                            : "Select a country first";
                        }}
                        classNamePrefix="custom-inner-reactselect"
                        onBlur={handleBlur}
                        className={
                          country && errors.state
                            ? "error custom-reactselect"
                            : "custom-reactselect"
                        }
                      />
                      {country && errors.state ? (
                        <div className="required-tooltip left">
                          {errors.state}
                        </div>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label ">
                      {languageTranslation("PHONE")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"phoneNumber"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={phoneNumber}
                        placeholder={languageTranslation("PHONE")}
                        // className="width-common"`
                        className={
                          errors.phoneNumber && touched.phoneNumber
                            ? "width-common text-input error"
                            : "width-common text-input"
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

            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("FAX")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"fax"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={fax}
                        placeholder={languageTranslation("FAX")}
                        maxLength={30}
                        className={
                          errors.fax && touched.fax
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.fax && touched.fax && (
                        <div className="required-tooltip">{errors.fax}</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("MOBILE")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className="required-input">
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
                        <div className="required-tooltip">
                          {errors.mobileNumber}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("EMAIL")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className="required-input">
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
                        maxLength={250}
                        placeholder={languageTranslation("EMAIL")}
                        className={
                          errors.email && touched.email
                            ? "text-input error"
                            : "text-input"
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
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("USERNAME")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"userName"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={userName}
                        placeholder={languageTranslation("USERNAME")}
                        maxLength={250}
                        className={
                          errors.userName && touched.userName
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.userName && !userName && touched.userName && (
                        <div className="required-tooltip">
                          {errors.userName}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("WEBSITE")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div className="required-input">
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
                        <div className="required-tooltip">{errors.website}</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("LINKED_TO")}
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <div>
                      <Select
                        placeholder={languageTranslation("LINKED_TO")}
                        options={CareInstitutionList}
                        value={linkedTo}
                        onChange={(value: any) =>
                          handleSelect(value, "linkedTo")
                        }
                        classNamePrefix="custom-inner-reactselect"
                        className={"custom-reactselect"}
                        components={{ Option: CustomOption }}
                        isOptionDisabled={(option: any) =>
                          option.value === languageTranslation("ID")
                        }
                      />
                      {/* 
                      <Select
                        placeholder={languageTranslation('LINKED_TO')}
                        onChange={(value: any) =>
                          handleSelect(value, 'linkedTo')
                        }
                        value={linkedTo}
                        options={CareInstitutionList}
                        classNamePrefix='custom-inner-reactselect'
                        className={'custom-reactselect'}
                      /> */}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
              <FormGroup>
                <Row>
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <Label className="form-label col-form-label">
                      {languageTranslation("REMARKS")} (
                      {languageTranslation("FOR_CANSTITUTION_VIEWBLE")})
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
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
                        maxLength={255}
                      />
                      <div className="text-count">
                        {remarksViewable && remarksViewable.length
                          ? remarksViewable.length
                          : 0}
                        /255
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Col>
      <Col lg={"4"} className="px-lg-0">
        <div className="common-col custom-careinstitution-height custom-scrollbar">
          <CommissionFormData {...props} handleSelect={handleSelect} />
          <InvoiceFormData {...props} handleSelect={handleSelect} />
          <QuallificationAttribute
            {...props}
            handleSelect={handleSelect}
            qualificationList={props.qualificationList}
            careInstitutionAttrOpt={props.careInstitutionAttrOpt}
          />
        </div>
      </Col>
      <Col lg={4}>
        <div className="custom-careinstitution-height custom-scrollbar">
          <RemarkFormData
            {...props}
            setRemarksDetail={setRemarksDetail}
            remarksDetail={remarksDetail}
          />
        </div>
      </Col>
      <Col lg={"12"}>
        <div className="d-block d-md-none text-right">
          <Button
            disabled={isSubmitting}
            // id={"caregiver-add-btn"}
            onClick={handleSubmit}
            color={"primary"}
            className={"submit-common-btn mb-3"}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin mr-2" /> : ""}
            {languageTranslation("SAVE_BUTTON")}
          </Button>
        </div>
      </Col>
    </Row>
  );
};
export default AddCareInstitution;
