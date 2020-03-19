import React, { FunctionComponent, useState, useEffect } from 'react';

import '../index.scss';
import {
  IAppointmentCareInstitutionForm,
  ICareinstitutionFormValue,
  IReactSelectInterface
} from '../../../../../interfaces';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import '../index.scss';
import { languageTranslation } from '../../../../../helpers';
import MaskedInput from 'react-text-mask';
import { ShiftTime, TimeMask } from '../../../../../config';
import Select from 'react-select';
import { FormikProps, Field } from 'formik';
import moment from 'moment';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import classnames from 'classnames';

const CareinstitutionFormView: FunctionComponent<FormikProps<
  ICareinstitutionFormValue
> &
  IAppointmentCareInstitutionForm &
  any> = (
  props: FormikProps<ICareinstitutionFormValue> &
    IAppointmentCareInstitutionForm &
    any
) => {
  useEffect(() => {
    if (props.savingBoth) {
      handleSubmit();
    }
  }, [props.savingBoth]);
  const {
    values: {
      appointmentId,
      name,
      shift,
      startTime,
      endTime,
      qualificationId,
      department,
      address,
      contactPerson,
      isWorkingProof,
      departmentBookingRemarks,
      departmentOfferRemarks,
      departmentRemarks,
      offerRemarks,
      bookingRemarks,
      comments,
      status
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    activeDateCareinstitution,
    selectedCareinstitution,
    qualificationList,
    careInstitutionDepartment,
    setcareInstituionDept,
    careInstitutionTimesOptions,
    setcareInstituionShift,
    addCareinstitutionRes,
    selctedRequirement,
    secondStarCanstitution,
    handleQualification,
    onhandleDelete,
    careInstitutionListArr,
    handleSelectUserList,
    addCareinstLoading
  } = props;

  let d = moment().format('L');
  let dtStart: any = new Date(d + ' ' + startTime);
  let dtEnd: any = new Date(d + ' ' + endTime);
  let difference = dtEnd - dtStart;

  const [starMark, setstarMark] = useState<boolean>(false);
  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
    if (name === 'department') {
      setcareInstituionDept(selectOption, props.values);
    }
    if (name === 'shift') {
      setcareInstituionShift(selectOption, props.values);
    }
  };

  let isRequirment: boolean = false,
    isMatching: boolean = false,
    isContract: boolean = false,
    isConfirm: boolean = false,
    isOffered: boolean = false;

  if (selctedRequirement || status) {
    if (
      (selctedRequirement && selctedRequirement.status === 'default') ||
      status === 'default'
    ) {
      isRequirment = true;
    } else if (
      (selctedRequirement && selctedRequirement.status === 'linked') ||
      status === 'linked'
    ) {
      isMatching = true;
    } else if (
      (selctedRequirement && selctedRequirement.status === 'contract') ||
      status === 'contract'
    ) {
      isContract = true;
    } else if (
      (selctedRequirement && selctedRequirement.status === 'confirmed') ||
      status === 'confirmed'
    ) {
      isConfirm = true;
    } else if (
      (selctedRequirement && selctedRequirement.status === 'offered') ||
      status === 'offered'
    ) {
      isOffered = true;
    }
  }

  const handleUserList = (id: string, name: string) => {
    let data: any =
      careInstitutionListArr && careInstitutionListArr.result
        ? careInstitutionListArr.result
        : {};
    setstarMark(!starMark);
    if (
      id &&
      !starMark &&
      careInstitutionListArr &&
      careInstitutionListArr.result
    ) {
      data = careInstitutionListArr.result.filter((x: any) => x.id === id);
    }
    handleSelectUserList(data, name);
  };

  const DepartmentError: any = errors.department;
  const qualificationError: any = errors.qualificationId;
  const shiftOptions =
    careInstitutionTimesOptions && careInstitutionTimesOptions.length
      ? careInstitutionTimesOptions
      : ShiftTime;

  return (
    <>
      <div className='form-section '>
        <div
          className={classnames({
            'form-card custom-height custom-scrollbar': true,
            'requirement-bg': isRequirment,
            'matching-bg': isMatching,
            'contract-bg': isConfirm,
            'availability-bg': isOffered
          })}
        >
          <h5 className='content-title'>
            {languageTranslation('MENU_INSTITUTION')}
          </h5>
          <Row>
            {appointmentId ? (
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
                          value={appointmentId}
                          disabled
                          placeholder={languageTranslation('APPOINTMENT_ID')}
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
                          name={'name'}
                          placeholder={languageTranslation('NAME')}
                          disabled
                          value={name ? name : languageTranslation('NAME')}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>
                            <i
                              className={
                                starMark
                                  ? 'fa fa-star theme-text'
                                  : 'fa fa-star'
                              }
                              aria-hidden='true'
                              onClick={() =>
                                name
                                  ? handleUserList(
                                      selectedCareinstitution
                                        ? selectedCareinstitution.id
                                        : '',
                                      'careinstitution'
                                    )
                                  : ''
                              }
                            ></i>
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
                    <div className='text-value '>
                      {activeDateCareinstitution
                        ? activeDateCareinstitution
                            .map(
                              (dateString: string | undefined, index: number) =>
                                dateString
                                  ? moment(dateString).format(
                                      index !==
                                        activeDateCareinstitution.length - 1
                                        ? 'dd DD'
                                        : 'dd DD.MM.YYYY'
                                    )
                                  : null
                            )
                            .join(', ')
                        : null}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            {/* <Col sm={'12'} lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm={'5'}>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('SHIFT')}
                    </Label>
                  </Col>
                  <Col sm={'7'}>
                    <div>
                      <Select
                        placeholder='Select'
                        options={
                          careInstitutionTimesOptions &&
                          careInstitutionTimesOptions.length
                            ? careInstitutionTimesOptions
                            : ShiftTime
                        }
                        value={shift ? shift : undefined}
                        classNamePrefix='custom-inner-reactselect'
                        className={'custom-reactselect'}
                        onChange={(value: any) => handleSelect(value, 'shift')}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col> */}
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('START_WORKING')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='d-flex align-items-center justify-content-between flex-wrap'>
                      <div className='required-input clockshift-input'>
                        <InputGroup className='flex-nowrap'>
                          <Field
                            name={'startTime'}
                            render={({ field }: any) => (
                              <MaskedInput
                                {...field}
                                mask={TimeMask}
                                className={
                                  errors.startTime && touched.startTime
                                    ? 'text-input error form-control'
                                    : 'text-input form-control'
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={startTime ? startTime : ''}
                              />
                            )}
                          />
                          {errors.startTime && touched.startTime && (
                            <div className='required-tooltip'>
                              {errors.startTime}
                            </div>
                          )}
                          <InputGroupAddon addonType='append'>
                            <InputGroupText>Uhr</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      <UncontrolledDropdown className='custom-dropdown'>
                        <DropdownToggle
                          className={'add-new-btn'}
                          value={shift ? shift : undefined}
                        >
                          <i className='fa fa-clock-o' aria-hidden='true' />
                        </DropdownToggle>
                        <DropdownMenu>
                          {shiftOptions && shiftOptions.length
                            ? shiftOptions.map(
                                (
                                  option: IReactSelectInterface,
                                  index: number
                                ) => {
                                  return (
                                    <DropdownItem
                                      key={index}
                                      value={option.value}
                                      onClick={(e: any) =>
                                        handleSelect(option, 'shift')
                                      }
                                    >
                                      {option.label}
                                    </DropdownItem>
                                  );
                                }
                              )
                            : ''}
                        </DropdownMenu>
                      </UncontrolledDropdown>
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
                      {languageTranslation('END_WORKING')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input clockshift-input'>
                      <InputGroup className='flex-nowrap'>
                        <Field
                          name={'endTime'}
                          render={({ field }: any) => (
                            <MaskedInput
                              {...field}
                              mask={TimeMask}
                              className={
                                errors.endTime && touched.endTime
                                  ? 'fee-width form-control error'
                                  : 'fee-width form-control'
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={endTime ? endTime : ''}
                            />
                          )}
                        />
                        {errors.endTime ? (
                          errors.endTime &&
                          touched.endTime && (
                            <div className='required-tooltip'>
                              {errors.endTime}
                            </div>
                          )
                        ) : touched.endTime && difference <= 0 ? (
                          <div className='required-tooltip'>
                            {languageTranslation('VALID_TIME_RANGE')}
                          </div>
                        ) : null}
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>Uhr</InputGroupText>
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
                      {languageTranslation('QUALIFICATION')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='postion-relative'>
                      <Button
                        className={
                          qualificationId && qualificationId.length
                            ? 'add-new-btn arrow-btn'
                            : 'add-new-btn arrow-btn disabled-class'
                        }
                        color=''
                        onClick={() => {
                          if (qualificationId && qualificationId.length) {
                            handleQualification(qualificationId);
                          }
                        }}
                      >
                        <i className='fa fa-arrow-up' aria-hidden='true' />
                      </Button>

                      <div
                        className={`custom-select-checkbox select-right-bottom ${
                          errors.qualificationId && touched.qualificationId
                            ? 'error'
                            : ' '
                        }`}
                      >
                        <ReactMultiSelectCheckboxes
                          options={qualificationList}
                          placeholderButtonLabel={languageTranslation(
                            'CAREGIVER_QUALIFICATION_PLACEHOLDER'
                          )}
                          placeholder={languageTranslation(
                            'CAREGIVER_QUALIFICATION_PLACEHOLDER'
                          )}
                          // placeholder="Select Qualifications"

                          className={
                            errors.qualificationId && touched.qualificationId
                              ? 'custom-reactselect error'
                              : 'custom-reactselect'
                          }
                          classNamePrefix='custom-inner-reactselect'
                          onChange={(value: any) =>
                            handleSelect(value, 'qualificationId')
                          }
                          value={
                            qualificationId && qualificationId.length
                              ? qualificationId
                              : []
                          }
                        />
                        {errors.qualificationId && touched.qualificationId && (
                          <div className='required-tooltip'>
                            {qualificationError}
                          </div>
                        )}
                        {/* <Select
                        placeholder='Select Qualifications'
                        options={qualificationList}
                        isMulti={true}
                        classNamePrefix='custom-inner-reactselect'
                        className={'custom-reactselect'}
                        value={qualificationId}
                        onChange={(value: any) =>
                          handleSelect(value, 'qualificationId')
                        }
                      /> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            {/* <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('QUALIFICATION_FOR_BILLING')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <div className='required-input'>
                        <Select
                          placeholder='Select Qualifications'
                          options={State}
                          classNamePrefix='custom-inner-reactselect'
                          className={'custom-reactselect'}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col> */}

            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('DEPARTMENT')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Select
                        placeholder='Select Department'
                        options={careInstitutionDepartment}
                        isDisabled={
                          careInstitutionDepartment.length <= 0 ? true : false
                        }
                        classNamePrefix='custom-inner-reactselect'
                        // className={'custom-reactselect'}
                        className={
                          errors.department && touched.department
                            ? 'custom-reactselect error'
                            : 'custom-reactselect'
                        }
                        onChange={(value: any) =>
                          handleSelect(value, 'department')
                        }
                        value={
                          department
                          // department && department.value
                          //   ? department
                          //   : { label: ' ', value: '' }
                        }
                      />
                      {errors.department && touched.department && (
                        <div className='required-tooltip'>
                          {DepartmentError}
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
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('ADDRESS')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        type='textarea'
                        name={'address'}
                        disabled={true}
                        placeholder={languageTranslation('ADDRESS')}
                        value={address ? address : ''}
                        className='textarea-custom form-control'
                        rows='2'
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
                      {languageTranslation('CONTACT_PERSON')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        type='text'
                        disabled={true}
                        name={'contactPerson'}
                        placeholder={languageTranslation('CONTACT_PERSON')}
                        className='width-common'
                        value={contactPerson ? contactPerson : ''}
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
                      {languageTranslation('REMARKS_OFFER_DEPARTMENT')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        disabled={true}
                        type='textarea'
                        name='departmentOfferRemarks'
                        id='exampleText'
                        value={
                          departmentOfferRemarks ? departmentOfferRemarks : ''
                        }
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
                      {languageTranslation('REMARKS_BOOKING_DEPARTEMENT')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        disabled={true}
                        type='textarea'
                        name='departmentBookingRemarks'
                        id='exampleText'
                        value={
                          departmentBookingRemarks
                            ? departmentBookingRemarks
                            : ''
                        }
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
                      {languageTranslation(
                        'REMARK_DEPARTMENT_VISIBLE_INTERNALLY'
                      )}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        disabled={true}
                        type='textarea'
                        name='departmentRemarks'
                        id='exampleText'
                        value={departmentRemarks ? departmentRemarks : ''}
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
                      {languageTranslation('WORKING_PROOF_NECESSARY')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <FormGroup check inline>
                        <div className=' checkbox-custom mb-0'>
                          <input
                            type='checkbox'
                            id='isWorkingProof'
                            name={'isWorkingProof'}
                            className=''
                            checked={isWorkingProof}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const {
                                target: { checked }
                              } = e;
                              setFieldValue('isWorkingProof', checked);
                            }}
                          />
                          <Label for='isWorkingProof'></Label>
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
                      {languageTranslation('REMARK_OFFER')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        type='textarea'
                        name='offerRemarks'
                        id='exampleText'
                        value={offerRemarks ? offerRemarks : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                      {languageTranslation('REMARK_BOOKING')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        type='textarea'
                        name='bookingRemarks'
                        id='exampleText'
                        value={bookingRemarks ? bookingRemarks : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                      {languageTranslation('COMMENT_ONLY_VISIBLE_INTERNALLY')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        type='textarea'
                        name='comments'
                        id='exampleText'
                        value={comments ? comments : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <div className='d-flex align-items-center justify-content-between'>
                <Button
                  className={'btn-save'}
                  color='danger'
                  onClick={() =>
                    onhandleDelete('careinstitution', appointmentId)
                  }
                  disabled={!appointmentId}
                >
                  {languageTranslation('DELETE')}
                </Button>
                <Button
                  className='btn-save'
                  color='primary'
                  onClick={handleSubmit}
                  disabled={addCareinstLoading}
                >
                  {addCareinstLoading ? (
                    <i className='fa fa-spinner fa-spin mr-2' />
                  ) : (
                    ''
                  )}
                  {appointmentId
                    ? languageTranslation('UPDATE_BUTTON')
                    : languageTranslation('SAVE_BUTTON')}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CareinstitutionFormView;
