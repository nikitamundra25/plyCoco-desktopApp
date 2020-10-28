import React, { useEffect, useState } from "react";
import moment from "moment";
import classnames from "classnames";
import {
  dateDiffernceValidator,
  dateValidatorNorm,
  germanNumberFormat,
  languageTranslation,
} from "../../../../helpers";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
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
  DropdownItem,
} from 'reactstrap';
import Select from "react-select";
import { FormikProps, Field, FormikHelpers, Formik, Form } from "formik";
import {
  AppConfig,
  appointmentDayFormat,
  DateMask,
  defaultDateFormat,
  defaultDateTimeFormatForDashboard,
  NightAllowancePerHour,
  ShiftTime,
  TimeMask,
} from "../../../../config";
import MaskedInput from "react-text-mask";
import { ICaregiverFormValue, ICareinstitutionFormValue, IReactSelectInterface } from "../../../../interfaces";
import { useLazyQuery } from "@apollo/react-hooks";
import { DocumentQueries } from "../../../../graphql/queries";
import Loader from "../../containers/Loader/Loader";
import { CareInstitutionValidationSchema } from "../../../validations/AppointmentsFormValidationSchema";

const validateWorkingHours = (
  type: string,
  startDateTime: any,
  endDateTime: any
) => {
  const current = moment().format(defaultDateFormat);
  startDateTime = moment(startDateTime).format(defaultDateFormat);
  endDateTime = moment(endDateTime).format(defaultDateFormat);
  let validate: boolean;
  let validDateData: any;
  validate = dateDiffernceValidator(startDateTime, current, endDateTime, name);
  validDateData = dateValidatorNorm(endDateTime);

  switch (type) {
    case "workingHoursFromDate":
      if (!validate) {
        return languageTranslation("DATE_VALIDATION_MESSAGE");
      }

      if (!validDateData.isValid) {
        return validDateData.message;
      }
      return null;
    case "workingHoursToDate":
      if (!validate) {
        return languageTranslation("DATE_VALIDATION_MESSAGE");
      }
      if (!validDateData.isValid) {
        return validDateData.message;
      }
      return null;
    case "breakFromDate":
      if (!validate) {
        return languageTranslation("DATE_VALIDATION_MESSAGE");
      }
      if (!validDateData.isValid) {
        return validDateData.message;
      }
      return null;
    case "breakToDate":
      if (!validate) {
        return languageTranslation("DATE_VALIDATION_MESSAGE");
      }
      if (!validDateData.isValid) {
        return validDateData.message;
      }
      return null;
    default:
      return null;
  }
};
const [, , , , GET_WORKPROOF_PDF] = DocumentQueries;

 const CareinstitutionForm = ({ selected }: any) => {
  const [tempState, setTempState] = useState(false);
  // Query to get Work Proof pdf
  const [getWorkProofPDF, { data: workProofData }] = useLazyQuery<any>(
    GET_WORKPROOF_PDF
  );
  const { getWorkProofPDF: workProof = {} } = workProofData || {};
  const { document: finalWorkProofPDF = "" } = workProof;
  const workingProofSubmitted = !!finalWorkProofPDF;

  let isFutureDate = false,

    item: any = {},
    careInstDetails: any = {},
    appointmentId = "",
    isLeasingAppointment = false,
    showQualification= false;
    console.log("selectedselected",selected);
    
  // set item object
  if (selected && selected.item) {
    item = selected.item;
    careInstDetails = selected.canstitution;
    isFutureDate = moment(item.date, 'YYYY/MM/DD').isAfter();
    appointmentId = item.id || "";
  }

  // To check appointment with leasing careInst or not
  if (item && item.length) {
    isLeasingAppointment = item.isLeasing ? true : false;
  }
      // To check appointment with leasing careInst or not
      showQualification =
        item &&
        item[0] &&
        item[0].isLeasing
          ? true
          : false;
console.log("careInstDetails",careInstDetails);

 

  const { firstName, lastName, fee, night, holiday } = careInstDetails;
  const {
    nightFee,
    holidayAllowance,
    weekendAllowance,
    workingProofRecieved,
    distanceInKM,
    feePerKM,
    travelAllowance,
    otherExpenses,
    remarksCareGiver,
    remarksInternal,
    f,
    s,
    n,
    status,
    date: dateString,
    createdBy,
    createdAt,
    updatedAt,
  } = item;
  /**
   *
   */
  const valuesForCareIntituionForm: ICareinstitutionFormValue = {
    appointmentId: item ? item.id : '',
    name:
      item && item.name
        ? item.name
        : `${lastName}${' '}${firstName}` /* item.name : `${LastName}${' '}${FirstName}` */,
    date: item ? item.date : '',
    startTime: item ? item.startTime : '',
    endTime: item ? item.endTime : '',
    qualificationId:
      item && item.qualificationId ? item.qualificationId : undefined,
    qualificationForCharge:
      // qualificationfor && qualificationfor[0]
      //   ? qualificationfor[0]
      //   :
         undefined,
    address: item ? item.address : '',
    contactPerson: item ? item.contactPerson : '',
    departmentOfferRemarks: item ? item.departmentOfferRemarks : '',
    departmentBookingRemarks: item ? item.departmentBookingRemarks : '',
    departmentRemarks: item ? item.departmentRemarks : '',
    isWorkingProof: item ? item.isWorkingProof : false,
    offerRemarks: item ? item.offerRemarks : '',
    bookingRemarks: item ? item.bookingRemarks : '',
    shift: item ? item.shift : undefined,
    // department:
    //   departmentData && departmentData[0]
    //     ? departmentData[0]
    //     : departmentData,
    comments: item ? item.comments : '',
    status: item ? item.status : '',
    // careInstitutionDepartment,
    createdBy: item && item.createdBy ? item.createdBy : '',
    createdAt: item && item.createdAt ? item.createdAt : '',
    updatedAt: item && item.updatedAt ? item.updatedAt : '',
  };
 

  /**
   *
   */
  return (
    <>
     <Formik
        initialValues={valuesForCareIntituionForm}
         onSubmit={/* handleSubmitCareinstitutionForm */(data:any)=> console.log("data")
          }
        enableReinitialize={true}
        validationSchema={CareInstitutionValidationSchema}
        children={(props: FormikProps<ICareinstitutionFormValue>) => {
          const {
            values,
            values: {
              appointmentId,
              name,
              shift,
              startTime,
              endTime,
              qualificationId,
              qualificationForCharge,
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
              status,
              createdBy,
              createdAt,
              updatedAt,
            },
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = props;
          let d = moment().format('L');
          let dtStart: any = new Date(d + ' ' + startTime);
          let dtEnd: any = new Date(d + ' ' + endTime);
          let difference = dtEnd - dtStart;

          // Custom function to handle react select fields
          const handleSelect = (
            selectOption: IReactSelectInterface,
            name: string
          ) => {
            console.log('im in handle select', selectOption);

            setFieldValue(name, selectOption);
            if (name === 'department') {
              // props.setcareInstituionDept(selectOption, values);
            }
            if (name === 'shift') {
              // props.setcareInstituionShift(selectOption, values);
            }
          };

          const DepartmentError: any = errors.department;
          const qualificationError: any = errors.qualificationId;
          // const shiftOptions =
          //   careInstitutionTimesOptions && careInstitutionTimesOptions.length
          //     ? careInstitutionTimesOptions
          //     : ShiftTime;
          const shiftOptions = ShiftTime
          let isCorrespondingAppointment: boolean = false;
          // if (
          //   selectedCellsCareinstitution &&
          //   selectedCellsCareinstitution.length &&
          //   selectedCellsCareinstitution[0] &&
          //   selectedCellsCareinstitution[0].item &&
          //   selectedCellsCareinstitution[0].item.appointments &&
          //   selectedCellsCareinstitution[0].item.appointments.length
          // ) {
          //   if (
          //     selectedCellsCareinstitution[0].item.appointments[0]
          //       .requirementId === appointmentId
          //   ) {
          //     isCorrespondingAppointment = true;
          //   }
          // }
          return (
            <>
             <Form>
              <div className='form-section '>
                <div
                  className={classnames({
                    'form-card custom-height custom-scrollbar': true,
                    'requirement-bg': item.status === "default",
                    'matching-bg': item.status === "linked",
                    'contract-bg': item.status === "confirmed",
                    'availability-bg': item.status === 'offered' && !isFutureDate,
                    'availability-dark-bg': item.status === 'offered' && isFutureDate,
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
                            <Col sm='4'>
                              <Label className='form-label col-form-label'>
                                {languageTranslation('APPOINTMENT_ID')}
                              </Label>
                            </Col>
                            <Col sm='8'>
                              <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                <div className='required-input appointment-id-width'>
                                  <Input
                                    value={appointmentId}
                                    disabled
                                    placeholder={languageTranslation(
                                      'APPOINTMENT_ID'
                                    )}
                                  />
                                </div>
                                {isLeasingAppointment ? (
                                  <div className='d-flex align-items-center uber-solona whitespace-nowrap mb-1'>
                                    TIMyoCY
                                  </div>
                                ) : (
                                  <div className='d-flex align-items-center uber-solona whitespace-nowrap mb-1'>
                                    Plycoco
                                  </div>
                                )}
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
                              {languageTranslation('NAME')}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <InputGroup>
                                <Input
                                  type='text'
                                  name={'name'}
                                  placeholder={languageTranslation('NAME')}
                                  disabled
                                  value={
                                    name ? name : languageTranslation('NAME')
                                  }
                                />
                                <InputGroupAddon
                                  addonType='append'
                                  className='cursor-pointer'
                                  // onClick={() =>
                                  //   name
                                  //     ? this.handleUserList(
                                  //         selectedCareinstitution
                                  //           ? selectedCareinstitution.id
                                  //           : '',
                                  //         'careinstitution'
                                  //       )
                                  //     : ''
                                  // }
                                >
                                  <InputGroupText>
                                    <i
                                      className={
                                      //   name &&
                                      //   starCanstitution.isStar &&
                                      //   parseInt(starCanstitution.id) ===
                                      //     parseInt(Id)
                                      //     ? "fa fa-star theme-text"
                                      //     : 
                                      "fa fa-star"
                                       }
                                      aria-hidden='true'
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation('DATE')}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='text-value one-line-text'>
                              {/* {activeDateCareinstitution
                                ? activeDateCareinstitution
                                    .map(
                                      (
                                        dateString: string | undefined,
                                        index: number
                                      ) =>
                                        dateString
                                          ? moment(dateString).format(
                                              index !==
                                                activeDateCareinstitution.length -
                                                  1
                                                ? 'dd DD'
                                                : `${appointmentDayFormat} ${defaultDateFormat}`
                                            )
                                          : null
                                    )
                                    .join(', ')
                                : null} */}
                                {item.date
                                ? moment(item.date).format(
                                    `${appointmentDayFormat} ${defaultDateFormat}`
                                  )
                                : null}
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
                              {languageTranslation('START_WORKING')}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='d-flex align-items-center justify-content-between flex-wrap'>
                              <div className='required-input clockshift-input'>
                                <InputGroup className='flex-nowrap'>
                                  <Field name={'startTime'}>
                                    {({ field }: any) => (
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
                                  </Field>
                                  {errors.startTime && touched.startTime && (
                                    <div className='required-tooltip'>
                                      {errors.startTime}
                                    </div>
                                  )}
                                  <InputGroupAddon addonType='append'>
                                    <InputGroupText>
                                      {languageTranslation('UHR')}
                                    </InputGroupText>
                                  </InputGroupAddon>
                                </InputGroup>
                              </div>
                              <UncontrolledDropdown className='custom-dropdown'>
                                <DropdownToggle
                                  className={'add-new-btn'}
                                  value={shift ? shift : undefined}
                                >
                                  <i
                                    className='fa fa-clock-o'
                                    aria-hidden='true'
                                  />
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation('END_WORKING')}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input clockshift-input'>
                              <InputGroup className='flex-nowrap'>
                                <Field name={'endTime'}>
                                  {({ field }: any) => (
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
                                </Field>
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
                                  <InputGroupText>
                                    {languageTranslation('UHR')}
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation('QUALIFICATION')}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='postion-relative'>
                              <Button
                                className={
                                  qualificationId && qualificationId.length
                                    ? 'add-new-btn arrow-btn'
                                    : 'add-new-btn arrow-btn disabled-class'
                                }
                                color=''
                                onClick={() => {
                                  if (
                                    qualificationId &&
                                    qualificationId.length
                                  ) {
                                    // handleQualification(qualificationId);
                                  }
                                }}
                              >
                                <i
                                  className='fa fa-arrow-up'
                                  aria-hidden='true'
                                />
                              </Button>

                              <div
                                className={`custom-select-checkbox select-right-bottom ${
                                  errors.qualificationId &&
                                  touched.qualificationId
                                    ? 'error'
                                    : ' '
                                }`}
                              >
                                <ReactMultiSelectCheckboxes
                                  // options={qualificationList}
                                  placeholderButtonLabel={languageTranslation(
                                    'CAREGIVER_QUALIFICATION_PLACEHOLDER'
                                  )}
                                  placeholder={languageTranslation(
                                    'CAREGIVER_QUALIFICATION_PLACEHOLDER'
                                  )}
                                  className={
                                    errors.qualificationId &&
                                    touched.qualificationId
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
                                {errors.qualificationId &&
                                  touched.qualificationId && (
                                    <div className='required-tooltip'>
                                      {qualificationError}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    {showQualification ? (
                      <Col lg={'12'}>
                        <FormGroup>
                          <Row>
                            <Col sm='4'>
                              <Label className='form-label col-form-label'>
                                {languageTranslation(
                                  'QUALIFICATION_FOR_CHARGE'
                                )}
                              </Label>
                            </Col>
                            <Col sm='8'>
                              <div className='postion-relative'>
                                <Select
                                  // options={qualificationList}
                                  placeholder={languageTranslation(
                                    'QUALIFICATION_FOR_CHARGE'
                                  )}
                                  className={
                                    errors.qualificationForCharge &&
                                    touched.qualificationForCharge
                                      ? 'custom-reactselect error'
                                      : 'custom-reactselect'
                                  }
                                  classNamePrefix='custom-inner-reactselect'
                                  onChange={(value: any) =>
                                    handleSelect(
                                      value,
                                      'qualificationForCharge'
                                    )
                                  }
                                  value={
                                    qualificationForCharge
                                      ? qualificationForCharge
                                      : null
                                  }
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
                              {languageTranslation('DEPARTMENT')}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <Select
                                placeholder={languageTranslation(
                                  'SELECT_DEPARTMENT'
                                )}
                                // options={careInstitutionDepartment}
                                // isDisabled={
                                //   careInstitutionDepartment.length <= 0
                                //     ? true
                                //     : false
                                // }
                                classNamePrefix='custom-inner-reactselect'
                                className={
                                  errors.department && touched.department
                                    ? 'custom-reactselect error'
                                    : 'custom-reactselect'
                                }
                                onChange={(value: any) =>
                                  handleSelect(value, 'department')
                                }
                                value={
                                  department && department.value
                                    ? department
                                    : null
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation('ADDRESS')}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <Input
                                type='textarea'
                                name={'address'}
                                disabled={true}
                                placeholder={languageTranslation('ADDRESS')}
                                value={department ? address : ''}
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation('CONTACT_PERSON')}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <Input
                                type='text'
                                disabled={true}
                                name={'contactPerson'}
                                placeholder={languageTranslation(
                                  'CONTACT_PERSON'
                                )}
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation('REMARKS_OFFER_DEPARTMENT')}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <Input
                                className='textarea-custom form-control'
                                rows='3'
                                disabled={true}
                                type='textarea'
                                name='departmentOfferRemarks'
                                id='exampleText'
                                value={
                                  departmentOfferRemarks
                                    ? departmentOfferRemarks
                                    : ''
                                }
                                maxLength={255}
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
                              {languageTranslation(
                                'REMARKS_BOOKING_DEPARTEMENT'
                              )}
                            </Label>
                          </Col>
                          <Col sm='8'>
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
                                maxLength={255}
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
                              {languageTranslation(
                                'REMARK_DEPARTMENT_VISIBLE_INTERNALLY'
                              )}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <Input
                                className='textarea-custom form-control'
                                rows='3'
                                disabled={true}
                                type='textarea'
                                name='departmentRemarks'
                                id='exampleText'
                                value={
                                  departmentRemarks ? departmentRemarks : ''
                                }
                                maxLength={255}
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
                              {languageTranslation('WORKING_PROOF_NECESSARY')}
                            </Label>
                          </Col>
                          <Col sm='8'>
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
                                        target: { checked },
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation('REMARK_OFFER')}
                            </Label>
                          </Col>
                          <Col sm='8'>
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
                                maxLength={255}
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
                              {languageTranslation('REMARK_BOOKING')}
                            </Label>
                          </Col>
                          <Col sm='8'>
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
                                maxLength={255}
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
                              {languageTranslation(
                                'COMMENT_ONLY_VISIBLE_INTERNALLY'
                              )}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <Input
                                className='textarea-custom form-control'
                                rows='3'
                                type='textarea'
                                name='comments'
                                id='exampleText'
                                value={comments ? comments : ''}
                                onChange={handleChange}
                                maxLength={255}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    {createdBy ? (
                      <Col lg={'12'} className='mb-2 text-right text-muted'>
                        <i>{`${languageTranslation('CREATED_BY')} ${
                          createdBy ? createdBy : ''
                        }`}</i>
                      </Col>
                    ) : null}
                    {createdAt ? (
                      <Col lg={'12'} className='mb-2 text-right text-muted'>
                        <i>
                          {`${languageTranslation('CREATED_AT')} ${
                            createdAt
                              ? moment(createdAt).format(
                                  defaultDateTimeFormatForDashboard
                                )
                              : ''
                          }`}
                        </i>
                      </Col>
                    ) : null}
                    {updatedAt ? (
                      <Col lg={'12'} className='mb-2 text-right text-muted'>
                        <i>
                          {`${languageTranslation('UPDATED_AT')} ${
                            updatedAt
                              ? moment(updatedAt).format(
                                  defaultDateTimeFormatForDashboard
                                )
                              : ''
                          }`}
                        </i>
                      </Col>
                    ) : null}
                    <Col lg={'12'}>
                      <div className='d-flex align-items-center justify-content-between'>
                        <Button
                          className={'btn-save'}
                          color='danger'
                          // onClick={() =>
                          //   // onhandleDelete('careinstitution', appointmentId)
                          // }
                          disabled={!appointmentId}
                        >
                          {languageTranslation('DELETE')}
                        </Button>
                        <Button
                          className='btn-save'
                          color='primary'
                          onClick={handleSubmit}
                          // disabled={
                          //   addCareinstLoading /*  ? true : appointmentId ? false : !dateCondition ? true : false */
                          // }
                        >
                          {/* {addCareinstLoading ? (
                            <i className='fa fa-spinner fa-spin mr-2' />
                          ) : (
                            ''
                          )} */}
                          {appointmentId
                            ? languageTranslation('UPDATE_BUTTON')
                            : languageTranslation('SAVE_BUTTON')}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                {/* } */}
              </div>
              </Form>
            </>
          );
        }}
      />
    </>
  );
};

export default CareinstitutionForm
