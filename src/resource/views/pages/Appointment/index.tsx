import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Row, Button } from 'reactstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import {
  getDaysArrayByMonth,
  germanNumberFormat,
  languageTranslation,
  timeDiffernce
} from '../../../../helpers';
import AppointmentNav from './AppointmentNav';
import CaregiverListView from './Caregiver/CaregiverListView';
import CarinstituionListView from './Careinstituion/CareinstituionListView';
import { PAGE_LIMIT, NightAllowancePerHour } from './../../../../config';
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
  IStarInterface,
  IAttributeValues,
  IAttributeOptions,
  ICareGiverValues,
  IUnlinkAppointmentInput,
  IlinkAppointmentInput
} from '../../../../interfaces';
import {
  GET_QUALIFICATION_ATTRIBUTE,
  AppointmentsQueries,
  CareInstitutionQueries,
  CareGiverQueries
} from '../../../../graphql/queries';
import CaregiverFormView from './Caregiver/CaregiverForm';
import CareinstitutionFormView from './Careinstituion/CareinstitutionForm';
import {
  CareGiverValidationSchema,
  CareInstitutionValidationSchema
} from '../../../validations/AppointmentsFormValidationSchema';
import { AppointmentMutations } from '../../../../graphql/Mutations';
import { dbAcceptableFormat } from '../../../../config';
import { ConfirmBox } from '../../components/ConfirmBox';
import './index.scss';
import UnlinkAppointment from './unlinkModal';

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
  GET_CAREINSTITUTION_REQUIREMENT_BY_ID
] = AppointmentsQueries;

let toastId: any = null;

