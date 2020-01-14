import React, { FunctionComponent } from "react";
import { FormGroup, Label, Input, Col, Row, Form } from "reactstrap";
import Select from "react-select";
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { State, Region, Salutation, Country, Gender } from "../../../../config";
import { languageTranslation, logger } from "../../../../helpers";
import { ICareInstitutionFormValues, IReactSelectInterface, ICountries, IStates, ICountry, IState } from "../../../../interfaces";
import { CountryQueries } from "../../../../queries";
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import CommissionFormData from "./CommissionFormData";
import InvoiceFormData from "./InvoiceFormData";
import QuallificationAttribute from "./QuallificationAttribute";
import RemarkFormData from "./RemarkFormData";

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;


const PersonalInformationForm: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
>> = (props: FormikProps<ICareInstitutionFormValues>) => {

  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY,
  );

  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({ label: name, value: id }),
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({ label: name, value: id }),
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
      salutaion,
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
      createdAt
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = props;
  const CreatedAt: Date | undefined | any = createdAt ? createdAt : new Date()
  const RegYear: Date | undefined = CreatedAt.getFullYear();

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, 'value');
    setFieldValue(name, selectOption);
    if (name === 'country') {
      getStatesByCountry({
        variables: { countryid: selectOption ? selectOption.value : '82' }, // default code is for germany
      });
      logger(statesData, 'sdsdsdsd');
    }
  };

  return (
    <Row className=" ">
      <Col lg={"4"}>
        <div className="form-card h-100">
          <Row>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("USER_ID")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <Row className="custom-col inner-no-padding-col">
                      <Col sm="4">
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
                      <Col sm="8">
                        <FormGroup>
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="6">
                              <Label className="form-label col-form-label inner-label">
                                {languageTranslation("REG_SINCE")}
                              </Label>
                            </Col>
                            <Col sm="6">
                              <div>
                                <Input
                                  type="text"
                                  name={"regSince"}
                                  disabled
                                  value={RegYear}
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
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("REGION")}
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Select
                        placeholder={languageTranslation("REGION", "STATE")}
                        options={State}
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
                      <span className="required">*</span>
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
                              handleSelect(value, 'gender')
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
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Select
                        placeholder={languageTranslation("SALUTATION")}
                        value={salutaion ? salutaion : undefined}
                        onChange={(value: any) =>
                          handleSelect(value, 'salutaion')
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
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Select
                        placeholder={languageTranslation("COUNTRY")}
                        options={countriesOpt}
                        value={country ? country : undefined}
                        onChange={(value: any) =>
                          handleSelect(value, 'country')
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
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Select
                        placeholder={languageTranslation("STATE")}
                        options={statesOpt}
                        value={state ? state : undefined}
                        onChange={(value: any) =>
                          handleSelect(value, 'state')
                        }
                        noOptionsMessage={() => {
                          return 'Select a country first';
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
                        onChange={(value: any) =>
                          handleSelect(value, 'state')
                        }
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
                      {languageTranslation("LIKED_TO")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Select
                        placeholder={languageTranslation("LIKED_TO")}
                        value={state ? state : undefined}
                        onChange={(value: any) =>
                          handleSelect(value, 'state')
                        }
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
                        name={"additionalText "}
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
  )
}

export default PersonalInformationForm