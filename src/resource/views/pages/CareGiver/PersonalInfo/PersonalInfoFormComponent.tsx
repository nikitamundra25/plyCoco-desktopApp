import React, { useEffect } from "react";
import Select from "react-select";
import { Label, Col, Row, CustomInput, FormGroup, Input } from "reactstrap";
import { FormikProps, Field } from "formik";
import MaskedInput from "react-text-mask";
import {
  LegalForm,
  Gender,
  DateMask,
  IBANRegex,
  regSinceDate,
} from "../../../../../config";
import {
  IReactSelectInterface,
  IStates,
  IState,
  IRegion,
  ICareGiverValues,
} from "../../../../../interfaces";
import { FormikTextField } from "../../../components/forms/FormikFields";
import { languageTranslation, logger } from "../../../../../helpers";
import { useLazyQuery } from "@apollo/react-hooks";
import { CountryQueries } from "../../../../../graphql/queries";
import { useLocation } from "react-router";
import { RegionQueries } from "../../../../../graphql/queries/Region";
import moment from "moment";
import CustomOption from "../../../components/CustomOptions";
import CaregiverCustomAsyncList from "../../../components/DropdownList/CareGiverCustomAsyncSelect";

const [, GET_REGIONS] = RegionQueries;
const [, GET_STATES_BY_COUNTRY] = CountryQueries;

