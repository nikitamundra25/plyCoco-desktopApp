import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import {
  dateDiffernceValidator,
  dateValidatorNorm,
  errorFormatter,
  germanNumberFormat,
  languageTranslation,
  timeDiffernce,
} from '../../../../helpers';
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
import Select from 'react-select';
import { FormikProps, Field, FormikHelpers, Formik, Form } from 'formik';
import {
  AppConfig,
  appointmentDayFormat,
  CareInstTIMyoCYAttrId,
  DateMask,
  defaultDateFormat,
  defaultDateTimeFormatForDashboard,
  NightAllowancePerHour,
  ShiftTime,
  TimeMask,
} from '../../../../config';
import MaskedInput from 'react-text-mask';
import {
  IAddCargiverAppointmentRes,
  ICaregiverFormValue,
  ICareinstitutionFormSubmitValue,
  ICareinstitutionFormValue,
  IQualifications,
  IReactSelectInterface,
  IReactSelectTimeInterface,
} from '../../../../interfaces';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  CareInstitutionQueries,
  DocumentQueries,
  GET_QUALIFICATION_ATTRIBUTE,
} from '../../../../graphql/queries';
import { CareInstitutionValidationSchema } from '../../../validations/AppointmentsFormValidationSchema';
import { toast } from 'react-toastify';
import { AppointmentMutations } from '../../../../graphql/Mutations';
import { ConfirmBox } from '../../components/ConfirmBox';
const [
  ,
  ADD_INSTITUTION_REQUIREMENT,
  ,
  UPDATE_INSTITUTION_REQUIREMENT,
  DELETE_CAREINSTITUTION_REQUIREMENT,
  ,
  ,
  ,
] = AppointmentMutations;
const [, , GET_DEPARTMENT_LIST, , , ,] = CareInstitutionQueries;

