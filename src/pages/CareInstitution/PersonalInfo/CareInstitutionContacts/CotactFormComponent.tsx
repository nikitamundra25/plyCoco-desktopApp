import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import { languageTranslation, logger } from '../../../../helpers';
import Select from 'react-select';
import {
  State,
  Country,
  Gender,
  Salutation,
  ContactType,
  CareInstitutionContactAttribute,
} from '../../../../config';
import { FormikProps, Field, Form } from 'formik';
import {
  ICareInstitutionContact,
  IReactSelectInterface,
  ICountries,
  IStates,
  ICountry,
  IState,
} from '../../../../interfaces';
import { CountryQueries } from '../../../../queries';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const CotactFormComponent: any = (
  props: FormikProps<ICareInstitutionContact>,
) => {
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
  const [AttOpt, setAttOpt] = useState<any>([]);

  useEffect(() => {
    const Data: any = CareInstitutionContactAttribute;
    setAttOpt(Data);
  }, []);

  let [newAttributeValue, setnewAttributeValue] = useState({});
  let [newValue, setnewValue] = useState({});

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

  const handleAttributeSelect = (value: any) => {
    setnewValue(value);
    const Data = {
      label: newValue,
      value: newValue,
    };
    setnewAttributeValue((newAttributeValue = Data));
  };

  const handleAddNewAttributevalue = () => {
    const AttributeID: any = attributeId;
    AttributeID.push(newAttributeValue);
    // const FData: any = AttOpt;
    AttOpt.push(newAttributeValue);
    setAttOpt(AttOpt);
    handleSelect(AttributeID, 'attributeId');
    setnewAttributeValue('');
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
      createdAt,
      attributeId,
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
  const ContactError: any = errors.contactType;

  return (
    <>
      <Button
        onClick={handleSubmit}
        color={'primary'}
        className={'btn-contact-save save-button'}
      >
        {id
          ? languageTranslation('UPDATE_BUTTON')
          : languageTranslation('SAVE_BUTTON')}
        {}
      </Button>
      <div className={'form-section position-relative'}>
        <div className='form-flex-section form-card minheight-auto mb-2'>
          {/* <h5 className="main-title">Add New contact </h5> */}

          <div className='form-flex-block'>
            <div className='form-flex-tile'>
              <Row>
                {id ? (
                  <Col lg={'12'}>
                    <FormGroup>
                      <Row>
                        <Col sm='4'>
                          <Label className='form-label col-form-label'>
                            {languageTranslation('ID')}
                            <span className='required'>*</span>
                          </Label>
                        </Col>
                        <Col sm='8'>
                          <div>
                            <Input
                              type='text'
                              disable
                              disabled
                              value={id}
                              placeholder={languageTranslation('ID')}
                              className='width-common'
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                ) : null}
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('GENDER')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Select
                            placeholder={languageTranslation('GENDER')}
                            value={gender ? gender : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, 'gender')
                            }
                            options={Gender}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>

                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('TITLE')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Input
                            type='text'
                            name={'title'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={title}
                            placeholder={languageTranslation('TITLE')}
                            className='width-common'
                            maxLength={30}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>

                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('SALUTATION')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Select
                            placeholder={languageTranslation('SALUTATION')}
                            value={salutation ? salutation : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, 'salutation')
                            }
                            options={Salutation}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('FIRST_NAME')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='required-input'>
                          <Input
                            type='text'
                            name={'firstName'}
                            placeholder={languageTranslation('FIRST_NAME')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={firstName}
                            className={
                              errors.firstName && touched.firstName
                                ? 'text-input error text-capitalize'
                                : 'text-input text-capitalize'
                            }
                          />
                          {errors.firstName && touched.firstName && (
                            <div className='required-tooltip'>
                              {errors.firstName}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('SURNAME')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='required-input'>
                          <Input
                            type='text'
                            name={'lastName'}
                            placeholder={languageTranslation('SURNAME')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={lastName}
                            className={
                              errors.lastName && touched.lastName
                                ? 'text-input error text-capitalize'
                                : 'text-input text-capitalize'
                            }
                          />
                          {errors.lastName && touched.lastName && (
                            <div className='required-tooltip'>
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
            <div className='form-flex-tile'>
              <Row>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('CONTACT_TYPE')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='required-input'>
                          <Select
                            placeholder={languageTranslation('CONTACT_TYPE')}
                            value={contactType ? contactType : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, 'contactType')
                            }
                            classNamePrefix='custom-inner-reactselect'
                            className={
                              errors.contactType && touched.contactType
                                ? 'error custom-reactselect'
                                : 'custom-reactselect'
                            }
                            options={ContactType}
                            menuPlacement={'auto'}
                          />
                          {errors.contactType && touched.contactType && (
                            <div className='required-tooltip'>
                              {ContactError.value}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('STREET')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Input
                            type='text'
                            name={'street'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={street}
                            placeholder={languageTranslation('STREET')}
                            className='width-common'
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('CITY')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Input
                            type='text'
                            name={'city'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={city}
                            placeholder={languageTranslation('CITY')}
                            className='width-common'
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('ZIP')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Input
                            type='text'
                            name={'zipCode'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={zipCode}
                            placeholder={languageTranslation('ZIP')}
                            className='width-common'
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('COUNTRY')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Select
                            placeholder={languageTranslation('COUNTRY')}
                            options={countriesOpt}
                            value={country ? country : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, 'country')
                            }
                            menuPlacement={'top'}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <div className='form-flex-tile'>
              <Row>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('PHONE')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='required-input'>
                          <Input
                            type='text'
                            name={'phoneNumber'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={phoneNumber}
                            placeholder={languageTranslation('PHONE')}
                            className={
                              errors.phoneNumber && touched.phoneNumber
                                ? 'text-input error text-capitalize'
                                : 'text-input text-capitalize'
                            }
                          />
                          {errors.phoneNumber && touched.phoneNumber && (
                            <div className='required-tooltip'>
                              {errors.phoneNumber}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('PHONE2')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='required-input'>
                          <Input
                            type='text'
                            name={'phoneNumber2'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={phoneNumber2}
                            placeholder={languageTranslation('PHONE2')}
                            className={
                              errors.phoneNumber2 && touched.phoneNumber2
                                ? 'text-input error text-capitalize'
                                : 'text-input text-capitalize'
                            }
                          />
                          {errors.phoneNumber2 && touched.phoneNumber2 && (
                            <div className='required-tooltip'>
                              {errors.phoneNumber2}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('FAX')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='required-input'>
                          <Input
                            type='text'
                            name={'faxNumber'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={faxNumber}
                            placeholder={languageTranslation('FAX')}
                            className={
                              errors.faxNumber && touched.faxNumber
                                ? 'text-input error'
                                : 'text-input'
                            }
                          />
                          {errors.faxNumber && touched.faxNumber && (
                            <div className='required-tooltip'>
                              {errors.faxNumber}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('MOBILE')}
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='required-input'>
                          <Input
                            type='text'
                            name={'mobileNumber'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={mobileNumber}
                            placeholder={languageTranslation('MOBILE')}
                            className={
                              errors.mobileNumber && touched.mobileNumber
                                ? 'text-input error'
                                : 'text-input'
                            }
                          />
                          {errors.mobileNumber && touched.mobileNumber && (
                            <div className='required-tooltip'>
                              {errors.mobileNumber}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('EMAIL')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='required-input'>
                          <Input
                            type='text'
                            name={'email'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={email}
                            placeholder={languageTranslation('EMAIL')}
                            className={
                              errors.email && touched.email
                                ? 'text-input error'
                                : 'text-input'
                            }
                          />
                          {errors.email && touched.email && (
                            <div className='required-tooltip'>
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <div className='form-flex-tile form-attribute-remark-section'>
              <div className='remark-div'>
                <div className='font-weight-bold mb-2'>
                  {languageTranslation('ADD_REMARKS')}{' '}
                </div>
                <Row>
                  <Col lg={'12'}>
                    <FormGroup className='mb-0'>
                      <Row>
                        <Col sm='12'>
                          <div>
                            <Input
                              type='textarea'
                              name={'remark'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={remark}
                              placeholder={languageTranslation('REMARKS')}
                              className='textarea-care-institution'
                              rows='4'
                              maxLength={250}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <div className='attribute-div'>
                <div className='common-list-wrap'>
                  <div className='common-list-header d-flex align-items-cente justify-content-between'>
                    <div className='common-list-title align-middle'>
                      {' '}
                      {languageTranslation('ATTRIBUTES')}
                    </div>
                    <div className=' align-middle toggle-icon'>
                      <i className='fa fa-angle-down'></i>
                    </div>
                  </div>
                  <div className='common-list-body custom-scrollbar'>
                    <ul className='common-list list-unstyled mb-0'>
                      {attributeId && attributeId.length
                        ? attributeId.map(
                            (data: IReactSelectInterface, index: number) => {
                              return <li key={index}>{data.label}</li>;
                            },
                          )
                        : null}
                    </ul>
                  </div>
                  <div className='common-list-footer form-section '>
                    <div>
                      <FormGroup className='mb-0'>
                        <Select
                          placeholder={
                            'Please select Attribute from the dropdown'
                          }
                          options={AttOpt}
                          value={attributeId ? attributeId : undefined}
                          onChange={(value: any) =>
                            handleSelect(value, 'attributeId')
                          }
                          onInputChange={handleAttributeSelect}
                          isMulti
                          menuPlacement={'top'}
                          className='attribute-select'
                          classNamePrefix='attribute-inner-select'
                        />

                        {/* <span
                          onClick={() => handleAddNewAttributevalue()}
                          className="add-attribute-btn d-flex align-items-center justify-content-center"
                        >
                          <i className={"fa fa-plus"} />
                        </span> */}
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CotactFormComponent;
