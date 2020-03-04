import React, { FunctionComponent, useState } from 'react';

import '../index.scss';
import {
  IAppointmentCareGiverForm,
  IDaysArray,
  ICaregiverFormValue,
  IReactSelectInterface
} from '../../../../../interfaces';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import '../index.scss';
import { languageTranslation } from '../../../../../helpers';
import MaskedInput from 'react-text-mask';
import {
  NightAllowancePerHour,
  State,
  defaultDateFormat
} from '../../../../../config';
import Select from 'react-select';
import { FormikProps } from 'formik';
import { FormikTextField } from '../../../components/forms/FormikFields';
import moment from 'moment';

const CaregiverFormView: FunctionComponent<FormikProps<ICaregiverFormValue> &
  IAppointmentCareGiverForm> = (
  props: FormikProps<ICaregiverFormValue> & IAppointmentCareGiverForm
) => {
  // const { selectedCareGiver } = props;
  const {
    values: {
      firstName,
      lastName,
      fee,
      nightFee,
      nightAllowance,
      holidayAllowance,
      weekendAllowance,
      workingProofRecieved,
      distanceInKM,
      feePerKM,
      travelAllowance,
      otherExpenses,
      workingHoursFrom,
      workingHoursTo,
      breakFrom,
      breakTo,
      remarksCareGiver,
      remarksInternal,
      f,
      s,
      n
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    selectedCareGiver,
    activeDateCaregiver,
    addCaregiverRes,
    timeSlotError
  } = props;

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
  };

  return (
    <>
      <div className='form-section'>
        <div className='form-card custom-height custom-scrollbar'>
          <h5 className='content-title'>
            {languageTranslation('MENU_CAREGIVER')}
          </h5>
          <Row>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('APPOINTMENT_ID')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        type='text'
                        disabled={true}
                        value={
                          addCaregiverRes && addCaregiverRes[0].userId
                            ? addCaregiverRes[0].userId
                            : ''
                        }
                        placeholder={languageTranslation('APPOINTMENT_ID')}
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
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('NAME')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Input
                          type='text'
                          disabled={true}
                          placeholder={languageTranslation('NAME')}
                          value={`${firstName ? firstName : ''} ${
                            lastName ? lastName : ''
                          }`}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>
                            <i className='fa fa-star' aria-hidden='true'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('DATE')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    {/* <div className='required-input'> */}
                    {/* <Input
                        placeholder={languageTranslation(
                          'EMPLOYEE_JOINING_DATE_PLACEHOLDER'
                        )}
                        disabled={true}
                        className={'form-control mb-2'}
                        value={
                          activeDateCaregiver
                            ? `${moment(activeDateCaregiver.isoString).format(
                                defaultDateFormat
                              )}, ${activeDateCaregiver.day}`
                            : null
                        }
                      /> */}
                    <div className='mt-2 mb-2'>
                      {activeDateCaregiver
                        ? moment(
                            activeDateCaregiver
                              ? activeDateCaregiver.isoString
                              : null
                          ).format('dd DD.MM.YYYY')
                        : null}
                    </div>
                    {/* </div> */}

                    <div>
                      <FormGroup check inline>
                        <div className=' checkbox-custom mb-1'>
                          <input
                            type='checkbox'
                            id='1'
                            className=''
                            name={'f'}
                            checked={f ? true : false}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const {
                                target: { checked }
                              } = e;
                              setFieldValue('f', checked);
                            }}
                          />
                          <Label for='check'>
                            {languageTranslation('EARLY')}
                          </Label>
                        </div>
                      </FormGroup>
                      <FormGroup check inline>
                        <div className=' checkbox-custom mb-1'>
                          <input
                            type='checkbox'
                            id='check1'
                            className=''
                            name={'s'}
                            checked={s}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const {
                                target: { checked }
                              } = e;
                              setFieldValue('s', checked);
                            }}
                          />
                          <Label for='check1'>
                            {languageTranslation('LATE')}
                          </Label>
                        </div>
                      </FormGroup>
                      <FormGroup check inline>
                        <div className=' checkbox-custom mb-1'>
                          <input
                            type='checkbox'
                            id='check2'
                            className=''
                            name={'n'}
                            checked={n}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const {
                                target: { checked }
                              } = e;
                              setFieldValue('n', checked);
                            }}
                          />
                          <Label for='check2'>
                            {languageTranslation('NIGHT')}
                          </Label>
                        </div>
                      </FormGroup>
                      {timeSlotError && (
                        <div className='required'>{timeSlotError}</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('FEE')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Input
                          type='text'
                          name={'fee'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={fee}
                          className={
                            errors.fee && touched.fee
                              ? 'width-common error'
                              : 'width-common'
                          }
                          placeholder={languageTranslation('FEE')}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>
                            <i className='fa fa-euro' aria-hidden='true'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        {errors.fee && touched.fee && (
                          <div className='required-tooltip bottom-tooltip'>
                            {errors.fee}
                          </div>
                        )}
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('NIGHT_FEE')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Input
                          type='text'
                          name={'nightFee'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={nightFee}
                          className={
                            errors.nightFee && touched.nightFee
                              ? 'width-common error'
                              : 'width-common'
                          }
                          placeholder={languageTranslation('NIGHT_FEE')}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>
                            <i className='fa fa-euro' aria-hidden='true'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        {errors.nightFee && touched.nightFee && (
                          <div className='required-tooltip bottom-tooltip'>
                            {errors.nightFee}
                          </div>
                        )}
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('WEEKEND_FEE')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Input
                          type='text'
                          name={'weekendAllowance'}
                          value={weekendAllowance}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.weekendAllowance && touched.weekendAllowance
                              ? 'width-common error'
                              : 'width-common'
                          }
                          placeholder={languageTranslation('WEEKEND_FEE')}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>
                            <i className='fa fa-euro' aria-hidden='true'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        {errors.weekendAllowance &&
                          touched.weekendAllowance && (
                            <div className='required-tooltip bottom-tooltip'>
                              {errors.weekendAllowance}
                            </div>
                          )}
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('HOLIDAY_FEE')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Input
                          type='text'
                          name={'holidayAllowance'}
                          value={holidayAllowance}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.holidayAllowance && touched.holidayAllowance
                              ? 'width-common error'
                              : 'width-common'
                          }
                          placeholder={languageTranslation('HOLIDAY_FEE')}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>
                            <i className='fa fa-euro' aria-hidden='true'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        {errors.holidayAllowance &&
                          touched.holidayAllowance && (
                            <div className='required-tooltip bottom-tooltip'>
                              {errors.holidayAllowance}
                            </div>
                          )}
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col sm={'12'} lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm={'5'}>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('NIGHT_ALLOWANCE')}
                    </Label>
                  </Col>
                  <Col sm={'7'}>
                    <div>
                      <Select
                        placeholder={languageTranslation('NIGHT_ALLOWANCE')}
                        options={NightAllowancePerHour}
                        onChange={(value: any) =>
                          handleSelect(value, 'nightAllowance')
                        }
                        value={
                          nightAllowance
                            ? nightAllowance
                            : NightAllowancePerHour[0]
                        }
                        classNamePrefix='custom-inner-reactselect'
                        className={'custom-reactselect'}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('FEE_PER_KM')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Input
                          type='text'
                          name={'distanceInKM'}
                          value={distanceInKM}
                          placeholder={languageTranslation('FEE_PER_KM')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.distanceInKM && touched.distanceInKM
                              ? 'width-common error'
                              : 'width-common'
                          }
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>km</InputGroupText>
                        </InputGroupAddon>
                        {errors.distanceInKM && touched.distanceInKM && (
                          <div className='required-tooltip bottom-tooltip'>
                            {errors.distanceInKM}
                          </div>
                        )}
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('a')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Input
                          type='text'
                          name={'feePerKM'}
                          value={feePerKM}
                          placeholder={languageTranslation('a')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.feePerKM && touched.feePerKM
                              ? 'width-common error'
                              : 'width-common'
                          }
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>
                            <i className='fa fa-euro' aria-hidden='true'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        {errors.feePerKM && touched.feePerKM && (
                          <div className='required-tooltip bottom-tooltip'>
                            {errors.feePerKM}
                          </div>
                        )}
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('EXPENSES')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        type='text'
                        name={'otherExpenses'}
                        value={otherExpenses}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={languageTranslation('EXPENSES')}
                        className={
                          errors.otherExpenses && touched.otherExpenses
                            ? 'width-common error'
                            : 'width-common'
                        }
                      />
                      {errors.otherExpenses && touched.otherExpenses && (
                        <div className='required-tooltip bottom-tooltip'>
                          {errors.otherExpenses}
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
                  <Col sm={'5'}>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('WORKING_HOURS')}
                    </Label>
                  </Col>

                  <Col sm={'7'}>
                    <div className='required-input'>
                      <div className='custom-col inner-no-padding-col row'>
                        <Col sm={'6'}>
                          <div>
                            <Select
                              classNamePrefix='custom-inner-reactselect'
                              className={
                                'custom-reactselect custom-reactselect-menu-width'
                              }
                              placeholder=''
                              options={State}
                            />
                          </div>
                        </Col>
                        <Col sm={'6'}>
                          <div>
                            <Select
                              classNamePrefix='custom-inner-reactselect'
                              className={
                                'custom-reactselect custom-reactselect-menu-width'
                              }
                              placeholder=''
                              options={State}
                            />
                          </div>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm={'5'}>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('BREAK')}
                    </Label>
                  </Col>

                  <Col sm={'7'}>
                    <div className='required-input'>
                      <div className='custom-col inner-no-padding-col row'>
                        <Col sm={'6'}>
                          <div>
                            <Select
                              classNamePrefix='custom-inner-reactselect'
                              className={
                                'custom-reactselect custom-reactselect-menu-width'
                              }
                              placeholder=''
                              options={State}
                            />
                          </div>
                        </Col>
                        <Col sm={'6'}>
                          <div>
                            <Select
                              classNamePrefix='custom-inner-reactselect'
                              className={
                                'custom-reactselect custom-reactselect-menu-width'
                              }
                              placeholder=''
                              options={State}
                            />
                          </div>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('WORKING_PROOF_NECESSARY')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <FormGroup check inline>
                        <div className=' checkbox-custom mb-0'>
                          <input
                            type='checkbox'
                            id='check'
                            className=''
                            name={'workingProofRecieved'}
                            checked={workingProofRecieved}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const {
                                target: { checked }
                              } = e;
                              setFieldValue('workingProofRecieved', checked);
                            }}
                          />
                          <Label for='check1'></Label>
                        </div>
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('REMARKS_VISIBLE_FOR_CAREGIVER')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        type='textarea'
                        name='remarksCareGiver'
                        value={remarksCareGiver ? remarksCareGiver : undefined}
                        onChange={handleChange}
                        id='exampleText1'
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('REMARKS_VISIBLE_INTERNALLY')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        type='textarea'
                        name='remarksInternal'
                        value={remarksInternal ? remarksInternal : undefined}
                        onChange={handleChange}
                        id='exampleText2'
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <div className='d-flex align-items-center justify-content-between'>
                <Button className='btn-save' color='danger'>
                  {languageTranslation('DELETE')}
                </Button>
                <Button
                  className='btn-save'
                  color='primary'
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <i className='fa fa-spinner fa-spin mr-2' />
                  ) : (
                    ''
                  )}
                  {languageTranslation('SAVE_BUTTON')}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CaregiverFormView;