const PersonalInfoFormComponent: any = (
  props: FormikProps<ICareGiverValues> & {
    CareInstitutionList: IReactSelectInterface[] | undefined;
    countriesOpt: IReactSelectInterface[] | undefined;
    userSelectedCountry: any;
  }
) => {
  const { countriesOpt, userSelectedCountry } = props;
  // To fetch the states of selected contry & don't want to query on initial load
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );
  const statesOpt: IReactSelectInterface[] | undefined = [];

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

  let { pathname } = useLocation();
  let PathArray: string[] = pathname.split("/");

  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({
        label: name,
        value: id,
      })
    );
  }

  useEffect(() => {
    if (userSelectedCountry && userSelectedCountry.value) {
      getStatesByCountry({
        variables: { countryid: userSelectedCountry.value },
      });
    }
  }, [userSelectedCountry]);

  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
    if (name === "country") {
      setFieldValue("state", undefined);
      getStatesByCountry({
        variables: { countryid: selectOption ? selectOption.value : "" }, // default code is for germany
      });
    }
  };

  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 25,
        sortBy: 3,
      },
    });
  }, []);

  const {
    values: {
      dateOfBirth,
      id,
      email,
      createdAt,
      regionId,
      gender,
      salutation,
      country,
      driverLicenseNumber,
      IBAN,
      state,
      employed,
      driversLicense,
      legalForm,
      vehicleAvailable,
      comments,
      belongTo,
    },
    submitCount,
    handleChange,
    handleBlur,
    errors,
    setFieldValue,
    touched,
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
    <div
      className="form-card custom-caregiver-height custom-scrollbar"
      id={"care-profile"}
    >
      <Row className={"caregiver-form"}>
        {PathArray && PathArray[2] !== "add" ? (
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
                      <div className="required-input">
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
        ) : null}
        <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
          <FormGroup>
            <Row className="align-items-center">
              <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className="form-label col-form-label">{"Region"}</Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div className="field-class text-capitalize">
                  <Select
                    placeholder={languageTranslation("REGION", "STATE")}
                    onChange={(value: any) => handleSelect(value, "regionId")}
                    value={regionId ? regionId : undefined}
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
                <Row className="custom-col inner-no-padding-col ">
                  <Col xs={"12"} sm={"5"} md={"5"} lg={"5"}>
                    <div>
                      <Select
                        placeholder={languageTranslation("GENDER")}
                        options={Gender}
                        value={gender && gender.value ? gender : null}
                        onChange={(value: any) => handleSelect(value, "gender")}
                        classNamePrefix="custom-inner-reactselect"
                        className={"custom-reactselect"}
                      />
                    </div>
                  </Col>
                  <Col xs={"12"} sm={"7"} md={"7"} lg={"7"}>
                    <FormGroup>
                      <Row className="custom-col inner-no-padding-col  align-items-center">
                        <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                          <Label className="form-label col-form-label inner-label">
                            {languageTranslation("TITLE")}
                          </Label>
                        </Col>
                        <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                          <div>
                            <Field
                              component={FormikTextField}
                              name={"title"}
                              placeholder={languageTranslation("TITLE")}
                              className="width-common"
                              maxLength={50}
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
                  <Field
                    component={FormikTextField}
                    name={"salutation"}
                    placeholder={languageTranslation("SALUTATION")}
                    className="width-common"
                    maxLength={250}
                  />
                </div>
                {/* <Button  className="alfabate-btn btn">N</Button> */}
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
                  <Field
                    component={FormikTextField}
                    name={"firstName"}
                    placeholder={languageTranslation("FIRST_NAME")}
                    className="width-common"
                    maxLength={250}
                  />
                </div>
                {/* <Button  className="alfabate-btn btn">N</Button> */}
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
                  <Field
                    component={FormikTextField}
                    name={"lastName"}
                    placeholder={languageTranslation("SURNAME")}
                    className="width-common text-capitalize"
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
                  {languageTranslation("BIRTHDAY_DATE")}
                  <span className="required">*</span>
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <Row className="custom-col inner-no-padding-col">
                  <Col xs={"12"} sm={"7"} md={"7"} lg={"7"}>
                    <Field name="dateOfBirth">
                      {({ field }: any) => (
                        <div className={"required-input"}>
                          <MaskedInput
                            {...field}
                            placeholder={languageTranslation(
                              "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                            )}
                            mask={DateMask}
                            className={
                              errors.dateOfBirth && touched.dateOfBirth
                                ? "error form-control"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={dateOfBirth}
                          />
                          {errors.dateOfBirth && touched.dateOfBirth && (
                            <div className="required-tooltip left">
                              {errors.dateOfBirth}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </Col>
                  <Col xs={"12"} sm={"5"} md={"5"} lg={"5"}>
                    <FormGroup>
                      <Row className="custom-col inner-no-padding-col align-items-center ">
                        <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                          <Label className="form-label col-form-label inner-label">
                            {languageTranslation("AGE")}
                          </Label>
                        </Col>
                        <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                          <div>
                            <Field
                              component={FormikTextField}
                              name={"age"}
                              placeholder={languageTranslation("AGE")}
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
                <Label className="form-label col-form-label ">
                  {languageTranslation("STREET_AND_HOUSE")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"street"}
                    placeholder="Street and House Number"
                    className=" width-common"
                    maxLength={100}
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
                  {languageTranslation("EMPLOYEE_ZIP_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"postalCode"}
                    placeholder="Postal Code"
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
                  <Field
                    component={FormikTextField}
                    name={"city"}
                    placeholder="City"
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
                    onBlur={handleBlur}
                    value={country && country.value ? country : undefined}
                    onChange={(value: any) => handleSelect(value, "country")}
                    classNamePrefix="custom-inner-reactselect"
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
                <Label className="form-label col-form-label">
                  {languageTranslation("STATE")}
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
                    <div className="required-tooltip left">{errors.state}</div>
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
                <Label className="form-label col-form-label">
                  {languageTranslation("PHONE_NUMBER")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"phoneNumber"}
                    placeholder=" Phone"
                    className="width-common"
                  />
                </div>
                {/* <Button  className="alfabate-btn btn">M</Button> */}
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
                  <Field
                    component={FormikTextField}
                    name={"fax"}
                    placeholder=" Fax"
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
                  {languageTranslation("MOBILE_NUMBER")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"mobileNumber"}
                    placeholder="Mobile Number"
                    className="width-common"
                  />
                </div>
                {/* <Button  className="alfabate-btn btn">T</Button> */}
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
                  <Field
                    component={FormikTextField}
                    name={"email"}
                    placeholder=" Email"
                    className="width-common"
                    maxLength={250}
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
                  {languageTranslation("CAREGIVER_TAX_NUMBER_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"taxNumber"}
                    placeholder="Tax Number"
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
                  {languageTranslation("BANK")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"bankName"}
                    placeholder="Bank"
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
                  {languageTranslation("BANK_IBAN_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div className="required-input">
                  <Field name="payrollIBAN">
                    {({ field }: any) => (
                      <div>
                        <MaskedInput
                          {...field}
                          className={"form-control"}
                          value={IBAN}
                          placeholder={languageTranslation(
                            "BANK_IBAN_PLACEHOLDER"
                          )}
                          name={"IBAN"}
                          mask={IBANRegex}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.IBAN && touched.IBAN && (
                          <div className="required-tooltip">{errors.IBAN}</div>
                        )}
                      </div>
                    )}
                  </Field>
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
                  {languageTranslation("CAREGIVER_USERNAME_LABEL")}
                  <span className="required">*</span>
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div className="required-input">
                  <Field
                    component={FormikTextField}
                    name={"userName"}
                    placeholder="Username"
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
                  {languageTranslation("BELONGS_TO")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  {/* <Select
                    placeholder='Belongs to'
                    options={props.CareInstitutionList}
                    value={belongTo && belongTo.value ? belongTo : undefined}
                    onChange={(value: any) => handleSelect(value, 'belongTo')}
                    classNamePrefix='custom-inner-reactselect'
                    className={'custom-reactselect'}
                    components={{ Option: CustomOption }}
                    isOptionDisabled={option =>
                      option.value === languageTranslation('ID')
                    }
                  /> */}
                  <CaregiverCustomAsyncList
                    placeholderLabel={'Belongs to'}
                    onChange={(value: any) =>
                      handleSelect(value, "belongTo")
                    }
                    value={
                      belongTo && belongTo.value !== ""
                        ? belongTo
                        : null
                    }
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
                  {languageTranslation("CAREGIVER_DRIVER_LICENSE_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div className="custom-radio-block">
                  <FormGroup check inline>
                    <CustomInput
                      type="radio"
                      id="driversLicense-1"
                      name="driversLicense"
                      label="Yes"
                      checked={driversLicense === "yes" ? true : false}
                      value={"yes"}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup check inline>
                    <CustomInput
                      type="radio"
                      id="driversLicense-2"
                      name="driversLicense"
                      label="No"
                      checked={driversLicense === "no" ? true : false}
                      value={"no"}
                      onChange={handleChange}
                    />
                  </FormGroup>
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
                  {languageTranslation("CAREGIVER_DRIVER_LICENSE_NUMBER_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"driverLicenseNumber"}
                    placeholder="Driver's License Number"
                    className="width-common"
                    value={driverLicenseNumber}
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
                  {languageTranslation("CAREGIVER_OWN_VEHICLE_AVAILABLE_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div className="custom-radio-block">
                  <FormGroup check inline>
                    <CustomInput
                      type="radio"
                      id="vehicleAvailable-1"
                      name="vehicleAvailable"
                      label="Yes"
                      checked={vehicleAvailable === "yes" ? true : false}
                      value={"yes"}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup check inline>
                    <CustomInput
                      type="radio"
                      id="vehicleAvailable-2"
                      name="vehicleAvailable"
                      label="No"
                      checked={vehicleAvailable === "no" ? true : false}
                      value={"no"}
                      onChange={handleChange}
                    />
                  </FormGroup>
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
                  {languageTranslation("CAREGIVER_LEGAL_FORM_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Select
                    placeholder="Legal Form"
                    options={LegalForm}
                    value={legalForm ? legalForm : undefined}
                    onChange={(value: any) => handleSelect(value, "legalForm")}
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
                  {languageTranslation("CAREGIVER_COMPANY_NAME_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"companyName"}
                    placeholder="Company Name"
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
                  {languageTranslation("CAREGIVER_REGISTER_COURT_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"registerCourt"}
                    placeholder="Register Court"
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
                  {languageTranslation("CAREGIVER_REGISTRATION_NUMBER_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"registrationNumber"}
                    placeholder="Registration Number"
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
                  {languageTranslation("CAREGIVER_EXECUTIVE_DIRECTOR_LABEL")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Field
                    component={FormikTextField}
                    name={"executiveDirector"}
                    placeholder="Executive Director"
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
                  {languageTranslation("EMPLOYED")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  {/*<div className=" checkbox-custom mb-0">
                     <Field
                      component={FormikCheckbox}
                      type='checkbox'
                      name={'employed'}
                    />
                   
                  </div> */}
                  <div className=" checkbox-custom mb-0">
                    <input
                      type="checkbox"
                      id="check"
                      className=""
                      name={"employed"}
                      checked={employed}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const {
                          target: { checked },
                        } = e;
                        setFieldValue("employed", checked);
                      }}
                    />
                    <Label for="check"></Label>
                  </div>
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
                  {languageTranslation("COMMENTS_INTERNALLY")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Input
                    type="textarea"
                    name={"comments"}
                    placeholder="Comments (Internally)"
                    className="textarea-custom"
                    rows="4"
                    value={comments ? comments : undefined}
                    onChange={handleChange}
                    maxLength={255}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfoFormComponent;
