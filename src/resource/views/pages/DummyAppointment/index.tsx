import React, { FunctionComponent, useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import {
  APPOINTMENT_PAGE_LIMIT,
  dbAcceptableFormat,
  defaultDateFormat,
  NightAllowancePerHour,
} from '../../../../config';
import {
  AppointmentsQueries,
  GET_QUALIFICATION_ATTRIBUTE,
  CareInstitutionQueries,
  LeasingContractQueries,
  InvoiceQueries,
  DocumentQueries,
} from '../../../../graphql/queries';
import moment from 'moment';
import {
  IGetDaysArrayByMonthRes,
  IQualifications,
  ICaregiverFormValue,
  ICareinstitutionFormValue,
  IReactSelectInterface,
  IAddCargiverAppointmentRes,
} from '../../../../interfaces';
import {
  germanNumberFormat,
  getDaysArrayByMonth,
  languageTranslation,
} from '../../../../helpers';
import { toast } from 'react-toastify';
import CaregiverList from './Caregiver/CaregiverList';
import { AppointmentMutations } from '../../../../graphql/Mutations';
import CareInstitutionList from './CareInstitution/CareinstitutionList';
import '../Appointment/index.scss';
import AppointmentNav from './AppointmentNav.tsx';
import { Col, Row, Button } from 'reactstrap';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import CaregiverFormView from '../DummyAppointment/Caregiver/CaregiverForm';
import CareinstitutionFormView from '../DummyAppointment/CareInstitution/CareinstitutionForm';
import {
  CareGiverValidationSchema,
  CareInstitutionValidationSchema,
} from '../../../validations/AppointmentsFormValidationSchema';
const [GET_LEASING_CONTRACT] = LeasingContractQueries;
const [, , GET_INVOICE_BY_APPOINTMENT_ID] = InvoiceQueries;
const [, , , , , , , GET_CONTRACT_BY_APPOINTMENT_ID] = AppointmentsQueries;
const [, , , , GET_WORKPROOF_PDF] = DocumentQueries;
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
const [, , GET_DEPARTMENT_LIST, , , ,] = CareInstitutionQueries;
const [
  ADD_CAREGIVER_AVABILITY,
  ADD_INSTITUTION_REQUIREMENT,
  UPDATE_CAREGIVER_AVABILITY,
  UPDATE_INSTITUTION_REQUIREMENT,
  DELETE_CAREINSTITUTION_REQUIREMENT,
  DELETE_CAREGIVER_AVABILITY,
  LINK_REQUIREMENT,
  UN_LINK_REQUIREMENT,
] = AppointmentMutations;
let toastId: any = null;
const DummyAppointment: FunctionComponent = () => {
  const [daysData, setDaysData] = useState<IGetDaysArrayByMonthRes>({
    daysArr: [],
    month: moment().month().toString(),
    year: moment().year().toString(),
  });
  //  set page
  const [page, setPage] = useState<number>(1);
  const [selectedCells, setSelectedCells] = useState<any[]>();
  const [
    selectedCellsCareinstitution,
    setselectedCellsCareinstitution,
  ] = useState<any[]>();
  const [filterState, setfilterState] = useState<any>({
    filterByAppointments: {
      value: 'showWithAppointments',
      label: languageTranslation('SHOW_APPOINTMENT'),
    },
    caregiverSoloFilter: undefined,
    careinstitutionSoloFilter: undefined,
    qualification: [],
    positive: [],
    negative: [],
    isPositive: [],
    isNegative: [],
  });
  const [multipleAvailability, setMultipleAvailability] = useState<boolean>(
    false,
  );
  const [caregiversList, setcaregiversList] = useState<any[]>([]);
  const [careinstitutionList, setcareinstitutionList] = useState<Object[]>([]);

  // To fetch caregivers by id filter
  const [
    fetchCaregiverList,
    {
      data: careGiversList,
      loading: caregiverLoading,
      refetch: fetchingCareGiverData,
      fetchMore: fetchMoreCareGiverList,
    },
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache',
  });

  // To fetch careinstitution by qualification id
  const [
    fetchCareinstitutionList,
    {
      data: careInstitutionList,
      loading: careinstitutionLoading,
      // refetch: canstitutionRefetch,
      fetchMore: fetchMoreCareInstituionList,
    },
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache',
  });

  //=================================== CAREGIVER FORM API ==========================
  // Query to get uploaded pdf
  const [getLeasingContractPDF, { data: pdfData, loading }] = useLazyQuery<any>(
    GET_LEASING_CONTRACT
  );
  // query to get contract pdf
  const [getContractPDF, { data: contractData }] = useLazyQuery<any>(
    GET_CONTRACT_BY_APPOINTMENT_ID
  );
  // Query to get Invoice pdf
  const [getInvoiceByAppointmentId, { data: invoicePDF }] = useLazyQuery<any>(
    GET_INVOICE_BY_APPOINTMENT_ID
  );

  // Query to get Work Proof pdf
  const [getWorkProofPDF, { data: workProofData }] = useLazyQuery<any>(
    GET_WORKPROOF_PDF
  );

  // To get department list
  const [
    getDepartmentList,
    { data: departmentList, loading: deptLoading },
  ] = useLazyQuery<any>(GET_DEPARTMENT_LIST);

  // Mutation to update careGiver data
  const [
    updateCaregiver,
    { data: updateCaregiverRes, loading: updateCaregiverLoading },
  ] = useMutation<
    {
      updateCareGiverAvability: IAddCargiverAppointmentRes;
    },
    {
      id: number;
      careGiverAvabilityInput: any;
    }
  >(UPDATE_CAREGIVER_AVABILITY, {
    onCompleted({ updateCareGiverAvability }) {
      const temp = [...caregiversList];
      const selectedCaregiverCells = selectedCells ? [...selectedCells] : [];
      let index: number = temp.findIndex(
        (caregiver: any) => caregiver.id === updateCareGiverAvability.userId
      );
      if (index > -1) {
        for (let i = 0; i < temp[index].availabilityData.length; i++) {
          let element: any[] = [...temp[index].availabilityData[i]];
          let availabilityIndex: number = element.findIndex(
            (e: any) => e.id === updateCareGiverAvability.id
          );
          if (availabilityIndex > -1) {
            temp[index].availabilityData[i][availabilityIndex] = {
              ...temp[index].availabilityData[i][availabilityIndex],
              ...updateCareGiverAvability,
            };
            break;
          }
        }
        let cellIndex: number = selectedCaregiverCells.findIndex(
          (cell: any) =>
            cell.item && updateCareGiverAvability.id === cell.item.id
        );
        if (selectedCaregiverCells[cellIndex]) {
          selectedCaregiverCells[cellIndex] = {
            ...selectedCaregiverCells[cellIndex],
            item: {
              ...selectedCaregiverCells[cellIndex].item,
              ...updateCareGiverAvability,
            },
          };
        }
        setSelectedCells(selectedCaregiverCells);
      }
      // setPage(1);
      // fetchingCareGiverData();
    },
  });

  // Mutation to add careGiver data
  const [
    addCaregiverAvailability,
    { error, data: addCaregiverRes, loading: addCaregiverLoading },
  ] = useMutation<
    {
      addCareGiverAvability: [IAddCargiverAppointmentRes];
    },
    {
      careGiverAvabilityInput: any;
    }
  >(ADD_CAREGIVER_AVABILITY, {
    onCompleted({ addCareGiverAvability }) {
      if (caregiversList && caregiversList.length) {
        const temp = [...caregiversList];
        const selectedCaregiverCells = selectedCells ? [...selectedCells] : [];
        addCareGiverAvability.forEach((availability: any) => {
          let index: number = temp.findIndex(
            (caregiver: any) => caregiver.id === availability.userId
          );

          if (temp[index].availabilityData) {
            for (let i = 0; i < temp[index].availabilityData.length; i++) {
              let element: any[] = [...temp[index].availabilityData[i]];

              let cellIndex: number = selectedCaregiverCells.findIndex(
                (cell: any) =>
                  moment(availability.date).isSame(
                    moment(cell.dateString),
                    'day'
                  )
              );
              if (selectedCaregiverCells[cellIndex]) {
                selectedCaregiverCells[cellIndex] = {
                  ...selectedCaregiverCells[cellIndex],
                  item: availability,
                };
              }
              // To check this row have this date entry or not
              if (
                element.filter((e: any) =>
                  moment(e.date).isSame(moment(availability.date), 'day')
                ).length === 0
              ) {
                temp[index].availabilityData[i] = [...element, availability];
                break;
              }
            }
          }
        });
        setSelectedCells(selectedCaregiverCells);
      }
      // setPage(1);
      // fetchingCareGiverData();
      toast.dismiss();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('CARE_GIVER_REQUIREMENT_ADD_SUCCESS_MSG')
        );
      }
    },
  });

  // To fetch qualification attributes list
  const { data } = useQuery<IQualifications>(GET_QUALIFICATION_ATTRIBUTE);
  let qualificationList: IReactSelectInterface[] = [];
  if (data && data.getQualifications) {
    const { getQualifications = [] } = data ? data : {};
    if (getQualifications && getQualifications.length) {
      qualificationList = getQualifications.map((quali: any) => ({
        label: quali.name,
        value: quali.id,
      }));
    }
  }

  useEffect(() => {
    fetchCareGiversList(1);
    fetchCareInstituionList(1);
  }, []);

  // Store caregiver's state
  useEffect(() => {
    let temp: any[] = daysData ? [...daysData.daysArr] : [];

    // let careGiverSelectedCell =
    //   selectedCells && selectedCells.length ? [...selectedCells] : [];
    // let careInstSelectedCell =
    //   selectedCellsCareinstitution && selectedCellsCareinstitution.length
    //     ? [...selectedCellsCareinstitution]
    //     : [];
    if (careGiversList && careGiversList.getUserByQualifications) {
      const { getUserByQualifications } = careGiversList;
      const { result, totalCount } = getUserByQualifications;
      // setTotalCaregiver(totalCount);
      if (result && result.length) {
        result.forEach((user: any, index: number) => {
          user.availabilityData = [];
          user.attribute = [];
          if (user.caregiver_avabilities && user.caregiver_avabilities.length) {
            // console.log('user.caregiver_avabilities before reduce',user.caregiver_avabilities);
            // Find maximum number of availability in any date
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
                // To update the status of selected cell accordingly
                // if (
                //   records[i] &&
                //   selectedCells &&
                //   selectedCells.length &&
                //   records[i].id
                // ) {
                //   let index = selectedCells.findIndex(
                //     (cell: any) => cell.item && cell.item.id === records[i].id,
                //   );
                //   if (index > -1) {
                //     careGiverSelectedCell[index].item = records[i];
                //   }
                // }
                user.availabilityData[i].push(records[i]);
              }
            });
          } else {
            user.availabilityData.push([]);
          }
        });
      }
      // if (careGiverSelectedCell && careGiverSelectedCell.length) {
      //   setSelectedCells(careGiverSelectedCell);
      // }
      setcaregiversList(result);
    }

    if (careInstitutionList && careInstitutionList.getUserByQualifications) {
      const { getUserByQualifications } = careInstitutionList;
      const { result, totalCount } = getUserByQualifications;
      // setTotalCareinstituion(totalCount);
      if (result && result.length) {
        /*  */
        result.forEach((user: any, index: number) => {
          user.name = user.canstitution ? user.canstitution.shortName : '';
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
            for (let row = 0; row < result; row++) {
              user.availabilityData.push([]);
            }
            temp.forEach((d: any, index: number) => {
              let records = user.careinstitution_requirements
                .filter((available: any) =>
                  moment(d.dateString).isSame(moment(available.date), 'day')
                )
                // To sort requirements by id
                .sort((a: any, b: any) => b.id - a.id);
              for (let i = 0; i < records.length; i++) {
                // To update the status of selected cell accordingly
                // if (
                //   records[i] &&
                //   careInstSelectedCell &&
                //   careInstSelectedCell.length &&
                //   records[i].id
                // ) {
                //   let index = careInstSelectedCell.findIndex(
                //     (cell: any) => cell.item && cell.item.id === records[i].id,
                //   );
                //   if (index > -1) {
                //     careInstSelectedCell[index].item = {
                //       ...records[i],
                //       qualificationId: qualificationList.filter(
                //         ({ value }: any) =>
                //           records[i].qualificationId &&
                //           records[i].qualificationId.includes(value),
                //       ),
                //     };
                //   }
                // }

                user.availabilityData[i].push(records[i]);
              }
            });
          } else {
            user.availabilityData.push([]);
          }
        });
        /*  */
      }

      // if (careInstSelectedCell && careInstSelectedCell.length) {
      //   setselectedCellsCareinstitution(careInstSelectedCell);
      // }
      setcareinstitutionList(result);
      // To set solo state in case of search by care-institution
      // if (
      //   careinstitutionSoloFilter &&
      //   careinstitutionSoloFilter.value &&
      //   starCanstitution &&
      //   result &&
      //   result.length &&
      //   (!starCanstitution.isStar || starCanstitution.id !== result[0].id)
      // ) {
      //   handleFirstStarCanstitution(result[0], 1);
      // }
    }
  }, [careGiversList, careInstitutionList]);

  console.log('careGiversListcareGiversListcareGiversList', careGiversList);

  // Default value is start & end of month
  let gte: string = moment().startOf('month').format(dbAcceptableFormat);
  let lte: string = moment().endOf('month').format(dbAcceptableFormat);

  const fetchCareGiversList = (
    page: number = 1,
    positiveAttr: number[] = [],
    negativeAttr: number[] = []
  ) => {
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(
      moment().month(),
      moment().year()
    );
    setDaysData(res);
    const {
      qualification,
      negative,
      positive,
      filterByAppointments,
      caregiverSoloFilter,
    } = filterState;
    let temp: any = [];
    qualification.map((key: any, index: number) => {
      temp.push(parseInt(key.value));
    });
    // get careGivers list
    fetchCaregiverList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: 'caregiver',
        negativeAttributeId:
          negativeAttr && negativeAttr.length ? negativeAttr : negative,
        limit: APPOINTMENT_PAGE_LIMIT,
        page: page,
        showAppointments:
          filterByAppointments && filterByAppointments.value
            ? filterByAppointments.value === 'showAll'
              ? ''
              : filterByAppointments.value
            : null,
        positiveAttributeId:
          positiveAttr && positiveAttr.length ? positiveAttr : positive,
        caregiverId:
          caregiverSoloFilter && caregiverSoloFilter.value
            ? parseInt(caregiverSoloFilter.value)
            : null,
        gte,
        lte,
      },
    });
  };

  //to get list of all the careinstitutions
  const fetchCareInstituionList = (
    page: number,
    positiveAttr: number[] = [],
    negativeAttr: number[] = []
  ) => {
    const {
      qualification,
      negative,
      positive,
      filterByAppointments,
      careinstitutionSoloFilter,
    } = filterState;
    let temp: any = [];
    qualification.map((key: any, index: number) => {
      temp.push(parseInt(key.value));
    });
    // get careinstitution list
    fetchCareinstitutionList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: 'canstitution',
        limit: 30,
        page: page,
        showAppointments:
          filterByAppointments && filterByAppointments.value
            ? filterByAppointments.value === 'showAll'
              ? ''
              : filterByAppointments.value
            : null,
        negativeAttributeId:
          negativeAttr && negativeAttr.length ? negativeAttr : negative,
        positiveAttributeId:
          positiveAttr && positiveAttr.length ? positiveAttr : positive,
        gte,
        lte,
        careInstitutionId:
          careinstitutionSoloFilter && careinstitutionSoloFilter.value
            ? parseInt(careinstitutionSoloFilter.value)
            : //: locationState && locationState.canstitution
              //? locationState.canstitution
              null,
      },
    });
  };

  const handleManageFilter = (value: any, str: string) => {
    setfilterState({
      ...filterState,
      [str]: value,
    });
  };

  // by clicking on apply filter to get care giver and care institution list accordingly
  const applyFilter = (
    userRole: string | null,
    positiveId: number[],
    negativeId: number[]
  ) => {
    setfilterState({
      ...filterState,
      positive: positiveId,
      negative: negativeId,
    });
    // setcaregiversList([]);
    // setcareinstitutionList([]);
    setPage(1);
    if (userRole === 'caregiver') {
      // get careGivers list
      fetchCareGiversList(1, positiveId, negativeId);
    } else {
      // get careInstitution list
      // getCareInstituionData(positiveId, negativeId);
    }
  };

  const fetchMoreData = () => {
    setPage(page + 1);
    return fetchCareGiversList(page + 1);
  };

  const handleResetFilters = () => {
    setPage(1);
    // setcaregiversList([]);
    // setcareinstitutionList([]);
    setfilterState({
      filterByAppointments: {
        value: 'showWithAppointments',
        label: languageTranslation('SHOW_APPOINTMENT'),
      },
      caregiverSoloFilter: undefined,
      careinstitutionSoloFilter: undefined,
      qualification: [],
      positive: [],
      negative: [],
      isPositive: [],
      isNegative: [],
    });
  };

  // Adding Row into table
  const onAddingRow = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    index: number
  ) => {
    e.preventDefault();
    console.log('indexindex', index);

    if (name === 'caregiver') {
      let temp: any = [...caregiversList];
      temp[index].availabilityData = temp[index].availabilityData
        ? [...temp[index].availabilityData, []]
        : [];
      setcaregiversList(temp);
    } else {
      // To check row added on solo careinstitution or all
      // if (
      //   starCanstitution &&
      //   secondStarCanstitution &&
      //   (starCanstitution.isStar || secondStarCanstitution.isStar) &&
      //   careInstituionDeptData &&
      //   careInstituionDeptData.length
      // ) {
      //   let temp: any = [...careInstituionDeptData];
      //   temp[index].availabilityData = temp[index].availabilityData
      //     ? [...temp[index].availabilityData, []]
      //     : [];
      //   setcareInstituionDeptData(temp);
      // } else {
      let temp: any = [...careinstitutionList];
      temp[index].availabilityData = temp[index].availabilityData
        ? [...temp[index].availabilityData, []]
        : [];
      console.log('temptemp', temp);
      setcareinstitutionList(temp);
      // }
    }
  };
  return (
    <div className='common-detail-page'>
      <div className='common-detail-section'>
        <AppointmentNav
          daysData={daysData}
          setDaysData={setDaysData}
          handleManageFilter={handleManageFilter}
          setfilterState={setfilterState}
          filterState={filterState}
          qualificationList={qualificationList}
          applyFilter={applyFilter}
          handleResetFilters={handleResetFilters}
          careGiversListArr={
            careGiversList && careGiversList.getUserByQualifications
              ? careGiversList && careGiversList.getUserByQualifications
              : []
          }
        />
        <div className='common-content flex-grow-1'>
          <div>
            <div className='appointment-page-row'>
              <div
                className='appointment-page-list-section'
                id='appointment_list_section'
              >
                <div className='calender-section'>
                  {
                    // caregiverLoading ? (
                    //   "Loading..."
                    // ) :
                    caregiversList && caregiversList.length ? (
                      <div className='custom-appointment-calendar'>
                        <CaregiverList
                          caregiverData={caregiversList}
                          onAddingRow={onAddingRow}
                          setcaregiversList={(data: any) =>
                            setcaregiversList(data)
                          }
                          fetchMoreData={fetchMoreData}
                          caregiverLoading={caregiverLoading}
                          setDaysData={setDaysData}
                          daysData={daysData}
                          totalCount={
                            careGiversList &&
                            careGiversList.getUserByQualifications
                              ? careGiversList.getUserByQualifications
                                  .totalCount
                              : 0
                          }
                        />
                      </div>
                    ) : (
                      <>adfasdf</>
                    )
                  }
                  {
                    // caregiverLoading ? (
                    //   "Loading..."
                    // ) :
                    careinstitutionList && careinstitutionList.length ? (
                      <div className='custom-appointment-calendar'>
                        <CareInstitutionList
                          careinstitutionData={careinstitutionList}
                          onAddingRow={onAddingRow}
                          fetchMoreData={fetchMoreData}
                          caregiverLoading={caregiverLoading}
                          setDaysData={setDaysData}
                          daysData={daysData}
                          totalCount={
                            careGiversList &&
                            careGiversList.getUserByQualifications
                              ? careGiversList.getUserByQualifications
                                  .totalCount
                              : 0
                          }
                        />
                      </div>
                    ) : (
                      <>adfasdf</>
                    )
                  }
                </div>
              </div>

              <div
                className='appointment-page-form-section'
                id='appointment_form_section'
              >
                <Row>
                  <Col
                    lg={'6'}
                    className='pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0'
                  >
                    <CaregiverFormView
                      // {...props}
                      // selectedCareGiver={{
                      //   id: selectedCaregiverId,
                      // }}
                      departmentList={departmentList}
                      data={data}
                      qualificationList={qualificationList}
                      updateCaregiver={updateCaregiver}
                      addCaregiverAvailability={addCaregiverAvailability}
                      selectedCellsCareinstitution={selectedCellsCareinstitution}
                      multipleAvailability={multipleAvailability}
                      selectedCells={selectedCells}
                      // addCaregiverLoading={
                      //   addCaregiverLoading || updateCaregiverLoading
                      // }
                      // setsavingBoth={() => setsavingBoth(false)}
                      // activeDateCaregiver={
                      //   !multipleAvailability
                      //     ? [dateString]
                      //     : selectedCells
                      //     ? selectedCells.map((cell) => cell.dateString)
                      //     : []
                      // }
                      // timeSlotError={timeSlotError}
                      // selctedAvailability={item}
                      // onhandleDelete={onhandleDelete}
                      // handleSelectUserList={handleSelectUserList}
                      // savingBoth={savingBoth}
                      careGiversListArr={
                        careGiversList && careGiversList.getUserByQualifications
                          ? careGiversList &&
                            careGiversList.getUserByQualifications
                          : []
                      }
                      // handleLastTimeData={handleLastTimeData}
                      // onhandleCaregiverStar={onhandleCaregiverStar}
                      // starMarkCaregiver={starMarkCaregiver}
                      // setworkingHoursFromErrMsg={
                      //   setworkingHoursFromErrMsg
                      // }
                      // workingHoursFromErrMsg={workingHoursFromErrMsg}
                      // setworkingHoursToErrMsg={setworkingHoursToErrMsg}
                      // workingHoursToErrMsg={workingHoursToErrMsg}
                      // setbreakHoursToErrMsg={setbreakHoursToErrMsg}
                      // breakHoursToErrMsg={breakHoursToErrMsg}
                      // setbreakHoursFromErrMsg={setbreakHoursFromErrMsg}
                      // breakHoursFromErrMsg={breakHoursFromErrMsg}
                      // starCaregiver={starCaregiver}
                      // idSearchAppointmentLoading={
                      //   idSearchAppointmentLoading
                      // }
                    />
                  </Col>
                  <Col lg={'6'} className='pl-lg-0'>
                    <CareinstitutionFormView
                      selectedCells={selectedCells}
                      />
                    {/* <Formik
                        // initialValues={valuesForCareIntituionForm}
                        // onSubmit={handleSubmitCareinstitutionForm}
                        // enableReinitialize={true}
                        // validationSchema={CareInstitutionValidationSchema}
                        children={(
                          props: FormikProps<ICareinstitutionFormValue>,
                        ) => {
                          return (
                            <CareinstitutionFormView
                              {...props}
                              // street={street}
                              // savingBoth={savingBoth}
                              // addCareinstLoading={
                              //   addCareinstLoading ||
                              //   updateCareinstitutionLoading
                              // }
                              // selectedCellsCareinstitution={
                              //   selectedCellsCareinstitution
                              // }
                              // setsavingBoth={() => setsavingBoth(false)}
                              // activeDateCareinstitution={
                              //   !multipleRequirement
                              //     ? [careInstitutiondateString]
                              //     : selectedCellsCareinstitution
                              //     ? selectedCellsCareinstitution.map(
                              //         cell => cell.dateString,
                              //       )
                              //     : []
                              // }
                              // setcareInstituionDept={(
                              //   deptData: any,
                              //   values: any,
                              // ) => {
                              //   setcareInstituionDept(deptData);
                              //   setupdateCanstitutionFormikValues(values);
                              // }}
                              // setcareInstituionShift={(
                              //   shiftData: any,
                              //   values: any,
                              // ) => {
                              //   setcareInstituionShift(shiftData);
                              //   setupdateCanstitutionFormikValues(values);
                              // }}
                              // selectedCareinstitution={{ id: Id }}
                              // addCareinstitutionRes={
                              //   addCareinstitutionRes &&
                              //   addCareinstitutionRes.addCareInstitutionRequirement
                              //     ? addCareinstitutionRes.addCareInstitutionRequirement
                              //     : ''
                              // }
                              // qualificationList={qualificationList}
                              // careInstitutionDepartment={
                              //   careInstitutionDepartment
                              // }
                              // careInstitutionTimesOptions={shiftOption}
                              // secondStarCanstitution={secondStarCanstitution}
                              // selctedRequirement={Item}
                              // handleQualification={handleQualification}
                              // onhandleDelete={onhandleDelete}
                              // handleSelectUserList={handleSelectUserList}
                              // timeSlotError={timeSlotError}
                              // careInstitutionListArr={
                              //   careInstitutionList &&
                              //   careInstitutionList.getUserByQualifications
                              //     ? careInstitutionList.getUserByQualifications
                              //     : []
                              // }
                              // starMarkCareinstitution={starMarkCareinstitution}
                              // handleFirstStarCanstitution={
                              //   handleFirstStarCanstitution
                              // }
                              // starCanstitution={starCanstitution}
                              // idSearchAppointmentLoading={
                              //   idSearchAppointmentLoading
                              // }
                              // selectedCells={selectedCells}
                            />
                          );
                        }}
                      />*/}
                  </Col>

                  <Col lg={'12'}>
                    <div className='d-flex align-items-center justify-content-center'>
                      <Button
                        className='btn-common  mt-0 mb-2 mx-2'
                        color='primary'
                        // disabled={
                        //   selectedCellsCareinstitution &&
                        //   selectedCellsCareinstitution.length === 1 &&
                        //   selectedCells &&
                        //   selectedCells.length === 1
                        //     ? !isCareinstituionData /* && dateCondition */
                        //       ? false
                        //       : true
                        //     : true
                        // }
                        // onClick={() => handleSaveBoth()}
                      >
                        <i className='fa fa-save mr-2' />
                        {languageTranslation('SAVE_BOTH')}
                      </Button>
                      <Button
                        className='btn-common mt-0 mb-2 mx-2'
                        color='secondary'
                        // disabled={
                        //   isUnLinkable ? false : isLinkable ? false : true
                        // }
                        // onClick={() =>
                        //   isUnLinkable ? handleUnlinkBoth() : handleLinkBoth()
                        // }
                      >
                        {/* {linkLoading ? (
                            <i className='fa fa-spinner fa-spin mr-2' />
                          ) : (
                            <i className='fa fa-link mr-2' />
                          )}
                          {isUnLinkable
                            ? 'Unlink'
                            : languageTranslation('LINK')} */}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyAppointment;
