import React, { Component, useState, ChangeEvent } from 'react';
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  Input,
  Col,
  Row,
} from 'reactstrap';
import Select from 'react-select';
import { State, Region, City } from '../../../config';
import { AppBreadcrumb } from '@coreui/react';
import routes from '../../../routes/routes';
import InputMask from 'react-input-mask';
import { IEmployeeFormValues } from '../../../interfaces';
import { FormikProps, Field, Form } from 'formik';
import PictureInput from './PictureInput';
import { languageTranslation } from '../../../helpers/langauageTranslation';
import { logger } from '../../../helpers';
import moment from 'moment';
const EmployeeFormComponent: any = (
  props: FormikProps<IEmployeeFormValues>,
) => {
  const [imagePreviewUrl, setUrl] = useState<string | ArrayBuffer | null>('');
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
      zip,
      joiningDate,
      bankAccountNumber,
      image,
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  logger(errors);
  logger('errors**********');
  logger(touched);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      target: { files },
    } = e;
    let reader = new FileReader();
    let file: any = '';
    if (files) {
      file = files[0];
    }
    if (file) {
      reader.onloadend = () => {
        setUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue('image', file);
    }
  };

  return (
    <div>
      <Row>
        <Col xs={'12'} lg={'12'}>
          <Card>
            <CardHeader>
              <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />
              <Button
                color={'primary'}
                className={'btn-add'}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={'12'} lg={'12'}>
                  <Form onSubmit={handleSubmit} className='form-section'>
                    <Row>
                      <Col lg={'6'}>
                        <h5 className='main-title '>
                          {languageTranslation('PERSONAL_DATA')}
                        </h5>
                        <div className='form-card'>
                          <Row>
                            <Col lg={'12'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation(
                                        'EMPLOYEE_FIRST_NAME_LABEL',
                                      )}
                                      <span className='required'>*</span>
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Input
                                        type='text'
                                        name={'firstName'}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_FIRST_NAME_PLACEHOLDER',
                                        )}
                                        onChange={handleChange}
                                        maxLength='20'
                                        onBlur={handleBlur}
                                        value={firstName}
                                        className={
                                          errors.firstName && touched.firstName
                                            ? 'text-input error'
                                            : 'text-input'
                                        }
                                      />
                                      {errors.firstName &&
                                        touched.firstName && (
                                          <div className='required-error'>
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
                                      {languageTranslation(
                                        'EMPLOYEE_SURNAME_LABEL',
                                      )}
                                      <span className='required'>*</span>
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Input
                                        type='text'
                                        name={'lastName'}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_SURNAME_PLACEHOLDER',
                                        )}
                                        onChange={handleChange}
                                        maxLength='20'
                                        onBlur={handleBlur}
                                        value={lastName}
                                        className={
                                          errors.lastName && touched.lastName
                                            ? 'text-input error'
                                            : 'text-input'
                                        }
                                      />
                                      {errors.lastName && touched.lastName && (
                                        <div className='required-error'>
                                          {errors.lastName}
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
                                    <Label className='form-label col-form-label '>
                                      {languageTranslation(
                                        'EMPLOYEE_EMAIL_ADDRESS_LABEL',
                                      )}
                                      <span className='required'>*</span>
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Input
                                        type='text'
                                        name={'email'}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_EMAIL_ADDRESS_PLACEHOLDER',
                                        )}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={email}
                                        className={
                                          errors.email && touched.email
                                            ? 'text-input error'
                                            : 'text-input'
                                        }
                                      />
                                      {errors.email && touched.email && (
                                        <div className='required-error'>
                                          {errors.email}
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
                                    <Label className='form-label col-form-label '>
                                      {languageTranslation(
                                        'EMPLOYEE_USER_NAME_LABEL',
                                      )}
                                      <span className='required'>*</span>
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Input
                                        type='text'
                                        name={'userName'}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_USER_NAME_PLACEHOLDER',
                                        )}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={userName}
                                        className={
                                          errors.userName && touched.userName
                                            ? 'text-input error'
                                            : 'text-input'
                                        }
                                      />
                                      {errors.userName && touched.userName && (
                                        <div className='required-error'>
                                          {errors.userName}
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
                                    <Label className='form-label col-form-label '>
                                      {languageTranslation(
                                        'EMPLOYEE_TELEPHONE_NUMBER_LABEL',
                                      )}
                                      <span className='required'>*</span>
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <InputMask
                                        name={'telephoneNumber'}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_TELEPHONE_NUMBER_PLACEHOLDER',
                                        )}
                                        mask='999-999-9999'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={telephoneNumber}
                                        className={`form-control ${
                                          errors.telephoneNumber &&
                                          touched.telephoneNumber
                                            ? 'text-input error'
                                            : 'text-input'
                                        }`}
                                      />
                                      {errors.telephoneNumber &&
                                        touched.telephoneNumber && (
                                          <div className='required-error'>
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

                      <Col lg={'6'}>
                        <h5 className='main-title '>
                          Bank Account Information
                        </h5>
                        <div className='form-card'>
                          <Col lg={'12'}>
                            <FormGroup>
                              <Row>
                                <Col sm='4'>
                                  <Label className='form-label col-form-label '>
                                    {languageTranslation(
                                      'EMPLOYEE_BANK_NAME_LABEL',
                                    )}
                                  </Label>
                                </Col>
                                <Col sm='8'>
                                  <div>
                                    <Input
                                      type='text'
                                      name={'bankName'}
                                      placeholder={languageTranslation(
                                        'EMPLOYEE_BANK_NAME_PLACEHOLDER',
                                      )}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={bankName}
                                      className={`width-common ${
                                        errors.bankName && touched.bankName
                                          ? 'text-input error'
                                          : 'text-input'
                                      }`}
                                    />
                                    {errors.bankName && touched.bankName && (
                                      <div className='required-error'>
                                        {errors.bankName}
                                      </div>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>
                          {/* <Col lg={"12"}>
                            <FormGroup>
                              <Row>
                                <Col sm="4">
                                  <Label className="form-label col-form-label ">
                                    {languageTranslation(
                                      "EMPLOYEE_BANK_ACCOUNT_NUMBER_LABEL"
                                    )}
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <div>
                                    <Input
                                      type="text"
                                      name={"bankAccountNumber"}
                                      placeholder={languageTranslation(
                                        "EMPLOYEE_BANK_ACCOUNT_NUMBER_PLACEHOLDER"
                                      )}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={bankAccountNumber}
                                      className={`width-common ${
                                        errors.bankName && touched.bankName
                                          ? "text-input error"
                                          : "text-input"
                                      }`}
                                    />
                                    {errors.bankName && touched.bankName && (
                                      <div className="">{errors.bankName}</div>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col> */}

                          <Col lg={'12'}>
                            <FormGroup>
                              <Row>
                                <Col sm='4'>
                                  <Label className='form-label col-form-label'>
                                    {languageTranslation(
                                      'BANK_ACCOUNT_HOLDER_NAME_LABEL',
                                    )}
                                    {/* Account Holder Name */}
                                  </Label>
                                </Col>
                                <Col sm='8'>
                                  <div>
                                    <Input
                                      type='text'
                                      name={'accountHolderName'}
                                      placeholder={languageTranslation(
                                        'BANK_ACCOUNT_HOLDER_NAME_PLACEHOLDER',
                                      )}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={accountHolderName}
                                      className={`width-common ${
                                        errors.accountHolderName &&
                                        touched.accountHolderName
                                          ? 'text-input error'
                                          : 'text-input'
                                      }`}
                                    />
                                    {errors.accountHolderName &&
                                      touched.accountHolderName && (
                                        <div className='required-error'>
                                          {errors.accountHolderName}
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
                                  <Label className='form-label col-form-label '>
                                    {languageTranslation('BANK_IBAN_LABEL')}
                                    {/* IBAN */}
                                  </Label>
                                </Col>
                                <Col sm='8'>
                                  <div>
                                    <InputMask
                                      name={'IBAN'}
                                      value={IBAN}
                                      placeholder={languageTranslation(
                                        'BANK_IBAN_PLACEHOLDER',
                                      )}
                                      // "91 1000 0000 0123 4567 89"
                                      mask={'DE 99 9999 999 999'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={`form-control ${
                                        errors.IBAN && touched.IBAN
                                          ? 'text-input error'
                                          : 'text-input'
                                      }`}
                                    />
                                    {errors.IBAN && touched.IBAN && (
                                      <div className='required-error'>
                                        {errors.IBAN}
                                      </div>
                                    )}
                                    {/* <Input type="text" name={"IBAN"} /> */}
                                  </div>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>
                          <Col lg={'12'}>
                            <FormGroup>
                              <Row>
                                <Col sm='4'>
                                  <Label className='form-label col-form-label '>
                                    {languageTranslation('BANK_BIC_LABEL')}
                                    {/* BIC */}
                                  </Label>
                                </Col>
                                <Col sm='8'>
                                  <div>
                                    <Input
                                      type='text'
                                      name={'BIC'}
                                      placeholder={languageTranslation(
                                        'BANK_BIC_PLACEHOLDER',
                                      )}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={BIC}
                                      className={
                                        errors.BIC && touched.BIC
                                          ? 'text-input error'
                                          : 'text-input'
                                      }
                                    />
                                    {errors.BIC && touched.BIC && (
                                      <div className='required-error'>
                                        {errors.BIC}
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
                                  <Label className='form-label col-form-label '>
                                    {languageTranslation(
                                      'ADDITIONAL_TEXT_LABEL',
                                    )}
                                    {/* Additional text */}
                                    <br />
                                    <small>
                                      This text appears below the bank details
                                      on the invoice. In the case of ceded
                                      invoices (factoring), the cession can be
                                      added here.
                                    </small>
                                  </Label>
                                </Col>
                                <Col sm='8'>
                                  <div>
                                    <Input
                                      type='textarea'
                                      name={'additionalText'}
                                      className='textarea-custom'
                                      placeholder={languageTranslation(
                                        'ADDITIONAL_TEXT_PLACEHOLDER',
                                      )}
                                      rows='4'
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

                      <Col lg={'12'}>
                        <h5 className='main-title '> Other Information</h5>
                        <div className='form-card'>
                          <Row>
                            <Col lg={'6'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation(
                                        'EMPLOYEE_ADDRESS1_LABEL',
                                      )}
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Input
                                        type='textarea'
                                        name={'address1'}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_ADDRESS1_PLACEHOLDER',
                                        )}
                                        className='textarea-custom'
                                        onChange={handleChange}
                                        value={address1}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col lg={'6'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation(
                                        'EMPLOYEE_ADDRESS2_LABEL',
                                      )}
                                    </Label>
                                  </Col>

                                  <Col sm='8'>
                                    <div className='custom-radio-block'>
                                      <Input
                                        type='textarea'
                                        name={'address2'}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_ADDRESS2_PLACEHOLDER',
                                        )}
                                        onChange={handleChange}
                                        value={address2}
                                        className='height-auto width-common'
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col lg={'6'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation(
                                        'EMPLOYEE_REGION_LABEL',
                                      )}
                                      {/* Region */}
                                      <span className='required'>*</span>
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Select
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_REGION_PLACEHOLDER',
                                        )}
                                        isMulti
                                        options={Region}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col lg={'6'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation('COUNTRY_LABEL')}
                                      {/* Country */}
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Input
                                        type='text'
                                        name={'country'}
                                        placeholder={languageTranslation(
                                          'COUNTRY_PLACEHOLDER',
                                        )}
                                        onChange={handleChange}
                                        className='width-common'
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col lg={'6'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation(
                                        'EMPLOYEE_STATE_LABEL',
                                      )}
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Select
                                        // value={this.state.selectedOption}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_STATE_PLACEHOLDER',
                                        )}
                                        options={State}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col lg={'6'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation(
                                        'EMPLOYEE_CITY_LABEL',
                                      )}
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Select
                                        // value={this.state.selectedOption}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_CITY_PLACEHOLDER',
                                        )}
                                        options={City}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col lg={'6'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation(
                                        'EMPLOYEE_ZIP_LABEL',
                                      )}
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Input
                                        name={'zip'}
                                        onChange={handleChange}
                                        className='form-control'
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_ZIP_PLACEHOLDER',
                                        )}
                                        value={zip}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col lg={'6'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation(
                                        'EMPLOYEE_JOINING_DATE_LABEL',
                                      )}
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Row>
                                        <Col>
                                          <InputMask
                                            name={'joiningDate'}
                                            placeholder={languageTranslation(
                                              'EMPLOYEE_JOINING_DATE_PLACEHOLDER',
                                            )}
                                            mask='99/99/9999'
                                            onChange={handleChange}
                                            value={joiningDate}
                                            className='form-control'
                                          />
                                          {errors.joiningDate &&
                                            touched.joiningDate && (
                                              <div className='required-error'>
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

                            <Col lg={'6'}>
                              <FormGroup>
                                <Row>
                                  <Col sm='4'>
                                    <Label className='form-label col-form-label'>
                                      {languageTranslation(
                                        'EMPLOYEE_ADD_PROFILE_IMAGE_LABEL',
                                      )}
                                      {/* Add Profile image */}
                                    </Label>
                                  </Col>
                                  <Col sm='8'>
                                    <div>
                                      <Input
                                        type='file'
                                        name={'image'}
                                        accept='image/*'
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_ADD_PROFILE_IMAGE_LABEL',
                                        )}
                                        onChange={handleImageChange}
                                      />
                                      {imagePreviewUrl &&
                                      typeof imagePreviewUrl === 'string' ? (
                                        <img
                                          src={imagePreviewUrl}
                                          width={30}
                                          height={30}
                                        />
                                      ) : (
                                        ''
                                      )}
                                      {errors.image && touched.image && (
                                        <div className='required-error'>
                                          {errors.image}
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
                    </Row>
                    <Col lg={'12'}>
                      <div className='d-flex align-items-center justify-content-between'>
                        <div className='mandatory-text'>* Required Fields</div>
                        {/* <div className={"text-right"}>
                          <Button
                            disabled={isSubmitting}
                            color="primary"
                            type={"submit"}
                            className="btn-sumbit"
                            // onClick={(e: any) => {
                            //   e.preventDefault();
                            //   handleSubmit();
                            // }}
                          >
                            Save
                          </Button>
                        </div> */}
                      </div>
                    </Col>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeFormComponent;
