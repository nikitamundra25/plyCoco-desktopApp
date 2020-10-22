import React, { FunctionComponent, useEffect } from 'react';
import Select from 'react-select';
import { Formik, FormikHelpers, FormikProps, Field } from 'formik';
import moment from 'moment';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import classnames from 'classnames';
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
import MaskedInput from 'react-text-mask';
import {
  errorFormatter,
  languageTranslation,
  timeDiffernce,
} from '../../../../../helpers';
import {
  IAppointmentCareInstitutionForm,
  ICareinstitutionFormSubmitValue,
  ICareinstitutionFormValue,
  IReactSelectInterface,
} from '../../../../../interfaces';
import {
  ShiftTime,
  TimeMask,
  appointmentDayFormat,
  defaultDateFormat,
  dbAcceptableFormat,
  defaultDateTimeFormatForDashboard,
  CareInstTIMyoCYAttrId,
} from '../../../../../config';
import '../index.scss';
import Loader from '../../../containers/Loader/Loader';
import { CareInstitutionValidationSchema } from '../../../../validations/AppointmentsFormValidationSchema';
import { toast } from 'react-toastify';

// const CareinstitutionFormView: FunctionComponent<
//   FormikProps<ICareinstitutionFormValue> & IAppointmentCareInstitutionForm & any
// > = (
//   props: FormikProps<ICareinstitutionFormValue> &
//     IAppointmentCareInstitutionForm &
//     any
// ) => {
// useEffect(() => {
//   if (props.savingBoth && !timeSlotError) {
//     handleSubmit();
//   }
// }, [props.savingBoth]);
// const {
//   values: {
//     appointmentId,
//     name,
//     shift,
//     startTime,
//     endTime,
//     qualificationId,
//     qualificationForCharge,
//     department,
//     address,
//     contactPerson,
//     isWorkingProof,
//     departmentBookingRemarks,
//     departmentOfferRemarks,
//     departmentRemarks,
//     offerRemarks,
//     bookingRemarks,
//     comments,
//     status,
//     createdBy,
//     createdAt,
//     updatedAt
//   },
//   touched,
//   errors,
//   handleChange,
//   handleBlur,
//   handleSubmit,
//   setFieldValue,
//   activeDateCareinstitution,
//   selectedCareinstitution,
//   qualificationList,
//   careInstitutionDepartment,
//   setcareInstituionDept,
//   careInstitutionTimesOptions,
//   setcareInstituionShift,
//   selctedRequirement,
//   handleQualification,
//   onhandleDelete,
//   careInstitutionListArr,
//   addCareinstLoading,
//   timeSlotError,
//   handleFirstStarCanstitution,
//   starCanstitution,
//   idSearchAppointmentLoading,
//   selectedCellsCareinstitution
// } = props;

// let d = moment().format("L");
// let dtStart: any = new Date(d + " " + startTime);
// let dtEnd: any = new Date(d + " " + endTime);
// let difference = dtEnd - dtStart;

// // Custom function to handle react select fields
// const handleSelect = (selectOption: IReactSelectInterface, name: string) => {

//   setFieldValue(name, selectOption);
//   if (name === "department") {
//     setcareInstituionDept(selectOption, props.values);
//   }
//   if (name === "shift") {
//     setcareInstituionShift(selectOption, props.values);
//   }
// };
// let dateCondition: any;
// let dateData: any;
// if (
//   activeDateCareinstitution &&
//   activeDateCareinstitution.length &&
//   activeDateCareinstitution[0]
// ) {
//   dateData = activeDateCareinstitution[0];
//   let now = moment().format(dbAcceptableFormat);
//   let input = moment(activeDateCareinstitution[0]).format(dbAcceptableFormat);
//   dateCondition = now <= input;
// }

// let isFutureDate: boolean = false;
// if (dateData) {
//   let dateStr = moment(dateData).add(1, "days").format("YYYY/MM/DD");
//   isFutureDate = moment(dateStr, "YYYY/MM/DD").isAfter();
// }

