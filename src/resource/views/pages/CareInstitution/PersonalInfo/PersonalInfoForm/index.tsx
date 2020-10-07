import React, { FunctionComponent, useEffect } from "react";
import { FormGroup, Label, Input, Col, Row, Button } from "reactstrap";
import Select from "react-select";
import { FormikProps } from "formik";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import moment from "moment";
import { Gender, regSinceDate } from "../../../../../../config";
import { languageTranslation, logger } from "../../../../../../helpers";
import {
  ICareInstitutionFormValues,
  IReactSelectInterface,
  ICountries,
  IStates,
  IState,
  IRegion,
} from "../../../../../../interfaces";
import { CountryQueries } from "../../../../../../graphql/queries";
import CommissionFormData from "./CommissionFormData";
import InvoiceFormData from "./InvoiceFormData";
import QuallificationAttribute from "./QuallificationAttribute";
import RemarkFormData from "./RemarkFormData";
import { RegionQueries } from "../../../../../../graphql/queries/Region";
import CustomOption from "../../../../components/CustomOptions";

const [, GET_REGIONS] = RegionQueries;
const [ GET_STATES_BY_COUNTRY] = CountryQueries;
const PersonalInformationForm: FunctionComponent<
  FormikProps<ICareInstitutionFormValues> & any
> = (props: FormikProps<ICareInstitutionFormValues> & any) => {
  const { userSelectedCountry, countriesOpt } = props;
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS
  );
  const regionOptions: IReactSelectInterface[] | undefined = [];
  if (RegionData && RegionData.getRegions && RegionData.getRegions.regionData) {
    RegionData.getRegions.regionData.forEach(({ id, regionName }: IRegion) =>
      regionOptions.push({
        label: regionName,
        value: id,
      })
    );
  }
  // const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  // if (data && data.countries) {
  //   data.countries.forEach(({ id, name }: ICountry) =>
  //     countriesOpt.push({ label: name, value: id })
  //   );
  // }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({ label: name, value: id })
    );
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
      remarksViewable,
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    submitCount,
    CareInstitutionList,
    setFieldError,
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

  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 25,
        sortBy: 3,
      },
    });
  }, []);
  useEffect(() => {
    if (userSelectedCountry && userSelectedCountry.value) {
      getStatesByCountry({
        variables: { countryid: userSelectedCountry.value },
      });
    }
  }, [userSelectedCountry]);
  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
    if (name === "country") {
      setFieldValue("state", undefined);
      getStatesByCountry({
        variables: { countryid: selectOption ? selectOption.value : "" }, // default code is for germany
      });
    }
  };

  return (
    <Row className=" ">
      <div className="d-none d-md-block" id={"caregiver-add-btn"}>
        <Button
          color={"primary"}
          disabled={isSubmitting}
          className={"save-button"}
          onClick={handleSubmit}
        >
          {isSubmitting ? <i className="fa fa-spinner fa-spin loader" /> : ""}
          &nbsp;
          {languageTranslation("SAVE_BUTTON")}
        </Button>
      </div>
      <Col lg={"4"}>
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
                      {languageTranslation("USER_ID")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <Row className="custom-col inner-no-padding-col">
                      <Col xs={"12"} sm={"3"} md={"3"} lg={"3"}>
                        <div>
                          <Input
                            type="text"
                            name={"id"}
                            disabled
                            value={id}
                            placeholder={languageTranslation("USER_ID")}
                            className="width-common"
                          />
                        </div>
                      </Col>
                      <Col xs={"12"} sm={"9"} md={"9"} lg={"9"}>
                        <FormGroup>
                          <Row className="custom-col inner-no-padding-col align-items-center">
                            <Col xs={"12"} sm={"5"} md={"5"} lg={"5"}>
                              <Label className="form-label col-form-label inner-label">
                                {languageTranslation("REG_SINCE")}
                              </Label>
                            </Col>
                            <Col xs={"12"} sm={"7"} md={"7"} lg={"7"}>
                              <div>
                                <Input
                                  type="text"
                                  name={"regSince"}
                                  disabled
                                  value={moment(createdAt).format(regSinceDate)}
                                  placeholder="Reg Since"
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
                        options={regionOptions}
                        value={regionId ? regionId : undefined}
                        onChange={(value: any) =>
                          handleSelect(value, "regionId")
                        }
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
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"salutation"}
                        onChange={handleChange}
                        maxLength={250}
                        onBlur={handleBlur}
                        value={salutation}
                        placeholder={languageTranslation("SALUTATION")}
                        className={
                          errors.salutation && touched.salutation
                            ? "text-input error text-capitalize"
                            : "text-input text-capitalize"
                        }
                      />
                      {errors.salutation && touched.salutation && (
                        <div className="required-tooltip">
                          {errors.salutation}
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
                        maxLength={250}
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
                      {languageTranslation("ZIP")}
                      <span className="required">*</span>
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
                        maxLength={15}
                        className={"width-common " +
                          (errors.zipCode && touched.zipCode
                            ? "text-input error"
                            : "text-input")
                        }
                      />
                      {errors.zipCode && touched.zipCode && (
                        <div className="required-tooltip">{errors.zipCode}</div>
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
                        className={
                          touched.country && errors.country && !country
                            ? "error custom-reactselect"
                            : "custom-reactselect"
                        }
                      />
                      {touched.country && errors.country && !country && (
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
                      {/* <span className="required">*</span> */}
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
                    <div>
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
                    <div>
                      <Input
                        type="text"
                        name={"email"}
                        onChange={handleChange}
                        onBlur={(e: any) => {
                          //get string before a @ to set username
                          const setUsername = email
                            ? email.substring(0, email.indexOf("@"))
                            : "";
                          const username = setUsername.replace(
                            /[`~!@#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi,
                            ""
                          );
                          setFieldError("userName", " ");
                          setFieldValue("userName", username);
                          handleBlur(e);
                        }}
                        value={email}
                        placeholder={languageTranslation("EMAIL")}
                        maxLength={250}
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
                    <div>
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
                    <div>
                      <Input
                        type="text"
                        name={"website"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={website}
                        placeholder={languageTranslation("WEBSITE")}
                        maxLength={100}
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
                        value={
                          linkedTo && linkedTo.value !== "" ? linkedTo : null
                        }
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
                        placeholder={languageTranslation("REMARKS")}
                        className="textarea-custom "
                        rows="4"
                        value={remarksViewable ? remarksViewable : undefined}
                        onChange={handleChange}
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
            setRemarksDetail={props.setRemarksDetail}
            remarksDetail={props.remarksDetail}
            saveRemark={props.saveRemark}
          />
        </div>
      </Col>
      <Col lg={"12"}>
        <div className="d-block d-md-none text-right">
          <Button
            color={"primary"}
            disabled={isSubmitting}
            className={"submit-common-btn mb-3"}
            onClick={handleSubmit}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin loader" /> : ""}
            &nbsp;
            {languageTranslation("SAVE_BUTTON")}
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default PersonalInformationForm;
