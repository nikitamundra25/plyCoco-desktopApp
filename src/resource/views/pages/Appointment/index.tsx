import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Row, Button } from 'reactstrap';
import {
  getDaysArrayByMonth,
  germanNumberFormat,
  languageTranslation
} from '../../../../helpers';
import './index.scss';
import AppointmentNav from './AppointmentNav';
import CaregiverListView from './Caregiver/CaregiverListView';
import CarinstituionListView from './Careinstituion/CareinstituionListView';
import {
  IGetDaysArrayByMonthRes,
  IQualifications,
  IReactSelectInterface,
  ICaregiverFormValue,
  ICareinstitutionFormValue,
  IAddCargiverAppointmentRes,
  IDate,
  IReactSelectTimeInterface,
  ICareinstitutionFormSubmitValue,
  IStarInterface
} from '../../../../interfaces';
import moment from 'moment';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_QUALIFICATION_ATTRIBUTE,
  AppointmentsQueries,
  CareInstitutionQueries
} from '../../../../graphql/queries';
const [
  ADD_CAREGIVER_AVABILITY,
  ADD_INSTITUTION_REQUIREMENT
] = AppointmentMutations;
import CaregiverFormView from './Caregiver/CaregiverForm';
import CareinstitutionFormView from './Careinstituion/CareinstitutionForm';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import {
  CareGiverValidationSchema,
  CareInstitutionValidationSchema
} from '../../../validations/AppointmentsFormValidationSchema';
import { toast } from 'react-toastify';
import { AppointmentMutations } from '../../../../graphql/Mutations';
import { defaultDateFormat } from '../../../../config';
const [, , GET_DEPARTMENT_LIST, ,] = CareInstitutionQueries;
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
let toastId: any = null;
const Appointment: FunctionComponent = () => {
  const [daysData, setDaysData] = useState<IGetDaysArrayByMonthRes | null>(
    null
  );
  const [activeMonth, setActiveMonth] = useState<number>(moment().month());
  const [activeYear, setActiveYear] = useState<number>(moment().year());
  const [qualification, setqualification] = useState<any>([]);
  const [caregiversList, setcaregiversList] = useState<Object[]>([]);
  const [careinstitutionList, setcareinstitutionList] = useState<Object[]>([]);
  const [selectedCareGiver, setselectedCareGiver] = useState<any>({});
  const [selectedCareinstitution, setselectedCareinstitution] = useState<any>(
    {}
  );
  const [shiftOption, setshiftOption] = useState<
    IReactSelectTimeInterface[] | undefined
  >([]);
  const [careInstituionShift, setcareInstituionShift] = useState<
    IReactSelectTimeInterface
  >();
  //state for care institution department
  const [careInstituionDept, setcareInstituionDept] = useState<
    IReactSelectInterface
  >();
  // set field to update formik values
  const [
    updateCanstitutionFormikValues,
    setupdateCanstitutionFormikValues
  ] = useState<any>();
  const [careInstituionDeptData, setcareInstituionDeptData] = useState<any>([]);
  const [activeDateCaregiver, setactiveDateCaregiver] = useState<IDate[]>([]);
  const [activeDateCareinstitution, setactiveDateCareinstitution] = useState<
    IDate[]
  >([]);

  //For selected Availability
  const [selctedAvailability, setselctedAvailability] = useState({});
  /*  */
  //For selected Requirement
  const [selctedRequirement, setselctedRequirement] = useState({});
  /*  */
  const [timeSlotError, setTimeSlotError] = useState<string>('');
  // maintain star mark for careinstitution
  const [starCanstitution, setstarCanstitution] = useState<IStarInterface>({
    isStar: false,
    setIndex: -1
  });
  const [secondStarCanstitution, setsecondStarCanstitution] = useState<boolean>(
    false
  );

  // For careinstitution fields
  const [valuesForCareinstitution, setvaluesForCareinstitution] = useState<
    ICareinstitutionFormValue
  >({
    name: '',
    date: '',
    shift: undefined,
    endTime: '',
    startTime: '',
    qualificationId: undefined,
    department: undefined,
    address: '',
    contactPerson: '',
    departmentOfferRemarks: '',
    departmentBookingRemarks: '',
    departmentRemarks: '',
    isWorkingProof: false,
    offerRemarks: '',
    bookingRemarks: '',
    comments: ''
  });

  // Mutation to add careGiver data
  const [addCaregiver, { error, data: addCaregiverRes }] = useMutation<
    { addCareGiverAvability: IAddCargiverAppointmentRes },
    { careGiverAvabilityInput: any }
  >(ADD_CAREGIVER_AVABILITY);

  // Mutation to add careinstitution data
  const [
    addCareinstitutionRequirment,
    { data: addCareinstitutionRes }
  ] = useMutation<
    { addCareInstitutionRequirement: IAddCargiverAppointmentRes },
    { careInstitutionRequirementInput: ICareinstitutionFormSubmitValue }
  >(ADD_INSTITUTION_REQUIREMENT);

  // To get caregiver list from db
  const [
    getDepartmentList,
    { data: departmentList, refetch, loading: deptLoading }
  ] = useLazyQuery<any>(GET_DEPARTMENT_LIST);

  // To fetch caregivers by qualification id
  const [
    fetchCaregiverList,
    { data: careGiversList, loading: caregiverLoading }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache'
  });

  // To fetch careinstitution by qualification id
  const [
    fetchCareinstitutionList,
    { data: careInstitutionList, loading: careinstitutionLoading }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache'
  });

  // To fetch qualification attributes list
  const { data } = useQuery<IQualifications>(GET_QUALIFICATION_ATTRIBUTE);
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (data && data.getQualifications) {
    data.getQualifications.forEach((quali: any) => {
      qualificationList.push({
        label: quali.name,
        value: quali.id
      });
    });
  }

  // To store users list into state
  useEffect(() => {
    if (careGiversList && careGiversList.getUserByQualifications) {
      const { getUserByQualifications } = careGiversList;
      if (getUserByQualifications && getUserByQualifications.length) {
        setcaregiversList(getUserByQualifications);
      }
    }
    if (careInstitutionList && careInstitutionList.getUserByQualifications) {
      const { getUserByQualifications } = careInstitutionList;
      if (getUserByQualifications && getUserByQualifications.length) {
        setcareinstitutionList(getUserByQualifications);
      }
    }
  }, [careGiversList, careInstitutionList]);

  // Reset the users list
  const handleReset = (name: string) => {
    if (name === 'caregiver') {
      if (careGiversList && careGiversList.getUserByQualifications) {
        const { getUserByQualifications } = careGiversList;
        if (getUserByQualifications && getUserByQualifications.length) {
          setcaregiversList(getUserByQualifications);
        }
      }
    } else {
      if (careInstitutionList && careInstitutionList.getUserByQualifications) {
        const { getUserByQualifications } = careInstitutionList;
        if (getUserByQualifications && getUserByQualifications.length) {
          setcareinstitutionList(getUserByQualifications);
        }
      }
    }
  };

  // Select qualification attribute
  const handleQualification = (selectedOption: IReactSelectInterface[]) => {
    setqualification(selectedOption);
  };

  // To fetch users according to qualification selected
  useEffect(() => {
    let temp: any = [];
    qualification.map((key: any, index: number) => {
      temp.push(parseInt(key.value));
    });
    // get careGivers list
    fetchCaregiverList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: 'caregiver'
      }
    });
    // get careInstitution list
    fetchCareinstitutionList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: 'canstitution'
      }
    });
  }, [qualification]);

  // set careGivers list options
  const careGiversOptions: IReactSelectInterface[] | undefined = [];
  if (careGiversList && careGiversList.getUserByQualifications) {
    const { getUserByQualifications } = careGiversList;
    if (getUserByQualifications && getUserByQualifications.length) {
      getUserByQualifications.map((list: any) => {
        return careGiversOptions.push({
          label: `${list.firstName} ${list.lastName} `,
          value: list.id ? list.id : ''
        });
      });
    }
  }

  // set careInstitution list options
  const careInstitutionOptions: IReactSelectInterface[] | undefined = [];
  if (careInstitutionList && careInstitutionList.getUserByQualifications) {
    const { getUserByQualifications } = careInstitutionList;
    if (getUserByQualifications && getUserByQualifications.length) {
      getUserByQualifications.map((list: any) => {
        return careInstitutionOptions.push({
          label: `${list.firstName} ${list.lastName} `,
          value: list.id ? list.id : ''
        });
      });
    }
  }
  // To set initial month and year
  useEffect(() => {
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(
      moment().month(),
      moment().year()
    );
    setDaysData(res);
  }, []);

  // On click Today
  const handleToday = () => {
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(
      moment().month(),
      moment().year()
    );
    setDaysData(res);
  };

  // On previous month click
  const handlePrevious = () => {
    let month: number = activeMonth - 1;
    let year: number = activeYear;

    // To check if active month is january than set month to december & year to previous year
    if (activeMonth === 0) {
      month = 11;
      year = activeYear - 1;
    }
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    setActiveMonth(month);
    setActiveYear(year);
    setDaysData(res);
  };

  // On next month click
  const handleNext = () => {
    let month: number = activeMonth + 1;
    let year: number = activeYear;
    // To check if active month is december than set month to january & year to next year
    if (activeMonth === 11) {
      month = 0;
      year = activeYear + 1;
    }
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    setActiveMonth(month);
    setActiveYear(year);
    setDaysData(res);
  };

  const handleDayClick = (selectedDay: any) => {
    let year: number = selectedDay.getFullYear();
    let month: number = selectedDay.getMonth();
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    setActiveMonth(month);
    setActiveYear(year);
    setDaysData(res);
  };

  // Adding Row into table
  const onAddingRow = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    index: number
  ) => {
    e.preventDefault();
    if (name === 'caregiver') {
      let temp: any = [...caregiversList];
      temp.splice(index + 1, 0, { ...temp[index], newRow: true });
      setcaregiversList(temp);
    } else {
      let temp: any = [...careinstitutionList];
      temp.splice(index + 1, 0, { ...temp[index], newRow: true });
      setcareinstitutionList(temp);
    }
  };

  // change department
  useEffect(() => {
    let deptId = careInstituionDept ? careInstituionDept.value : '';
    let departmentData: any = {};
    const careInstitutionTimesOptions:
      | IReactSelectTimeInterface[]
      | undefined = [];
    let values = updateCanstitutionFormikValues;
    let startTime: string = '';
    let endTime: string = '';
    if (deptId) {
      if (departmentList && departmentList.getDivision.length) {
        const { getDivision } = departmentList;
        departmentData = getDivision.filter((dept: any) => dept.id === deptId);
        if (departmentData[0] && departmentData[0].times) {
          startTime = departmentData[0].times[0]
            ? departmentData[0].times[0].begin
            : '';
          endTime = departmentData[0].times[0]
            ? departmentData[0].times[0].end
            : '';
          departmentData[0].times.map((list: any) => {
            return careInstitutionTimesOptions.push({
              label: `${list.begin} - ${list.end} `,
              value: `${list.begin} - ${list.end} `,
              data: list
            });
          });
          // setcareInstituionShift(careInstitutionTimesOptions[0]);
        }
        setshiftOption(careInstitutionTimesOptions);
        let temp: ICareinstitutionFormValue = {
          ...values,
          department: careInstituionDept,
          address: departmentData[0].address,
          contactPerson: departmentData[0].contactPerson,
          departmentOfferRemarks: departmentData[0].commentsOffer,
          departmentRemarks: departmentData[0].commentsVisibleInternally,
          departmentBookingRemarks: departmentData[0].commentsCareGiver,
          shift: careInstitutionTimesOptions[0],
          startTime,
          endTime
        };

        setvaluesForCareinstitution(temp);
      }
    }
  }, [careInstituionDept]);

  // Change time shift option
  useEffect(() => {
    let timeData: IReactSelectTimeInterface | undefined = careInstituionShift;
    let values = updateCanstitutionFormikValues;
    let time = timeData && !timeData.data ? timeData.value.split('-') : '';
    let temp: any = {
      ...values,
      shift: careInstituionShift,
      startTime: timeData
        ? timeData.data && timeData.data.begin
          ? timeData.data.begin
          : time[0]
        : '',
      endTime: timeData
        ? timeData.data && timeData.data.begin
          ? timeData.data.end
          : time[1]
        : ''
    };
    setvaluesForCareinstitution(temp);
  }, [careInstituionShift]);

  // select careGiver or careinstitution
  const handleSelectedUser = (
    list: any,
    date: any,
    name: string,
    selctedAvailability: any
  ) => {
    if (name === 'caregiver') {
      setselctedAvailability(selctedAvailability);
      setselectedCareGiver(list);
      if (date) {
        setactiveDateCaregiver(date);
      }
    } else {
      let temp: ICareinstitutionFormValue;
      setselctedRequirement(selctedAvailability);
      console.log('selctedAvailability', selctedAvailability);

      if (!starCanstitution.isStar) {
        // Fetch values in case of edit by default it will be null or undefined
        const {
          id = '',
          userId = '',
          name = '',
          date = '',
          startTime = '',
          endTime = '',
          qualificationId = [],
          divisionId = '',
          address = '',
          contactPerson = '',
          bookingRemarks = '',
          departmentOfferRemarks = '',
          departmentBookingRemarks = '',
          departmentRemarks = '',
          f = '',
          n = '',
          s = '',
          isWorkingProof = false,
          offerRemarks = '',
          comments = ''
        } = selectedCareinstitution ? selectedCareinstitution : {};

        setselectedCareinstitution(list);
        temp = {
          ...valuesForCareinstitution,
          name: name ? name : `${list.firstName} ${list.lastName}`,
          date: date ? date : valuesForCareinstitution.date,
          startTime: startTime ? startTime : valuesForCareinstitution.startTime,
          endTime: endTime ? endTime : valuesForCareinstitution.endTime,
          // qualificationId : [],
          // department : '',
          address: address ? address : valuesForCareinstitution.address,
          contactPerson: contactPerson
            ? contactPerson
            : valuesForCareinstitution.contactPerson,
          bookingRemarks: bookingRemarks
            ? bookingRemarks
            : valuesForCareinstitution.bookingRemarks,
          departmentOfferRemarks: departmentOfferRemarks
            ? departmentOfferRemarks
            : valuesForCareinstitution.departmentOfferRemarks,
          departmentBookingRemarks: departmentBookingRemarks
            ? departmentBookingRemarks
            : valuesForCareinstitution.departmentBookingRemarks,
          departmentRemarks: departmentRemarks
            ? departmentRemarks
            : valuesForCareinstitution.departmentRemarks,
          isWorkingProof: isWorkingProof ? true : false,
          offerRemarks: '',
          comments: ''
        };
      } else {
        temp = {
          ...valuesForCareinstitution,
          name: `${selectedCareinstitution.firstName} ${selectedCareinstitution.lastName}`
        };
      }

      setvaluesForCareinstitution(temp);
      if (date) {
        setactiveDateCareinstitution(date);
      }
    }
  };

  useEffect(() => {
    // call query
    let userId: string = selectedCareinstitution
      ? selectedCareinstitution.id
      : '';
    getDepartmentList({
      variables: {
        userId: parseInt(userId),
        locked: null
      }
    });
  }, [selectedCareinstitution]);

  const careInstitutionDepartment: IReactSelectInterface[] | undefined = [];
  if (departmentList && departmentList.getDivision.length) {
    const { getDivision } = departmentList;
    getDivision.forEach((dept: any) =>
      careInstitutionDepartment.push({
        label: dept.name,
        value: dept && dept.id ? dept.id.toString() : ''
      })
    );
  }

  // useEffect for filtering department data in careinstitution list
  useEffect(() => {
    if (
      departmentList &&
      departmentList.getDivision.length &&
      starCanstitution.isStar
    ) {
      const { getDivision } = departmentList;
      setcareInstituionDeptData(getDivision);
    }
  }, [departmentList]);

  // handle first star of careinstitution and show department list
  const handleFirstStarCanstitution = async (list: any, index: number) => {
    setselectedCareinstitution(list);
    console.log('starCanstitution', starCanstitution);
    if (!starCanstitution.isStar) {
      setstarCanstitution({
        isStar: true,
        setIndex: index
      });
    } else {
      setstarCanstitution({
        isStar: false,
        setIndex: -1
      });
    }
    if (list) {
      await getDepartmentList({
        variables: {
          userId: parseInt(list.id),
          locked: null
        }
      });
    } else {
      setcareInstituionDeptData([]);
    }
  };

  //  handle second star of careinstitution and autoselect department
  const onhandleSecondStarCanstitution = (dept: any) => {
    setsecondStarCanstitution(!secondStarCanstitution);
    let data: any = [];
    data.push(dept);
    console.log('dept', dept);
    setcareInstituionDeptData(data);
    setcareInstituionDept({ label: dept.name, value: dept.id });
  };

  // Select single user from list and hide the rest
  const handleSecondStar = (list: object, index: number, name: string) => {
    let temp: any = [];
    temp.push(list);
    if (name === 'caregiver') {
      setcaregiversList(temp);
    } else {
      setcareinstitutionList(temp);
    }
  };

  // submit caregiver form
  const handleSubmitCaregiverForm = async (
    values: ICaregiverFormValue,
    { setSubmitting, setFieldError }: FormikHelpers<ICaregiverFormValue>
  ) => {
    const {
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
    } = values;
    try {
      if (f || s || n) {
        setTimeSlotError('');
        let CareGiverAvabilityInput: any = {
          userId: selectedCareGiver ? parseInt(selectedCareGiver.id) : '',
          date:
            activeDateCaregiver && activeDateCaregiver.length
              ? activeDateCaregiver[0].isoString
              : '',
          fee: fee ? parseFloat(fee.replace(/,/g, '.')) : null,
          weekendAllowance: weekendAllowance
            ? parseFloat(weekendAllowance.replace(/,/g, '.'))
            : null,
          holidayAllowance: holidayAllowance
            ? parseFloat(holidayAllowance.replace(/,/g, '.'))
            : null,
          nightFee: nightFee ? parseFloat(nightFee.replace(/,/g, '.')) : null,
          nightAllowance:
            nightAllowance && nightAllowance.value
              ? nightAllowance.value
              : null,
          workingProofRecieved: workingProofRecieved ? true : false,
          distanceInKM: distanceInKM ? parseFloat(distanceInKM) : null,
          feePerKM: feePerKM ? parseFloat(feePerKM) : null,
          travelAllowance: travelAllowance ? parseFloat(travelAllowance) : null,
          otherExpenses: otherExpenses
            ? parseFloat(otherExpenses.replace(/,/g, '.'))
            : null,
          remarksCareGiver: remarksCareGiver ? remarksCareGiver : null,
          remarksInternal: remarksInternal ? remarksInternal : null,
          f: f ? 'available' : 'default',
          s: s ? 'available' : 'default',
          n: n ? 'available' : 'default',
          status: 'default'
        };
        console.log('CareGiverAvabilityInput', CareGiverAvabilityInput);
        await addCaregiver({
          variables: {
            careGiverAvabilityInput: [{ ...CareGiverAvabilityInput }]
          }
        });
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CARE_GIVER_REQUIREMENT_ADD_SUCCESS_MSG')
          );
        }
      } else {
        setTimeSlotError(languageTranslation('CAREGIVER_TIME_SLOT_ERROR_MSG'));
        return;
      }
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
    setSubmitting(false);
  };

  // submit careinstitution form
  const handleSubmitCareinstitutionForm = async (
    values: ICareinstitutionFormValue,
    { setSubmitting, setFieldError }: FormikHelpers<ICareinstitutionFormValue>
  ) => {
    const {
      name,
      date,
      shift,
      endTime,
      startTime,
      qualificationId,
      department,
      address,
      contactPerson,
      departmentOfferRemarks,
      offerRemarks,
      bookingRemarks,
      isWorkingProof,
      departmentBookingRemarks,
      departmentRemarks,
      comments
    } = values;

    let quali: number[] = [];
    if (qualificationId) {
      qualificationId.map((key: any, index: number) => {
        quali.push(parseInt(key.value));
      });
    }

    try {
      let careInstitutionRequirementInput: ICareinstitutionFormSubmitValue = {
        userId: selectedCareinstitution
          ? parseInt(selectedCareinstitution.id)
          : 0,
        name,
        date:
          activeDateCareinstitution && activeDateCareinstitution.length
            ? moment(activeDateCareinstitution[0].isoString).format(
                defaultDateFormat
              )
            : '',
        startTime,
        endTime,
        divisionId:
          department && department.value ? parseInt(department.value) : null,
        qualificationId: quali,
        address,
        contactPerson,
        departmentOfferRemarks: departmentOfferRemarks
          ? departmentOfferRemarks
          : '',
        departmentBookingRemarks,
        departmentRemarks,
        isWorkingProof,
        offerRemarks,
        bookingRemarks,
        comments
      };
      await addCareinstitutionRequirment({
        variables: {
          careInstitutionRequirementInput
        }
      });

      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('CARE_INSTITUTION_REQUIREMENT_ADD_SUCCESS_MSG')
        );
      }
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
    setSubmitting(false);
  };

  // Fetch values in case of edit by default it will be null or undefined selctedAvailability

  let firstName: string = '',
    lastName: string = '',
    caregiver: any = {};

  if (selctedAvailability) {
    // {date: "2020-03-04T12:39:44.875Z"
    // distanceInKM: 121
    // f: "available"
    // fee: 9999.99
    // feePerKM: 44
    // holidayAllowance: 12
    // id: "41"
    // n: "default"
    // nightAllowance: "From 8:45 p.m."
    // nightFee: 85
    // otherExpenses: 44
    // remarksCareGiver: "hello"
    // remarksInternal: "world"
    // s: "available"
    // status: "default"
    // weekendAllowance: 32
    // workingProofRecieved: false} = selctedAvailability
    caregiver = selctedAvailability ? selctedAvailability : {};
  } else {
    (firstName = selectedCareGiver ? selectedCareGiver.firstName : ''),
      (lastName = selectedCareGiver ? selectedCareGiver.lastName : ''),
      (caregiver = selectedCareGiver ? selectedCareGiver.caregiver : {});
  }
  console.log('selectedCareGiver', caregiver);

  const {
    nightAllowance = undefined,
    fee = null,
    nightFee = caregiver && caregiver.night ? caregiver.night : null,
    weekendAllowance = null,
    holiday = null,
    distanceInKM = caregiver ? caregiver.distanceInKM : ''
  } = caregiver ? caregiver : {};

  const valuesForCaregiver: ICaregiverFormValue = {
    firstName,
    lastName,
    fee: fee !== null ? germanNumberFormat(caregiver.fee) : '',
    nightFee: nightFee !== null ? germanNumberFormat(nightFee) : '',
    nightAllowance: nightAllowance
      ? { value: caregiver.nightAllowance, label: caregiver.nightAllowance }
      : undefined,
    holidayAllowance: holiday !== null ? germanNumberFormat(holiday) : '',
    weekendAllowance:
      weekendAllowance !== null ? germanNumberFormat(weekendAllowance) : '',
    workingProofRecieved: false,
    distanceInKM,
    feePerKM: '',
    travelAllowance: '',
    otherExpenses: '',
    workingHoursFrom: '',
    workingHoursTo: '',
    breakFrom: '',
    breakTo: '',
    remarksCareGiver: '',
    remarksInternal: '',
    f: false,
    s: false,
    n: false
  };

  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <AppointmentNav
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            daysData={daysData}
            qualificationList={qualificationList}
            handleQualification={handleQualification}
            careInstitutionList={careInstitutionOptions}
            careGiversList={careGiversOptions}
            handleDayClick={handleDayClick}
            handleToday={handleToday}
          />

          <div className='common-content flex-grow-1'>
            <div>
              <Row>
                <Col lg={'5'}>
                  <CaregiverListView
                    daysData={daysData}
                    loading={caregiverLoading}
                    careGiversList={caregiversList ? caregiversList : []}
                    onAddingRow={onAddingRow}
                    handleSelectedUser={handleSelectedUser}
                    handleSecondStar={handleSecondStar}
                    handleReset={handleReset}
                  />
                  <CarinstituionListView
                    daysData={daysData}
                    loading={careinstitutionLoading}
                    careInstitutionList={
                      careinstitutionList ? careinstitutionList : []
                    }
                    onAddingRow={onAddingRow}
                    handleSelectedUser={handleSelectedUser}
                    handleSecondStar={handleSecondStar}
                    handleReset={handleReset}
                    handleFirstStarCanstitution={handleFirstStarCanstitution}
                    careInstituionDeptData={careInstituionDeptData}
                    starCanstitution={starCanstitution}
                    secondStarCanstitution={secondStarCanstitution}
                    deptLoading={deptLoading}
                    onhandleSecondStarCanstitution={
                      onhandleSecondStarCanstitution
                    }
                  />
                </Col>
                <Col lg={'7'}>
                  <Row>
                    <Col lg={'6'} className='px-lg-0'>
                      <Formik
                        initialValues={valuesForCaregiver}
                        onSubmit={handleSubmitCaregiverForm}
                        enableReinitialize={true}
                        validationSchema={CareGiverValidationSchema}
                        children={(props: FormikProps<ICaregiverFormValue>) => {
                          return (
                            <CaregiverFormView
                              {...props}
                              selectedCareGiver={selectedCareGiver}
                              activeDateCaregiver={
                                activeDateCaregiver &&
                                activeDateCaregiver.length
                                  ? activeDateCaregiver[0]
                                  : undefined
                              }
                              addCaregiverRes={
                                addCaregiverRes &&
                                addCaregiverRes.addCareGiverAvability
                                  ? addCaregiverRes.addCareGiverAvability
                                  : ''
                              }
                              timeSlotError={timeSlotError}
                              selctedAvailability={selctedAvailability}
                            />
                          );
                        }}
                      />
                    </Col>
                    <Col lg={'6'}>
                      <Formik
                        initialValues={valuesForCareinstitution}
                        onSubmit={handleSubmitCareinstitutionForm}
                        enableReinitialize={true}
                        validationSchema={CareInstitutionValidationSchema}
                        children={(
                          props: FormikProps<ICareinstitutionFormValue>
                        ) => {
                          return (
                            <CareinstitutionFormView
                              {...props}
                              activeDateCareinstitution={
                                activeDateCareinstitution &&
                                activeDateCareinstitution.length
                                  ? activeDateCareinstitution[0]
                                  : undefined
                              }
                              setcareInstituionDept={(
                                deptData: any,
                                values: any
                              ) => {
                                setcareInstituionDept(deptData);
                                setupdateCanstitutionFormikValues(values);
                              }}
                              setcareInstituionShift={(
                                shiftData: any,
                                values: any
                              ) => {
                                setcareInstituionShift(shiftData);
                                setupdateCanstitutionFormikValues(values);
                              }}
                              selectedCareinstitution={selectedCareinstitution}
                              addCareinstitutionRes={
                                addCareinstitutionRes &&
                                addCareinstitutionRes.addCareInstitutionRequirement
                                  ? addCareinstitutionRes.addCareInstitutionRequirement
                                  : ''
                              }
                              qualificationList={qualificationList}
                              careInstitutionDepartment={
                                careInstitutionDepartment
                              }
                              careInstitutionTimesOptions={shiftOption}
                              secondStarCanstitution={secondStarCanstitution}
                              selctedRequirement={selctedRequirement}
                            />
                          );
                        }}
                      />
                    </Col>
                    <Col lg={'12'}>
                      <div className='d-flex align-items-center justify-content-center'>
                        <Button
                          className='btn-common  mt-0 mb-2 mx-2'
                          color='primary'
                        >
                          <i className='fa fa-save mr-2' />
                          {languageTranslation('SAVE_BOTH')}
                        </Button>
                        <Button
                          className='btn-common mt-0 mb-2 mx-2'
                          color='secondary'
                        >
                          <i className='fa fa-link mr-2' />
                          {languageTranslation('LINK')}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