// let isRequirment: boolean = false,
//   isMatching: boolean = false,
//   isContract: boolean = false,
//   isConfirm: boolean = false,
//   isOffered: boolean = false,
//   isOfferedFutureDate: boolean = false;
// if (selctedRequirement || status) {
//   if (
//     (selctedRequirement && selctedRequirement.status === "default") ||
//     status === "default"
//   ) {
//     isRequirment = true;
//   } else if (
//     (selctedRequirement && selctedRequirement.status === "linked") ||
//     status === "linked"
//   ) {
//     isMatching = true;
//   } else if (
//     (selctedRequirement && selctedRequirement.status === "contract") ||
//     status === "contract"
//   ) {
//     isContract = true;
//   } else if (
//     (selctedRequirement && selctedRequirement.status === "confirmed") ||
//     status === "confirmed"
//   ) {
//     isConfirm = true;
//   } else if (
//     (selctedRequirement &&
//       selctedRequirement.status === "offered" &&
//       isFutureDate === false) ||
//     (status === "offered" && isFutureDate === false)
//   ) {
//     isOffered = true;
//   } else if (
//     (selctedRequirement &&
//       selctedRequirement.status === "offered" &&
//       isFutureDate === true) ||
//     (status === "offered" && isFutureDate === true)
//   ) {
//     isOfferedFutureDate = true;
//   }
// }

// const handleUserList = (id: string, name: string) => {
//   let data: any =
//     careInstitutionListArr && careInstitutionListArr.result
//       ? careInstitutionListArr.result
//       : {};

//   if (
//     id &&
//     careInstitutionListArr &&
//     careInstitutionListArr.result &&
//     careInstitutionListArr &&
//     careInstitutionListArr.result.length
//   ) {
//     data = careInstitutionListArr.result.filter((x: any) => x.id === id)[0];
//     let index = careInstitutionListArr.result.findIndex(
//       (el: any) => el.id === id
//     );
//     handleFirstStarCanstitution({ id }, index);
//   }
// };

// const DepartmentError: any = errors.department;
// const qualificationError: any = errors.qualificationId;
// const shiftOptions =
//   careInstitutionTimesOptions && careInstitutionTimesOptions.length
//     ? careInstitutionTimesOptions
//     : ShiftTime;

// let isLeasingAppointment = false;
// let showQualification = false;

// // To check appointment with leasing careInst or not
// if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
//   isLeasingAppointment =
//     selectedCellsCareinstitution[0] &&
//     selectedCellsCareinstitution[0].item &&
//     selectedCellsCareinstitution[0].item.isLeasing
//       ? true
//       : false;