const Appointment: FunctionComponent = (props: any) => {
  const [daysData, setDaysData] = useState<IGetDaysArrayByMonthRes | null>(
    null
  );
  const [multipleAvailability, setMultipleAvailability] = useState<boolean>(
    false
  );
  const [multipleRequirement, setMultipleRequirement] = useState<boolean>(
    false
  );
  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);
  const [fetchingDept, setFetchingDept] = useState<boolean>(false);
  const [activeMonth, setActiveMonth] = useState<number>(moment().month());
  const [activeYear, setActiveYear] = useState<number>(moment().year());
  const [qualification, setqualification] = useState<any>([]);
  const [caregiversList, setcaregiversList] = useState<Object[]>([]);
  const [totalCaregiver, setTotalCaregiver] = useState<number>(0);
  const [careinstitutionList, setcareinstitutionList] = useState<Object[]>([]);
  const [selectedCareGiver, setselectedCareGiver] = useState<any>({});
  const [selectedCareinstitution, setselectedCareinstitution] = useState<any>(
    {}
  );
  const [showSelectedCaregiver, setShowSelectedCaregiver] = useState<Object>({
    id: '',
    isShow: false
  });
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
  // page
  const [page, setPage] = useState<number>(1);
  // set field to update formik values
  const [
    updateCanstitutionFormikValues,
    setupdateCanstitutionFormikValues
  ] = useState<any>();

  const [careInstituionDeptData, setcareInstituionDeptData] = useState<any>([]);
  const [
    careinstitutionDepartmentList,
    setcareinstitutionDepartmentList
  ] = useState<any>([]);
  const [activeDateCaregiver, setactiveDateCaregiver] = useState<IDate[]>([]);
  const [activeDateCareinstitution, setactiveDateCareinstitution] = useState<
    IDate[]
  >([]);

  // Fetch attribute list from db
  const { data: attributeData, loading, fetchMore } = useQuery<{
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
  // maintain solo careinstitution
  const [starCanstitution, setstarCanstitution] = useState<IStarInterface>({
    isStar: false,
    setIndex: -1,
    id: ''
  });
  // To manage solo department of careinstitution
  const [secondStarCanstitution, setsecondStarCanstitution] = useState<
    IStarInterface
  >({
    isStar: false,
    setIndex: -1,
    id: ''
  });
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
  const [
    addCaregiver,
    { error, data: addCaregiverRes, loading: addCaregiverLoading }
  ] = useMutation<
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
  const [
    updateCaregiver,
    { data: updateCaregiverRes, loading: updateCaregiverLoading }
  ] = useMutation<
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
    { data: addCareinstitutionRes, loading: addCareinstLoading }
  ] = useMutation<
    { addCareInstitutionRequirement: IAddCargiverAppointmentRes },
    { careInstitutionRequirementInput: ICareinstitutionFormSubmitValue[] }
  >(ADD_INSTITUTION_REQUIREMENT, {
    onCompleted() {
      canstitutionRefetch();
    }
  });

  // update Careinstitution Requirment
  const [
    updateCareinstitutionRequirment,
    { data: updateCareinstitutionRes, loading: updateCareinstitutionLoading }
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
      setselectedCellsCareinstitution([]);
      setselctedRequirement({});
      setactiveDateCareinstitution([]);
    }
  });

  // Mutation to linkRequirement
  const [linkRequirement, { loading: linkLoading }] = useMutation<{
    appointmentInput: IlinkAppointmentInput;
  }>(LINK_REQUIREMENT, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation('LINKED_APPOINTMENTS'));
      }
      fetchData();
    }
  });

  // Mutation to unLink Requirement
  const [unLinkRequirement, {}] = useMutation<{
    appointmentInput: IUnlinkAppointmentInput;
  }>(UN_LINK_REQUIREMENT, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation('UN_LINKED_APPOINTMENTS'));
      }
      fetchData();
    }
  });

  // To get caregiver list from db
  const [
    getDepartmentList,
    { data: departmentList, loading: deptLoading }
  ] = useLazyQuery<any>(GET_DEPARTMENT_LIST);

  // To fetch avabality & requirement by id
  const [
    fetchAppointmentFilterById,
    { data: appointmentFilterById }
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
      refetch: fetchingCareGiverData,
      fetchMore: fetchMoreCareGiverList
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

  const [positive, setPositive] = useState<number[]>([]);
  const [negative, setNegative] = useState<number[]>([]);

  // to get list of all caregivers
  const getCaregiverData = (page: number) => {
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
        limit: 10,
        page: page ? page : 1,
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
  };
  //to get list of all the careinstitutions
  const getCareInstituionData = () => {
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
    // get careinstitution list
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
  // by clicking on apply filter to get care giver and care institution list accordingly
  const applyFilter = (
    userRole: string | null,
    positiveId: number[],
    negativeId: number[]
  ) => {
    setPositive(positiveId);
    setNegative(negativeId);
    if (userRole === 'caregiver') {
      // get careGivers list
      getCaregiverData(1);
    } else {
      // get careInstitution list
      getCareInstituionData();
    }
  };

  useEffect(() => {
    if (
      addCareinstitutionRes &&
      addCareinstitutionRes.addCareInstitutionRequirement
    ) {
      const { addCareInstitutionRequirement } = addCareinstitutionRes;
      const { id, status } = addCareInstitutionRequirement;

      const {
        id: { Id } = '',
        firstName = '',
        lastName = '',
        canstitution = {},
        qualificationIds = [],
        dateString = '',
        item = undefined
      } =
        selectedCellsCareinstitution && selectedCellsCareinstitution.length
          ? selectedCellsCareinstitution[0]
          : {};

      let careinstitutionvalue: any[] = [
        {
          id: Id ? Id : '',
          firstName,
          lastName,
          canstitution: {
            ...canstitution
          },
          qualificationIds,
          dateString,
          item: {
            ...item,
            appointmentId: id ? id : '',
            status
          }
        }
      ];
      setselectedCellsCareinstitution(careinstitutionvalue);
    }
  }, [addCareinstitutionRes]);

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

  // Requirement And Avability filter by id
  useEffect(() => {
    if (
      appointmentFilterById &&
      appointmentFilterById.getRequirementAndAvabilityById
    ) {
      let departmentData: any = [];
      const { getRequirementAndAvabilityById } = appointmentFilterById;
      const { requirementData, avabilityData } = getRequirementAndAvabilityById;
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
      } = requirementData ? requirementData : {};
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
      const {
        id: { Id } = '',
        firstName = '',
        lastName = '',
        canstitution = {},
        qualificationIds = [],
        dateString = ''
      } =
        selectedCellsCareinstitution && selectedCellsCareinstitution.length
          ? selectedCellsCareinstitution[0]
          : {};

      let careinstitutionvalue: any[] = [
        {
          id: userId,
          firstName,
          lastName,
          canstitution: {
            ...canstitution
          },
          qualificationIds,
          dateString: date ? date : '',
          item: {
            appointmentId: id ? id : '',
            id: id ? id : '',
            name,
            date,
            shift: undefined,
            endTime,
            startTime,
            qualificationId,
            // : qualificationData,
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
            comments,
            status:
              requirementData && requirementData.status
                ? requirementData.status
                : ''
          }
        }
      ];
      setselectedCellsCareinstitution(careinstitutionvalue);
      if (date) {
        setactiveDateCareinstitution([{ dateString: date }]);
      }

      //*  */
      const {
        f = '',
        s = '',
        n = '',
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
      } = avabilityData ? avabilityData : {};
      const {
        id: ID = '',
        firstName: firstname = '',
        lastName: lastname = '',
        caregiver: caregiverData = {},
        dateString: dateData = '',
        item: Item = ''
      } = selectedCells && selectedCells.length ? selectedCells[0] : {};
      let caregiverdata: any = [
        {
          id: ID,
          caregiver: {
            ...caregiverData
          },
          dateString: dateData,
          firstName: firstname,
          lastName: lastname,
          item: {
            id: avabilityData && avabilityData.id ? avabilityData.id : '',
            name: avabilityData && avabilityData.name ? avabilityData.name : '',
            date: avabilityData && avabilityData.date ? avabilityData.date : '',
            fee: fee ? fee : '',
            nightFee,
            weekendAllowance,
            holidayAllowance,
            distanceInKM,
            feePerKM,
            lastName,
            f: f === 'available' ? 'available' : '',
            n: n === 'available' ? 'available' : '',
            s: s === 'available' ? 'available' : '',
            nightAllowance,
            otherExpenses,
            remarksCareGiver,
            remarksInternal,
            travelAllowance,
            workingProofRecieved,
            status: status ? status : ''
          }
        }
      ];
      setactiveDateCaregiver([{ dateString: date }]);
      // setselectedCareGiver(caregiverdata);
      setSelectedCells(caregiverdata);
      /*  */
    }
  }, [appointmentFilterById]);

  // push last time data into the caregiver field
  useEffect(() => {
    let data: any = {};
    const {
      distanceInKM = '',
      f = '',
      feePerKM = '',
      lastName: { lastname } = '',
      n = '',
      otherExpenses = '',
      remarksCareGiver = '',
      remarksInternal = '',
      s = '',
      travelAllowance = '',
      workingProofRecieved = false
    } = caregiverLastTimeValues ? caregiverLastTimeValues : {};

    const {
      firstName = '',
      lastName = '',
      id: selectedCaregiverId = '',
      dateString = '',
      caregiver = undefined,
      item = undefined
    } =
      selectedCells && selectedCells.length === 1 && selectedCells[0]
        ? selectedCells[0]
        : {};

    // selectedCells
    if (caregiverLastTimeData) {
      const { getCareGiverAvabilityLastTimeById } = caregiverLastTimeData;
      const {
        fee = '',
        nightFee = '',
        weekendAllowance = '',
        holidayAllowance = ''
      } = getCareGiverAvabilityLastTimeById
        ? getCareGiverAvabilityLastTimeById
        : {};
      let data: any[] = [
        {
          id: selectedCaregiverId,
          firstName,
          lastName,
          caregiver: {
            ...caregiver
          },
          qualificationIds,
          dateString,
          item: {
            ...item,
            fee,
            nightFee,
            weekendAllowance,
            holidayAllowance,
            workingProofRecieved,
            distanceInKM,
            feePerKM,
            travelAllowance,
            otherExpenses,
            f: f ? 'available' : 'default',
            s: s ? 'available' : 'default',
            n: n ? 'available' : 'default'
          }
        }
      ];
      setSelectedCells(data);
    }
  }, [caregiverLastTimeData]);

  // To store users list into state
  useEffect(() => {
    let temp: any[] = daysData ? [...daysData.daysArr] : [];
    if (careGiversList && careGiversList.getUserByQualifications) {
      const { getUserByQualifications } = careGiversList;
      const { result, totalCount } = getUserByQualifications;
      setTotalCaregiver(totalCount);
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
      setcaregiversList(result);
    }

    if (careInstitutionList && careInstitutionList.getUserByQualifications) {
      const { getUserByQualifications } = careInstitutionList;
      const { result } = getUserByQualifications;
      if (result && result.length) {
        /*  */
        result.forEach((user: any, index: number) => {
          user.name = user.canstitution ? user.canstitution.companyName : '';
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
      }
      setcareinstitutionList(result);
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

  const handleSelection = async (selectedCells: any, name: string) => {
    const checkCondition: boolean =
      selectedCells &&
      selectedCells.length &&
      selectedCells[0].item &&
      selectedCells[0].item.appointments &&
      selectedCells[0].item.appointments.length;

    if (name === 'caregiver') {
      if (checkCondition) {
        let appointId: any = selectedCells[0].item.appointments.filter(
          (appointment: any) => {
            return (
              moment(selectedCells[0].dateString).format('DD.MM.YYYY') ===
              moment(appointment.date).format('DD.MM.YYYY')
            );
          }
        );
        if (
          careInstitutionList &&
          careInstitutionList.getUserByQualifications
        ) {
          const { getUserByQualifications } = careInstitutionList;
          const { result } = getUserByQualifications;
          await appointmentDataSort('careinstitution', result, appointId);
        }
      }
      setSelectedCells(selectedCells);
    } else {
      setselectedCellsCareinstitution(selectedCells);
      if (checkCondition) {
        let appointId: any = selectedCells[0].item.appointments.filter(
          (appointment: any) => {
            return (
              moment(selectedCells[0].dateString).format('DD.MM.YYYY') ===
              moment(appointment.date).format('DD.MM.YYYY')
            );
          }
        );
        if (careGiversList && careGiversList.getUserByQualifications) {
          const { getUserByQualifications } = careGiversList;
          const { result } = getUserByQualifications;
          await appointmentDataSort('caregiver', result, appointId);
        }
      }
      // To default select department in case of selected solo careinstitution
      if (
        (selectedCells &&
          selectedCells.length &&
          selectedCells[0] &&
          selectedCells[0].dept,
        selectedCells[0].dept.id)
      ) {
        setcareInstituionDept({
          label: selectedCells[0].dept.name,
          value: selectedCells[0].dept.id
        });
      }
      setShowSelectedCaregiver({ id: '', isShow: false });
    }
  };

  // Function to select appointment data
  const appointmentDataSort = (name: string, result: any, appointId: any) => {
    let temp: any, availData: any, stemp: any;
    if (result && result.length && appointId && appointId.length) {
      result.map((list: any, index: number) => {
        if (list.availabilityData && list.availabilityData.length) {
          list.availabilityData.map((item: any, i: number) => {
            if (name === 'careinstitution') {
              temp = item.filter((avabilityData: any) => {
                return appointId[0].requirementId === avabilityData.id;
              });
            } else {
              temp = item.filter((avabilityData: any) => {
                return appointId[0].avabilityId === avabilityData.id;
              });
            }

            if (temp && temp.length) {
              const {
                id = '',
                firstName = '',
                lastName = '',
                email = '',
                caregiver = {},
                qualificationId = []
              } = list ? list : {};
              if (name === 'careinstitution') {
                let qualification1: IReactSelectInterface[] = [];
                if (
                  qualificationList &&
                  qualificationList.length &&
                  temp[0].qualificationId
                ) {
                  qualification1 = qualificationList.filter(({ value }: any) =>
                    temp[0].qualificationId.includes(value)
                  );
                }
                stemp = {
                  ...temp[0],
                  qualificationId: qualification1 ? qualification1 : []
                };
              }

              availData = [
                {
                  id,
                  firstName,
                  lastName,
                  name,
                  email,
                  caregiver,
                  canstitution,
                  item: stemp ? stemp : temp[0],
                  qualificationIds: qualificationId,
                  dateString: temp[0]
                    ? moment(temp[0].date).format('YYYY.MM.DD')
                    : ''
                }
              ];
            }
          });
        }
      });

      if (availData && availData.length) {
        if (name === 'careinstitution') {
          setselectedCellsCareinstitution(availData);
        } else {
          setSelectedCells(availData);
        }
      }
    } else {
      return true;
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
    // get careGivers list
    getCaregiverData(1);
    // get careInstitution list
    getCareInstituionData();
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
      setcaregiversList(temp);
    } else {
      // To check row added on solo careinstitution or all
      if (
        starCanstitution &&
        (starCanstitution.isStar || secondStarCanstitution.isStar) &&
        careInstituionDeptData &&
        careInstituionDeptData.length
      ) {
        let temp: any = [...careInstituionDeptData];
        temp[index].availabilityData = temp[index].availabilityData
          ? [...temp[index].availabilityData, []]
          : [];
        setcareInstituionDeptData(temp);
      } else {
        let temp: any = [...careinstitutionList];
        temp[index].availabilityData = temp[index].availabilityData
          ? [...temp[index].availabilityData, []]
          : [];
        setcareinstitutionList(temp);
      }
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
    const {
      id = '',
      firstName = '',
      lastName = '',
      name = '',
      item = undefined,
      canstitution = {},
      qualificationIds = [],
      dateString = ''
    } =
      selectedCellsCareinstitution && selectedCellsCareinstitution.length
        ? selectedCellsCareinstitution[0]
        : {};
    if (deptId && (updateCanstitutionFormikValues || !item)) {
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
              data: list
            });
          });
        }
        setshiftOption(careInstitutionTimesOptions);
        let temp: any[] = [
          {
            id,
            firstName,
            lastName,
            name,
            canstitution: {
              ...canstitution
            },
            qualificationIds,
            dateString,
            item: {
              ...values,
              id: values && values.appointmentId ? values.appointmentId : '',
              department: careInstituionDept,
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
                  : values.shift,
              startTime: startTime ? startTime : values.startTime,
              endTime: endTime ? endTime : values.endTime
            }
          }
        ];
        if (
          selectedCellsCareinstitution &&
          selectedCellsCareinstitution.length
        ) {
          let data = [...selectedCellsCareinstitution];
          data[0] = temp[0];
          setselectedCellsCareinstitution(data);
        } else {
          setselectedCellsCareinstitution(temp);
        }
      }
    }
  }, [careInstituionDept]);

  // Change time shift option
  useEffect(() => {
    let timeData: IReactSelectTimeInterface | undefined = careInstituionShift;
    let values = updateCanstitutionFormikValues;
    let time = timeData && !timeData.data ? timeData.value.split('-') : '';
    const {
      id = '',
      firstName = '',
      lastName = '',
      name = '',
      canstitution = {},
      qualificationIds = [],
      dateString = ''
    } =
      selectedCellsCareinstitution && selectedCellsCareinstitution.length
        ? selectedCellsCareinstitution[0]
        : {};
    let data: any[] = [
      {
        id,
        firstName,
        lastName,
        name,
        canstitution,
        qualificationIds,
        dateString,
        item: {
          ...values,
          id: values && values.appointmentId ? values.appointmentId : '',
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
        }
      }
    ];
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      let temp = [...selectedCellsCareinstitution];
      temp[0] = data[0];
      setselectedCellsCareinstitution(temp);
    } else {
      setselectedCellsCareinstitution(data);
    }
  }, [careInstituionShift]);

  const setOnConfirmedCareInst = async () => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      selectedCellsCareinstitution.forEach(async element => {
        const { item } = element;
        if (item && item.id) {
          if (item.status === 'linked') {
            let availabilityId: number = item.id ? parseInt(item.id) : 0;
            delete item.id;
            delete item.__typename;
            delete item.appointments;
            await updateCareinstitutionRequirment({
              variables: {
                id: availabilityId,
                careInstitutionRequirementInput: {
                  ...item,
                  qualificationId: item.qualificationId.map((item: any) => {
                    item.id;
                  }),
                  status: 'confirmed'
                }
              }
            });
            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation('CARE_INST_SET_CONFIRMED_SUCCESS_MSG')
              );
            }
          } else {
            toast.warn(languageTranslation('CAREINSTTITUTION_LINKED'));
          }
        }
      });
    }
  };
  const setOnNotConfirmedCareInst = async () => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      selectedCellsCareinstitution.forEach(async element => {
        const { item } = element;
        if (item && item.id) {
          if (item.status === 'confirmed') {
            let availabilityId: number = item.id ? parseInt(item.id) : 0;
            delete item.id;
            delete item.__typename;
            delete item.appointments;
            await updateCareinstitutionRequirment({
              variables: {
                id: availabilityId,
                careInstitutionRequirementInput: {
                  ...item,
                  status: 'linked'
                }
              }
            });
            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation('CARE_INST_SET_NOT_CONFIRMED_SUCCESS_MSG')
              );
            }
          } else {
            toast.warn(languageTranslation('CAREINSTTITUTION_LINKED'));
          }
        }
      });
    }
  };
  const setOnOfferedCareInst = async () => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      selectedCellsCareinstitution.forEach(async element => {
        const { item } = element;
        if (item && item.id) {
          if (item.status === 'default' || item.status === 'requirement') {
            let availabilityId: number = item.id ? parseInt(item.id) : 0;
            delete item.id;
            delete item.__typename;
            delete item.appointments;
            await updateCareinstitutionRequirment({
              variables: {
                id: availabilityId,
                careInstitutionRequirementInput: {
                  ...item,
                  status: 'offered'
                }
              }
            });
            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation('CARE_INST_SET_ON_OFFERED_SUCCESS_MSG')
              );
            }
          } 
          // else {
          //   toast.warn('Only requirements can be set to "offered" ! ');
          // }
        }
      });
    }
  };
  const setOnNotOfferedCareInst = async () => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      selectedCellsCareinstitution.forEach(async element => {
        const { item } = element;
        if (item && item.id) {
          if (item.status === 'offered') {
            let availabilityId: number = item.id ? parseInt(item.id) : 0;
            delete item.id;
            delete item.__typename;
            delete item.appointments;
            await updateCareinstitutionRequirment({
              variables: {
                id: availabilityId,
                careInstitutionRequirementInput: {
                  ...item,
                  status: 'default'
                }
              }
            });
            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation('CARE_INST_SET_ON_NOT_OFFERED_SUCCESS_MSG')
              );
            }
          } else {
            toast.warn('something wrong');
          }
        }
      });
    }
  };
  // set on offeres for careinstitution
  const setOnConfirmedCaregiver = async () => {
    if (selectedCells && selectedCells.length) {
      selectedCells.forEach(async element => {
        const { item } = element;
        if (item && item.id) {
          if (item.status === 'linked') {
            let availabilityId: number = item.id ? parseInt(item.id) : 0;
            delete item.id;
            delete item.__typename;
            delete item.appointments;
            await updateCaregiver({
              variables: {
                id: availabilityId,
                careGiverAvabilityInput: {
                  ...item,
                  status: 'confirmed'
                }
              }
            });
            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation('CARE_GIVER_SET_CONFIRMED_SUCCESS_MSG')
              );
            }
          } else {
            toast.warn(languageTranslation('CAREGIVER_LINKED'));
          }
        }
      });
    }
  };

  // set on offeres for careinstitution
  const setOnNotConfirmedCaregiver = async () => {
    if (selectedCells && selectedCells.length) {
      selectedCells.forEach(async element => {
        const { item } = element;
        if (item && item.id) {
          if (item.status === 'confirmed') {
            let availabilityId: number = item.id ? parseInt(item.id) : 0;
            delete item.id;
            delete item.__typename;
            delete item.appointments;
            await updateCaregiver({
              variables: {
                id: availabilityId,
                careGiverAvabilityInput: {
                  ...item,
                  status: 'linked'
                }
              }
            });
            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation('CARE_GIVER_SET_NOT_CONFIRMED_SUCCESS_MSG')
              );
            }
          } else {
            toast.warn(languageTranslation('CAREGIVER_LINKED'));
          }
        }
      });
    }
  };

  // On link requirement
  const onLinkAppointment = async (selectedOption: any, name: string) => {
    if (name === 'link') {
      await linkRequirement({
        variables: {
          appointmentInput: selectedOption
        }
      });
      updateLinkedStatus(name);
    } else {
      await unLinkRequirement({
        variables: {
          appointmentInput: selectedOption
        }
      });
      updateLinkedStatus(name);
    }
  };

  const updateLinkedStatus = (name: string) => {
    // Update status in careinstitution form
    const {
      id = '',
      firstName = '',
      lastName = '',
      canstitution = {},
      qualificationIds = [],
      dateString = '',
      item = {}
    } =
      selectedCellsCareinstitution && selectedCellsCareinstitution.length
        ? selectedCellsCareinstitution[0]
        : {};
    let temp: any[] = [
      {
        id,
        firstName,
        lastName,
        canstitution: {
          ...canstitution
        },
        qualificationIds: qualificationIds,
        dateString,
        item: {
          ...item,
          status: name === 'link' ? 'linked' : 'default'
        }
      }
    ];
    setselectedCellsCareinstitution(temp);

    // Update caregiver status
    const {
      id: ID = '',
      firstName: firstname = '',
      lastName: lastname = '',
      caregiver = {},
      qualificationIds: qualificationId = [],
      dateString: date = '',
      item: Item = ''
    } = selectedCells && selectedCells.length ? selectedCells[0] : {};

    let stemp: any[] = [
      {
        id: ID,
        firstName: firstname,
        lastName: lastname,
        caregiver: {
          ...caregiver
        },
        qualificationIds: [],
        dateString: date,
        item: {
          ...Item,
          status: name === 'link' ? 'linked' : 'default',
          f: Item && Item.f === 'available' ? 'available' : '',
          n: Item && Item.n === 'available' ? 'available' : '',
          s: Item && Item.s === 'available' ? 'available' : ''
        }
      }
    ];
    setSelectedCells(stemp);
  };

  //  call department list query with every selection of care institution
  useEffect(() => {
    let userId: string =
      selectedCellsCareinstitution && selectedCellsCareinstitution.length
        ? selectedCellsCareinstitution[0].id
        : '';
    if (userId && !starCanstitution.isStar) {
      getDepartmentList({
        variables: {
          userId: parseInt(userId),
          locked: null
        }
      });
    }
  }, [selectedCellsCareinstitution]);

  // useEffect for filtering department data in careinstitution list
  useEffect(() => {
    if (
      departmentList &&
      departmentList.getDivision.length &&
      starCanstitution.isStar
    ) {
      const { getDivision } = departmentList;
      const dept: any[] = [];
      let careInstData: any = careinstitutionList.filter(
        (item: any) => item.id === starCanstitution.id
      )[0];
      if (careInstData) {
        let requirements: any[] = [].concat.apply(
          [],
          careInstData.availabilityData
        );
        let temp: any[] = daysData ? [...daysData.daysArr] : [];

        getDivision
          .filter((division: any) => !division.locked)
          .forEach((division: any) => {
            division.availabilityData = [];
            division.canstitution = careInstData.canstitution;
            division.careInstId = careInstData.id;
            division.isActive = careInstData.isActive;
            division.deptId = division.id;
            // To group availabilities by division
            let deptRequirement = requirements.filter(
              (req: any) => req.divisionId === division.id
            );
            let result: any = deptRequirement.reduce(
              (acc: any, o: any) => (
                (acc[moment(o.date).format(dbAcceptableFormat)] =
                  (acc[moment(o.date).format(dbAcceptableFormat)] || 0) + 1),
                acc
              ),
              {}
            );

            result = Object.entries(result).length
              ? Object.values(result)
              : [1];
            result = Math.max(...result);

            for (let row = 0; row < result; row++) {
              division.availabilityData.push([]);
            }
            temp.forEach((d: any, index: number) => {
              let records = deptRequirement.filter((available: any) =>
                moment(d.dateString).isSame(moment(available.date), 'day')
              );
              for (let i = 0; i < records.length; i++) {
                division.availabilityData[i].push(records[i]);
              }
            });
          });
        setFetchingDept(false);
        setcareInstituionDeptData(
          getDivision.filter((division: any) => !division.locked)
        );
      }
    } else {
      setFetchingDept(false);
    }
  }, [departmentList, starCanstitution.isStar, careinstitutionList]);

  // handle first star of careinstitution and show department list
  const handleFirstStarCanstitution = async (list: any, index: number) => {
    // setselectedCareinstitution(list);

    let temp = careinstitutionList.filter((dept: any) => dept.id === list.id);

    //  setcareinstitutionList()
    setcareinstitutionDepartmentList(temp);
    if (!starCanstitution.isStar) {
      setstarCanstitution({
        isStar: true,
        setIndex: index,
        id: list ? list.id : ''
      });
    } else {
      setstarCanstitution({
        isStar: false,
        setIndex: -1,
        id: ''
      });
      setsecondStarCanstitution({
        isStar: false,
        setIndex: -1,
        id: ''
      });
      setcareInstituionDeptData([]);
    }
    if (list) {
      if (list.id && !starCanstitution.isStar) {
        setFetchingDept(true);
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
    // To check whether first star is clicked or not
    if (!secondStarCanstitution.isStar && !starCanstitution.isStar) {
      handleFirstStarCanstitution({ id: dept ? dept.id : '' }, 1);
    } else {
      setsecondStarCanstitution({
        isStar: !secondStarCanstitution.isStar,
        setIndex: -1,
        id: dept && dept.id ? dept.id : '',
      });
      let data: any = [];
      data.push(dept);
      // setcareInstituionDeptData(data);
      setcareInstituionDept({
        label: dept.name,
        value: dept.id,
      });
    }
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
    { setSubmitting }: FormikHelpers<ICaregiverFormValue>
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
      remarksCareGiver,
      remarksInternal,
      f,
      s,
      n,
      status
    } = values;

    try {
      if (f || s || n) {
        setTimeSlotError('');
        if (selectedCells && selectedCells.length) {
          // To add mulitple availabilty
          selectedCells.forEach(async (element: any) => {
            const { id = '', dateString = '' } = element ? element : {};
            let CareGiverAvabilityInput: any = {
              userId: id ? parseInt(id) : '',
              date: dateString,
              name,
              fee: fee ? parseFloat(fee.replace(/,/g, '.')) : null,
              weekendAllowance: weekendAllowance
                ? parseFloat(weekendAllowance.replace(/,/g, '.'))
                : null,
              holidayAllowance: holidayAllowance
                ? parseFloat(holidayAllowance.replace(/,/g, '.'))
                : null,
              nightFee: nightFee
                ? parseFloat(nightFee.replace(/,/g, '.'))
                : null,
              nightAllowance:
                nightAllowance && nightAllowance.value
                  ? nightAllowance.value
                  : null,
              workingProofRecieved: workingProofRecieved ? true : false,
              distanceInKM: distanceInKM ? parseFloat(distanceInKM) : null,
              feePerKM: feePerKM ? parseFloat(feePerKM) : null,
              travelAllowance: travelAllowance
                ? parseFloat(travelAllowance)
                : null,
              otherExpenses: otherExpenses ? parseFloat(otherExpenses) : null,
              remarksCareGiver: remarksCareGiver ? remarksCareGiver : null,
              remarksInternal: remarksInternal ? remarksInternal : null,
              f: f ? 'available' : 'default',
              s: s ? 'available' : 'default',
              n: n ? 'available' : 'default',
              status: status ? status : 'default'
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
                  languageTranslation(
                    'CARE_GIVER_REQUIREMENT_UPDATE_SUCCESS_MSG'
                  )
                );
              }
              setsavingBoth(false);
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
              setMultipleAvailability(false);
              if (!toast.isActive(toastId)) {
                toastId = toast.success(
                  languageTranslation('CARE_GIVER_REQUIREMENT_ADD_SUCCESS_MSG')
                );
              }
            }
          });
        }
      } else {
        setTimeSlotError(languageTranslation('WORKING_SHIFT_ERROR'));
        return;
      }
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
    setSubmitting(false);
  };

  // submit careinstitution form
  const handleSubmitCareinstitutionForm = async (
    values: ICareinstitutionFormValue,
    { setSubmitting }: FormikHelpers<ICareinstitutionFormValue>
  ) => {
    const {
      appointmentId,
      name,
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
      comments,
      status
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
        selectedCellsCareinstitution.forEach(async (element: any) => {
          const { id = '', dateString = '' } = element ? element : {};
          let careInstitutionRequirementInput: ICareinstitutionFormSubmitValue = {
            userId: id ? parseInt(id) : 0,
            date: dateString,
            name,
            startTime,
            endTime,
            divisionId:
              department && department.value
                ? parseInt(department.value)
                : null,
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
            status: status ? status : 'default'
          };
          if (appointmentId) {
            await updateCareinstitutionRequirment({
              variables: {
                id: parseInt(appointmentId),
                careInstitutionRequirementInput
              }
            });
            setsavingBoth(false);
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
                careInstitutionRequirementInput: [
                  careInstitutionRequirementInput
                ]
              }
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
        });
      }
      // canstitutionRefetch();
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
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
    }
    fetchAppointmentFilterById({
      variables: {
        id: parseInt(userId),
        searchIn: userRole
      }
    });
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

  const onDeleteEntries = async (userRole: string) => {
    let temp: any =
      userRole === 'caregiver' ? selectedCells : selectedCellsCareinstitution;

    if (temp && temp.length) {
      const { value } = await ConfirmBox({
        title: languageTranslation('CONFIRM_LABEL'),
        text:
          userRole === 'caregiver'
            ? languageTranslation('CONFIRM_DELETE_CAREGIVER_AVABILITY')
            : languageTranslation('CONFIRM_DELETE_CAREINSTITUTION_REQUIREMENT')
      });
      if (value) {
        temp.forEach(async (element: any) => {
          const { id, item } = element;
          if (item && item.id) {
            if (userRole === 'caregiver') {
              await deleteCaregiverRequirement({
                variables: {
                  id: parseInt(item.id)
                }
              });
            } else {
              await deleteCareinstitutionRequirement({
                variables: {
                  id: parseInt(item.id)
                }
              });
            }
          } else {
            let index: number = -1;
            index = caregiversList.findIndex(
              (caregiver: any) => caregiver.id === id
            );
            let temp: any = [...caregiversList];
            temp[index].availabilityData = [];
            setcaregiversList(temp);
          }
        });
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            userRole === 'caregiver'
              ? languageTranslation('DELETE_CAREGIVER_AVABILITY_SUCCESS')
              : languageTranslation(
                  'DELETE_CAREINSTITUTION_REQUIREMENT_SUCCESS'
                )
          );
        }
      } else {
        return;
      }
    }
  };

  // Link both forms
  const handleLinkBoth = () => {
    let selectedData: any = [],
      checkError: boolean = false;
    if (
      selectedCellsCareinstitution &&
      selectedCellsCareinstitution.length &&
      selectedCells &&
      selectedCells.length
    ) {
      selectedCells.map((key: any, index: number) => {
        const element = selectedCellsCareinstitution[index];
        if (
          moment(key.dateString).format(dbAcceptableFormat) !==
          moment(element.dateString).format(dbAcceptableFormat)
        ) {
          checkError = true;
          if (!toast.isActive(toastId)) {
            toastId = toast.error(
              'Date range between appointments & requirement mismatch.'
            );
          }
          return false;
        } else if (key.item === undefined || element.item === undefined) {
          checkError = true;
          if (!toast.isActive(toastId)) {
            toastId = toast.error(
              'Create requirement or appointment first for the selected cell.'
            );
          }
          return false;
        } else {
          if (!checkError) {
            selectedData.push({
              avabilityId: parseInt(key.item.id),
              requirementId: parseInt(element.item.id),
              date: moment(element.dateString).format(dbAcceptableFormat),
              status: 'appointment'
            });
          }
        }
      });
      if (!checkError) {
        onLinkAppointment(selectedData, 'link');
      }
    }
  };

  // Handle unlink both
  const handleUnlinkBoth = () => {
    setshowUnlinkModal(!showUnlinkModal);
  };

  const handleUnlinkData = (likedBy: string, check: boolean) => {
    let appointmentId: any = [];
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      selectedCellsCareinstitution.map((key: any, index: number) => {
        let appointId: any = key.item.appointments.filter(
          (appointment: any) => {
            return (
              moment(key.dateString).format('DD.MM.YYYY') ===
              moment(appointment.date).format('DD.MM.YYYY')
            );
          }
        );
        return appointmentId.push({
          appointmentId: parseInt(appointId[0].id),
          unlinkedBy: likedBy,
          deleteAll: check
        });
      });
      onLinkAppointment(appointmentId, 'unlink');
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error('Please select appointment/s.');
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

  // Fetch values in case of edit caregiver with condition predefined data or availability data by default it will be null or undefined
  const {
    firstName = '',
    lastName = '',
    id: selectedCaregiverId = '',
    dateString = '',
    caregiver = undefined,
    item = undefined
  } =
    selectedCells &&
    (selectedCells.length === 1 || multipleAvailability) &&
    selectedCells[0]
      ? selectedCells[0]
      : {};
  console.log('selectedCells in index', selectedCells);

  let departmentData: any =
    selectedCellsCareinstitution &&
    selectedCellsCareinstitution.length &&
    selectedCellsCareinstitution[0] &&
    selectedCellsCareinstitution[0].item
      ? selectedCellsCareinstitution[0].item.department
      : undefined;
  if (
    careInstitutionDepartment &&
    careInstitutionDepartment.length &&
    selectedCellsCareinstitution &&
    selectedCellsCareinstitution.length &&
    selectedCellsCareinstitution[0] &&
    selectedCellsCareinstitution[0].item &&
    selectedCellsCareinstitution[0].item.divisionId
  ) {
    const { getDivision } = departmentList;
    departmentData = careInstitutionDepartment.filter(
      (dept: any) =>
        dept.value === selectedCellsCareinstitution[0].item.divisionId
    );
  }
  const {
    id: Id = '',
    firstName: FirstName = '',
    lastName: LastName = '',
    name: careInstName = '',
    canstitution = {},
    item: Item = {},
    qualificationIds = {},
    dateString: careInstitutiondateString = ''
  } =
    selectedCellsCareinstitution && selectedCellsCareinstitution.length
      ? selectedCellsCareinstitution[0]
      : {};

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
      departmentData && departmentData[0] ? departmentData[0] : departmentData,
    comments: Item ? Item.comments : '',
    status: Item ? Item.status : '',
    careInstitutionDepartment
  };
  console.log('name in index', item);
  console.log('caregiver caregiver', caregiver);

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
    n = '',
    status = ''
  } = item ? item : caregiver ? caregiver : {};
  const valuesForCaregiver: ICaregiverFormValue = {
    appointmentId: id !== null ? id : null,
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
        : NightAllowancePerHour[0],
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
    n: n === 'available' ? true : false,
    status: status ? status : ''
  };

  const [savingBoth, setsavingBoth] = useState(false);
  const handleSaveBoth = () => {
    setsavingBoth(true);
  };
  const isCareinstituionData: boolean = selectedCellsCareinstitution
    ? !selectedCellsCareinstitution[0].id
      ? true
      : false
    : false;

  // get next page caregivers
  const getNext = (skip: number): void => {
    setPage(page + 1);
    // getCaregiverData(page);
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
    fetchMoreCareGiverList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: 'caregiver',
        negativeAttributeId: negative,
        limit: 10,
        page: page ? page + 1 : 1,
        showAppointments:
          filterByAppointments && filterByAppointments.value
            ? filterByAppointments.value === 'showAll'
              ? ''
              : filterByAppointments.value
            : null,
        positiveAttributeId: positive,
        gte,
        lte
      },

      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        if (prev.getUserByQualifications) {
          let list = [...fetchMoreResult.getUserByQualifications.result];
          if (list && list.length) {
            let dayDetails: any[] = daysData ? [...daysData.daysArr] : [];
            list.forEach((user: any, index: number) => {
              user.availabilityData = [];
              user.attribute = [];
              if (
                user.caregiver_avabilities &&
                user.caregiver_avabilities.length
              ) {
                let result: any = user.caregiver_avabilities.reduce(
                  (acc: any, o: any) => (
                    (acc[moment(o.date).format(dbAcceptableFormat)] =
                      (acc[moment(o.date).format(dbAcceptableFormat)] || 0) +
                      1),
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
                dayDetails.forEach((d: any, index: number) => {
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
          setcaregiversList((prevArray: any) => [...prevArray, ...list]);
          let selectedId: any = [];
          return Object.assign({}, prev, {
            getUserByQualifications: {
              ...prev.getUserByQualifications,
              result: [
                ...prev.getUserByQualifications.result,
                ...fetchMoreResult.getUserByQualifications.result
              ]
            }
          });
        }
      }
    });
  };

  const handleSelectedAppoitment = () => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      const { item } = selectedCellsCareinstitution[0];
      const { appointments = [] } = item ? item : {};
      const { ca = {} } =
        appointments && appointments.length ? appointments[0] : [];
      setShowSelectedCaregiver({
        id: ca.userId,
        isShow: true
      });
    }
  };

  const isUnLinkable =
    selectedCells &&
    selectedCells.length &&
    selectedCells[0].item &&
    selectedCells[0].item.appointments &&
    selectedCells[0].item.appointments.length &&
    selectedCellsCareinstitution &&
    selectedCellsCareinstitution.length &&
    selectedCellsCareinstitution[0].item &&
    selectedCellsCareinstitution[0].item.appointments &&
    selectedCells[0].item.appointments.length &&
    selectedCells[0].item.appointments[0] &&
    selectedCells[0].item.appointments[0].id &&
    selectedCellsCareinstitution[0].item.appointments[0] &&
    selectedCellsCareinstitution[0].item.appointments[0].id &&
    selectedCells[0].item.appointments[0].id ===
      selectedCellsCareinstitution[0].item.appointments[0].id
      ? true
      : false;

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
                <Col lg={'6'}>
                  {/* caregiver list view */}
                  <CaregiverListView
                    fetchingCareGiverData={fetchingCareGiverData}
                    daysData={daysData}
                    loading={caregiverLoading}
                    careGiversList={caregiversList ? caregiversList : []}
                    onAddingRow={onAddingRow}
                    selectedCells={selectedCells}
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
                    onNewAvailability={() => setMultipleAvailability(true)}
                    handleSelection={handleSelection}
                    selectedCellsCareinstitution={selectedCellsCareinstitution}
                    onLinkAppointment={onLinkAppointment}
                    setOnConfirmedCaregiver={setOnConfirmedCaregiver}
                    setOnNotConfirmedCaregiver={setOnNotConfirmedCaregiver}
                    totalCaregiver={totalCaregiver}
                    getNext={getNext}
                  />
                  {/* care insitution list */}
                  <CarinstituionListView
                    daysData={daysData}
                    loading={careinstitutionLoading}
                    careInstitutionList={
                      careinstitutionList ? careinstitutionList : []
                    }
                    handleSelectedAppoitment={() => handleSelectedAppoitment()}
                    fetchCareinstitutionList={fetchCareinstitutionList}
                    onAddingRow={onAddingRow}
                    handleSecondStar={handleSecondStar}
                    handleReset={handleReset}
                    showSelectedCaregiver={showSelectedCaregiver}
                    handleFirstStarCanstitution={handleFirstStarCanstitution}
                    careInstituionDeptData={careInstituionDeptData}
                    starCanstitution={starCanstitution}
                    secondStarCanstitution={secondStarCanstitution}
                    deptLoading={deptLoading /* fetchingDept */}
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
                    onDeleteEntries={onDeleteEntries}
                    setOnConfirmedCareInst={setOnConfirmedCareInst}
                    setOnNotConfirmedCareInst={setOnNotConfirmedCareInst}
                    setOnOfferedCareInst={setOnOfferedCareInst}
                    setOnNotOfferedCareInst={setOnNotOfferedCareInst}
                    onNewRequirement={() => setMultipleRequirement(true)}
                    careinstitutionDepartmentList={
                      careinstitutionDepartmentList
                    }
                  />
                </Col>
                <Col lg={'6'}>
                  <Row>
                    <Col
                      lg={'6'}
                      className='px-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0'
                    >
                      <Formik
                        initialValues={valuesForCaregiver}
                        onSubmit={handleSubmitCaregiverForm}
                        enableReinitialize={true}
                        validationSchema={CareGiverValidationSchema}
                        children={(props: FormikProps<ICaregiverFormValue>) => {
                          return (
                            <CaregiverFormView
                              {...props}
                              selectedCareGiver={{ id: selectedCaregiverId }}
                              addCaregiverLoading={
                                addCaregiverLoading
                                  ? true
                                  : updateCaregiverLoading
                                  ? true
                                  : false
                              }
                              setsavingBoth={() => setsavingBoth(false)}
                              activeDateCaregiver={
                                !multipleAvailability
                                  ? [dateString]
                                  : selectedCells
                                  ? selectedCells.map(cell => cell.dateString)
                                  : []
                              }
                              addCaregiverRes={
                                addCaregiverRes &&
                                addCaregiverRes.addCareGiverAvability
                                  ? addCaregiverRes.addCareGiverAvability
                                  : ''
                              }
                              timeSlotError={timeSlotError}
                              selctedAvailability={item}
                              onhandleDelete={onhandleDelete}
                              handleSelectUserList={handleSelectUserList}
                              savingBoth={savingBoth}
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
                        initialValues={valuesForCareIntituionForm}
                        onSubmit={handleSubmitCareinstitutionForm}
                        enableReinitialize={true}
                        validationSchema={CareInstitutionValidationSchema}
                        children={(
                          props: FormikProps<ICareinstitutionFormValue>
                        ) => {
                          return (
                            <CareinstitutionFormView
                              {...props}
                              savingBoth={savingBoth}
                              addCareinstLoading={
                                addCareinstLoading
                                  ? true
                                  : updateCareinstitutionLoading
                                  ? true
                                  : false
                              }
                              setsavingBoth={() => setsavingBoth(false)}
                              activeDateCareinstitution={
                                !multipleRequirement
                                  ? [careInstitutiondateString]
                                  : selectedCellsCareinstitution
                                  ? selectedCellsCareinstitution.map(
                                      cell => cell.dateString
                                    )
                                  : []
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
                              selectedCareinstitution={{ id: Id }}
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
                              selctedRequirement={Item}
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
                          disabled={
                            selectedCells !== undefined && !isCareinstituionData
                              ? false
                              : true
                          }
                          onClick={() => handleSaveBoth()}
                        >
                          <i className='fa fa-save mr-2' />
                          {languageTranslation('SAVE_BOTH')}
                        </Button>
                        <Button
                          className='btn-common mt-0 mb-2 mx-2'
                          color='secondary'
                          disabled={
                            selectedCells !== undefined && !isCareinstituionData
                              ? false
                              : true
                          }
                          onClick={() =>
                            isUnLinkable ? handleUnlinkBoth() : handleLinkBoth()
                          }
                        >
                          {linkLoading ? (
                            <i className='fa fa-spinner fa-spin mr-2' />
                          ) : (
                            <i className='fa fa-link mr-2' />
                          )}
                          {isUnLinkable
                            ? 'Unlink'
                            : languageTranslation('LINK')}
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
      <UnlinkAppointment
        show={showUnlinkModal}
        handleClose={() => setshowUnlinkModal(false)}
        handleUnlinkData={handleUnlinkData}
      />
    </>
  );
};

export default Appointment;
