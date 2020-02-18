import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  UncontrolledTooltip
} from 'reactstrap';
import { languageTranslation, logger } from '../../../../../../helpers';
import Select from 'react-select';
import {
  Gender,
  Salutation,
  ContactType,
  CareInstitutionContactAttribute
} from '../../../../../../config';
import { FormikProps } from 'formik';
import {
  ICareInstitutionContact,
  IReactSelectInterface,
  ICountries,
  IStates,
  ICountry,
  IState,
  IAttributeOptions
} from '../../../../../../interfaces';
import { CountryQueries } from '../../../../../../graphql/queries';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const colourStyles = {
  option: (styles: any, { data }: any) => {
    return {
      ...styles,
      backgroundColor: data.color,
      color:
        data.color === '#6a0dad' || data.color === '#000000' ? '#fff' : '#000'
    };
  }
};

const CotactFormComponent: any = (
  props: FormikProps<ICareInstitutionContact> & any
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
  const [AttOpt, setAttOpt] = useState<any>([]);

  useEffect(() => {
    const Data: any = CareInstitutionContactAttribute;
    setAttOpt(Data);
  }, []);

  let [newAttributeValue, setnewAttributeValue] = useState();
  let [newValue, setnewValue] = useState({});

  const handleSelect = (
    selectOption: IReactSelectInterface | any,
    name: string,
    type: string
  ) => {
    logger(selectOption, 'value+12');
    if (type === 'newAttribute') {
      // To check if it's already exist on options or not
      console.log('careInstitutionAttrOpt', careInstitutionAttrOpt);

      const index: number = attributeId.findIndex(
        (attribute: IReactSelectInterface) => {
          console.log(
            'attribute.label.toLowerCase()',
            attribute.label.toLowerCase()
          );
          console.log(
            'selectOption[selectOption.length - 1].label.toLowerCase()',
            selectOption[selectOption.length - 1].label.toLowerCase() ===
              attribute.label.toLowerCase()
          );
          return (
            attribute.label.toLowerCase() ===
            selectOption[selectOption.length - 1].label.toLowerCase()
          );
        }
      );
      console.log('Index', index);
      if (index < 0) {
        console.log("In this ifffffff");
        
        setFieldValue(name, selectOption);
        props.addAttribute(
          newAttributeValue && newAttributeValue.value
            ? newAttributeValue.value
            : ''
        );
      }
    }
    if (name === 'country') {
      getStatesByCountry({
        variables: { countryid: selectOption ? selectOption.value : '82' } // default code is for germany
      });
      logger(statesData, 'sdsdsdsd');
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
      createdAt,
      attributeId
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    careInstitutionAttrOpt,
    setFieldTouched
  } = props;

  const handleAttributeSelectContarct = (
    selectOption: IReactSelectInterface,
    name: string
  ) => {
    let index: number = -1;
    if (attributeId && attributeId.length) {
      index = attributeId.findIndex(
        (attribute: IReactSelectInterface) =>
          attribute.value === selectOption.value
      );
    }

    if (index < 0) {
      const data: IReactSelectInterface[] = [];
      if (props.values && props.values.attributeId) {
        data.push(...props.values.attributeId, selectOption);
      } else {
        data.push(selectOption);
      }
      setnewAttributeValue(null);
      setFieldValue(name, data);
    }
  };

  const handleAttributeSelect = (value: any) => {
    setnewValue(value);
    const Data = {
      label: newValue,
      value: newValue
    };
    setnewAttributeValue((newAttributeValue = Data));
  };
  let contactAttribute: any[] | undefined | any = props.values.attributeId;

  const handleAddNewAttributevalue = () => {
    if (newAttributeValue && newAttributeValue.value) {
      AttOpt.push(newAttributeValue);
      setAttOpt(AttOpt);
      const addNewAttribute: any [] = []
      addNewAttribute.push(...attributeId,newAttributeValue)
      handleSelect(addNewAttribute, 'attributeId', 'newAttribute');
      setnewAttributeValue('');
    }
  };

  const handleRemoveAttribute = (index: any) => {
    let newAttributeList: IReactSelectInterface[];
    if (props.values && props.values.attributeId) {
      newAttributeList = props.values.attributeId;
      newAttributeList.splice(index, 1);
      setFieldValue('attributeId', newAttributeList);
    }
  };

  const ContactError: any = errors.contactType;
  
  return (
    <>
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        color={'primary'}
        className={'btn-contact-save save-button'}
      >
        {isSubmitting ? <i className='fa fa-spinner fa-spin loader' /> : ''}
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
                  <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                    <FormGroup>
                      <Row>
                        <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                          <Label className='form-label col-form-label'>
                            {languageTranslation('ID')}
                            <span className='required'>*</span>
                          </Label>
                        </Col>
                        <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('GENDER')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                        <div>
                          <Select
                            placeholder={languageTranslation('GENDER')}
                            value={gender ? gender : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, 'gender', '')
                            }
                            options={Gender}
                            classNamePrefix='custom-inner-reactselect'
                            className={'custom-reactselect'}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>

                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('TITLE')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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

                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('SALUTATION')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                        <div>
                          <Select
                            placeholder={languageTranslation('SALUTATION')}
                            value={salutation ? salutation : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, 'salutation', '')
                            }
                            options={Salutation}
                            classNamePrefix='custom-inner-reactselect'
                            className={'custom-reactselect'}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('FIRST_NAME')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('SURNAME')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('CONTACT_TYPE')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                        <div className='required-input'>
                          <Select
                            placeholder={languageTranslation('CONTACT_TYPE')}
                            value={contactType ? contactType : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, 'contactType', '')
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('STREET')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('CITY')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('ZIP')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                        <div>
                          <Input
                            type='text'
                            name={'zipCode'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={zipCode}
                            placeholder={languageTranslation('ZIP')}
                            className='width-common'
                            maxLength={15}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('COUNTRY')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                        <div>
                          <Select
                            placeholder={languageTranslation('COUNTRY')}
                            options={countriesOpt}
                            value={country ? country : undefined}
                            onChange={(value: any) =>
                              handleSelect(value, 'country', '')
                            }
                            menuPlacement={'top'}
                            classNamePrefix='custom-inner-reactselect'
                            className={'custom-reactselect'}
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('PHONE')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('PHONE2')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('FAX')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('MOBILE')}
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('EMAIL')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
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
                  <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
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
                            (
                              { label, color }: IAttributeOptions,
                              index: number
                            ) => {
                              return (
                                <li
                                  className={
                                    'cursor-pointer list-item text-capitalize'
                                  }
                                  key={index}
                                  style={{
                                    backgroundColor: color ? color : '',
                                    color:
                                      color === '#6a0dad' || color === '#000000'
                                        ? '#fff'
                                        : '#000'
                                  }}
                                >
                                  <>
                                    <span className='list-item-text'>
                                      {label}{' '}
                                    </span>
                                    <span
                                      id='delete0'
                                      onClick={() =>
                                        handleRemoveAttribute(index)
                                      }
                                      className='list-item-icon'
                                    >
                                      <i className='fa fa-trash'></i>
                                    </span>
                                  </>
                                </li>
                              );
                            }
                          )
                        : null}
                    </ul>
                  </div>
                  <div className='common-list-footer form-section '>
                    <div className='contact-attribute '>
                      <FormGroup className='mb-0'>
                        <Select
                          placeholder={
                            'Please select Attribute or type to add new'
                          }
                          options={careInstitutionAttrOpt}
                          value={
                            contactAttribute
                              ? {
                                  label:
                                    'Please select Attribute or type to add new',
                                  value: ''
                                }
                              : undefined
                          }
                          onChange={(value: any) => {
                            handleAttributeSelectContarct(value, 'attributeId');
                          }}
                          onInputChange={handleAttributeSelect}
                          menuPlacement={'top'}
                          className='attribute-select'
                          classNamePrefix='attribute-inner-select'
                          styles={colourStyles}
                        />
                      </FormGroup>
                      <Button
                        onClick={() => handleAddNewAttributevalue()}
                        id={'addAttribute'}
                        disabled={!newAttributeValue ? true : false}
                        className='add-attribute-btn  d-flex align-items-center justify-content-center'
                      >
                        <i className={'fa fa-plus'} />
                      </Button>
                      <UncontrolledTooltip
                        placement='top'
                        target='addAttribute'
                      >
                        Click To Add New Attribute
                      </UncontrolledTooltip>
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
