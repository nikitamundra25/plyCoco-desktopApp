import React, { FunctionComponent, useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import {
  APPOINTMENT_PAGE_LIMIT,
  CareInstTIMyoCYAttrId,
  dbAcceptableFormat,
  defaultDateFormat,
  NightAllowancePerHour,
} from "../../../../config";
import {
  AppointmentsQueries,
  GET_QUALIFICATION_ATTRIBUTE,
  CareInstitutionQueries,
  LeasingContractQueries,
  InvoiceQueries,
  DocumentQueries,
} from "../../../../graphql/queries";
import moment from "moment";
import {
  IGetDaysArrayByMonthRes,
  IQualifications,
  ICaregiverFormValue,
  ICareinstitutionFormValue,
  IReactSelectInterface,
  IAddCargiverAppointmentRes,
  IStarInterface,
} from "../../../../interfaces";
import {
  germanNumberFormat,
  getDaysArrayByMonth,
  languageTranslation,
} from "../../../../helpers";
import { toast } from "react-toastify";
import CaregiverList from "./Caregiver/CaregiverList";
import { AppointmentMutations } from "../../../../graphql/Mutations";
import CareInstitutionList from "./CareInstitution/CareinstitutionList";
import "../Appointment/index.scss";
import AppointmentNav from "./AppointmentNav.tsx";
import { Col, Row, Button } from "reactstrap";
import { Formik, FormikProps, FormikHelpers } from "formik";
import CaregiverFormView from "../DummyAppointment/Caregiver/CaregiverForm";
import CareinstitutionFormView from "../DummyAppointment/CareInstitution/CareinstitutionForm";
import {
  CareGiverValidationSchema,
  CareInstitutionValidationSchema,
} from "../../../validations/AppointmentsFormValidationSchema";
import Loader from "../../containers/Loader/Loader";
import { ConfirmBox } from "../../components/ConfirmBox";

const [GET_LEASING_CONTRACT] = LeasingContractQueries;
const [, , GET_INVOICE_BY_APPOINTMENT_ID] = InvoiceQueries;
const [, , , , , , , GET_CONTRACT_BY_APPOINTMENT_ID] = AppointmentsQueries;
const [, , , , GET_WORKPROOF_PDF] = DocumentQueries;
const [
  GET_USERS_BY_QUALIFICATION_ID,
  GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID,
  GET_CAREINSTITUTION_REQUIREMENT_BY_ID,
] = AppointmentsQueries;
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
      value: "showWithAppointments",
      label: languageTranslation("SHOW_APPOINTMENT"),
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
    false
  );
  const [qualification, setqualification] = useState<any>([]);
  const [caregiversList, setcaregiversList] = useState<any[]>([]);
  const [careinstitutionList, setcareinstitutionList] = useState<Object[]>([]);
  const [timeSlotError, setTimeSlotError] = useState<string>('');
    // maintain solo careinstitution
    const [starCanstitution, setstarCanstitution] = useState<IStarInterface>({
      isStar: false,
      setIndex: -1,
      id: '',
    });
    // To manage solo department of careinstitution
    const [secondStarCanstitution, setsecondStarCanstitution] = useState<
      IStarInterface
    >({
      isStar: false,
      setIndex: -1,
      id: '',
    });
    const [careInstituionDeptData, setcareInstituionDeptData] = useState<any>([]);

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
    fetchPolicy: "no-cache",
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
    fetchPolicy: "no-cache",
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

 // To fetch avabality & requirement by id
 const [
  fetchAppointmentFilterById,
  { data: appointmentFilterById, loading: idSearchAppointmentLoading },
] = useLazyQuery<any, any>(GET_CAREINSTITUTION_REQUIREMENT_BY_ID, {
  fetchPolicy: 'no-cache',
});
  // Mutation to delete careinstitution requirement
  const [deleteCareinstitutionRequirement] = useMutation<
    {
      deleteCareInstitutionRequirement: any;
    },
    { id: number[] }
  >(DELETE_CAREINSTITUTION_REQUIREMENT, {
    // onCompleted({ deleteCareInstitutionRequirement }) {
    //   let temp: any = [...careinstitutionList];
    //   let deptList: any = [];
    //   if (
    //     starCanstitution &&
    //     starCanstitution.isStar &&
    //     careInstituionDeptData.length
    //   ) {
    //     deptList = [...careInstituionDeptData];
    //   }

    //   let index: number = -1;
    //   deleteCareInstitutionRequirement.forEach((careInst: any) => {
    //     let deptIndex: number = -1;
    //     if (starCanstitution && starCanstitution.isStar && deptList.length) {
    //       deptIndex = deptList.findIndex(
    //         (careInst: any) =>
    //           parseInt(careInst.userId) === parseInt(careInst.userId),
    //       );
    //     }

    //     index = temp.findIndex((ele: any) => ele.id === careInst.userId);

    //     if (index > -1) {
    //       if (temp[index].availabilityData) {
    //         for (let i = 0; i < temp[index].availabilityData.length; i++) {
    //           let element: any[] = [...temp[index].availabilityData[i]];
    //           if (element.some((value: any) => value.id === careInst.id)) {
    //             let cellIndex: number = element.findIndex(
    //               (ele: any) => ele.id === careInst.id,
    //             );
    //             if (cellIndex > -1) {
    //               element.splice(cellIndex, 1);
    //             }
    //             temp[index].availabilityData[i] = element;
    //           }
    //         }
    //       }
    //     }
    //     if (deptIndex > -1) {
    //       if (
    //         starCanstitution &&
    //         starCanstitution.isStar &&
    //         deptList.length &&
    //         deptList[deptIndex].availabilityData
    //       ) {
    //         for (
    //           let i = 0;
    //           i < deptList[deptIndex].availabilityData.length;
    //           i++
    //         ) {
    //           let element: any[] = [...deptList[deptIndex].availabilityData[i]];
    //           if (element.some((value: any) => value.id === careInst.id)) {
    //             let cellIndex: number = element.findIndex(
    //               (ele: any) => ele.id === careInst.id,
    //             );

    //             if (cellIndex > -1) {
    //               element.splice(cellIndex, 1);
    //             }
    //             deptList[deptIndex].availabilityData[i] = element;
    //           }
    //         }
    //       }
    //     }
    //   });
    //   // canstitutionRefetch();
    //   setselectedCellsCareinstitution([]);
    // },
  });

  // Mutation to delete caregiver
  const [deleteCaregiverAvailability, {}] = useMutation<
    {
      deleteCaregiverAvailability: any;
    },
    { id: number[] }
  >(DELETE_CAREGIVER_AVABILITY, {
    onCompleted({ deleteCareGiverAvability }: any) {
      deleteCareGiverAvability.forEach((element: any) => {
        const temp = [...caregiversList];
        let index: number = temp.findIndex(
          (caregiver: any) => caregiver.id === element.userId,
        );
        if (index > -1) {
          for (let i = 0; i < temp[index].availabilityData.length; i++) {
            let availabilityRows: any[] = [...temp[index].availabilityData[i]];
            let availabilityIndex: number = availabilityRows.findIndex(
              (e: any) => e.id === element.id,
            );
            if (availabilityIndex > -1) {
              temp[index].availabilityData[i].splice(availabilityIndex, 1);
            }
          }
        }
      });
      // setselctedAvailability({});
      setSelectedCells([]);
    },
  });


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
                    "day"
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
                  moment(e.date).isSame(moment(availability.date), "day")
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
          languageTranslation("CARE_GIVER_REQUIREMENT_ADD_SUCCESS_MSG")
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

  // To fetch caregivers last time data by id getCareGiverAvabilityLastTimeById
  const [
    fetchCaregiverLastTimeData,
    { data: caregiverLastTimeData },
  ] = useLazyQuery<any, any>(GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID, {
    fetchPolicy: 'no-cache',
  });

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
      let currentData = [...caregiversList];
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
            console.log("***************Result", result);

            for (let row = 0; row < result; row++) {
              user.availabilityData.push([]);
            }
            temp.forEach((d: any, index: number) => {
              let records = user.caregiver_avabilities.filter(
                (available: any) =>
                  moment(d.dateString).isSame(moment(available.date), "day")
              );
              // console.log("***************records", records);
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
        setcaregiversList(result);
      }
      // if (careGiverSelectedCell && careGiverSelectedCell.length) {
      //   setSelectedCells(careGiverSelectedCell);
      // }
    }
  }, [careGiversList]);

  useEffect(() => {
    let temp: any[] = daysData ? [...daysData.daysArr] : [];
    if (careInstitutionList && careInstitutionList.getUserByQualifications) {
      const { getUserByQualifications } = careInstitutionList;
      const { result, totalCount } = getUserByQualifications;
      // setTotalCareinstituion(totalCount);
      if (result && result.length) {
        /*  */
        result.forEach((user: any, index: number) => {
          user.name = user.canstitution ? user.canstitution.shortName : "";
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
                  moment(d.dateString).isSame(moment(available.date), "day")
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
      setcareinstitutionList(result);
        /*  */
      }

      // if (careInstSelectedCell && careInstSelectedCell.length) {
      //   setselectedCellsCareinstitution(careInstSelectedCell);
      // }
      // setcareinstitutionList(result);
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


  // Default value is start & end of month
  let gte: string = moment().startOf("month").format(dbAcceptableFormat);
  let lte: string = moment().endOf("month").format(dbAcceptableFormat);

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
        userRole: "caregiver",
        negativeAttributeId:
          negativeAttr && negativeAttr.length ? negativeAttr : negative,
        limit: APPOINTMENT_PAGE_LIMIT,
        page: page,
        showAppointments:
          filterByAppointments && filterByAppointments.value
            ? filterByAppointments.value === "showAll"
              ? ""
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
        userRole: "canstitution",
        limit: 30,
        page: page,
        showAppointments:
          filterByAppointments && filterByAppointments.value
            ? filterByAppointments.value === "showAll"
              ? ""
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

  // filterState Call api when apply filter
  useEffect(() => {
    fetchCareGiversList(1);
    fetchCareInstituionList(1);
  }, [filterState]);

  const handleSelection = async (selectedCellsData: any, name: string) => {
     setTimeSlotError('');
    const { item = {}, dept = {}, id = '', dateString = '' } =
      selectedCellsData && selectedCellsData.length && selectedCellsData[0]
        ? selectedCellsData[0]
        : {};

    const checkCondition: boolean =
      item && item.appointments && item.appointments.length;

    let appointmentsData: number[] = selectedCellsData
      .map((cell: any) =>
        cell.item && cell.item.appointments && cell.item.appointments.length
          ? cell.item.appointments[0]
          : {},
      )
      .filter(Boolean);
    if (name === 'caregiver') {
      if (checkCondition) {
        let appointId: any = item.appointments.filter((appointment: any) => {
          return (
            moment(selectedCellsData[0].dateString).format('DD.MM.YYYY') ===
            moment(appointment.date).format('DD.MM.YYYY')
          );
        });
        if (
          careinstitutionList &&
          careinstitutionList.length &&
          // careInstitutionList.getUserByQualifications &&
          selectedCellsData &&
          selectedCellsData.length
        ) {
          await getCorrespondingconnectedcell(
            'careinstitution',
            careinstitutionList,
            appointmentsData,
          );
        }
      }

      setSelectedCells(selectedCellsData);
    } else {
      setselectedCellsCareinstitution(selectedCellsData);
      if (checkCondition) {
        if (
          caregiversList &&
          caregiversList.length &&
          selectedCellsData &&
          selectedCellsData.length
        ) {
          await getCorrespondingconnectedcell(
            'caregiver',
            caregiversList,
            appointmentsData,
          );
        }
      }
      // To default select department in case of selected solo careinstitution
      // if (
      //   dept &&
      //   dept.id &&
      //   !(item && item.id)
      //   // && (!careInstituionDept || careInstituionDept && careInstituionDept.value !== dept.id)
      // ) {
      //   setcareInstituionDept({
      //     label: dept.name,
      //     value: dept.id,
      //   });
      // }
      // setShowSelectedCaregiver({ id: '', isShow: false });
    }
  };


    // Function to get corresponding connected cell
    const getCorrespondingconnectedcell = (
      name: string,
      result: any,
      appointmentsData: any,
    ) => {
  
      let connectedCells: any[] = [];
      result.forEach((element: any) => {
        element.availabilityData.forEach((row: any) => {
          const {
            id = '',
            firstName = '',
            lastName = '',
            email = '',
            caregiver = {},
            canstitution = {},
            qualificationId = [],
          } = element ? element : {};
          let filteredCells: any = row.filter(
            (availabilities: any) =>
              availabilities.appointments &&
              availabilities.appointments.length &&
              appointmentsData
                .map((cell: any) => cell.id)
                .includes(availabilities.appointments[0].id),
          );
  
          if (filteredCells) {
            connectedCells.push(
              ...filteredCells.map((filteredCell: any) => ({
                id,
                firstName,
                lastName,
                email,
                caregiver,
                canstitution,
                isLeasing:
                  canstitution &&
                  canstitution.attributes &&
                  canstitution.attributes.length
                    ? canstitution.attributes.includes(CareInstTIMyoCYAttrId)
                    : false,
                dateString:
                  filteredCell && filteredCell.date
                    ? moment(filteredCell.date).format(dbAcceptableFormat)
                    : '',
                item:
                  name === 'careinstitution'
                    ? {
                        ...filteredCell,
                        qualificationId: filteredCell.qualificationId
                          ? qualificationList.filter(({ value }: any) =>
                              filteredCell.qualificationId.includes(value),
                            )
                          : qualificationList.filter(({ value }: any) =>
                              qualificationId.includes(value),
                            ),
                      }
                    : filteredCell,
              })),
            );
          }
        });
      });
      if (connectedCells && connectedCells.length) {
        if (name === 'careinstitution') {
          setselectedCellsCareinstitution(connectedCells);
        } else {
          setSelectedCells(connectedCells);
        }
      } else {
        fetchAppointmentFilterById({
          variables: {
            id:
              name === 'careinstitution'
                ? parseInt(appointmentsData[0].avabilityId)
                : parseInt(appointmentsData[0].requirementId),
            searchIn: name === 'careinstitution' ? 'avability' : 'requirement',
          },
        });
      }
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
    if (userRole === "caregiver") {
      // get careGivers list
      fetchCareGiversList(1, positiveId, negativeId);
    } else {
      // get careInstitution list
      // getCareInstituionData(positiveId, negativeId);
    }
  };

  const fetchMoreData = (str:string) => {
    setPage(page + 1);
    if (str==="caregiver") {
      fetchCareGiversList(page + 1);
    } else {
      fetchCareInstituionList(page + 1)
    }
  };

  const handleResetFilters = () => {
    setPage(1);
    // setcaregiversList([]);
    // setcareinstitutionList([]);
    setfilterState({
      filterByAppointments: {
        value: "showWithAppointments",
        label: languageTranslation("SHOW_APPOINTMENT"),
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
  const [savingBoth, setsavingBoth] = useState(false);
  const handleSaveBoth = () => {
    setsavingBoth(true);
  };
  // Adding Row into table
  const onAddingRow = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    index: number
  ) => {
    e.preventDefault();
    console.log("indexindex", index);

    if (name === "caregiver") {
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
      setcareinstitutionList(temp);
      // }
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
              : languageTranslation('CONFIRM_DELETE_CAREGIVER_AVABILITY'),
        });
        if (!value) {
          return;
        } else {
          if (name === 'careinstitution') {
            await deleteCareinstitutionRequirement({
              variables: {
                id: [parseInt(id)],
              },
            });
            // canstitutionRefetch();
          } else {
            await deleteCaregiverAvailability({
              variables: {
                id: [parseInt(id)],
              },
            });
          }
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              name === 'careinstitution'
                ? languageTranslation(
                    'DELETE_CAREINSTITUTION_REQUIREMENT_SUCCESS',
                  )
                : languageTranslation('DELETE_CAREGIVER_AVABILITY_SUCCESS'),
            );
          }
        }
      }
    };

  // handle first star of careinstitution and show department list
  const handleFirstStarCanstitution = async (list: any, index: number) => {
    console.log("Insideee",!starCanstitution.isStar);
    
    if (!starCanstitution.isStar) {
      console.log("Insiddeeee",index);
      
      if (index < 0) {
        
        setfilterState({
          ...filterState,
          careinstitutionSoloFilter: {
            label: list ? list.id : '',
            value: list ? list.id : '',
          }
        })
      }
      console.log("listlistlist",list);
      setstarCanstitution({
        isStar: true,
        setIndex: index,
        id: list ? list.id : '',
      });
    } else {
      if (
        filterState.careinstitutionSoloFilter &&
        filterState.careinstitutionSoloFilter.value &&
        careinstitutionList &&
        careinstitutionList.length === 1
      ) {
        await setfilterState({
          ...filterState,
          careinstitutionSoloFilter: undefined
        })
        fetchCareInstituionList(1)
      }
      setstarCanstitution({
        isStar: false,
        setIndex: -1,
        id: '',
      });
      setsecondStarCanstitution({
        isStar: false,
        setIndex: -1,
        id: '',
      });
      setcareInstituionDeptData([]);
    }

    if (list) {
      if (list.id && !starCanstitution.isStar) {
        // setFetchingDept(true);
        await getDepartmentList({
          variables: {
            userId: parseInt(list.id),
            locked: false,
          },
        });
      }
    } else {
      setcareInstituionDeptData([]);
    }
  };

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
          (item: any) => item.id === starCanstitution.id,
        )[0];
  
        if (careInstData) {
          let requirements: any[] = [].concat.apply(
            [],
            careInstData.availabilityData,
          );
          let temp: any[] = daysData ? [...daysData.daysArr] : [];
  
          getDivision
            .filter((division: any) => !division.locked)
            .forEach((division: any) => {
              division.availabilityData = [];
              division.canstitution = careInstData.canstitution;
              division.qualificationId = careInstData.qualificationId;
              division.careInstId = careInstData.id;
              division.isActive = careInstData.isActive;
              division.deptId = division.id;
              // To group availabilities by division
              let deptRequirement = requirements.filter(
                (req: any) => req.divisionId === division.id,
              );
              let result: any = deptRequirement.reduce(
                (acc: any, o: any) => (
                  (acc[moment(o.date).format(dbAcceptableFormat)] =
                    (acc[moment(o.date).format(dbAcceptableFormat)] || 0) + 1),
                  acc
                ),
                {},
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
                  moment(d.dateString).isSame(moment(available.date), 'day'),
                );
                for (let i = 0; i < records.length; i++) {
                  division.availabilityData[i].push(records[i]);
                }
              });
            });
          // setFetchingDept(false);
          setcareInstituionDeptData(
            getDivision.filter((division: any) => !division.locked),
          );
        }
      } else {
        // setFetchingDept(false);
      }
    }, [departmentList, starCanstitution.isStar, careinstitutionList]);

  return (
    <div className="common-detail-page">
      <div className="common-detail-section">
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
        <div className="common-content flex-grow-1">
          <div>
            <div className="appointment-page-row">
              <div
                className="appointment-page-list-section"
                id="appointment_list_section"
              >
                <div className="calender-section">
                  {
                    // caregiverLoading ? (
                    //   "Loading..."
                    // ) :
                    caregiversList && caregiversList.length ? (
                      <div className="custom-appointment-calendar">
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
                          handleSelection={handleSelection}
                        />
                      </div>
                    ) : (
                      <Loader />
                    )
                  }
                  {
                    // caregiverLoading ? (
                    //   "Loading..."
                    // ) :
                    careinstitutionList && careinstitutionList.length ? (
                      <div className="custom-appointment-calendar">
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
                          qualificationList={qualificationList}
                          handleSelection={handleSelection}
                          handleFirstStarCanstitution={handleFirstStarCanstitution}
                          careInstituionDeptData={careInstituionDeptData}
                          starCanstitution={starCanstitution}
                          secondStarCanstitution={secondStarCanstitution}
                        />
                      </div>
                    ) : (
                      <Loader />
                    )
                  }
                </div>
              </div>

              <div
                className="appointment-page-form-section"
                id="appointment_form_section"
              >
                <Row className='row-appointment'>
                  <Col
                    lg={"6"}
                    className="pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0"
                  >
                    <CaregiverFormView
                      departmentList={departmentList}
                      data={data}
                      qualificationList={qualificationList}
                      updateCaregiver={updateCaregiver}
                      addCaregiverAvailability={addCaregiverAvailability}
                      selectedCellsCareinstitution={
                        selectedCellsCareinstitution
                      }
                      multipleAvailability={multipleAvailability}
                      selectedCells={selectedCells}
                      careGiversListArr={
                        careGiversList && careGiversList.getUserByQualifications
                          ? careGiversList &&
                            careGiversList.getUserByQualifications
                          : []
                      }
                      timeSlotError={timeSlotError}
                      setTimeSlotError={setTimeSlotError}
                      setsavingBoth={setsavingBoth}
                      fetchCaregiverLastTimeData={fetchCaregiverLastTimeData}
                      addCaregiverLoading={addCaregiverLoading}
                      onhandleDelete={onhandleDelete}
                      setqualification={setqualification}
                      // activeDateCaregiver={
                      //   !multipleAvailability
                      //     ? [dateString]
                      //     : selectedCells
                      //     ? selectedCells.map(cell => cell.dateString)
                      //     : []
                      // }
                    />
                  </Col>
                  <Col lg={'6'} className='pl-lg-0'>
                    <CareinstitutionFormView
                      selectedCellsCareinstitution={selectedCellsCareinstitution}
                      timeSlotError={timeSlotError}
                      setTimeSlotError={setTimeSlotError}
                      setsavingBoth={setsavingBoth}
                    />
                  </Col>

                  <Col lg={"12"}>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button
                        className='btn-common  mt-0 mb-2 mx-2'
                        color='primary'
                      >
                        <i className="fa fa-save mr-2" />
                        {languageTranslation("SAVE_BOTH")}
                      </Button>
                      <Button
                        className='btn-common mt-0 mb-2 mx-2'
                        color='secondary'
                      ></Button>
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