//   // To check appointment with leasing careInst or not
//   showQualification =
//     selectedCellsCareinstitution &&
//     selectedCellsCareinstitution[0] &&
//     selectedCellsCareinstitution[0].isLeasing
//       ? true
//       : false;
// }
// let isCorrespondingAppointment: boolean = false;
// if (
//   selectedCellsCareinstitution &&
//   selectedCellsCareinstitution.length &&
//   selectedCellsCareinstitution[0] &&
//   selectedCellsCareinstitution[0].item &&
//   selectedCellsCareinstitution[0].item.appointments &&
//   selectedCellsCareinstitution[0].item.appointments.length
// ) {
//   if (
//     selectedCellsCareinstitution[0].item.appointments[0].requirementId ===
//     appointmentId
//   ) {
//     isCorrespondingAppointment = true;
//   }
// }
let toastId: any = null;
class CareinstitutionFormView extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      workingHoursFromErrMsg: '',
      workingHoursToErrMsg: '',
      breakHoursFromErrMsg: '',
      breakHoursToErrMsg: '',
      timeSlotError: '',
      savingBoth: false,
      careInstituionShift:''
    };
  }
  // submit careinstitution form
  handleSubmitCareinstitutionForm = async (
    values: ICareinstitutionFormValue,
    { setSubmitting }: FormikHelpers<ICareinstitutionFormValue>
  ) => {
    const {
      selectedCellsCareinstitution,
      updateCareinstitutionRequirment,
      addCareinstitutionRequirment,
    } = this.props;
    const {
      appointmentId,
      name: Name,
      endTime,
      startTime,
      qualificationId,
      qualificationForCharge,
      department,
      address,
      contactPerson,
      departmentOfferRemarks,
      offerRemarks,
      bookingRemarks,
      isWorkingProof,
      departmentBookingRemarks,
      departmentRemarks,
      comments,
      status,
      createdBy,
      createdAt,
    } = values;

    let quali: number[] = [];
    if (qualificationId) {
      qualificationId.map((key: any, index: number) => {
        quali.push(parseInt(key.value));
      });
    }

    /*  Time slot condition for f,s, n
     */
    let fvar: string = '';
    let svar: string = '';
    let nvar: string = '';
    let difference: string = timeDiffernce(startTime, endTime);
    if (parseInt(startTime) >= 0 && parseInt(startTime) < 12) {
      if (parseInt(difference) > 8) {
        fvar = `f${parseInt(difference)}`;
      } else {
        fvar = 'f';
      }
    } else if (parseInt(startTime) >= 12 && parseInt(startTime) < 18) {
      if (parseInt(difference) > 8) {
        svar = `s${parseInt(difference)}`;
      } else {
        svar = 's';
      }
    } else if (parseInt(startTime) >= 18) {
      if (parseInt(difference) > 8) {
        nvar = `n${parseInt(difference)}`;
      } else {
        nvar = 'n';
      }
    }
    try {
      if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
        // To add mulitple availabilty
        const {
          id: Id = '',
          firstName = '',
          lastName = '',
          name = '',
          item = undefined,
          canstitution = {},
          qualificationIds = [],
          dateString = '',
        } =
          selectedCellsCareinstitution &&
          selectedCellsCareinstitution.length &&
          selectedCellsCareinstitution[0]
            ? selectedCellsCareinstitution[0]
            : {};

        let data: any = [
          {
            id: Id,
            firstName,
            lastName,
            canstitution: {
              ...canstitution,
            },
            qualificationIds,
            dateString,
            item: {
              id: appointmentId ? appointmentId : '',
              name,
              date: dateString,
              shift: undefined,
              endTime,
              startTime,
              qualificationId,
              qualificationForCharge,
              address,
              contactPerson,
              department,
              departmentOfferRemarks,
              departmentBookingRemarks,
              departmentRemarks,
              isWorkingProof: isWorkingProof ? true : false,
              offerRemarks,
              bookingRemarks,
              comments,
              status,
            },
          },
        ];
        let careInstitutionRequirementInput: any[] = [];
        selectedCellsCareinstitution.forEach(async (element: any) => {
          const { id = '', dateString = '', canstitution = {} } = element
            ? element
            : {};
          const { attributes = [], street = '', city = '' } = canstitution
            ? canstitution
            : {};

          let stemp: ICareinstitutionFormSubmitValue = {
            userId: id ? parseInt(id) : 0,
            date: dateString,
            name: Name ? Name : name,
            startTime,
            endTime,
            divisionId:
              department && department.value
                ? parseInt(department.value)
                : null,
            qualificationId: quali,
            qualificationForCharge:
              qualificationForCharge && qualificationForCharge.value
                ? parseInt(qualificationForCharge.value)
                : null,

            address: department
              ? address
              : [street, city].filter(Boolean).join(', '),
            contactPerson,
            departmentOfferRemarks: departmentOfferRemarks
              ? departmentOfferRemarks
              : '',
            departmentBookingRemarks,
            departmentRemarks,
            isWorkingProof,
            offerRemarks,
            bookingRemarks,
            comments,
            f: fvar,
            s: svar,
            n: nvar,
            status: status ? status : 'default',
            isLeasing:
              attributes && attributes.length
                ? attributes.includes(CareInstTIMyoCYAttrId)
                : false,
            createdBy,
            createdAt: createdAt ? createdAt : '',
          };
          careInstitutionRequirementInput = [
            ...careInstitutionRequirementInput,
            stemp,
          ];

          if (appointmentId) {
            await updateCareinstitutionRequirment({
              variables: {
                id: parseInt(appointmentId),
                careInstitutionRequirementInput: stemp,
              },
            });
            this.setState({
              savingBoth: false,
            });
            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation(
                  'CARE_INSTITUTION_REQUIREMENT_UPDATE_SUCCESS_MSG'
                )
              );
            }
          } else {
            // await addCareinstitutionRequirment({
            //   variables: {
            //     careInstitutionRequirementInput: [
            //       careInstitutionRequirementInput,
            //     ],
            //   },
            // });
            // setMultipleRequirement(false);
            toast.dismiss();
            // if (!toast.isActive(toastId)) {
            //   toastId = toast.success(
            //     languageTranslation(
            //       "CARE_INSTITUTION_REQUIREMENT_ADD_SUCCESS_MSG"
            //     )
            //   );
            // }
          }
        });
        if (!appointmentId) {
          await addCareinstitutionRequirment({
            variables: {
              careInstitutionRequirementInput,
            },
          });
          // setMultipleRequirement(false);
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              languageTranslation(
                'CARE_INSTITUTION_REQUIREMENT_ADD_SUCCESS_MSG'
              )
            );
          }
          //  setselectedCellsCareinstitution(data);
        }
      }
      // canstitutionRefetch();
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
    setSubmitting(false);
  };

  render() {
    const { startTime, endTime } = this.state;
    let d = moment().format('L');
    let dtStart: any = new Date(d + ' ' + startTime);
    let dtEnd: any = new Date(d + ' ' + endTime);
    let difference = dtEnd - dtStart;
    const {
      selectedCells,
      multipleAvailability,
      selectedCellsCareinstitution,
      careInstitutionDepartment,
      qualificationList,
    } = this.props;
    // Fetch values in case of edit caregiver with condition predefined data or availability data by default it will be null or undefined
    let {
      firstName = '',
      lastName = '',
      email = '',
      id: selectedCaregiverId = '',
      dateString = '',
      caregiver = undefined,
      item = undefined,
    } =
      selectedCells &&
      // to check multiple cells are free or reserve or you've clicked on new appointment to reflect the form
      (selectedCells.length === 1 ||
        multipleAvailability ||
        (selectedCells[0] && selectedCells[0].item)) &&
      selectedCells[0]
        ? selectedCells[0]
        : {};

    const {
      id: Id = '',
      firstName: FirstName = '',
      lastName: LastName = '',
      name: careInstName = '',
      canstitution = {},
      item: Item = {},
      qualificationIds = {},
      dateString: careInstitutiondateString = '',
    } =
      selectedCellsCareinstitution && selectedCellsCareinstitution.length
        ? selectedCellsCareinstitution[0]
        : {};

    let street: string = canstitution && canstitution.street;
    let departmentData: any = Item ? Item.department : undefined;

    if (
      careInstitutionDepartment &&
      careInstitutionDepartment.length &&
      selectedCellsCareinstitution &&
      Item &&
      Item.divisionId
    ) {
      departmentData = careInstitutionDepartment.filter(
        (dept: any) => dept.value === Item.divisionId
      );
    }
    let qualificationfor: any;
    if (
      Item &&
      Item.qualificationForCharge &&
      !Item.qualificationForCharge.value
    ) {
      qualificationfor = qualificationList.filter((value: any) => {
        return Item && Item.qualificationForCharge
          ? Item.qualificationForCharge === value.value
          : // Item.qualificationForCharge.includes(value.value)
            null;
      });
    } else {
      qualificationfor = [Item.qualificationForCharge];
    }

    // const createdByName =Item && Item.appointments && Item.appointments.length && Item.appointments[0] ? Item.appointments[0].createdBy : ""
    const valuesForCareIntituionForm: ICareinstitutionFormValue = {
      appointmentId: Item ? Item.id : '',
      name:
        Item && Item.name
          ? Item.name
          : careInstName /* Item.name : `${LastName}${' '}${FirstName}` */,
      date: Item ? Item.date : '',
      startTime: Item ? Item.startTime : '',
      endTime: Item ? Item.endTime : '',
      qualificationId:
        Item && Item.qualificationId ? Item.qualificationId : undefined,
      qualificationForCharge:
        qualificationfor && qualificationfor[0]
          ? qualificationfor[0]
          : undefined,
      address: Item ? Item.address : '',
      contactPerson: Item ? Item.contactPerson : '',
      departmentOfferRemarks: Item ? Item.departmentOfferRemarks : '',
      departmentBookingRemarks: Item ? Item.departmentBookingRemarks : '',
      departmentRemarks: Item ? Item.departmentRemarks : '',
      isWorkingProof: Item ? Item.isWorkingProof : false,
      offerRemarks: Item ? Item.offerRemarks : '',
      bookingRemarks: Item ? Item.bookingRemarks : '',
      shift: Item ? Item.shift : undefined,
      department:
        departmentData && departmentData[0]
          ? departmentData[0]
          : departmentData,
      comments: Item ? Item.comments : '',
      status: Item ? Item.status : '',
      careInstitutionDepartment,
      createdBy: Item && Item.createdBy ? Item.createdBy : '',
      createdAt: Item && Item.createdAt ? Item.createdAt : '',
      updatedAt: Item && Item.updatedAt ? Item.updatedAt : '',
    };
    return (
      <Formik
        initialValues={valuesForCareIntituionForm}
        onSubmit={this.handleSubmitCareinstitutionForm}
        enableReinitialize={true}
        validationSchema={CareInstitutionValidationSchema}
        children={(props: FormikProps<ICareinstitutionFormValue>) => {
          const {
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
          // // Custom function to handle react select fields
          const handleSelect = (
            selectOption: IReactSelectInterface,
            name: string
          ) => {
            setFieldValue(name, selectOption);
            if (name === 'department') {
              // setcareInstituionDept(selectOption, props.values);
            }
            if (name === 'shift') {
              this.setState({
                careInstituionShift:props.values
              })
              // setcareInstituionShift(selectOption, props.values);
            }
          };
          return (
            <>
              <div className='form-section '>
                {/* {idSearchAppointmentLoading ?  <Loader/> :  */}
                <div
                // className={classnames({
                //   "form-card custom-height custom-scrollbar": true,
                //   "requirement-bg": isRequirment,
                //   "matching-bg": isMatching,
                //   "contract-bg": isConfirm,
                //   "availability-bg": isOffered,
                //   "availability-dark-bg": isOfferedFutureDate,
                // })}
                >
                  <h5 className='content-title'>
                    {languageTranslation('MENU_INSTITUTION')}
                  </h5>
                  {/* {idSearchAppointmentLoading && !isCorrespondingAppointment ? (
            <div className="appointment-form-loader">
              <Loader />
            </div>
          ) : null} */}
                  <Row>
                    {/* {appointmentId ? ( */}
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
                              {/* {isLeasingAppointment ? (
                          <div className="d-flex align-items-center uber-solona whitespace-nowrap mb-1">
                            TIMyoCY
                          </div>
                        ) : (
                          <div className="d-flex align-items-center uber-solona whitespace-nowrap mb-1">
                            Plycoco
                          </div>
                        )} */}
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    {/* ) : null} */}
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
                                  //     ? handleUserList(
                                  //         selectedCareinstitution
                                  //           ? selectedCareinstitution.id
                                  //           : "",
                                  //         "careinstitution"
                                  //       )
                                  //     : ""
                                  // }
                                >
                                  <InputGroupText>
                                    <i
                                      // className={
                                      //   name &&
                                      //   starCanstitution.isStar &&
                                      //   parseInt(starCanstitution.id) ===
                                      //     parseInt(selectedCareinstitution.id)
                                      //     ? "fa fa-star theme-text"
                                      //     : "fa fa-star"
                                      // }
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
                            {/* <div className="text-value one-line-text">
                      {activeDateCareinstitution
                        ? activeDateCareinstitution
                            .map(
                              (dateString: string | undefined, index: number) =>
                                dateString
                                  ? moment(dateString).format(
                                      index !==
                                        activeDateCareinstitution.length - 1
                                        ? "dd DD"
                                        : `${appointmentDayFormat} ${defaultDateFormat}`
                                    )
                                  : null
                            )
                            .join(", ")
                        : null}
                    </div> */}
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
                                {/* <DropdownMenu>
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
                                        handleSelect(option, "shift")
                                      }
                                    >
                                      {option.label}
                                    </DropdownItem>
                                  );
                                }
                              )
                            : ""}
                        </DropdownMenu> */}
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
                                // onClick={() => {
                                //   if (qualificationId && qualificationId.length) {
                                //     handleQualification(qualificationId);
                                //   }
                                // }}
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
                                  // placeholder="Select Qualifications"

                                  // className={
                                  //   errors.qualificationId && touched.qualificationId
                                  //     ? "custom-reactselect error"
                                  //     : "custom-reactselect"
                                  // }
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
                                {/* {errors.qualificationId && touched.qualificationId && (
                          <div className="required-tooltip">
                            {qualificationError}
                          </div>
                        )} */}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    {/* {showQualification ? ( */}
                    <Col lg={'12'}>
                      <FormGroup>
                        <Row>
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation('QUALIFICATION_FOR_CHARGE')}
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
                                  handleSelect(value, 'qualificationForCharge')
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
                    {/* ) : null} */}

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
                                //   careInstitutionDepartment.length <= 0 ? true : false
                                // }
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
                                  department && department.value
                                    ? department
                                    : null
                                }
                              />
                              {/* {errors.department && touched.department && (
                        <div className="required-tooltip">
                          {DepartmentError}
                        </div>
                      )} */}
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
                                // value={departmentRemarks ? departmentRemarks : ""}
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
                                // value={offerRemarks ? offerRemarks : ""}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
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

                    {/* {createdBy ? (
              <Col lg={"12"} className="mb-2 text-right text-muted">
                <i>{`${languageTranslation("CREATED_BY")} ${
                  createdBy ? createdBy : ""
                }`}</i>
              </Col>
            ) : null}

            {createdAt ? (
              <Col lg={"12"} className="mb-2 text-right text-muted">
                <i>
                  {`${languageTranslation("CREATED_AT")} ${
                    createdAt ? moment(createdAt).format(defaultDateTimeFormatForDashboard) : ""
                  }`}
                </i>
              </Col>
            ) : null}
            {updatedAt ? (
              <Col lg={"12"} className="mb-2 text-right text-muted">
                <i>
                  {`${languageTranslation("UPDATED_AT")} ${
                    updatedAt ? moment(updatedAt).format(defaultDateTimeFormatForDashboard) : ""
                  }`}
                </i>
              </Col>
            ) : null} */}

                    <Col lg={'12'}>
                      <div className='d-flex align-items-center justify-content-between'>
                        <Button
                          className={'btn-save'}
                          color='danger'
                          // onClick={() =>
                          //   onhandleDelete("careinstitution", appointmentId)
                          // }
                          // disabled={!appointmentId}
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
                    <i className="fa fa-spinner fa-spin mr-2" />
                  ) : (
                    ""
                  )}
                  {appointmentId
                    ? languageTranslation("UPDATE_BUTTON")
                    :} */}
                          {languageTranslation('SAVE_BUTTON')}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                {/* } */}
              </div>
            </>
          );
        }}
      />
    );
  }
}
export default React.memo(CareinstitutionFormView);
