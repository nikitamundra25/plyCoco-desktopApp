import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Row, Button } from 'reactstrap';
import {
  getDaysArrayByMonth,
  germanNumberFormat,
  languageTranslation,
  timeDiffernce
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
  IDaysArray,
  IStarInterface,
  IAttributeValues,
  IAttributeOptions,
  ICareGiverValues
} from '../../../../interfaces';
import moment from 'moment';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_QUALIFICATION_ATTRIBUTE,
  AppointmentsQueries,
  CareInstitutionQueries,
  CareGiverQueries
} from '../../../../graphql/queries';
import CaregiverFormView from './Caregiver/CaregiverForm';
import CareinstitutionFormView from './Careinstituion/CareinstitutionForm';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import {
  CareGiverValidationSchema,
  CareInstitutionValidationSchema
} from '../../../validations/AppointmentsFormValidationSchema';
import { toast } from 'react-toastify';
import { AppointmentMutations } from '../../../../graphql/Mutations';
import { dbAcceptableFormat } from '../../../../config';
import { ConfirmBox } from '../../components/ConfirmBox';
import { addAvailabilityRequest } from '../../../../store/actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const [, , , , , GET_CAREGIVER_ATTRIBUTES] = CareGiverQueries;
const [
  ADD_CAREGIVER_AVABILITY,
  ADD_INSTITUTION_REQUIREMENT,
  UPDATE_CAREGIVER_AVABILITY,
  UPDATE_INSTITUTION_REQUIREMENT,
  DELETE_CAREINSTITUTION_REQUIREMENT,
  DELETE_CAREGIVER_AVABILITY,
  LINK_REQUIREMENT,
  UN_LINK_REQUIREMENT
] = AppointmentMutations;
const [, , GET_DEPARTMENT_LIST, ,] = CareInstitutionQueries;
const [
  GET_USERS_BY_QUALIFICATION_ID,
  GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID,
  GET_CAREINSTITUTION_REQUIREMENT_BY_ID,
  GET_CAREGIVER_AVABILITY_DETAILS_BY_ID
] = AppointmentsQueries;

let toastId: any = null;