let toastId: any = null;
let selectedDept: any = {};
let selectedShift: any = undefined;
const CareinstitutionForm = ({
  selected,
  qualificationList,
  departmentList,
  setSelectedCareinstitution,
  handleupdateData,
  savingBoth,
  setsavingBoth,
  multipleRequirement,
  handleQualification,
  starMarkCanstitution,
  setstarMarkCanstitution,
  filterUpdated,
  filters,
  setCareInstDeptList,
  setMultipleRequirement,
}: any) => {
  // To get department list
  const [getDepartmentList, { data, loading: deptLoading }] = useLazyQuery<any>(
    GET_DEPARTMENT_LIST,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (daata: any) => {
        setCareInstDeptList(daata);
      },
    }
  );

  // Mutation to add careinstitution data
  const [
    addCareinstitutionRequirment,
    { data: addCareinstitutionRes, loading: addCareinstLoading },
  ] = useMutation<
    { addCareInstitutionRequirement: [IAddCargiverAppointmentRes] },
    { careInstitutionRequirementInput: ICareinstitutionFormSubmitValue[] }
  >(ADD_INSTITUTION_REQUIREMENT, {
    onCompleted({ addCareInstitutionRequirement }) {
      updateItemData(addCareInstitutionRequirement);
      // call a function
      handleupdateData(addCareInstitutionRequirement, 'careinstitution');
    },
  });

  // update Careinstitution Requirment
  const [
    updateCareinstitutionRequirment,
    { data: updateCareinstitutionRes, loading: updateCareinstitutionLoading },
  ] = useMutation<
    {
      updateCareInstitutionRequirement: any;
      // IAddCargiverAppointmentRes;
    },
    {
      id: number;
      careInstitutionRequirementInput: any;
    }
  >(UPDATE_INSTITUTION_REQUIREMENT, {
    onCompleted({ updateCareInstitutionRequirement }) {
      updateItemData([updateCareInstitutionRequirement]);
      handleupdateData([updateCareInstitutionRequirement], 'careinstitution');
    },
  });

  // Mutation to delete careinstitution requirement
  const [deleteCareinstitutionRequirement] = useMutation<
    {
      deleteCareInstitutionRequirement: any;
    },
    { id: number[] }
  >(DELETE_CAREINSTITUTION_REQUIREMENT, {
    onCompleted({ deleteCareInstitutionRequirement }) {
      setSelectedCareinstitution([]);
      handleupdateData(deleteCareInstitutionRequirement, 'careinstitution');
    },
  });

  const [careinstitutionFieldValues, setCareinstitutionFieldValues] = useState<
    any
  >();
  const [shiftOption, setshiftOption] = useState<
    IReactSelectTimeInterface[] | undefined
  >([]);

  const updateItemData = (itemData: any) => {
    let temp: any = [];
    selected.forEach(async (element: any, index: number) => {
      const {
        isWeekend = '',
        item = undefined,
        canstitution = {},
        isLeasing = '',
      } = element ? element : {};
      let stem = itemData[index];
      let data: any = {
        isWeekend,
        canstitution: {
          ...canstitution,
        },
        isLeasing,
        item: itemData[index],
      };

      temp.push(data);
    });

    setSelectedCareinstitution(temp);
  };

  /**
   *
   * @param index
   */
  // submit careinstitution form
  const handleSubmitCareinstitutionForm = async (
    values: ICareinstitutionFormValue,
    { setSubmitting }: FormikHelpers<ICareinstitutionFormValue>
  ) => {
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
      if (selected && selected.length) {
        // To add mulitple availabilty

        let careInstitutionRequirementInput: any[] = [];
        selected.forEach(async (element: any) => {
          const { item = '', canstitution = {} } = element ? element : {};
          const { canstitution: careinst = {} } = canstitution
            ? canstitution
            : {};

          const { attributes = [], street = '', city = '' } = careinst
            ? careinst
            : {};
          let stemp: ICareinstitutionFormSubmitValue = {
            userId:
              canstitution && canstitution.id ? parseInt(canstitution.id) : 0,
            date: item && item.date ? item.date : '',
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
          setshiftOption([]);
          if (appointmentId) {
            await updateCareinstitutionRequirment({
              variables: {
                id: parseInt(appointmentId),
                careInstitutionRequirementInput: stemp,
              },
            });
            setsavingBoth(false);
            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation(
                  'CARE_INSTITUTION_REQUIREMENT_UPDATE_SUCCESS_MSG'
                )
              );
            }
          }
        });
        if (!appointmentId) {
          await addCareinstitutionRequirment({
            variables: {
              careInstitutionRequirementInput,
            },
          });
          setMultipleRequirement(false);
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              languageTranslation(
                'CARE_INSTITUTION_REQUIREMENT_ADD_SUCCESS_MSG'
              )
            );
          }
        }
      }
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
    setSubmitting(false);
  };

  const onhandleDelete = async (id: string) => {
    if (id) {
      const { value } = await ConfirmBox({
        title: languageTranslation('CONFIRM_LABEL'),
        text: languageTranslation('CONFIRM_DELETE_CAREINSTITUTION_REQUIREMENT'),
      });
      if (!value) {
        return;
      } else {
        await deleteCareinstitutionRequirement({
          variables: {
            id: [parseInt(id)],
          },
        });

        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('DELETE_CAREINSTITUTION_REQUIREMENT_SUCCESS')
          );
        }
      }
    }
  };

  // Useeffect to set shift options according to dept.
  useEffect(() => {
    let deptId = selectedDept ? selectedDept.value : '';
    let departmentData: any = {};
    const careInstitutionTimesOptions:
      | IReactSelectTimeInterface[]
      | undefined = [];
    let values = careinstitutionFieldValues;

    let startTime: string = '';
    let endTime: string = '';
    const {
      isWeekend = '',
      item = undefined,
      canstitution = {},
      isLeasing = '',
    } = selected && selected.length && selected[0] ? selected[0] : {};

    if (deptId && (careinstitutionFieldValues || !(item && item.id))) {
      if (departmentList && departmentList.getDivision.length) {
        const { getDivision } = departmentList;
        departmentData = getDivision.filter(
          (dept: any) => dept.id === deptId
        )[0];
        if (departmentData && departmentData.times) {
          startTime = departmentData.times[0]
            ? departmentData.times[0].begin
            : '';
          endTime = departmentData.times[0] ? departmentData.times[0].end : '';
          departmentData.times.map((list: any) => {
            return careInstitutionTimesOptions.push({
              label: `${list.begin} - ${list.end} `,
              value: `${list.begin} - ${list.end} `,
              data: list,
            });
          });
        }
        setshiftOption(careInstitutionTimesOptions);
        let quali: number[] = [];
        if (values && values.qualificationId) {
          values.qualificationId.map((key: any, index: number) => {
            quali.push(key.value);
          });
        }

        let temp: any[] = [
          {
            isWeekend,
            canstitution: {
              ...canstitution,
            },
            isLeasing,
            item: {
              ...values,
              id: values && values.appointmentId ? values.appointmentId : '',
              department: selectedDept,
              qualificationId: values && values.qualificationId ? quali : [],
              address: departmentData ? departmentData.address : '',
              contactPerson: departmentData ? departmentData.contactPerson : '',
              departmentOfferRemarks: departmentData
                ? departmentData.commentsOffer
                : '',
              departmentRemarks: departmentData
                ? departmentData.commentsVisibleInternally
                : '',
              departmentBookingRemarks: departmentData
                ? departmentData.commentsCareGiver
                : '',
              shift:
                careInstitutionTimesOptions &&
                careInstitutionTimesOptions.length
                  ? careInstitutionTimesOptions[0]
                  : values
                  ? values.shift
                  : '',
              startTime: startTime ? startTime : values ? values.startTime : '',
              endTime: endTime ? endTime : values ? values.endTime : '',
              isLeasing: item && item.isLeasing ? item.isLeasing : false,
            },
          },
        ];

        if (selected && selected.length) {
          let data = [...selected];
          data[0] = temp[0];
          setSelectedCareinstitution(data);
        } else {
          setSelectedCareinstitution(temp);
        }
      }
    }
  }, [selectedDept]);

  // Set begin and end time according to shift selected
  useEffect(() => {
    let timeData: IReactSelectTimeInterface | undefined = selectedShift;
    let values = careinstitutionFieldValues;
    let time = timeData && !timeData.data ? timeData.value.split('-') : '';
    const {
      isWeekend = '',
      item = undefined,
      canstitution = {},
      isLeasing = '',
    } = selected && selected.length ? selected[0] : {};
    let quali: number[] = [];
    if (values && values.qualificationId) {
      values.qualificationId.map((key: any, index: number) => {
        quali.push(key.value);
      });
    }
    let data: any[] = [
      {
        isWeekend,
        canstitution: {
          ...canstitution,
        },
        isLeasing,
        item: {
          ...values,
          qualificationId: values && values.qualificationId ? quali : [],
          id: values && values.appointmentId ? values.appointmentId : '',
          shift: selectedShift,
          isLeasing: item && item.isLeasing ? item.isLeasing : false,
          startTime: timeData
            ? timeData.data && timeData.data.begin
              ? timeData.data.begin
              : time[0]
            : '',
          endTime: timeData
            ? timeData.data && timeData.data.begin
              ? timeData.data.end
              : time[1]
            : '',
        },
      },
    ];

    if (selectedShift && selectedShift.value) {
      if (selected && selected.length) {
        let temp = [...selected];
        temp[0] = data[0];
        setSelectedCareinstitution(temp);
      } else {
        setSelectedCareinstitution(data);
      }
    }
  }, [selectedShift]);

  let isFutureDate = false,
    item: any = {},
    careInstDetails: any = {},
    appointmentId = '',
    showQualification = false;

  // set item object
  if (selected && selected.length && selected[0] && selected[0].item) {
    item = selected[0].item;
    careInstDetails = selected[0].canstitution;
    isFutureDate = moment(item.date, 'YYYY/MM/DD').isAfter();
    appointmentId = item.id || '';
  }

  // To check appointment with leasing careInst or not
  let isLeasingAppointment = false;
  if (item) {
    isLeasingAppointment = item.isLeasing;
  }
  // To check appointment with leasing careInst or not
  showQualification =
    /* item && item.isLeasing ? true : false */
    selected &&
    selected.length &&
    selected[0] &&
    selected[0].canstitution &&
    selected[0].canstitution.canstitution &&
    selected[0].canstitution.canstitution.attributes
      ? selected[0].canstitution.canstitution.attributes.includes(
          CareInstTIMyoCYAttrId
        )
      : false;
  const {
    canstitution,
    qualificationId: mainQuali = [],
    id: userCanstId = '',
    divisionId = '',
  } = careInstDetails;
  const {
    name,
    comments,
    shift,
    bookingRemarks,
    offerRemarks,
    isWorkingProof,
    departmentRemarks,
    departmentBookingRemarks,
    departmentOfferRemarks,
    contactPerson,
    address,
    qualificationId = [],
    endTime,
    startTime,
    date,
    status,
    date: dateString,
    createdBy,
    createdAt,
    updatedAt,
  } = item;
  let departmentData: any = item ? item.department : undefined;

  // Options to show department data
  let careInstitutionDepartment: IReactSelectInterface[] = [];
  if (
    departmentList &&
    departmentList.getDivision &&
    departmentList.getDivision.length
  ) {
    const { getDivision } = departmentList;
    careInstitutionDepartment = getDivision.map((dept: any) => ({
      label: dept.name,
      value: dept && dept.id ? dept.id.toString() : '',
    }));
  }

  if (
    careInstitutionDepartment &&
    careInstitutionDepartment.length &&
    selected &&
    selected.length &&
    item &&
    item.divisionId
  ) {
    departmentData = careInstitutionDepartment.filter(
      (dept: any) => dept.value === item.divisionId
    );
  } else {
    if (divisionId) {
      departmentData = careInstitutionDepartment.filter(
        (dept: any) => dept.value === divisionId
      );
    }
  }
  let qualificationfor: any;
  if (
    item &&
    item.qualificationForCharge &&
    !item.qualificationForCharge.value
  ) {
    qualificationfor =
      qualificationList &&
      qualificationList.filter((value: any) => {
        return item && item.qualificationForCharge
          ? item.qualificationForCharge === value.value
          : // item.qualificationForCharge.includes(value.value)
            null;
      });
  } else {
    qualificationfor = [item.qualificationForCharge];
  }

  const { shortName = '', companyName = '' } = canstitution ? canstitution : {};

  let mainQualification =
    qualificationId && qualificationId.length
      ? qualificationId
      : mainQuali && mainQuali.length
      ? mainQuali
      : [];

  let qualiData: IReactSelectInterface[] = [];
  if (
    qualificationList &&
    qualificationList.length &&
    mainQualification &&
    mainQualification.length
  ) {
    qualiData = qualificationList.filter(({ value }: any) =>
      mainQualification.includes(value)
    );
  }
  /**
   *
   */

  const valuesForCareIntituionForm: ICareinstitutionFormValue = {
    appointmentId: item ? item.id : '',
    name: name ? name : shortName,
    date: date ? date : '',
    startTime: startTime ? startTime : '',
    endTime: endTime ? endTime : '',
    qualificationId: qualiData ? qualiData : undefined,
    qualificationForCharge:
      qualificationfor && qualificationfor[0] ? qualificationfor[0] : undefined,
    address: address ? address : '',
    contactPerson: contactPerson ? contactPerson : '',
    departmentOfferRemarks: departmentOfferRemarks
      ? departmentOfferRemarks
      : '',
    departmentBookingRemarks: departmentBookingRemarks
      ? departmentBookingRemarks
      : '',
    departmentRemarks: departmentRemarks ? departmentRemarks : '',
    isWorkingProof: isWorkingProof ? isWorkingProof : false,
    offerRemarks: offerRemarks ? offerRemarks : '',
    bookingRemarks: bookingRemarks ? bookingRemarks : '',
    shift: shift ? shift : undefined,
    department:
      departmentData && departmentData[0] ? departmentData[0] : departmentData,
    comments: comments ? comments : '',
    status: status ? status : '',
    careInstitutionDepartment,
    createdBy: createdBy ? createdBy : '',
    createdAt: createdAt ? createdAt : '',
    updatedAt: updatedAt ? updatedAt : '',
  };

  // multipleRequirement
  let activeDateCareinstitution = !multipleRequirement
    ? [item.date]
    : selected && selected.length
    ? selected.map((cell: any) => cell.item.date)
    : [];

  const handleStarMark = (id: any) => {
    if (starMarkCanstitution.isStar) {
      filterUpdated({
        ...filters,
        careInstitutionId: null,
        soloCareinstitution: undefined,
        effects: 'careinstitution',
      });
      setstarMarkCanstitution({
        isStar: false,
        setIndex: -1,
        id: '',
        isSecondStar: false,
        divisionId: -1,
      });
    } else {
      filterUpdated({
        ...filters,
        careInstitutionId: id ? parseInt(id) : null,
        soloCareinstitution: {
          label: shortName ? shortName : id,
          value: id,
          companyName: companyName,
        },
        effects: 'careinstitution',
      });
      setstarMarkCanstitution({
        isStar: true,
        setIndex: 1,
        id: id,
        isSecondStar: starMarkCanstitution.isSecondStar,
        divisionId: starMarkCanstitution.divisionId,
      });
      if (id) {
        getDepartmentList({
          variables: {
            userId: parseInt(id),
            locked: false,
          },
        });
      }
    }
  };
  /**
   *
   */
  return (
    <>
      <Formik
        initialValues={valuesForCareIntituionForm}
        onSubmit={handleSubmitCareinstitutionForm}
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

          useEffect(() => {
            if (savingBoth) {
              handleSubmit();
            }
          }, [savingBoth]);

          // Custom function to handle react select fields
          const handleSelect = (
            selectOption: IReactSelectInterface,
            name: string
          ) => {
            setFieldValue(name, selectOption);
            if (name === 'department') {
              setCareinstitutionFieldValues(values);
              selectedDept = selectOption;
            }
            if (name === 'shift') {
              setCareinstitutionFieldValues(values);
              selectedShift = selectOption;
              // props.setcareInstituionShift(selectOption, values);
            }
          };

          const DepartmentError: any = errors.department;
          const qualificationError: any = errors.qualificationId;
          const shiftOptions: any =
            shiftOption && shiftOption.length ? shiftOption : ShiftTime;
          let isCorrespondingAppointment: boolean = false;
          // if (
          //   selected &&
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
                      'requirement-bg': item.status === 'default',
                      'matching-bg': item.status === 'linked',
                      'contract-bg': item.status === 'confirmed',
                      'availability-bg':
                        item.status === 'offered' && !isFutureDate,
                      'availability-dark-bg':
                        item.status === 'offered' && isFutureDate,
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
                                    onClick={() =>
                                      name ? handleStarMark(userCanstId) : ''
                                    }
                                  >
                                    <InputGroupText>
                                      <i
                                        className={
                                          name &&
                                          starMarkCanstitution.isStar &&
                                          parseInt(starMarkCanstitution.id) ===
                                            parseInt(userCanstId)
                                            ? 'fa fa-star theme-text'
                                            : 'fa fa-star'
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
                                {activeDateCareinstitution
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
                                            errors.startTime &&
                                            touched.startTime
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
                                      handleQualification(qualificationId);
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
                                    options={qualificationList}
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
                                    options={qualificationList}
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
                                  options={careInstitutionDepartment}
                                  isDisabled={
                                    careInstitutionDepartment.length <= 0
                                      ? true
                                      : false
                                  }
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
                                {languageTranslation(
                                  'REMARKS_OFFER_DEPARTMENT'
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
                                        setFieldValue(
                                          'isWorkingProof',
                                          checked
                                        );
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
                            onClick={() => onhandleDelete(appointmentId)}
                            disabled={!appointmentId}
                          >
                            {languageTranslation('DELETE')}
                          </Button>
                          <Button
                            className='btn-save'
                            color='primary'
                            onClick={handleSubmit}
                            disabled={
                              addCareinstLoading || updateCareinstitutionLoading
                            }
                          >
                            {addCareinstLoading ||
                            updateCareinstitutionLoading ? (
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

export default CareinstitutionForm;
