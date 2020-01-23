import React from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { languageTranslation, logger } from "../../../helpers";
import Select from "react-select";
import {
  State,
  Country,
  Gender,
  Salutation,
  ContactType
} from "../../../config";
import { FormikProps, Field, Form } from "formik";
import {
  ICareInstitutionContact,
  IReactSelectInterface,
  ICountries,
  IStates,
  ICountry,
  IState
} from "../../../interfaces";
import { CountryQueries } from "../../../queries";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const CareInstitutionConstForm: any = (
  props: FormikProps<ICareInstitutionContact>
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

  const {
    values: {
      email,
      firstName,
      lastName,
      userName,
      phoneNumber,
      phoneNumber2,
      mobileNumber,
      salutation,
      country,
      remark,
      street,
      state,
      city,
      zipCode,
      title,
      gender,
      contactType,
      faxNumber,
      id,
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
    <Col lg={12} className={"form-section"}>
      <div className="d-flex align-items-center justify-content-between my-3">
        <Nav tabs className="contact-tabs">
          <NavItem>
            <NavLink className="active">New Contact</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>New Contact 2</NavLink>
          </NavItem>
        </Nav>
        <Button onClick={handleSubmit} color={"primary"} className={"btn-save"}>
          {languageTranslation("SAVE_BUTTON")}
        </Button>
      </div>
      <div className="form-flex-section mt-3 form-card minheight-auto">
        {/* <h5 className="main-title">Add New contact </h5> */}

        <div className="form-flex-block">
          <div className="form-flex-tile">
            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        {languageTranslation("ID")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          disable
                          disabled
                          placeholder={languageTranslation("ID")}
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
                        {languageTranslation("GENDER")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <Row className="custom-col inner-no-padding-col">
                        <Col sm="4">
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
                        <Col sm="8">
                          <FormGroup>
                            <Row className="custom-col inner-no-padding-col">
                              <Col sm="6">
                                <Label className="form-label col-form-label inner-label">
                                  {languageTranslation("TITLE")}
                                </Label>
                              </Col>
                              <Col sm="6">
                                <div>
                                  <Input
                                    type="text"
                                    name={"lastName"}
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
                          placeholder={languageTranslation("FIRST_NAME")}
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
                        {languageTranslation("SURNAME")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"lastName"}
                          placeholder={languageTranslation("SURNAME")}
                          onChange={handleChange}
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
            </Row>
          </div>
          <div className="form-flex-tile">
            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        {languageTranslation("CONTACT_TYPE")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Select
                          placeholder={languageTranslation("CONTACT_TYPE")}
                          value={contactType ? contactType : undefined}
                          onChange={(value: any) =>
                            handleSelect(value, "contactType")
                          }
                          options={ContactType}
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
            </Row>
          </div>
          <div className="form-flex-tile">
            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="4">
                      <Label className="form-label col-form-label">
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
                        {languageTranslation("PHONE2")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"phoneNumber2"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={phoneNumber2}
                          placeholder={languageTranslation("PHONE2")}
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
                          name={"faxNumber"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={faxNumber}
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
                          onBlur={handleBlur}
                          value={email}
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
            </Row>
          </div>

          <div className="form-flex-tile">
            <div className="d-flex align-items-center justify-content-between">
              <div>{languageTranslation("ADD_REMARKS")} </div>
              <div className="edit-remark mb-1">
                <i className="icon-note" />
              </div>
            </div>

            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="12">
                      <div>
                        <Input
                          type="textarea"
                          name={"remaks"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={remark}
                          placeholder={languageTranslation("REMARKS")}
                          className="textarea-care-institution"
                          rows="4"
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="form-flex-tile">
            <div className="common-list-wrap">
              <div className="common-list-header d-flex align-items-cente justify-content-between">
                <div className="common-list-title align-middle">
                  {" "}
                  {languageTranslation("ATTRIBUTES")}
                </div>
                <div className=" align-middle toggle-icon">
                  <i className="fa fa-angle-down"></i>
                </div>
              </div>
              <div className="common-list-body">
                <ul className="common-list list-unstyled">
                  <li>Dialysis </li>
                  <li>Home Management</li>
                  <li>Nurse/carer</li>
                </ul>
              </div>
              <div className="common-list-footer form-section ">
                <FormGroup className="mb-0">
                  <Select
                    placeholder={languageTranslation("REGION", "STATE")}
                    options={State}
                    menuPlacement={"top"}
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};
export default CareInstitutionConstForm;