const Appointment: FunctionComponent = (props: any) => {
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

  // Fetch attribute list from db
  const { data: attributeData, loading } = useQuery<{
    getCaregiverAtrribute: IAttributeValues[];
  }>(GET_CAREGIVER_ATTRIBUTES);
  //For selected Availability
  const [selctedAvailability, setselctedAvailability] = useState<any>({});
  const [selectedCells, setSelectedCells] = useState<any[]>();

  /*  */
  //For selected Requirement setSelectedCellsCareinstitution
  const [selctedRequirement, setselctedRequirement] = useState<any>({});
  const [
    selectedCellsCareinstitution,
    setselectedCellsCareinstitution
  ] = useState<any[]>();

  /*  */
  // store the previous entered value in state
  const [caregiverLastTimeValues, setcaregiverLastTimeValues] = useState<any>();

  // For filtering appointments in navbar
  const [filterByAppointments, setfilterByAppointments] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  const [caregiverAttributeOptions, setCaregiverAttributeOptions] = useState<
    IAttributeOptions[] | undefined
  >([]);

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
    appointmentId: '',
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
    {
      addCareGiverAvability: IAddCargiverAppointmentRes;
    },
    {
      careGiverAvabilityInput: any;
    }
  >(ADD_CAREGIVER_AVABILITY, {
    onCompleted() {
      fetchingCareGiverData();
    }
  });

  // Mutation to update careGiver data
  const [updateCaregiver, { data: updateCaregiverRes }] = useMutation<
    {
      CareGiverAvability: IAddCargiverAppointmentRes;
    },
    {
      id: number;
      careGiverAvabilityInput: any;
    }
  >(UPDATE_CAREGIVER_AVABILITY, {
    onCompleted() {
      fetchingCareGiverData();
    }
  });

  // Mutation to delete caregiver
  const [deleteCaregiverRequirement, {}] = useMutation<
    {
      deleteCaregiver: any;
    },
    { id: number }
  >(DELETE_CAREGIVER_AVABILITY, {
    onCompleted() {
      fetchingCareGiverData();
      setselctedAvailability({});
      setactiveDateCaregiver([]);
      setselectedCareGiver({});
    }
  });

  const caregiverAttrOpt: IAttributeOptions[] | undefined = [];
  useEffect(() => {
    if (attributeData && attributeData.getCaregiverAtrribute) {
      attributeData.getCaregiverAtrribute.forEach(
        ({ id, name, color }: IAttributeValues) =>
          caregiverAttrOpt.push({
            label: name,
            value: id ? id.toString() : '',
            color
          })
      );
      setCaregiverAttributeOptions(caregiverAttrOpt);
    }
  }, [attributeData]);

  // Mutation to add careinstitution data
  const [
    addCareinstitutionRequirment,
    { data: addCareinstitutionRes }
  ] = useMutation<
    { addCareInstitutionRequirement: IAddCargiverAppointmentRes },
    { careInstitutionRequirementInput: ICareinstitutionFormSubmitValue[] }
  >(ADD_INSTITUTION_REQUIREMENT, {
    onCompleted() {
      newAppointment();
      canstitutionRefetch();
    }
  });

  // update Careinstitution Requirment
  const [
    updateCareinstitutionRequirment,
    { data: updateCareinstitutionRes }
  ] = useMutation<
    {
      CareInstitutionRequirementType: IAddCargiverAppointmentRes;
    },
    {
      id: number;
      careInstitutionRequirementInput: any;
    }
  >(UPDATE_INSTITUTION_REQUIREMENT, {
    onCompleted() {
      canstitutionRefetch();
    }
  });

  // Mutation to delete careinstitution
  const [deleteCareinstitutionRequirement] = useMutation<
    {
      deleteCareinstitution: any;
    },
    { id: number }
  >(DELETE_CAREINSTITUTION_REQUIREMENT, {
    onCompleted() {
      canstitutionRefetch();
      setvaluesForCareinstitution({
        appointmentId: '',
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
      setselctedRequirement({});
      setactiveDateCareinstitution([]);
    }
  });

  // Mutation to linkRequirement
  const [linkRequirement, {}] = useMutation<{ appointmentInput: any }>(
    LINK_REQUIREMENT
  );

  // Mutation to unLink Requirement
  const [unLinkRequirement, {}] = useMutation<{ appointmentInput: any }>(
    UN_LINK_REQUIREMENT
  );

  // To get caregiver list from db
  const [
    getDepartmentList,
    { data: departmentList, loading: deptLoading }
  ] = useLazyQuery<any>(GET_DEPARTMENT_LIST);

  // To fetch caregivers by id
  const [
    fetchCareGiversFilterById,
    { data: careGiversFilterById, loading: careGiversfilterByIdLoading }
  ] = useLazyQuery<any, any>(GET_CAREGIVER_AVABILITY_DETAILS_BY_ID, {
    fetchPolicy: 'no-cache'
  });

  // To fetch careinstitutions by id
  const [
    fetchCareinstitutionFilterById,
    {
      data: careinstitutionFilterById,
      loading: careinstitutionfilterByIdLoading
    }
  ] = useLazyQuery<any, any>(GET_CAREINSTITUTION_REQUIREMENT_BY_ID, {
    fetchPolicy: 'no-cache'
  });

  // To fetch caregivers last time data by id getCareGiverAvabilityLastTimeById
  const [
    fetchCaregiverLastTimeData,
    { data: caregiverLastTimeData }
  ] = useLazyQuery<any, any>(GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID, {
    fetchPolicy: 'no-cache'
  });

  // To fetch caregivers by id filter
  const [
    fetchCaregiverList,
    {
      data: careGiversList,
      loading: caregiverLoading,
      refetch: fetchingCareGiverData
    }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache'
  });

  // To fetch careinstitution by qualification id
  const [
    fetchCareinstitutionList,
    {
      data: careInstitutionList,
      loading: careinstitutionLoading,
      refetch: canstitutionRefetch
    }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache'
  });

  // Reset applied filter
  const handleResetFilters = () => {
    setPositive([]);
    setNegative([]);
    setqualification([]);
    setfilterByAppointments(undefined);
  };

  // Create new appointment or blank fields of careinstitution
  const newAppointment = () => {
    setvaluesForCareinstitution({
      appointmentId: '',
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
  };

  const [positive, setPositive] = useState<number[]>([]);
  const [negative, setNegative] = useState<number[]>([]);
  // by clicking on apply filter to get care giver and care institution list accordingly
  const applyFilter = (
    userRole: string | null,
    positiveId: number[],
    negativeId: number[]
  ) => {
    setPositive(positiveId), setNegative(negativeId);
    let temp: any = [];
    qualification.map((key: any) => {
      temp.push(parseInt(key.value));
    });
    if ('caregiver') {
      // get careGivers list
      fetchCaregiverList({
        variables: {
          qualificationId: temp ? temp : null,
          userRole: 'caregiver',
          negativeAttributeId: negativeId,
          positiveAttributeId: positiveId,
          gte: '2020-01-01',
          lte: '2020-03-31',
          showAppointments:
            filterByAppointments && filterByAppointments.value
              ? filterByAppointments.value === 'showAll'
                ? ''
                : filterByAppointments.value
              : null
        }
      });
    } else {
      // get careInstitution list
      fetchCareinstitutionList({
        variables: {
          qualificationId: temp ? temp : null,
          userRole: 'canstitution',
          negativeAttributeId: negativeId,
          positiveAttributeId: positiveId,
          gte: '2020-01-01',
          lte: '2020-03-31',
          showAppointments:
            filterByAppointments && filterByAppointments.value
              ? filterByAppointments.value === 'showAll'
                ? ''
                : filterByAppointments.value
              : null
        }
      });
    }
  };
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

  // Caregiver filter by Id
  useEffect(() => {
    if (
      careGiversFilterById &&
      careGiversFilterById.getCareGiverAvabilitiesDetails
    ) {
      const { getCareGiverAvabilitiesDetails } = careGiversFilterById;
      const {
        id = '',
        userId = '',
        name = '',
        f = '',
        s = '',
        n = '',
        date = '',
        fee = '',
        nightFee = '',
        weekendAllowance = '',
        holidayAllowance = '',
        nightAllowance = '',
        distanceInKM = '',
        feePerKM = '',
        travelAllowance = '',
        otherExpenses = '',
        workingProofRecieved = false,
        remarksCareGiver = '',
        remarksInternal = '',
        status = ''
      } = getCareGiverAvabilitiesDetails ? getCareGiverAvabilitiesDetails : {};

      const { caregiver } = selectedCareGiver;
      let data: ICareGiverValues = {
        ...selectedCareGiver,
        caregiver: {
          id: id ? id : '',
          name: name ? name : '',
          date: date ? date : '',
          fee: fee ? fee : '',
          nightFee,
          weekendAllowance,
          holidayAllowance,
          distanceInKM,
          feePerKM,
          lastName,
          f: f ? 'available' : '',
          n: n ? 'available' : '',
          nightAllowance,
          otherExpenses,
          remarksCareGiver,
          remarksInternal,
          s: s ? 'available' : '',
          travelAllowance,
          workingProofRecieved
        }
      };
      setactiveDateCaregiver([{ dateString: date }]);
      setselectedCareGiver(data);
    }
  }, [careGiversFilterById]);

  // Careinstitution filter by id
  useEffect(() => {
    if (
      careinstitutionFilterById &&
      careinstitutionFilterById.getCareinstitutionRequirement
    ) {
      let departmentData: any = [];
      const { getCareinstitutionRequirement } = careinstitutionFilterById;
      const {
        id = '',
        name = '',
        address = '',
        bookingRemarks = '',
        comments = '',
        contactPerson = '',
        date = '',
        divisionId = '',
        departmentBookingRemarks = '',
        departmentOfferRemarks = '',
        departmentRemarks = '',
        endTime = '',
        isWorkingProof = false,
        offerRemarks = '',
        qualificationId = [],
        startTime = '',
        userId = ''
      } = getCareinstitutionRequirement ? getCareinstitutionRequirement : {};

      let qualification: any = [],
        qualificationData: IReactSelectInterface[] = [];
      if (data && data.getQualifications && qualificationId) {
        qualification = data.getQualifications.filter(({ id }) =>
          qualificationId.includes(id)
        );
        if (qualification && qualification.length) {
          qualification.map((key: any) => {
            return qualificationData.push({
              label: key.name,
              value: key.id
            });
          });
        }
        if (departmentList && departmentList.getDivision.length) {
          const { getDivision } = departmentList;
          departmentData = getDivision.filter(
            (dept: any) => dept.id === divisionId
          );
        }
      }

      setvaluesForCareinstitution({
        appointmentId: id ? id : '',
        name,
        date,
        shift: undefined,
        endTime,
        startTime,
        qualificationId: qualificationData,
        address,
        contactPerson,
        department: divisionId
          ? departmentData && departmentData.length
            ? {
                value: departmentData[0].id,
                label: departmentData[0].name
              }
            : undefined
          : undefined,
        departmentOfferRemarks,
        departmentBookingRemarks,
        departmentRemarks,
        isWorkingProof: isWorkingProof ? true : false,
        offerRemarks,
        bookingRemarks,
        comments
      });
      setactiveDateCareinstitution([{ dateString: date }]);
    }
  }, [careinstitutionFilterById]);

  // push last time data into the caregiver field
  useEffect(() => {
    let data: any = {};
    const {
      distanceInKM = '',
      f = '',
      feePerKM = '',
      lastName = '',
      n = '',
      nightAllowance = '',
      otherExpenses = '',
      remarksCareGiver = '',
      remarksInternal = '',
      s = '',
      travelAllowance = '',
      weekendAllowance = '',
      workingProofRecieved = false
    } = caregiverLastTimeValues ? caregiverLastTimeValues : {};

    if (caregiverLastTimeData) {
      const { getCareGiverAvabilityLastTimeById } = caregiverLastTimeData;
      if (selctedAvailability && selctedAvailability.id) {
        data = {
          ...selctedAvailability,
          fee: getCareGiverAvabilityLastTimeById.fee,
          nightFee: getCareGiverAvabilityLastTimeById.nightFee,
          weekendAllowance: getCareGiverAvabilityLastTimeById.weekendAllowance,
          holidayAllowance: getCareGiverAvabilityLastTimeById.holidayAllowance,
          distanceInKM: distanceInKM ? distanceInKM : '',
          feePerKM,
          lastName,
          f: f ? 'available' : '',
          n: n ? 'available' : '',
          s: s ? 'available' : '',
          nightAllowance,
          otherExpenses,
          remarksCareGiver,
          remarksInternal,
          travelAllowance,
          workingProofRecieved
        };
        setselctedAvailability(data);
      } else {
        const { caregiver } = selectedCareGiver;
        data = {
          ...selectedCareGiver,
          caregiver: {
            ...caregiver,
            fee: getCareGiverAvabilityLastTimeById.fee,
            nightFee: getCareGiverAvabilityLastTimeById.nightFee,
            weekendAllowance:
              getCareGiverAvabilityLastTimeById.weekendAllowance,
            holidayAllowance:
              getCareGiverAvabilityLastTimeById.holidayAllowance,
            distanceInKM: distanceInKM ? distanceInKM : '',
            feePerKM,
            lastName,
            f: f ? 'available' : '',
            n: n ? 'available' : '',
            nightAllowance,
            otherExpenses,
            remarksCareGiver,
            remarksInternal,
            s: s ? 'available' : '',
            travelAllowance,
            workingProofRecieved
          }
        };
        setselectedCareGiver(data);
      }
    }
  }, [caregiverLastTimeData]);

  // To store users list into state
  useEffect(() => {
    let temp: any[] = daysData ? [...daysData.daysArr] : [];
    if (careGiversList && careGiversList.getUserByQualifications) {
      const { getUserByQualifications } = careGiversList;
      const { result } = getUserByQualifications;
      if (result && result.length) {
        result.forEach((user: any, index: number) => {
          user.availabilityData = [];
          user.attribute = [];
          if (user.caregiver_avabilities && user.caregiver_avabilities.length) {
            let result: any = user.caregiver_avabilities.reduce(
              (acc: any, o: any) => (
                (acc[moment(o.date).format(dbAcceptableFormat)] =
                  (acc[moment(o.date).format(dbAcceptableFormat)] || 0) + 1),
                acc
              ),
              {}
            );
            result = Object.values(result);
            result = Math.max(...result);
            // user.availabilityData = Array(result).fill([]);
            // console.log(user.availabilityData, 'dasdsad');

            for (let row = 0; row < result; row++) {
              user.availabilityData.push([]);
            }
            temp.forEach((d: any, index: number) => {
              let records = user.caregiver_avabilities.filter(
                (available: any) =>
                  moment(d.dateString).isSame(moment(available.date), 'day')
              );
              for (let i = 0; i < records.length; i++) {
                user.availabilityData[i].push(records[i]);
              }
            });
          } else {
            user.availabilityData.push([]);
          }
        });
      }
      // dispatch action to save data in redux store
      // props.addAvailability(result);
      setcaregiversList(result);
    }

    if (careInstitutionList && careInstitutionList.getUserByQualifications) {
      const { getUserByQualifications } = careInstitutionList;
      const { result } = getUserByQualifications;
      if (result && result.length) {
        /*  */
        result.forEach((user: any, index: number) => {
          user.availabilityData = [];
          if (
            user.careinstitution_requirements &&
            user.careinstitution_requirements.length
          ) {
            let result: any = user.careinstitution_requirements.reduce(
              (acc: any, o: any) => (
                (acc[moment(o.date).format(dbAcceptableFormat)] =
                  (acc[moment(o.date).format(dbAcceptableFormat)] || 0) + 1),
                acc
              ),
              {}
            );
            result = Object.values(result);
            result = Math.max(...result);
            // user.availabilityData = Array(result).fill([]);
            // console.log(user.availabilityData, 'dasdsad');

            for (let row = 0; row < result; row++) {
              user.availabilityData.push([]);
            }
            temp.forEach((d: any, index: number) => {
              let records = user.careinstitution_requirements.filter(
                (available: any) =>
                  moment(d.dateString).isSame(moment(available.date), 'day')
              );
              for (let i = 0; i < records.length; i++) {
                user.availabilityData[i].push(records[i]);
              }
            });
          } else {
            user.availabilityData.push([]);
          }
        });
        /*  */
        setcareinstitutionList(result);
      }
    }
  }, [careGiversList, careInstitutionList]);

  // Select particular user from nav bar
  const handleSelectUserList = (data: any, name: string) => {
    if (name === 'caregiver') {
      setcaregiversList(data);
    } else {
      setcareinstitutionList(data);
    }
  };

  const handleSelection = (selectedCells: any, name: string) => {
    if (name === 'caregiver') {
      setSelectedCells(selectedCells);
    } else {
      setselectedCellsCareinstitution(selectedCells);
    }
  };

  // Reset the users list
  const handleReset = (name: string) => {
    if (name === 'caregiver') {
      if (careGiversList && careGiversList.getUserByQualifications) {
        const { getUserByQualifications } = careGiversList;
        const { result } = getUserByQualifications;
        if (result && result.length) {
          setcaregiversList(result);
        }
      }
    } else {
      if (careInstitutionList && careInstitutionList.getUserByQualifications) {
        const { getUserByQualifications } = careInstitutionList;
        const { result } = getUserByQualifications;
        if (result && result.length) {
          setcareinstitutionList(result);
        }
      }
    }
  };

  // Select qualification attribute
  const handleQualification = (selectedOption: IReactSelectInterface[]) => {
    setqualification(selectedOption);
  };

  const fetchData = () => {
    let temp: any = [];
    qualification.map((key: any, index: number) => {
      temp.push(parseInt(key.value));
    });
    // Default value is start & end of month
    let gte: string = moment()
      .startOf('month')
      .format(dbAcceptableFormat);
    let lte: string = moment()
      .endOf('month')
      .format(dbAcceptableFormat);
    if (daysData && daysData.daysArr && daysData.daysArr.length) {
      gte = daysData.daysArr[0].dateString || '';
      lte = daysData.daysArr[daysData.daysArr.length - 1].dateString || '';
    }
    // get careGivers list
    fetchCaregiverList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: 'caregiver',
        negativeAttributeId: negative,
        showAppointments:
          filterByAppointments && filterByAppointments.value
            ? filterByAppointments.value === 'showAll'
              ? ''
              : filterByAppointments.value
            : null,
        positiveAttributeId: positive,
        gte,
        lte
      }
    });
    // get careInstitution list
    fetchCareinstitutionList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: 'canstitution',
        showAppointments:
          filterByAppointments && filterByAppointments.value
            ? filterByAppointments.value === 'showAll'
              ? ''
              : filterByAppointments.value
            : null,
        negativeAttributeId: negative,
        positiveAttributeId: positive,
        gte,
        lte
      }
    });
  };

  // To fetch users according to qualification selected
  useEffect(() => {
    fetchData();
  }, [qualification]);

  // To fetch list data after month has changed
  useEffect(() => {
    fetchData();
  }, [daysData]);

  // To fetch list data for appointments filter
  useEffect(() => {
    fetchData();
  }, [filterByAppointments]);

  // set careGivers list options
  const careGiversOptions: IReactSelectInterface[] | undefined = [];
  if (careGiversList && careGiversList.getUserByQualifications) {
    const { getUserByQualifications } = careGiversList;
    const { result } = getUserByQualifications;
    if (result && result.length) {
      result.map((list: any) => {
        return careGiversOptions.push({
          label: `${list.lastName} ${list.firstName} `,
          value: list.id ? list.id : ''
        });
      });
    }
  }

  // set careInstitution list options
  const careInstitutionOptions: IReactSelectInterface[] | undefined = [];
  if (careInstitutionList && careInstitutionList.getUserByQualifications) {
    const { getUserByQualifications } = careInstitutionList;
    const { result } = getUserByQualifications;
    if (result && result.length) {
      result.map((list: any) => {
        return careInstitutionOptions.push({
          label: `${list.lastName} ${list.firstName}`,
          value: list.id ? list.id : ''
        });
      });
    }
  }
  // Options to show department data
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
  const handlePrevious = async () => {
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
      temp[index].availabilityData = temp[index].availabilityData
        ? [...temp[index].availabilityData, []]
        : [];
      // temp.splice(index + 1, 0, { ...temp[index], newRow: true });
      setcaregiversList(temp);
    } else {
      let temp: any = [...careinstitutionList];
      temp[index].availabilityData = temp[index].availabilityData
        ? [...temp[index].availabilityData, []]
        : [];
      // temp.splice(index + 1, 0, { ...temp[index], newRow: true });
      setcareinstitutionList(temp);
    }
  };

  // Delete caregiver or careinstitution data
  const onhandleDelete = async (name: string, id: string) => {
    if (id) {
      const { value } = await ConfirmBox({
        title: languageTranslation('CONFIRM_LABEL'),
        text:
          name === 'careinstitution'
            ? languageTranslation('CONFIRM_DELETE_CAREINSTITUTION_REQUIREMENT')
            : languageTranslation('CONFIRM_DELETE_CAREGIVER_AVABILITY')
      });
      if (!value) {
        return;
      } else {
        if (name === 'careinstitution') {
          await deleteCareinstitutionRequirement({
            variables: {
              id: parseInt(id)
            }
          });
          // canstitutionRefetch();
        } else {
          await deleteCaregiverRequirement({
            variables: {
              id: parseInt(id)
            }
          });
        }
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            name === 'careinstitution'
              ? languageTranslation(
                  'DELETE_CAREINSTITUTION_REQUIREMENT_SUCCESS'
                )
              : languageTranslation('DELETE_CAREGIVER_AVABILITY_SUCCESS')
          );
        }
      }
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
          shift:
            careInstitutionTimesOptions && careInstitutionTimesOptions.length
              ? careInstitutionTimesOptions[0]
              : values.shift,
          startTime: startTime ? startTime : values.startTime,
          endTime: endTime ? endTime : values.endTime
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
    let data: any = {
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
    setvaluesForCareinstitution(data);
  }, [careInstituionShift]);

  // On link requirement
  const onLinkAppointment = async (selectedOption: any, name: string) => {
    if (name === 'link') {
      await linkRequirement({
        variables: {
          appointmentInput: selectedOption
        }
      });
    } else {
      await unLinkRequirement({
        variables: {
          appointmentInput: selectedOption
        }
      });
    }
  };

  // select careGiver or careinstitution
  const handleSelectedUser = (
    list: any,
    date: any,
    name: string,
    selctedAvailability: any
  ) => {
    if (name === 'caregiver') {
      setselectedCareGiver(list);
      setselctedAvailability(selctedAvailability);
      if (date) {
        setactiveDateCaregiver(date);
      }
    } else {
      let temp: ICareinstitutionFormValue;
      if (date) {
        setactiveDateCareinstitution(date);
      }
      if (!starCanstitution.isStar) {
        // Fetch values in case of edit by default it will be null or undefined
        setselectedCareinstitution(list);
        if (selctedAvailability && selctedAvailability.name) {
          let qualification: any = [],
            departmentData: any = [],
            qualificationData: IReactSelectInterface[] = [];
          if (
            data &&
            data.getQualifications &&
            selctedAvailability.qualificationId
          ) {
            qualification = data.getQualifications.filter(({ id }) =>
              selctedAvailability.qualificationId.includes(id)
            );
            if (qualification && qualification.length) {
              qualification.map((key: any) => {
                return qualificationData.push({
                  label: key.name,
                  value: key.id
                });
              });
            }
          }

          // if (careInstitutionDepartment && careInstitutionDepartment.length) {
          //   const { getDivision } = departmentList;
          //   departmentData = careInstitutionDepartment.filter(
          //     (dept: any) => dept.id === selctedAvailability.divisionId
          //   );
          // }

          setselctedRequirement(selctedAvailability);
          const selectedData: any = {
            appointmentId: selctedAvailability ? selctedAvailability.id : '',
            name: selctedAvailability ? selctedAvailability.name : '',
            date: selctedAvailability ? selctedAvailability.date : '',
            shift: undefined,
            endTime: selctedAvailability ? selctedAvailability.endTime : '',
            startTime: selctedAvailability ? selctedAvailability.startTime : '',
            qualificationId: qualificationData ? qualificationData : undefined,
            department: undefined,
            address: selctedAvailability ? selctedAvailability.address : '',
            contactPerson: selctedAvailability
              ? selctedAvailability.contactPerson
              : '',
            departmentOfferRemarks: selctedAvailability
              ? selctedAvailability.departmentOfferRemarks
              : '',
            departmentBookingRemarks: selctedAvailability
              ? selctedAvailability.departmentBookingRemarks
              : '',
            departmentRemarks: selctedAvailability
              ? selctedAvailability.departmentRemarks
              : '',
            isWorkingProof: selctedAvailability
              ? selctedAvailability.isWorkingProof
              : false,
            offerRemarks: selctedAvailability
              ? selctedAvailability.offerRemarks
              : '',
            bookingRemarks: selctedAvailability
              ? selctedAvailability.bookingRemarks
              : '',
            comments: selctedAvailability ? selctedAvailability.comments : ''
          };
          setvaluesForCareinstitution(selectedData);
        } else {
          setselctedRequirement({});
          const selectedData: any = {
            appointmentId: null,
            name: list ? `${list.lastName} ${' '} ${list.firstName}` : '',
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
          };
          setvaluesForCareinstitution(selectedData);
        }
      } else {
        temp = {
          ...valuesForCareinstitution,
          name: `${selectedCareinstitution.lastName} ${selectedCareinstitution.firstName}`
        };
        setvaluesForCareinstitution(temp);
      }
    }
  };

  //  call department list query with every selection of care institution
  useEffect(() => {
    let userId: string = selectedCareinstitution
      ? selectedCareinstitution.id
      : '';
    if (userId) {
      getDepartmentList({
        variables: {
          userId: parseInt(userId),
          locked: null
        }
      });
    }
  }, [selectedCareinstitution]);

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
      if (list.id) {
        await getDepartmentList({
          variables: {
            userId: parseInt(list.id),
            locked: null
          }
        });
      }
    } else {
      setcareInstituionDeptData([]);
    }
  };

  //  handle second star of careinstitution and autoselect department
  const onhandleSecondStarCanstitution = (dept: any) => {
    setsecondStarCanstitution(!secondStarCanstitution);
    let data: any = [];
    data.push(dept);
    setcareInstituionDeptData(data);
    setcareInstituionDept({
      label: dept.name,
      value: dept.id
    });
  };

  // Select single user from list and hide the rest
  const handleSecondStar = (list: object, index: number, name: string) => {
    let temp: any = [];
    temp.push(list);
    if (name === 'caregiver') {
      setcaregiversList(temp);
    }
  };

  // submit caregiver form
  const handleSubmitCaregiverForm = async (
    values: ICaregiverFormValue,
    { setSubmitting, setFieldError }: FormikHelpers<ICaregiverFormValue>
  ) => {
    const {
      name,
      appointmentId,
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
        const { id = '', dateString = '' } =
          selectedCells && selectedCells.length && selectedCells[0]
            ? selectedCells[0]
            : {};
        let CareGiverAvabilityInput: any = {
          userId: id ? parseInt(id) : '',
          date: dateString,
          // userId: selectedCareGiver ? parseInt(selectedCareGiver.id) : '',
          // date:
          //   activeDateCaregiver && activeDateCaregiver.length
          //     ? activeDateCaregiver[0].dateString
          //     : '',
          name,
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
          otherExpenses: otherExpenses ? parseFloat(otherExpenses) : null,
          remarksCareGiver: remarksCareGiver ? remarksCareGiver : null,
          remarksInternal: remarksInternal ? remarksInternal : null,
          f: f ? 'available' : 'default',
          s: s ? 'available' : 'default',
          n: n ? 'available' : 'default',
          status: 'default'
        };
        if (appointmentId) {
          await updateCaregiver({
            variables: {
              id: parseInt(appointmentId),
              careGiverAvabilityInput: CareGiverAvabilityInput
            }
          });
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              languageTranslation('CARE_GIVER_REQUIREMENT_UPDATE_SUCCESS_MSG')
            );
          }
        } else {
          await addCaregiver({
            variables: {
              careGiverAvabilityInput: [
                {
                  ...CareGiverAvabilityInput
                }
              ]
            }
          });
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              languageTranslation('CARE_GIVER_REQUIREMENT_ADD_SUCCESS_MSG')
            );
          }
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
      appointmentId,
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
      let careInstitutionRequirementInput: ICareinstitutionFormSubmitValue = {
        userId: selectedCareinstitution
          ? parseInt(selectedCareinstitution.id)
          : 0,
        name,
        date:
          activeDateCareinstitution && activeDateCareinstitution.length
            ? moment(activeDateCareinstitution[0].dateString).format(
                dbAcceptableFormat
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
        comments,
        f: fvar,
        s: svar,
        n: nvar,
        status: 'default'
      };
      if (appointmentId || selctedRequirement.id) {
        await updateCareinstitutionRequirment({
          variables: {
            id: parseInt(selctedRequirement.id),
            careInstitutionRequirementInput
          }
        });

        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation(
              'CARE_INSTITUTION_REQUIREMENT_UPDATE_SUCCESS_MSG'
            )
          );
        }
      } else {
        await addCareinstitutionRequirment({
          variables: {
            careInstitutionRequirementInput: [careInstitutionRequirementInput]
          }
        });
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CARE_INSTITUTION_REQUIREMENT_ADD_SUCCESS_MSG')
          );
        }
      }
      // canstitutionRefetch();
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

  // fetch last time data for caregiver
  const handleLastTimeData = (id: string, values: any) => {
    if (id) {
      fetchCaregiverLastTimeData({
        variables: {
          userId: id ? parseInt(id) : null
        }
      });
      setcaregiverLastTimeValues(values);
    }
  };

  // Filter by appointments & userId in navbar
  const handleSelectAppointment = (selectOption: any, name: string) => {
    setfilterByAppointments(selectOption);
  };

  const onFilterByUserId = (userId: string, userRole: string) => {
    if (userRole === 'caregiver') {
      let userIncludes: any,
        userData: any = {};
      if (careGiversList && careGiversList.getUserByQualifications) {
        const { getUserByQualifications } = careGiversList;
        const { result } = getUserByQualifications;
        result.map((key: any, index: number) => {
          if (key.caregiver_avabilities && key.caregiver_avabilities.length) {
            userIncludes = key.caregiver_avabilities.filter(
              (dept: any) => dept.id === userId
            );
            if (userIncludes && userIncludes.length) {
              userData = key;
            }
          }
        });
      }
      setselectedCareGiver(userData ? userData : {});
      fetchCareGiversFilterById({
        variables: {
          id: parseInt(userId)
        }
      });
    } else {
      let userIncludes: any, userData: any;
      if (careInstitutionList && careInstitutionList.getUserByQualifications) {
        const { getUserByQualifications } = careInstitutionList;
        const { result } = getUserByQualifications;
        result.map((key: any, index: number) => {
          if (
            key.careinstitution_requirements &&
            key.careinstitution_requirements.length
          ) {
            userIncludes = key.careinstitution_requirements.filter(
              (dept: any) => dept.id === userId
            );
            if (userIncludes && userIncludes.length) {
              userData = key;
            }
          }
        });
      }
      setselectedCareinstitution(userData);
      fetchCareinstitutionFilterById({
        variables: {
          id: parseInt(userId)
        }
      });
    }
  };

  const onReserve = async () => {
    if (selectedCells && selectedCells.length) {
      let careGiverAvabilityInput: any = [];
      selectedCells.forEach(async element => {
        const { dateString, id, item } = element;
        if (item && item.id) {
          let availabilityId: number = item.id ? parseInt(item.id) : 0;
          delete item.id;
          delete item.__typename;
          await updateCaregiver({
            variables: {
              id: availabilityId,
              careGiverAvabilityInput: {
                ...item,
                f: languageTranslation('BLOCK'),
                s: languageTranslation('BLOCK'),
                n: languageTranslation('BLOCK')
              }
            }
          });
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              languageTranslation('CARE_GIVER_REQUIREMENT_UPDATE_SUCCESS_MSG')
            );
          }
        } else {
          careGiverAvabilityInput.push({
            userId: id ? parseInt(id) : '',
            date: dateString
              ? moment(dateString).format(dbAcceptableFormat)
              : '',
            fee: null,
            weekendAllowance: null,
            holidayAllowance: null,
            nightFee: null,
            nightAllowance: null,
            workingProofRecieved: false,
            distanceInKM: null,
            feePerKM: null,
            travelAllowance: null,
            otherExpenses: null,
            remarksCareGiver: null,
            remarksInternal: null,
            f: languageTranslation('BLOCK'),
            s: languageTranslation('BLOCK'),
            n: languageTranslation('BLOCK'),
            status: 'default'
          });
        }
      });
      if (careGiverAvabilityInput && careGiverAvabilityInput.length) {
        await addCaregiver({
          variables: {
            careGiverAvabilityInput: careGiverAvabilityInput
          }
        });
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CARE_GIVER_REQUIREMENT_ADD_SUCCESS_MSG')
          );
        }
      }
    }
  };

  const onDeleteEntries = () => {
    if (selectedCells && selectedCells.length) {
      let availabilityIds: number[] = [];
      selectedCells.forEach(async element => {
        const { dateString, id, item } = element;
        if (item && item.id) {
          await deleteCaregiverRequirement({
            variables: {
              id: parseInt(item.id)
            }
          });
        } else {
          let index: number = -1;
          index = caregiversList.findIndex(
            (caregiver: any) => caregiver.id === id
          );
          let temp: any = [...caregiversList];
          temp[index].availabilityData = [];
          // temp.splice(index + 1, 0, { ...temp[index], newRow: true });
          setcaregiversList(temp);
        }
      });
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('DELETE_CAREGIVER_AVABILITY_SUCCESS')
        );
      }
    }
  };

  const onCaregiverQualificationFilter = () => {
    if (selectedCells && selectedCells.length) {
      let temp: string[] = [];
      selectedCells.map(element => {
        if (element.qualificationIds) {
          temp.push(...element.qualificationIds);
        }
      });
      let qual = qualificationList.filter((qual: IReactSelectInterface) =>
        temp.includes(qual.value)
      );
      setqualification(qual);
      // setqualification(
      //   qualificationList.filter((qual: IReactSelectInterface) => {
      //     console.log(
      //       qual.value,
      //       typeof qual.value,
      //       'qual.value',
      //       selectedCells.map(element => element.qualificationIds),
      //       temp.includes(qual.value),
      //     );

      //     return temp.includes(qual.value);
      //   }),
      // );
      fetchData();
    }
  };
  //Store gte days data
  let [gteDayData, setgteDayData] = useState<string | undefined>('');
  //Store lte days data
  let [lteDayData, setlteDayData] = useState<string | undefined>('');
  useEffect(() => {
    gteDayData =
      daysData && daysData.daysArr && daysData.daysArr.length
        ? daysData.daysArr[0].dateString
        : moment()
            .startOf('month')
            .format(dbAcceptableFormat);
    lteDayData =
      daysData && daysData.daysArr && daysData.daysArr.length
        ? daysData.daysArr[daysData.daysArr.length - 1].dateString
        : moment()
            .endOf('month')
            .format(dbAcceptableFormat);
    setlteDayData(lteDayData);
    setgteDayData(gteDayData);
  }, []);

  // // Fetch values in case of edit caregiver with condition predefined data or availability data by default it will be null or undefined
  // let firstName: string = '',
  //   lastName: string = '',
  //   caregiver: any = {};

  // if (selctedAvailability && selctedAvailability.id) {
  //   caregiver = selctedAvailability ? selctedAvailability : {};
  // } else {
  //   (firstName = selectedCareGiver ? selectedCareGiver.firstName : ''),
  //     (lastName = selectedCareGiver ? selectedCareGiver.lastName : ''),
  //     (caregiver =
  //       selectedCareGiver && selectedCareGiver.caregiver
  //         ? selectedCareGiver.caregiver
  //         : {});
  // }
  // // end
  // const {
  //   id = null,
  //   fee = null,
  //   night = null,
  //   nightFee = null,
  //   nightAllowance = undefined,
  //   holiday = null,
  //   holidayAllowance = null,
  //   weekendAllowance = null,
  //   distanceInKM = null,
  //   feePerKM = null,
  //   travelAllowance = null,
  //   otherExpenses = null,
  //   workingProofRecieved = false,
  //   remarksCareGiver = null,
  //   remarksInternal = null,
  //   f = null,
  //   s = null,
  //   n = null,
  // } = caregiver ? caregiver : {};

  // const valuesForCaregiver: ICaregiverFormValue = {
  //   appointmentId: id !== null ? id : null,
  //   firstName:
  //     selectedCareGiver && selectedCareGiver.firstName
  //       ? selectedCareGiver.firstName
  //       : '',
  //   lastName:
  //     selectedCareGiver && selectedCareGiver.lastName
  //       ? selectedCareGiver.lastName
  //       : '',
  //   fee: fee ? germanNumberFormat(fee) : '',
  //   nightFee: night
  //     ? germanNumberFormat(night)
  //     : nightFee
  //     ? germanNumberFormat(nightFee)
  //     : '',
  //   nightAllowance:
  //     caregiver && nightAllowance
  //       ? { value: nightAllowance, label: nightAllowance }
  //       : undefined,
  //   holidayAllowance: holidayAllowance
  //     ? germanNumberFormat(holidayAllowance)
  //     : holiday
  //     ? germanNumberFormat(holiday)
  //     : '',
  //   weekendAllowance: weekendAllowance
  //     ? germanNumberFormat(weekendAllowance)
  //     : '',
  //   workingProofRecieved: workingProofRecieved ? true : false,
  //   distanceInKM: distanceInKM ? distanceInKM : '',
  //   feePerKM: feePerKM ? feePerKM : '',
  //   travelAllowance: travelAllowance ? travelAllowance : '',
  //   otherExpenses: otherExpenses ? otherExpenses : '',
  //   workingHoursFrom: '',
  //   workingHoursTo: '',
  //   breakFrom: '',
  //   breakTo: '',
  //   remarksCareGiver: caregiver && remarksCareGiver ? remarksCareGiver : '',
  //   remarksInternal: caregiver && remarksInternal ? remarksInternal : '',
  //   f: f === 'available' ? true : false,
  //   s: s === 'available' ? true : false,
  //   n: n === 'available' ? true : false,
  // };

  // console.log('++++++++++++++++Get gte and lte data', gteDayData);
  // console.log('***********Get gte and lte data', lteDayData);
  // console.log('qualification above return', qualification);

  // Fetch values in case of edit caregiver with condition predefined data or availability data by default it will be null or undefined
  const {
    firstName = '',
    lastName = '',
    dateString = '',
    caregiver = undefined,
    item = undefined
  } =
    selectedCells && selectedCells.length && selectedCells[0]
      ? selectedCells[0]
      : {};

  // end
  const {
    name = '',
    id = '',
    fee = '',
    night = '',
    nightFee = '',
    nightAllowance = undefined,
    holiday = '',
    holidayAllowance = '',
    weekendAllowance = '',
    distanceInKM = '',
    feePerKM = '',
    travelAllowance = '',
    otherExpenses = '',
    workingProofRecieved = false,
    remarksCareGiver = '',
    remarksInternal = '',
    f = '',
    s = '',
    n = ''
  } = item ? item : caregiver ? caregiver : {};

  const valuesForCaregiver: ICaregiverFormValue = {
    appointmentId: id !== null ? id : null,
    // firstName: selectedCareGiver ? selectedCareGiver.firstName : '',
    // lastName: selectedCareGiver ? selectedCareGiver.lastName : '',
    name: name ? name : firstName ? `${lastName} ${firstName}` : '',
    fee: fee ? germanNumberFormat(fee) : '',
    nightFee: night
      ? germanNumberFormat(night)
      : nightFee
      ? germanNumberFormat(nightFee)
      : '',
    nightAllowance:
      caregiver && nightAllowance
        ? {
            value: nightAllowance,
            label: nightAllowance
          }
        : undefined,
    holidayAllowance: holidayAllowance
      ? germanNumberFormat(holidayAllowance)
      : holiday
      ? germanNumberFormat(holiday)
      : '',
    weekendAllowance: weekendAllowance
      ? germanNumberFormat(weekendAllowance)
      : '',
    workingProofRecieved: workingProofRecieved ? true : false,
    distanceInKM: distanceInKM ? distanceInKM : '',
    feePerKM: feePerKM ? feePerKM : '',
    travelAllowance: travelAllowance ? travelAllowance : '',
    otherExpenses: otherExpenses ? otherExpenses : '',
    workingHoursFrom: '',
    workingHoursTo: '',
    breakFrom: '',
    breakTo: '',
    remarksCareGiver: caregiver && remarksCareGiver ? remarksCareGiver : '',
    remarksInternal: caregiver && remarksInternal ? remarksInternal : '',
    f: f === 'available' ? true : false,
    s: s === 'available' ? true : false,
    n: n === 'available' ? true : false
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
            qualification={qualification}
            handleSelectUserList={handleSelectUserList}
            careGiversListArr={
              careGiversList && careGiversList.getUserByQualifications
                ? careGiversList && careGiversList.getUserByQualifications
                : []
            }
            careInstitutionListArr={
              careInstitutionList && careInstitutionList.getUserByQualifications
                ? careInstitutionList.getUserByQualifications
                : []
            }
            applyFilter={applyFilter}
            handleSelectAppointment={handleSelectAppointment}
            filterByAppointments={filterByAppointments}
            onFilterByUserId={onFilterByUserId}
            handleResetFilters={handleResetFilters}
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
                    selectedCells={selectedCells}
                    handleSelectedUser={handleSelectedUser}
                    handleSecondStar={handleSecondStar}
                    handleReset={handleReset}
                    qualification={qualification}
                    gte={gteDayData}
                    lte={lteDayData}
                    selctedAvailability={selctedAvailability}
                    qualificationList={qualificationList}
                    activeDateCaregiver={activeDateCaregiver}
                    onReserve={onReserve}
                    onDeleteEntries={onDeleteEntries}
                    onCaregiverQualificationFilter={
                      onCaregiverQualificationFilter
                    }
                    handleSelection={handleSelection}
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
                    qualificationList={qualificationList}
                    selectedCareGiver={selectedCareGiver}
                    selectedCareinstitution={selectedCareinstitution}
                    activeDateCaregiver={
                      activeDateCaregiver && activeDateCaregiver.length
                        ? activeDateCaregiver[0]
                        : undefined
                    }
                    activeDateCareinstitution={
                      activeDateCareinstitution &&
                      activeDateCareinstitution.length
                        ? activeDateCareinstitution[0]
                        : undefined
                    }
                    handleSelection={handleSelection}
                    qualification={qualification}
                    gte={gteDayData}
                    lte={lteDayData}
                    selectedCellsCareinstitution={selectedCellsCareinstitution}
                    selectedCells={selectedCells}
                    onLinkAppointment={onLinkAppointment}
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
                                { dateString }
                                // activeDateCaregiver &&
                                // activeDateCaregiver.length
                                //   ? activeDateCaregiver[0]
                                //   : undefined
                              }
                              addCaregiverRes={
                                addCaregiverRes &&
                                addCaregiverRes.addCareGiverAvability
                                  ? addCaregiverRes.addCareGiverAvability
                                  : ''
                              }
                              timeSlotError={timeSlotError}
                              selctedAvailability={item}
                              // selctedAvailability}
                              onhandleDelete={onhandleDelete}
                              handleSelectUserList={handleSelectUserList}
                              careGiversListArr={
                                careGiversList &&
                                careGiversList.getUserByQualifications
                                  ? careGiversList &&
                                    careGiversList.getUserByQualifications
                                  : []
                              }
                              handleLastTimeData={handleLastTimeData}
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
                              handleQualification={handleQualification}
                              onhandleDelete={onhandleDelete}
                              handleSelectUserList={handleSelectUserList}
                              careInstitutionListArr={
                                careInstitutionList &&
                                careInstitutionList.getUserByQualifications
                                  ? careInstitutionList.getUserByQualifications
                                  : []
                              }
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

// const mapStateToProps: any = (state: IRootState) => ({
//   appointmentReducer: state.appointmentReducer,
// });

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     addAvailability: (data: any) => {
//       dispatch(addAvailabilityRequest(data));
//     },
//   };
// };

export default // connect(mapStateToProps, mapDispatchToProps)
Appointment;
