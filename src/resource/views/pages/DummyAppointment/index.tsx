import React, { FunctionComponent, useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import {
  APPOINTMENT_PAGE_LIMIT,
  CareInstTIMyoCYAttrId,
  dbAcceptableFormat,
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
  IReactSelectInterface,
  IAddCargiverAppointmentRes,
  IStarInterface,
  ICareinstitutionFormSubmitValue,
  IReactSelectTimeInterface,
  IunlinkResponse,
  IUnlinkAppointmentInput,
  IlinkAppointmentInput,
} from "../../../../interfaces";
import { getDaysArrayByMonth, languageTranslation } from "../../../../helpers";
import { toast } from "react-toastify";
import CaregiverList from "./Caregiver/CaregiverList";
import { AppointmentMutations } from "../../../../graphql/Mutations";
import CareInstitutionList from "./CareInstitution/CareinstitutionList";
import "../Appointment/index.scss";
import AppointmentNav from "./AppointmentNav.tsx";
import { Col, Row, Button } from "reactstrap";
import CaregiverFormView from "../DummyAppointment/Caregiver/CaregiverForm";
import CareinstitutionFormView from "../DummyAppointment/CareInstitution/CareinstitutionForm";
import Loader from "../../containers/Loader/Loader";
import { ConfirmBox } from "../../components/ConfirmBox";
import _ from "lodash";

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
let allCaregivers: any = [];
const DummyAppointment: FunctionComponent = () => {
  //state for getting days data for manging cells
  const [daysData, setDaysData] = useState<IGetDaysArrayByMonthRes>({
    daysArr: [],
    month: moment().month().toString(),
    year: moment().year().toString(),
  });
  const [careInstituionShift, setcareInstituionShift] = useState<
    IReactSelectTimeInterface
  >();
  //  set page
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(false);

  const [shiftOption, setshiftOption] = useState<
    IReactSelectTimeInterface[] | undefined
  >([]);

  //Stores selected cell information fro caregivers
  const [selectedCells, setSelectedCells] = useState<any[]>();

  //Stores careinst selected cell imfomation
  const [
    selectedCellsCareinstitution,
    setselectedCellsCareinstitution,
  ] = useState<any[]>();

  //  To manage loading for infinite scroll
  const [isLoadingCaregiver, setIsLoadingCaregiver] = useState(false);

  //State for managing data for filter for showing with or without appointment
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
  //state for care institution department
  const [careInstituionDept, setcareInstituionDept] = useState<
    IReactSelectInterface
  >();
  const [multipleAvailability, setMultipleAvailability] = useState<boolean>(
    false
  );
  const [showSelectedCaregiver, setShowSelectedCaregiver] = useState<Object>({
    id: "",
    isShow: false,
  });
  const [qualification, setqualification] = useState<any>([]);
  const [caregiversList, setcaregiversList] = useState<any[]>([]);
  const [multipleRequirement, setMultipleRequirement] = useState<boolean>(
    false
  );
  //Stores careinstitution list data fetched form backend
  const [careinstitutionList, setcareinstitutionList] = useState<Object[]>([]);
  const [timeSlotError, setTimeSlotError] = useState<string>("");
  // maintain solo careinstitution
  const [starCanstitution, setstarCanstitution] = useState<IStarInterface>({
    isStar: false,
    setIndex: -1,
    id: "",
  });
  // To manage solo department of careinstitution
  const [secondStarCanstitution, setsecondStarCanstitution] = useState<
    IStarInterface
  >({
    isStar: false,
    setIndex: -1,
    id: "",
  });
  const [setHeight, setsetHeight] = useState<any>("100");
  const [careInstituionDeptData, setcareInstituionDeptData] = useState<any>([]);
  // maintain solo caregiver
  const [starCaregiver, setstarCaregiver] = useState<IStarInterface>({
    isStar: false,
    id: "",
    isSecondStar: false,
  });

  // store the previous entered value in state
  const [caregiverLastTimeValues, setcaregiverLastTimeValues] = useState<any>();

  // To fetch caregivers by id filter
  const [
    fetchCaregiverList,
    {
      data: careGiversList,
      refetch: fetchingCareGiverData,
      fetchMore: fetchMoreCareGiverList,
      loading: loadingCaregiver,
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
      refetch: canstitutionRefetch,
      fetchMore: fetchMoreCareInstituionList,
    },
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: "no-cache",
  });
  const [selectedCareinstitution, setselectedCareinstitution] = useState<any>(
    {}
  );
  // Mutation to linkRequirement
  const [linkRequirement, { loading: linkLoading }] = useMutation<{
    appointmentInput: IlinkAppointmentInput;
  }>(LINK_REQUIREMENT, {
    onCompleted({ addAppointment }: any) {
      const temp = [...caregiversList];
      const careInstList: any = [...careinstitutionList];
      let deptList: any = [];
      if (
        starCanstitution &&
        secondStarCanstitution &&
        (starCanstitution.isStar || secondStarCanstitution.isStar) &&
        careInstituionDeptData &&
        careInstituionDeptData.length
      ) {
        deptList = [...careInstituionDeptData];
      }
      // starCanstitution &&
      // secondStarCanstitution && (starCanstitution.isStar || secondStarCanstitution.isStar) && careInstituionDeptData && careInstituionDeptData.length ? [...careInstituionDeptData] : [...careinstitutionList];
      const selectedCaregiverCells = selectedCells ? [...selectedCells] : [];
      const selectedCareInstCells = selectedCellsCareinstitution
        ? [...selectedCellsCareinstitution]
        : [];

      addAppointment.forEach((appointment: any) => {
        let availabilityDataIndex: number = -1;
        let requirementDataIndex: number = -1;
        let requirementDeptDataIndex: number = -1;
        let availabilityIndex: number = -1;
        let requirementIndex: number = -1;
        let requirementDeptIndex: number = -1;
        // To find index of particular caregiver in list
        let caregiverIndex: number = temp.findIndex(
          (caregiver: any) =>
            appointment.ca && caregiver.id === appointment.ca.userId
        );
        // To find index of particular care institution in list
        let careInstIndex: number = careInstList.findIndex(
          (ci: any) => appointment.cr && ci.id === appointment.cr.userId
        );
        let deptIndex: number = -1;
        // To find index of particular care institution dept in list
        if (
          starCanstitution &&
          secondStarCanstitution &&
          (starCanstitution.isStar || secondStarCanstitution.isStar) &&
          deptList &&
          deptList.length
        ) {
          deptIndex = deptList.findIndex(
            (ci: any) =>
              appointment.cr &&
              appointment.cr.division &&
              appointment.cr.division.id === ci.id
          );
        }

        // To find the exact index of requirement in care Institution list
        for (
          let j = 0;
          careInstIndex > -1 &&
          j < careInstList[careInstIndex].availabilityData.length;
          j++
        ) {
          let requirementRows: any[] = [
            ...careInstList[careInstIndex].availabilityData[j],
          ];
          requirementIndex = requirementRows.findIndex(
            (e: any) => e.id === appointment.requirementId
          );
          if (requirementIndex > -1) {
            requirementDataIndex = j;
            break;
          }
        }

        // To find the exact index of requirement in dept list
        for (
          let j = 0;
          deptIndex > -1 && j < deptList[deptIndex].availabilityData.length;
          j++
        ) {
          let requirementRows: any[] = [
            ...deptList[deptIndex].availabilityData[j],
          ];
          requirementDeptIndex = requirementRows.findIndex(
            (e: any) => e.id === appointment.requirementId
          );
          if (requirementDeptIndex > -1) {
            requirementDeptDataIndex = j;
            break;
          }
        }
        // To find the exact index of availability
        for (let i = 0; i < temp[caregiverIndex].availabilityData.length; i++) {
          let availabilityRows: any[] = [
            ...temp[caregiverIndex].availabilityData[i],
          ];
          availabilityIndex = availabilityRows.findIndex(
            (e: any) => e.id === appointment.avabilityId
          );
          if (availabilityIndex > -1) {
            availabilityDataIndex = i;
            break;
          }
        }
        if (
          requirementIndex > -1 &&
          requirementDataIndex > -1 &&
          availabilityDataIndex > -1 &&
          availabilityIndex > -1
        ) {
          // To add the appoitments after connection
          const {
            id = "",
            name = "",
            status = "",
            qualificationId = [],
            qualificationForCharge = "",
            address = "",
            startTime = "",
            endTime = "",
            isLeasing = false,
            division = {},
          } = careInstList[careInstIndex].availabilityData[
            requirementDataIndex
          ][requirementIndex]
            ? careInstList[careInstIndex].availabilityData[
                requirementDataIndex
              ][requirementIndex]
            : {};

          temp[caregiverIndex].availabilityData[availabilityDataIndex][
            availabilityIndex
          ] = {
            ...temp[caregiverIndex].availabilityData[availabilityDataIndex][
              availabilityIndex
            ],
            status: "linked",
            appointments: [
              {
                ...appointment,
                cr: {
                  id,
                  name,
                  status,
                  qualificationId,
                  qualificationForCharge,
                  address,
                  startTime,
                  endTime,
                  isLeasing,
                  division:
                    appointment && appointment.cr && appointment.cr.division
                      ? appointment.cr.division
                      : {},
                },
              },
            ],
          };
          careInstList[careInstIndex].availabilityData[requirementDataIndex][
            requirementIndex
          ] = {
            ...careInstList[careInstIndex].availabilityData[
              requirementDataIndex
            ][requirementIndex],
            division:
              appointment && appointment.cr && appointment.cr.division
                ? appointment.cr.division
                : {},
            status: "linked",
            appointments: [
              {
                ...appointment,
                ca: {
                  ...appointment.ca,
                  name: [
                    temp[caregiverIndex].lastName,
                    temp[caregiverIndex].firstName,
                  ].join(" "),
                },
              },
            ],
          };

          if (requirementDeptIndex > -1 && requirementDeptDataIndex > -1) {
            deptList[deptIndex].availabilityData[requirementDeptDataIndex][
              requirementDeptIndex
            ] = {
              ...deptList[deptIndex].availabilityData[requirementDeptDataIndex][
                requirementDeptIndex
              ],
              division:
                appointment && appointment.cr && appointment.cr.division
                  ? appointment.cr.division
                  : {},
              status: "linked",
              appointments: [
                {
                  ...appointment,
                  ca: {
                    ...appointment.ca,
                    name: [
                      temp[caregiverIndex].lastName,
                      temp[caregiverIndex].firstName,
                    ].join(" "),
                  },
                },
              ],
            };
          }
          // To update the selected caregiver & careInst cell
          let cellIndex: number = selectedCaregiverCells.findIndex(
            (cell: any) => cell.item && appointment.avabilityId === cell.item.id
          );
          if (selectedCaregiverCells[cellIndex]) {
            selectedCaregiverCells[cellIndex] = {
              ...selectedCaregiverCells[cellIndex],
              item: {
                ...selectedCaregiverCells[cellIndex].item,
                status: "linked",
                appointments: [
                  {
                    ...appointment,
                    cr: {
                      ...appointment.cr,
                      id,
                      name,
                      status,
                      qualificationId,
                      qualificationForCharge,
                      address,
                      startTime,
                      endTime,
                      isLeasing,
                    },
                  },
                ],
              },
            };
          }
          let cellInstIndex: number = selectedCareInstCells.findIndex(
            (cell: any) =>
              cell.item && appointment.requirementId === cell.item.id
          );
          if (selectedCareInstCells[cellInstIndex]) {
            selectedCareInstCells[cellInstIndex] = {
              ...selectedCareInstCells[cellInstIndex],
              item: {
                ...selectedCareInstCells[cellInstIndex].item,
                division:
                  appointment && appointment.cr && appointment.cr.division
                    ? appointment.cr.division
                    : {},
                status: "linked",
                appointments: [
                  {
                    ...appointment,
                    ca: {
                      ...appointment.ca,
                      name: [
                        temp[caregiverIndex].lastName,
                        temp[caregiverIndex].firstName,
                      ].join(" "),
                    },
                  },
                ],
              },
            };
          }
        }
      });
      setSelectedCells(selectedCaregiverCells);
      setselectedCellsCareinstitution(selectedCareInstCells);
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("LINKED_APPOINTMENTS"));
      }
      // fetchData();
    },
  });

  // Mutation to unLink Requirement
  const [unLinkRequirement, { data: unlinkResponse }] = useMutation<{
    deleteAppointment: IunlinkResponse;
    appointmentInput: IUnlinkAppointmentInput;
  }>(UN_LINK_REQUIREMENT, {
    onCompleted({ deleteAppointment }: any) {
      const temp = [...caregiversList];
      const careInstList: any = [...careinstitutionList];
      let deptList: any = [];
      if (
        starCanstitution &&
        secondStarCanstitution &&
        (starCanstitution.isStar || secondStarCanstitution.isStar) &&
        careInstituionDeptData &&
        careInstituionDeptData.length
      ) {
        deptList = [...careInstituionDeptData];
      }
      const selectedCaregiverCells = selectedCells ? [...selectedCells] : [];
      const selectedCareInstCells = selectedCellsCareinstitution
        ? [...selectedCellsCareinstitution]
        : [];
      deleteAppointment.forEach((appointment: any) => {
        const { deleteAll, unlinkedBy } = appointment;
        let availabilityDataIndex: number = -1;
        let requirementDataIndex: number = -1;
        let requirementDeptDataIndex: number = -1;
        let availabilityIndex: number = -1;
        let requirementIndex: number = -1;
        let requirementDeptIndex: number = -1;
        // To find index of particular caregiver in list
        let caregiverIndex: number = temp.findIndex(
          (caregiver: any) =>
            appointment.ca && caregiver.id === appointment.ca.userId
        );
        // To find index of particular care institution in list
        let careInstIndex: number = careInstList.findIndex(
          (ci: any) => appointment.cr && ci.id === appointment.cr.userId
        );
        let deptIndex: number = -1;
        // To find index of particular care institution dept in list
        if (
          starCanstitution &&
          secondStarCanstitution &&
          (starCanstitution.isStar || secondStarCanstitution.isStar) &&
          deptList &&
          deptList.length
        ) {
          deptIndex = deptList.findIndex(
            (ci: any) =>
              appointment.cr &&
              appointment.cr.division &&
              appointment.cr.division.id === ci.id
          );
        }
        // To find the exact index of requirement
        if (careInstIndex > -1) {
          for (
            let j = 0;
            j < careInstList[careInstIndex].availabilityData.length;
            j++
          ) {
            let requirementRows: any[] = [
              ...careInstList[careInstIndex].availabilityData[j],
            ];

            requirementIndex = requirementRows.findIndex(
              (e: any) =>
                e.appointments &&
                e.appointments.length &&
                e.appointments[0] &&
                e.appointments[0].id === appointment.id
            );
            if (requirementIndex > -1) {
              requirementDataIndex = j;
              break;
            }
          }
        }
        // To find the exact index of requirement in dept list
        for (
          let j = 0;
          deptIndex > -1 && j < deptList[deptIndex].availabilityData.length;
          j++
        ) {
          let requirementRows: any[] = [
            ...deptList[deptIndex].availabilityData[j],
          ];
          requirementDeptIndex = requirementRows.findIndex(
            (e: any) =>
              e.appointments &&
              e.appointments.length &&
              e.appointments[0] &&
              e.appointments[0].id === appointment.id
          );
          if (requirementDeptIndex > -1) {
            requirementDeptDataIndex = j;
            break;
          }
        }
        // To find the exact index of availability
        for (let i = 0; i < temp[caregiverIndex].availabilityData.length; i++) {
          let availabilityRows: any[] = [
            ...temp[caregiverIndex].availabilityData[i],
          ];

          availabilityIndex = availabilityRows.findIndex(
            (e: any) =>
              e.appointments &&
              e.appointments.length &&
              e.appointments[0] &&
              e.appointments[0].id === appointment.id
          );
          if (availabilityIndex > -1) {
            availabilityDataIndex = i;
            break;
          }
        }

        if (
          requirementIndex > -1 &&
          requirementDataIndex > -1 &&
          availabilityDataIndex > -1 &&
          availabilityIndex > -1
        ) {
          // To add the appoitments after connection

          // To update data in caregiver list
          temp[caregiverIndex].availabilityData[availabilityDataIndex][
            availabilityIndex
          ] = {
            ...temp[caregiverIndex].availabilityData[availabilityDataIndex][
              availabilityIndex
            ],
            status: "default",
            appointments: [],
          };
          // To update data in care institution list
          careInstList[careInstIndex].availabilityData[requirementDataIndex][
            requirementIndex
          ] = {
            ...careInstList[careInstIndex].availabilityData[
              requirementDataIndex
            ][requirementIndex],
            status: "default",
            appointments: [],
          };
          if (requirementDeptIndex > -1 && requirementDeptDataIndex > -1) {
            deptList[deptIndex].availabilityData[requirementDeptDataIndex][
              requirementDeptIndex
            ] = {
              ...deptList[deptIndex].availabilityData[requirementDeptDataIndex][
                requirementDeptIndex
              ],
              status: "default",
              appointments: [],
            };
          }

          if (deleteAll) {
            if (unlinkedBy === "caregiver" || unlinkedBy === "employee") {
              temp[caregiverIndex].availabilityData[
                availabilityDataIndex
              ].splice(availabilityIndex, 1);
              setSelectedCells([]);
            }
            if (unlinkedBy === "canstitution" || unlinkedBy === "employee") {
              careInstList[careInstIndex].availabilityData[
                requirementDataIndex
              ].splice(requirementIndex, 1);
              if (
                starCanstitution &&
                secondStarCanstitution &&
                (starCanstitution.isStar || secondStarCanstitution.isStar) &&
                deptList &&
                deptList.length
              ) {
                deptList[deptIndex].availabilityData[
                  requirementDeptDataIndex
                ].splice(requirementDeptIndex, 1);
              }

              setselectedCellsCareinstitution([]);
            }
          }
          // To update the selected caregiver & careInst cell
          if (
            !(
              deleteAll &&
              (unlinkedBy === "caregiver" || unlinkedBy === "employee")
            )
          ) {
            let cellIndex: number = selectedCaregiverCells.findIndex(
              (cell: any) =>
                cell.item &&
                cell.item.appointments &&
                cell.item.appointments.length &&
                cell.item.appointments[0] &&
                appointment.id === cell.item.appointments[0].id
            );
            if (selectedCaregiverCells[cellIndex]) {
              selectedCaregiverCells[cellIndex] = {
                ...selectedCaregiverCells[cellIndex],
                item: {
                  ...selectedCaregiverCells[cellIndex].item,
                  status: "default",
                  appointments: [],
                },
              };
            }
            setSelectedCells(selectedCaregiverCells);
          }
          if (
            !(
              deleteAll &&
              (unlinkedBy === "canstitution" || unlinkedBy === "employee")
            )
          ) {
            let cellInstIndex: number = selectedCareInstCells.findIndex(
              (cell: any) =>
                cell.item &&
                cell.item.appointments &&
                cell.item.appointments.length &&
                cell.item.appointments[0] &&
                appointment.id === cell.item.appointments[0].id
            );
            if (selectedCareInstCells[cellInstIndex]) {
              selectedCareInstCells[cellInstIndex] = {
                ...selectedCareInstCells[cellInstIndex],
                item: {
                  ...selectedCareInstCells[cellInstIndex].item,
                  status: "default",
                  appointments: [],
                },
              };
            }
            setselectedCellsCareinstitution(selectedCareInstCells);
          }
        }
      });
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("UN_LINKED_APPOINTMENTS"));
      }
      // fetchData();
    },
  });

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
    fetchPolicy: "no-cache",
  });
  // Mutation to delete careinstitution requirement
  const [deleteCareinstitutionRequirement] = useMutation<
    {
      deleteCareInstitutionRequirement: any;
    },
    { id: number[] }
  >(DELETE_CAREINSTITUTION_REQUIREMENT, {
    onCompleted({ deleteCareInstitutionRequirement }) {
      let temp: any = [...careinstitutionList];
      let deptList: any = [];
      if (
        starCanstitution &&
        starCanstitution.isStar &&
        careInstituionDeptData.length
      ) {
        deptList = [...careInstituionDeptData];
      }

      let index: number = -1;
      deleteCareInstitutionRequirement.forEach((careInst: any) => {
        let deptIndex: number = -1;
        if (starCanstitution && starCanstitution.isStar && deptList.length) {
          deptIndex = deptList.findIndex(
            (careInst: any) =>
              parseInt(careInst.userId) === parseInt(careInst.userId)
          );
        }

        index = temp.findIndex((ele: any) => ele.id === careInst.userId);

        if (index > -1) {
          if (temp[index].availabilityData) {
            for (let i = 0; i < temp[index].availabilityData.length; i++) {
              let element: any[] = [...temp[index].availabilityData[i]];
              if (element.some((value: any) => value.id === careInst.id)) {
                let cellIndex: number = element.findIndex(
                  (ele: any) => ele.id === careInst.id
                );
                if (cellIndex > -1) {
                  element.splice(cellIndex, 1);
                }
                temp[index].availabilityData[i] = element;
              }
            }
          }
        }
        if (deptIndex > -1) {
          if (
            starCanstitution &&
            starCanstitution.isStar &&
            deptList.length &&
            deptList[deptIndex].availabilityData
          ) {
            for (
              let i = 0;
              i < deptList[deptIndex].availabilityData.length;
              i++
            ) {
              let element: any[] = [...deptList[deptIndex].availabilityData[i]];
              if (element.some((value: any) => value.id === careInst.id)) {
                let cellIndex: number = element.findIndex(
                  (ele: any) => ele.id === careInst.id
                );

                if (cellIndex > -1) {
                  element.splice(cellIndex, 1);
                }
                deptList[deptIndex].availabilityData[i] = element;
              }
            }
          }
          setcareInstituionDeptData(deptList);
        }
      });
      setcareinstitutionList(temp);
      // canstitutionRefetch();
      setselectedCellsCareinstitution([]);
    },
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
          (caregiver: any) => caregiver.id === element.userId
        );
        if (index > -1) {
          for (let i = 0; i < temp[index].availabilityData.length; i++) {
            let availabilityRows: any[] = [...temp[index].availabilityData[i]];
            let availabilityIndex: number = availabilityRows.findIndex(
              (e: any) => e.id === element.id
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
        setcaregiversList(temp);
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
    fetchPolicy: "no-cache",
  });

  // Mutation to add careinstitution data
  const [
    addCareinstitutionRequirment,
    { data: addCareinstitutionRes, loading: addCareinstLoading },
  ] = useMutation<
    { addCareInstitutionRequirement: [IAddCargiverAppointmentRes] },
    { careInstitutionRequirementInput: ICareinstitutionFormSubmitValue[] }
  >(ADD_INSTITUTION_REQUIREMENT, {
    onCompleted({ addCareInstitutionRequirement }) {
      if (careinstitutionList && careinstitutionList.length) {
        let temp: any = [...careinstitutionList];
        let deptList: any = [];
        if (
          starCanstitution &&
          starCanstitution.isStar &&
          careInstituionDeptData.length
        ) {
          deptList = [...careInstituionDeptData];
        }
        // else {
        //   temp = [...careinstitutionList];
        // }
        const selectedCareInstCells = selectedCellsCareinstitution
          ? [...selectedCellsCareinstitution]
          : [];
        addCareInstitutionRequirement.forEach((requirement: any) => {
          let index: number = temp.findIndex(
            (careInst: any) => careInst.id === requirement.userId
          );
          let deptIndex: number = -1;
          if (starCanstitution && starCanstitution.isStar && deptList.length) {
            deptIndex = deptList.findIndex(
              (careInst: any) => careInst.deptId === requirement.divisionId
            );
          }

          // else {
          //   index = temp.findIndex(
          //     (careInst: any) => careInst.id === requirement.userId
          //   );
          // }

          if (temp[index].availabilityData) {
            for (let i = 0; i < temp[index].availabilityData.length; i++) {
              let element: any[] = [...temp[index].availabilityData[i]];

              let cellIndex: number = selectedCareInstCells.findIndex(
                (cell: any) =>
                  moment(requirement.date).isSame(
                    moment(cell.dateString),
                    "day"
                  )
              );

              let qualification = qualificationList.filter(({ value }: any) =>
                requirement.qualificationId.includes(value)
              );

              let departmentData: any;
              if (
                careInstitutionDepartment &&
                careInstitutionDepartment.length &&
                requirement &&
                requirement.divisionId
              ) {
                departmentData = careInstitutionDepartment.filter(
                  (dept: any) => dept.value === requirement.divisionId
                )[0];
              }

              if (selectedCareInstCells[cellIndex]) {
                selectedCareInstCells[cellIndex] = {
                  ...selectedCareInstCells[cellIndex],
                  item: {
                    ...requirement,
                    qualificationId:
                      qualification && qualification.length
                        ? qualification
                        : [],
                    division:
                      departmentData && departmentData.value
                        ? {
                            id: departmentData.value,
                            name: departmentData.label,
                          }
                        : {},
                  },
                };
              }
              // To check this row have this date entry or not
              if (
                element.filter((e: any) =>
                  moment(e.date).isSame(moment(requirement.date), "day")
                ).length === 0 ||
                i === temp[index].availabilityData.length - 1
              ) {
                if (
                  element.filter((e: any) =>
                    moment(e.date).isSame(moment(requirement.date), "day")
                  ).length === 0
                ) {
                  temp[index].availabilityData[i] = [...element, requirement];
                } else {
                  // To add new row in case of no row is left
                  temp[index].availabilityData[i + 1] = [requirement];
                }
                break;
              }
            }
          }

          if (
            starCanstitution &&
            starCanstitution.isStar &&
            deptList.length &&
            deptList[deptIndex].availabilityData
          ) {
            for (
              let i = 0;
              i < deptList[deptIndex].availabilityData.length;
              i++
            ) {
              let element: any[] = [...deptList[deptIndex].availabilityData[i]];
              let cellIndex: number = selectedCareInstCells.findIndex(
                (cell: any) =>
                  moment(requirement.date).isSame(
                    moment(cell.dateString),
                    "day"
                  )
              );

              let qualification = qualificationList.filter(({ value }: any) =>
                requirement.qualificationId.includes(value)
              );

              if (selectedCareInstCells[cellIndex]) {
                selectedCareInstCells[cellIndex] = {
                  ...selectedCareInstCells[cellIndex],
                  item: {
                    ...requirement,
                    qualificationId:
                      qualification && qualification.length
                        ? qualification
                        : [],
                  },
                };
              }
              // To check this row have this date entry or not
              if (
                element.filter((e: any) =>
                  moment(e.date).isSame(moment(requirement.date), "day")
                ).length === 0
              ) {
                deptList[deptIndex].availabilityData[i] = [
                  ...element,
                  requirement,
                ];
                break;
              }
            }
          }
        });
        setcareinstitutionList(temp);
        setselectedCellsCareinstitution(selectedCareInstCells);
      }
      // setPage(1);
      // canstitutionRefetch();
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
      let temp: any = [...careinstitutionList];
      let deptList: any = [];
      const caregiverListData: any = [...caregiversList];
      if (
        starCanstitution &&
        starCanstitution.isStar &&
        careInstituionDeptData.length
      ) {
        deptList = [...careInstituionDeptData];
      }
      const selectedCareInstCells = selectedCellsCareinstitution
        ? [...selectedCellsCareinstitution]
        : [];
      const selectedCaregiverCells = selectedCells ? [...selectedCells] : [];
      // to get the appointment data from the care institution cell
      let appointmentData = selectedCareInstCells.filter(
        (cell: any) =>
          cell.item && cell.item.id === updateCareInstitutionRequirement.id
      )[0];
      appointmentData =
        appointmentData &&
        appointmentData.item.appointments &&
        appointmentData.item.appointments.length &&
        appointmentData.item.appointments[0]
          ? appointmentData.item.appointments[0]
          : {};
      // If appointment is confirmed by care-institution need to update caregiver cell in case of leasing
      if (
        updateCareInstitutionRequirement.status === "confirmed" &&
        updateCareInstitutionRequirement.isLeasing &&
        appointmentData
      ) {
        let caregiverIndex: number = caregiverListData.findIndex(
          (caregiver: any) =>
            appointmentData &&
            appointmentData.ca &&
            appointmentData.ca.userId &&
            caregiver.id === appointmentData.ca.userId
        );
        let availabilityDataIndex: number = -1;
        let availabilityIndex: number = -1;
        // To find the exact index of availability
        for (
          let i = 0;
          caregiverIndex > -1 &&
          i < caregiverListData[caregiverIndex].availabilityData.length;
          i++
        ) {
          let availabilityRows: any[] = [
            ...caregiverListData[caregiverIndex].availabilityData[i],
          ];

          availabilityIndex = availabilityRows.findIndex(
            (e: any) => e.id === appointmentData.avabilityId
          );
          if (availabilityIndex > -1) {
            availabilityDataIndex = i;
            break;
          }
        }

        if (availabilityDataIndex > -1 && availabilityIndex > -1) {
          let itemData =
            caregiverListData[caregiverIndex].availabilityData[
              availabilityDataIndex
            ][availabilityIndex];
          if (
            itemData &&
            itemData.appointments &&
            itemData.appointments.length
          ) {
            caregiverListData[caregiverIndex].availabilityData[
              availabilityDataIndex
            ][availabilityIndex] = {
              ...itemData,
              appointments: [
                {
                  ...itemData.appointments[0],
                  cr: {
                    ...itemData.appointments[0].cr,
                    status: updateCareInstitutionRequirement.status,
                  },
                },
              ],
            };
          }
        }

        // To update the selected caregiver & careInst cell
        let cellIndex: number = selectedCaregiverCells.findIndex(
          (cell: any) =>
            appointmentData &&
            appointmentData.ca &&
            appointmentData.avabilityId === cell.item.id
        );

        if (
          selectedCaregiverCells[cellIndex] &&
          selectedCaregiverCells[cellIndex].item &&
          selectedCaregiverCells[cellIndex].item.appointments &&
          selectedCaregiverCells[cellIndex].item.appointments.length
        ) {
          selectedCaregiverCells[cellIndex] = {
            ...selectedCaregiverCells[cellIndex],
            item: {
              ...selectedCaregiverCells[cellIndex].item,
              appointments: [
                {
                  ...selectedCaregiverCells[cellIndex].item.appointments[0],
                  cr: {
                    ...selectedCaregiverCells[cellIndex].item.appointments[0]
                      .cr,
                    status: updateCareInstitutionRequirement.status,
                  },
                },
              ],
            },
          };
        }
        setSelectedCells(selectedCaregiverCells);
      }
      let index: number = -1;
      index = temp.findIndex(
        (careInst: any) =>
          careInst.id === updateCareInstitutionRequirement.userId
      );

      let deptIndex: number = -1;
      if (starCanstitution && starCanstitution.isStar && deptList.length) {
        deptIndex = deptList.findIndex(
          (careInst: any) =>
            careInst.deptId === updateCareInstitutionRequirement.divisionId
        );
      }

      if (index > -1) {
        for (let i = 0; i < temp[index].availabilityData.length; i++) {
          let element: any[] = [...temp[index].availabilityData[i]];
          let availabilityIndex: number = element.findIndex(
            (e: any) => e.id === updateCareInstitutionRequirement.id
          );
          if (availabilityIndex > -1) {
            temp[index].availabilityData[i][availabilityIndex] = {
              ...temp[index].availabilityData[i][availabilityIndex],
              ...updateCareInstitutionRequirement,
            };
            break;
          }
        }
      }

      if (deptIndex > -1) {
        if (
          starCanstitution &&
          starCanstitution.isStar &&
          deptList.length &&
          deptList[deptIndex].availabilityData &&
          deptList[deptIndex].availabilityData.length
        ) {
          for (
            let i = 0;
            i < deptList[deptIndex].availabilityData.length;
            i++
          ) {
            let element: any[] = [...deptList[deptIndex].availabilityData[i]];

            let availabilityIndex: number = element.findIndex(
              (e: any) => e.id === updateCareInstitutionRequirement.id
            );
            if (availabilityIndex > -1) {
              deptList[deptIndex].availabilityData[i][availabilityIndex] = {
                ...deptList[deptIndex].availabilityData[i][availabilityIndex],
                ...updateCareInstitutionRequirement,
              };
              break;
            }
          }
        }
        setcareInstituionDeptData(deptList);
      }
      let cellIndex: number = selectedCareInstCells.findIndex(
        (cell: any) =>
          cell.item && updateCareInstitutionRequirement.id === cell.item.id
      );
      let qualification = qualificationList.filter(({ value }: any) =>
        updateCareInstitutionRequirement.qualificationId.includes(value)
      );

      if (selectedCareInstCells[cellIndex]) {
        selectedCareInstCells[cellIndex] = {
          ...selectedCareInstCells[cellIndex],
          item: {
            ...selectedCareInstCells[cellIndex].item,
            ...updateCareInstitutionRequirement,
            qualificationId:
              qualification && qualification.length ? qualification : [],
          },
        };
      }
      setselectedCellsCareinstitution(selectedCareInstCells);
      setcareinstitutionList(temp);
    },
  });
  // set field to update formik values
  const [
    updateCanstitutionFormikValues,
    setupdateCanstitutionFormikValues,
  ] = useState<any>();

  // push last time data into the caregiver field
  useEffect(() => {
    const {
      distanceInKM = "",
      f = "",
      feePerKM = "",
      n = "",
      otherExpenses = "",
      s = "",
      travelAllowance = "",
      workingProofRecieved = false,
      remarksCareGiver = "",
      remarksInternal = "",
      nightAllowance = undefined,
    } = caregiverLastTimeValues ? caregiverLastTimeValues : {};

    if (
      selectedCells &&
      selectedCells.length &&
      caregiverLastTimeData &&
      caregiverLastTimeData.getCareGiverAvabilityLastTimeById
    ) {
      const { getCareGiverAvabilityLastTimeById } = caregiverLastTimeData;
      let careGiverAvabilityInput: any[] = [];

      selectedCells.forEach(async (element: any) => {
        const {
          firstName = "",
          lastName = "",
          email = "",
          id: selectedCaregiverId = "",
          dateString = "",
          caregiver = undefined,
          item = undefined,
          qualificationIds = [],
        } = element ? element : {};
        const {
          fee = "",
          nightFee = "",
          weekendAllowance = "",
          holidayAllowance = "",
        } = getCareGiverAvabilityLastTimeById
          ? getCareGiverAvabilityLastTimeById
          : {};
        let data: any = {
          id: selectedCaregiverId,
          firstName,
          lastName,
          email,
          caregiver: {
            ...caregiver,
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
            remarksCareGiver,
            remarksInternal,
            nightAllowance:
              nightAllowance && nightAllowance.value
                ? nightAllowance.value
                : undefined,
            distanceInKM,
            feePerKM,
            travelAllowance,
            otherExpenses,
            f: f ? "available" : "default",
            s: s ? "available" : "default",
            n: n ? "available" : "default",
          },
        };
        careGiverAvabilityInput = [...careGiverAvabilityInput, data];
      });
      setSelectedCells(careGiverAvabilityInput);
    }
  }, [caregiverLastTimeData]);

  // change department
  useEffect(() => {
    let deptId = careInstituionDept ? careInstituionDept.value : "";
    let departmentData: any = {};
    const careInstitutionTimesOptions:
      | IReactSelectTimeInterface[]
      | undefined = [];
    let values = updateCanstitutionFormikValues;

    let startTime: string = "";
    let endTime: string = "";
    const {
      id = "",
      firstName = "",
      lastName = "",
      name = "",
      item = undefined,
      canstitution = {},
      qualificationIds = [],
      dateString = "",
      isLeasing = "",
    } =
      selectedCellsCareinstitution &&
      selectedCellsCareinstitution.length &&
      selectedCellsCareinstitution[0]
        ? selectedCellsCareinstitution[0]
        : {};

    if (deptId && (updateCanstitutionFormikValues || !(item && item.id))) {
      if (departmentList && departmentList.getDivision.length) {
        const { getDivision } = departmentList;
        departmentData = getDivision.filter(
          (dept: any) => dept.id === deptId
        )[0];
        if (departmentData && departmentData.times) {
          startTime = departmentData.times[0]
            ? departmentData.times[0].begin
            : "";
          endTime = departmentData.times[0] ? departmentData.times[0].end : "";
          departmentData.times.map((list: any) => {
            return careInstitutionTimesOptions.push({
              label: `${list.begin} - ${list.end} `,
              value: `${list.begin} - ${list.end} `,
              data: list,
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
              ...canstitution,
            },
            qualificationIds,
            dateString,
            isLeasing,
            item: {
              ...values,
              id: values && values.appointmentId ? values.appointmentId : "",
              department: careInstituionDept,
              qualificationId:
                item &&
                item !== undefined &&
                item.qualificationId &&
                item.qualificationId.length
                  ? item.qualificationId
                  : values && values.qualificationId
                  ? values.qualificationId
                  : [],
              address: departmentData ? departmentData.address : "",
              contactPerson: departmentData ? departmentData.contactPerson : "",
              departmentOfferRemarks: departmentData
                ? departmentData.commentsOffer
                : "",
              departmentRemarks: departmentData
                ? departmentData.commentsVisibleInternally
                : "",
              departmentBookingRemarks: departmentData
                ? departmentData.commentsCareGiver
                : "",
              shift:
                careInstitutionTimesOptions &&
                careInstitutionTimesOptions.length
                  ? careInstitutionTimesOptions[0]
                  : values
                  ? values.shift
                  : "",
              startTime: startTime ? startTime : values ? values.startTime : "",
              endTime: endTime ? endTime : values ? values.endTime : "",
              isLeasing: item && item.isLeasing ? item.isLeasing : false,
            },
          },
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
    let time = timeData && !timeData.data ? timeData.value.split("-") : "";
    const {
      id = "",
      firstName = "",
      lastName = "",
      name = "",
      canstitution = {},
      qualificationIds = [],
      dateString = "",
      isLeasing = "",
      item = undefined,
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
        isLeasing,
        item: {
          ...values,
          id: values && values.appointmentId ? values.appointmentId : "",
          shift: careInstituionShift,
          isLeasing: item && item.isLeasing ? item.isLeasing : false,
          startTime: timeData
            ? timeData.data && timeData.data.begin
              ? timeData.data.begin
              : time[0]
            : "",
          endTime: timeData
            ? timeData.data && timeData.data.begin
              ? timeData.data.end
              : time[1]
            : "",
        },
      },
    ];

    if (careInstituionShift && careInstituionShift.value) {
      if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
        let temp = [...selectedCellsCareinstitution];
        temp[0] = data[0];
        setselectedCellsCareinstitution(temp);
      } else {
        setselectedCellsCareinstitution(data);
      }
    }
  }, [careInstituionShift]);

  useEffect(() => {
    fetchCareGiversList(1);
    fetchCareInstituionList(1);
    const tableHeight: any = document.getElementById(
      "appointment_list_section"
    );
    var clientHeight = tableHeight ? tableHeight.clientHeight : 100;
    let getHeight = clientHeight / 2 - 20;
    setsetHeight(getHeight);
  }, []);

  // useEffect(() => {
  //   fetchCareGiversList(1);
  //   fetchCareInstituionList(1);
  // }, [daysData.daysArr]);

  useEffect(() => {
    // worked on fixing heinght on resize
    const resizeListener = () => {
      const tableHeight: any = document.getElementById(
        "appointment_list_section"
      );
      var clientHeight = tableHeight ? tableHeight.clientHeight : 100;
      let getHeight = clientHeight / 2 - 20;
      setsetHeight(getHeight);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // // clean up function
    // return () => {
    //   // remove resize listener
    //   window.removeEventListener('resize', resizeListener);
    // };
  }, []);

  /**
   *
   * @param data
   */
  const formatCaregivers = (data: any[]) => {
    console.time("test");
    let temp: any[] = daysData ? [...daysData.daysArr] : [];
    const newData: any[] = [];
    let tempData: any[];
    _.forEach(data, (value) => {
      const availibility = _.mapValues(
        _.groupBy(value.caregiver_avabilities, "date")
      );
      let max = 1;
      _.forEach(daysData.daysArr, (date) => {
        const arr = availibility[date.dateString || ""] || [];
        if (arr.length > max) {
          max = arr.length;
        }
      });
      let availabilityData: any = [];
      let newDataLength = newData.length;
      for (let i = 0; i < max; i++) {
        newData.push({
          ...(i === 0
            ? value
            : {
                id: value.id,
              }),
          row: i,
          key: `${value.id}-${i}`,
          availabilityData: [],
        });
      }

      temp.forEach((d: any, index: number) => {
        let records = value.caregiver_avabilities.filter((available: any) =>
          moment(d.dateString).isSame(moment(available.date), "day")
        );
        for (let i = 0; i < records.length; i++) {
          newData[newDataLength + i].availabilityData.push(records[i]);
          // availabilityData[i].push(records[i]);
        }
      });
    });
    console.timeEnd("test");
    return newData;
  };
  /**
   *
   */
  const setCaregivers = () => {
    const data =
      ((careGiversList || {}).getUserByQualifications || {}).result || [];
    const count =
      ((careGiversList || {}).getUserByQualifications || {}).totalCount || 0;
    const newData = formatCaregivers(data);
    allCaregivers = Object.assign([], newData);
    setHasMore(data.length <= count);
    setcaregiversList(newData);
  };

  // Store caregiver's list state
  useEffect(() => {
    if (!loadingCaregiver) {
      setCaregivers();
    }
  }, [loadingCaregiver]);

  // Store careinst list state
  useEffect(() => {
    let temp: any[] = daysData ? [...daysData.daysArr] : [];
    let careInstSelectedCell =
      selectedCellsCareinstitution && selectedCellsCareinstitution.length
        ? [...selectedCellsCareinstitution]
        : [];
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
                if (
                  records[i] &&
                  careInstSelectedCell &&
                  careInstSelectedCell.length &&
                  records[i].id
                ) {
                  let index = careInstSelectedCell.findIndex(
                    (cell: any) => cell.item && cell.item.id === records[i].id
                  );
                  if (index > -1) {
                    careInstSelectedCell[index].item = {
                      ...records[i],
                      qualificationId: qualificationList.filter(
                        ({ value }: any) =>
                          records[i].qualificationId &&
                          records[i].qualificationId.includes(value)
                      ),
                    };
                  }
                }

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

      if (careInstSelectedCell && careInstSelectedCell.length) {
        setselectedCellsCareinstitution(careInstSelectedCell);
      }
      // setcareinstitutionList(result);
      // To set solo state in case of search by care-institution
      if (
        filterState.careinstitutionSoloFilter &&
        filterState.careinstitutionSoloFilter.value &&
        starCanstitution &&
        result &&
        result.length &&
        (!starCanstitution.isStar || starCanstitution.id !== result[0].id)
      ) {
        handleFirstStarCanstitution(result[0], 1);
      }
    }
  }, [careInstitutionList]);

  // Requirement And Avability filter by id
  useEffect(() => {
    if (
      appointmentFilterById &&
      appointmentFilterById.getRequirementAndAvabilityById
    ) {
      const { getRequirementAndAvabilityById } = appointmentFilterById;
      const { requirementData, avabilityData } = getRequirementAndAvabilityById;
      const {
        id = "",
        name = "",
        address = "",
        bookingRemarks = "",
        comments = "",
        contactPerson = "",
        date = "",
        division = {},
        divisionId = "",
        departmentBookingRemarks = "",
        departmentOfferRemarks = "",
        departmentRemarks = "",
        endTime = "",
        isWorkingProof = false,
        offerRemarks = "",
        qualificationId = [],
        startTime = "",
        userId = "",
        isLeasing = "",
        qualificationForCharge = "",
        createdBy = "",
        createdAt = "",
        updatedAt = "",
        appointments: RequirementAppointData = [],
        user: RequirementUser = {},
        f: requirementF = "",
        s: requirementS = "",
        n: requirementN = "",
      } = requirementData ? requirementData : {};
      let qualificationData: IReactSelectInterface[] = [];
      if (qualificationList && qualificationId) {
        qualificationData = qualificationList.filter((qual: any) =>
          qualificationId.includes(qual.value)
        );
      }

      const {
        id: { Id } = "",
        firstName = "",
        lastName = "",
        canstitution = {},
        qualificationId: qualificationIds = [],
      } = RequirementUser ? RequirementUser : {};

      let careinstitutionvalue: any[] = [
        {
          id: userId,
          firstName,
          lastName,
          canstitution,
          qualificationIds,
          dateString: date ? date : "",
          isLeasing: isLeasing,
          item: {
            appointmentId: id ? id : "",
            id: id ? id : "",
            name: name ? name : canstitution.shortName,
            date,
            shift: undefined,
            endTime,
            startTime,
            qualificationId: qualificationData ? qualificationData : undefined,
            qualificationForCharge: qualificationForCharge
              ? qualificationForCharge
              : undefined,
            address,
            contactPerson,
            divisionId,
            department: divisionId,
            division: division ? division : {},
            // ? departmentData && departmentData.length
            //   ? {
            //       value: departmentData[0].id,
            //       label: departmentData[0].name,
            //     }
            //   : undefined
            // : undefined,
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
                : "",
            isLeasing: isLeasing,
            appointments: requirementData ? requirementData.appointments : [],
            createdBy,
            createdAt,
            updatedAt,
            f: requirementF,
            s: requirementS,
            n: requirementN,
          },
        },
      ];

      if (requirementData !== null) {
        setselectedCellsCareinstitution(careinstitutionvalue);
      }
      const {
        userId: caregiverUserId = "",
        f = "",
        s = "",
        n = "",
        fee = "",
        date: dateStr = "",
        nightFee = "",
        weekendAllowance = "",
        holidayAllowance = "",
        nightAllowance = "",
        distanceInKM = "",
        feePerKM = "",
        travelAllowance = "",
        otherExpenses = "",
        workingProofRecieved = false,
        remarksCareGiver = "",
        remarksInternal = "",
        status = "",
        workingHoursFrom = "",
        workingHoursTo = "",
        breakFrom = "",
        breakTo = "",
        appointments = [],
        user = {},
        createdBy: createBy = "",
        createdAt: createAt = "",
        updatedAt: updateAt = "",
      } = avabilityData ? avabilityData : {};
      const {
        id: ID = "",
        firstName: firstname = "",
        lastName: lastname = "",
        email = "",
        caregiver: caregiverData = {},
        qualificationId: qualificationId1 = [],
      } = user ? user : {};
      let caregiverdata: any = [
        {
          // id: ID,
          id: caregiverUserId,
          caregiver: {
            ...caregiverData,
          },
          dateString: dateStr,
          qualificationIds: qualificationId1,
          firstName: firstname,
          email,
          lastName: lastname,
          item: {
            id: avabilityData && avabilityData.id ? avabilityData.id : "",
            name: avabilityData && avabilityData.name ? avabilityData.name : "",
            date: avabilityData && avabilityData.date ? avabilityData.date : "",
            fee: fee ? fee : "",
            nightFee,
            weekendAllowance,
            holidayAllowance,
            distanceInKM,
            feePerKM,
            lastName,
            f: f === "available" ? "available" : "",
            n: n === "available" ? "available" : "",
            s: s === "available" ? "available" : "",
            nightAllowance,
            otherExpenses,
            remarksCareGiver,
            remarksInternal,
            travelAllowance,
            workingProofRecieved,
            status: status ? status : "",
            workingHoursFrom,
            workingHoursTo,
            breakFrom,
            breakTo,
            appointments,
            createdBy: createBy,
            createdAt: createAt,
            updatedAt: updateAt,
          },
        },
      ];

      // setselectedCareGiver(caregiverdata);
      if (avabilityData !== null) {
        setSelectedCells(caregiverdata);
      }
      /*  */
    }
  }, [appointmentFilterById]);

  // To set initial month and year
  useEffect(() => {
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(
      moment().month(),
      moment().year()
    );
    setDaysData(res);
  }, []);

  // To fetch list data after month has changed
  useEffect(() => {
    fetchCareGiversList(1);
    fetchCareInstituionList(1);
  }, [daysData]);

  // Default value is start & end of month
  let gte: string = moment().startOf("month").format(dbAcceptableFormat);
  let lte: string = moment().endOf("month").format(dbAcceptableFormat);

  const fetchCareGiversList = (
    page: number = 1,
    positiveAttr: number[] = [],
    negativeAttr: number[] = []
  ) => {
    if (daysData && daysData.daysArr && daysData.daysArr.length) {
      gte = daysData.daysArr[0].dateString || "";
      lte = daysData.daysArr[daysData.daysArr.length - 1].dateString || "";
    }
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
    if (daysData && daysData.daysArr && daysData.daysArr.length) {
      gte = daysData.daysArr[0].dateString || "";
      lte = daysData.daysArr[daysData.daysArr.length - 1].dateString || "";
    }

    // get careinstitution list
    fetchCareinstitutionList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: "canstitution",
        limit: APPOINTMENT_PAGE_LIMIT,
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
    setTimeSlotError("");
    const { item = {}, dept = {}, id = "", dateString = "" } =
      selectedCellsData && selectedCellsData.length && selectedCellsData[0]
        ? selectedCellsData[0]
        : {};

    const checkCondition: boolean =
      item && item.appointments && item.appointments.length;

    let appointmentsData: number[] = selectedCellsData
      .map((cell: any) =>
        cell.item && cell.item.appointments && cell.item.appointments.length
          ? cell.item.appointments[0]
          : {}
      )
      .filter(Boolean);
    if (name === "caregiver") {
      if (checkCondition) {
        let appointId: any = item.appointments.filter((appointment: any) => {
          return (
            moment(selectedCellsData[0].dateString).format("DD.MM.YYYY") ===
            moment(appointment.date).format("DD.MM.YYYY")
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
            "careinstitution",
            careinstitutionList,
            appointmentsData
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
            "caregiver",
            caregiversList,
            appointmentsData
          );
        }
      }
      // To default select department in case of selected solo careinstitution
      if (
        dept &&
        dept.id &&
        !(item && item.id)
        // && (!careInstituionDept || careInstituionDept && careInstituionDept.value !== dept.id)
      ) {
        setcareInstituionDept({
          label: dept.name,
          value: dept.id,
        });
      }
      setShowSelectedCaregiver({ id: "", isShow: false });
    }
  };

  // Function to get corresponding connected cell
  const getCorrespondingconnectedcell = (
    name: string,
    result: any,
    appointmentsData: any
  ) => {
    let connectedCells: any[] = [];
    result.forEach((element: any) => {
      element.availabilityData.forEach((row: any) => {
        const {
          id = "",
          firstName = "",
          lastName = "",
          email = "",
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
              .includes(availabilities.appointments[0].id)
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
                  : "",
              item:
                name === "careinstitution"
                  ? {
                      ...filteredCell,
                      qualificationId: filteredCell.qualificationId
                        ? qualificationList.filter(({ value }: any) =>
                            filteredCell.qualificationId.includes(value)
                          )
                        : qualificationList.filter(({ value }: any) =>
                            qualificationId.includes(value)
                          ),
                    }
                  : filteredCell,
            }))
          );
        }
      });
    });
    if (connectedCells && connectedCells.length) {
      if (name === "careinstitution") {
        setselectedCellsCareinstitution(connectedCells);
      } else {
        setSelectedCells(connectedCells);
      }
    } else {
      fetchAppointmentFilterById({
        variables: {
          id:
            name === "careinstitution"
              ? parseInt(appointmentsData[0].avabilityId)
              : parseInt(appointmentsData[0].requirementId),
          searchIn: name === "careinstitution" ? "avability" : "requirement",
        },
      });
    }
  };

  //  call department list query with every selection of care institution
  useEffect(() => {
    let userId: string =
      selectedCellsCareinstitution && selectedCellsCareinstitution.length
        ? selectedCellsCareinstitution[0].id
        : "";
    if (userId && !starCanstitution.isStar) {
      getDepartmentList({
        variables: {
          userId: parseInt(userId),
          locked: false,
        },
      });
    }
  }, [selectedCellsCareinstitution]);

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

  const fetchMoreData = (str: string) => {
    setPage(page + 1);
    if (str === "caregiver") {
      fetchCareGiversList(page + 1);
    } else {
      fetchCareInstituionList(page + 1);
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

  // Delete caregiver or careinstitution data
  const onhandleDelete = async (name: string, id: string) => {
    if (id) {
      const { value } = await ConfirmBox({
        title: languageTranslation("CONFIRM_LABEL"),
        text:
          name === "careinstitution"
            ? languageTranslation("CONFIRM_DELETE_CAREINSTITUTION_REQUIREMENT")
            : languageTranslation("CONFIRM_DELETE_CAREGIVER_AVABILITY"),
      });
      if (!value) {
        return;
      } else {
        if (name === "careinstitution") {
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
            name === "careinstitution"
              ? languageTranslation(
                  "DELETE_CAREINSTITUTION_REQUIREMENT_SUCCESS"
                )
              : languageTranslation("DELETE_CAREGIVER_AVABILITY_SUCCESS")
          );
        }
      }
    }
  };

  // handle first star of careinstitution and show department list
  const handleFirstStarCanstitution = async (list: any, index: number) => {
    if (!starCanstitution.isStar) {
      if (index < 0) {
        setfilterState({
          ...filterState,
          careinstitutionSoloFilter: {
            label: list ? list.id : "",
            value: list ? list.id : "",
          },
        });
      }
      setstarCanstitution({
        isStar: true,
        setIndex: index,
        id: list ? list.id : "",
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
          careinstitutionSoloFilter: undefined,
        });
        fetchCareInstituionList(1);
      }
      setstarCanstitution({
        isStar: false,
        setIndex: -1,
        id: "",
      });
      setsecondStarCanstitution({
        isStar: false,
        setIndex: -1,
        id: "",
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
            division.qualificationId = careInstData.qualificationId;
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
                moment(d.dateString).isSame(moment(available.date), "day")
              );
              for (let i = 0; i < records.length; i++) {
                division.availabilityData[i].push(records[i]);
              }
            });
          });
        // setFetchingDept(false);
        setcareInstituionDeptData(
          getDivision.filter((division: any) => !division.locked)
        );
      }
    } else {
      // setFetchingDept(false);
    }
  }, [departmentList, starCanstitution.isStar, careinstitutionList]);

  // Options to show department data
  let careInstitutionDepartment: IReactSelectInterface[] = [];
  if (departmentList && departmentList.getDivision.length) {
    const { getDivision } = departmentList;
    careInstitutionDepartment = getDivision.map((dept: any) => ({
      label: dept.name,
      value: dept && dept.id ? dept.id.toString() : "",
    }));
  }

  //  handle second star of careinstitution and autoselect department
  const onhandleSecondStarCanstitution = (dept: any) => {
    // To check whether first star is clicked or not
    if (!secondStarCanstitution.isStar && !starCanstitution.isStar) {
      handleFirstStarCanstitution({ id: dept ? dept.id : "" }, 1);
    } else {
      setsecondStarCanstitution({
        isStar: !secondStarCanstitution.isStar,
        setIndex: -1,
        id: dept && dept.id ? dept.id : "",
      });
      let data: any = [];
      data.push(dept);
      // setcareInstituionDeptData(data);
      // setcareInstituionDept({
      //   label: dept.name,
      //   value: dept.id,
      // });
    }
  };

  //  Manage star functionality for caregiver
  const onhandleCaregiverStar = async (
    id: string,
    isSecondStar: boolean,
    name: string,
    isNotExistInList: boolean = false
  ) => {
    if (starCaregiver && (!starCaregiver.isStar || isSecondStar)) {
      // if (isNotExistInList) {
      setfilterState({
        ...filterState,
        caregiverSoloFilter: {
          label: name,
          value: id,
        },
      });
      // }
      // setstarMarkCaregiver(!starMarkCaregiver);
      setstarCaregiver({
        isStar: true,
        id: id,
        isSecondStar,
      });
      // handleSecondStar(list, name);
    } else {
      if (
        filterState.caregiverSoloFilter &&
        filterState.caregiverSoloFilter.value &&
        caregiversList &&
        caregiversList.length === 1
      ) {
        await setfilterState({
          ...filterState,
          caregiverSoloFilter: undefined,
        });
        fetchCareGiversList(1);
      }
      setstarCaregiver({
        isStar: false,
        id: "",
        isSecondStar,
      });
    }
  };

  // const isUnLinkable: boolean =
  //   item &&
  //   item.appointments &&
  //   item.appointments.length &&
  //   Item &&
  //   Item.appointments &&
  //   item.appointments[0] &&
  //   item.appointments[0].id &&
  //   Item.appointments[0] &&
  //   Item.appointments[0].id &&
  //   item.appointments[0].id === Item.appointments[0].id
  //     ? true
  //     : false;
  // Handle unlink both
  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);
  // Link both forms
  const handleLinkBoth = async () => {
    let selectedData: any = [],
      checkError: boolean = false;
    if (
      selectedCellsCareinstitution &&
      selectedCellsCareinstitution.length &&
      selectedCells &&
      selectedCells.length
    ) {
      if (selectedCellsCareinstitution.length !== selectedCells.length) {
        // toast.dismiss();
        // if (!toast.isActive(toastId)) {
        //   toastId = toast.error(languageTranslation('LINK_SAME_LENGTH'));
        // }
      } else {
        // if (
        //   selectedCells[0].caregiver &&
        //   selectedCells[0].caregiver.attributes &&
        //   selectedCells[0].caregiver.attributes.length
        // ) {
        //   let checkAttribute = selectedCells[0].caregiver.attributes.includes(
        //     10060
        //   );
        //   if (checkAttribute) {
        //     const { value } = await ConfirmBox({
        //       title: languageTranslation('ATTRIBUTE_WARNING'),
        //       text: languageTranslation('LINKED_ATTRIBUTE_WARNING'),
        //     });
        //     if (!value) {
        //       checkError = true;
        //       return;
        //     }
        //   }
        // }
        let qualiCheck: any[] = [];
        selectedCells.map(async (key: any, index: number) => {
          const element = selectedCellsCareinstitution[index];
          if (
            key.item.fee &&
            key.item.weekendAllowance &&
            key.item.holidayAllowance &&
            key.item.nightFee
          ) {
            if (
              key.qualificationIds &&
              key.qualificationIds.length &&
              element.item.qualificationId &&
              element.item.qualificationId.length
            ) {
              qualiCheck = element.item.qualificationId.filter((e: any) =>
                key.qualificationIds.includes(e.value)
              );
            }
            if (qualiCheck && qualiCheck.length <= 0) {
              toast.dismiss();
              if (!toast.isActive(toastId)) {
                toastId = toast.warn(
                  languageTranslation("QUALIFICATION_UNMATCH")
                );
              }
              checkError = true;
              return true;
            }
            if (
              moment(key.dateString).format(dbAcceptableFormat) !==
              moment(element.dateString).format(dbAcceptableFormat)
            ) {
              checkError = true;
              toast.dismiss();
              if (!toast.isActive(toastId)) {
                toastId = toast.error(
                  languageTranslation("DATE_RANGE_MISMATCH")
                );
              }
              return false;
            } else if (key.item === undefined || element.item === undefined) {
              checkError = true;
              if (!toast.isActive(toastId)) {
                toastId = toast.error(languageTranslation("LINK_ERROR"));
              }
              return false;
            } else {
              if (!checkError) {
                selectedData.push({
                  avabilityId: parseInt(key.item.id),
                  requirementId: parseInt(element.item.id),
                  date: moment(element.dateString).format(dbAcceptableFormat),
                  status: "appointment",
                });
              }
            }
          } else {
            checkError = true;
            const { value } = await ConfirmBox({
              title: languageTranslation("FEES_ERROR_MESSAGE"),
              text: languageTranslation("LINKED_FEES_MESSAGE"),
              type: "error",
              showCancelButton: false,
              confirmButtonText: "Ok",
            });
            return;
          }
        });
        if (!checkError) {
          onLinkAppointment(selectedData, "link");
        }
      }
    }
  };
  // On link requirement
  const onLinkAppointment = async (selectedOption: any, name: string) => {
    if (name === "link") {
      await linkRequirement({
        variables: {
          appointmentInput: selectedOption,
        },
      });
      // updateLinkedStatus(name);
    } else {
      // updateLinkedStatus(name);
      await unLinkRequirement({
        variables: {
          appointmentInput: selectedOption,
        },
      });
    }
  };

  const handleUnlinkBoth = () => {
    setshowUnlinkModal(!showUnlinkModal);
  };
  //to apply condition on connect appointments selectedCells
  let isLinkable: boolean = true;
  let manageCondition: boolean = false;
  if (
    selectedCellsCareinstitution &&
    selectedCellsCareinstitution.length &&
    selectedCells &&
    selectedCells.length
    // item &&
    // item.id &&
    // Item &&
    // Item.id
  ) {
    selectedCells.filter((x: any) => {
      if (x.item && x.item.id) {
        if (
          x.item.f !== "block" ||
          x.item.s !== "block" ||
          x.item.n !== "block"
        ) {
          if (!manageCondition) {
            selectedCellsCareinstitution.filter((x: any) => {
              if (x.item && x.item.id) {
                if (
                  x.item &&
                  x.item.status !== "default" &&
                  x.item.status !== "offered"
                ) {
                  isLinkable = true;
                  return;
                }
              } else {
                manageCondition = true;
                isLinkable = false;
                return;
              }
            });
          }
        } else {
          manageCondition = true;
          isLinkable = false;
          return;
        }
      }
    });
  } else {
    isLinkable = false;
  }

  const onAddNewRow = (name: string, index: number) => {
    if (name === "caregiver") {
      const newCaregivers = Object.assign([], allCaregivers);
      newCaregivers.splice(index + 1, 0, {
        ...allCaregivers[index],
        firstName: "",
        lastName: "",
        key: allCaregivers[index].key + allCaregivers.length,
        availabilityData: [],
      });
      allCaregivers = newCaregivers;
      setcaregiversList(newCaregivers);
    }
  };

  /**
   *
   * @param page
   */
  const getMoreCaregivers = (page: number = 1) => {
    setIsLoadingCaregiver(true);
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
    if (daysData && daysData.daysArr && daysData.daysArr.length) {
      gte = daysData.daysArr[0].dateString || "";
      lte = daysData.daysArr[daysData.daysArr.length - 1].dateString || "";
    }
    fetchMoreCareGiverList({
      variables: {
        qualificationId: temp,
        userRole: "caregiver",
        negativeAttributeId: negative,
        limit: APPOINTMENT_PAGE_LIMIT,
        page: page,
        showAppointments:
          filterByAppointments && filterByAppointments.value
            ? filterByAppointments.value === "showAll"
              ? ""
              : filterByAppointments.value
            : null,
        positiveAttributeId: positive,
        caregiverId:
          caregiverSoloFilter && caregiverSoloFilter.value
            ? parseInt(caregiverSoloFilter.value)
            : null,
        gte,
        lte,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          return prev;
        }
        if (prev && prev.getUserByQualifications) {
          const newData = formatCaregivers(
            fetchMoreResult.getUserByQualifications.result
          );
          allCaregivers = [...allCaregivers, ...newData];
          setcaregiversList(allCaregivers);
          setIsLoadingCaregiver(false);
          const result = [
            ...prev.getUserByQualifications.result,
            ...fetchMoreResult.getUserByQualifications.result,
          ];
          setHasMore(result.length <= prev.getUserByQualifications.totalCount);
          return {
            getUserByQualifications: {
              ...prev.getUserByQualifications,
              result,
            },
          };
        }
      },
    });
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
          careGiversList={careGiversList}
          careInstitutionList={careInstitutionList}
          fetchAppointmentFilterById={fetchAppointmentFilterById}
          setselectedCareinstitution={setselectedCareinstitution}
          fetchCareGiversList={fetchCareGiversList}
          fetchCareInstituionList={fetchCareInstituionList}
          setSelectedCells={setSelectedCells}
        />
        <div className='common-content flex-grow-1'>
          <div>
            <div className='appointment-page-row'>
              <div
                className='appointment-page-list-section'
                id='appointment_list_section'>
                <div className='calender-section'>
                  {
                    // caregiverLoading ? (
                    //   "Loading..."
                    // ) :
                    caregiversList && caregiversList.length ? (
                      <div className='custom-appointment-calendar overflow-hidden'>
                        <CaregiverList
                          onAddNewRow={onAddNewRow}
                          getMoreCaregivers={getMoreCaregivers}
                          setcaregiversList={setcaregiversList}
                          caregiverData={caregiversList}
                          fetchMoreData={fetchMoreData}
                          daysData={daysData}
                          totalCount={
                            careGiversList &&
                            careGiversList.getUserByQualifications
                              ? careGiversList.getUserByQualifications
                                  .totalCount
                              : 0
                          }
                          handleSelection={handleSelection}
                          onhandleCaregiverStar={onhandleCaregiverStar}
                          starCaregiver={starCaregiver}
                          setHeight={setHeight}
                          hasMore={hasMore}
                          page={page}
                          setPage={setPage}
                          isLoading={isLoadingCaregiver}
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
                      <div className='custom-appointment-calendar overflow-hidden'>
                        <CareInstitutionList
                          careinstitutionData={careinstitutionList}
                          fetchMoreData={fetchMoreData}
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
                          handleFirstStarCanstitution={
                            handleFirstStarCanstitution
                          }
                          careInstituionDeptData={careInstituionDeptData}
                          starCanstitution={starCanstitution}
                          secondStarCanstitution={secondStarCanstitution}
                          onhandleSecondStarCanstitution={
                            onhandleSecondStarCanstitution
                          }
                          setcareInstituionDeptData={setcareInstituionDeptData}
                          setcareinstitutionList={(data: any) =>
                            setcareinstitutionList(data)
                          }
                          setHeight={setHeight}
                          selectedCareinstitution={selectedCareinstitution}
                        />
                      </div>
                    ) : (
                      <Loader />
                    )
                  }
                </div>
              </div>
              <div
                className='appointment-page-form-section'
                id='appointment_form_section'>
                <Row className='row-appointment'>
                  <Col
                    lg={"6"}
                    className='pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0'>
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
                      addCaregiverLoading={
                        addCaregiverLoading || updateCaregiverLoading
                      }
                      onhandleDelete={onhandleDelete}
                      setqualification={setqualification}
                      setSelectedCells={(data: any) => setSelectedCells(data)}
                      caregiverLastTimeData={
                        caregiverLastTimeData &&
                        caregiverLastTimeData.getCareGiverAvabilityLastTimeById
                          ? caregiverLastTimeData.getCareGiverAvabilityLastTimeById
                          : {}
                      }
                      setcaregiverLastTimeValues={setcaregiverLastTimeValues}
                    />
                  </Col>
                  <Col lg={"6"} className='pl-lg-0'>
                    <CareinstitutionFormView
                      selectedCellsCareinstitution={
                        selectedCellsCareinstitution
                      }
                      timeSlotError={timeSlotError}
                      setTimeSlotError={setTimeSlotError}
                      setsavingBoth={setsavingBoth}
                      qualificationList={qualificationList}
                      careInstitutionDepartment={careInstitutionDepartment}
                      multipleRequirement={multipleRequirement}
                      setcareInstituionDept={(deptData: any, values: any) => {
                        setcareInstituionDept(deptData);
                        setupdateCanstitutionFormikValues(values);
                      }}
                      setcareInstituionShift={(shiftData: any, values: any) => {
                        setcareInstituionShift(shiftData);
                        setupdateCanstitutionFormikValues(values);
                      }}
                      careInstitutionTimesOptions={shiftOption}
                      addCareinstitutionRequirment={
                        addCareinstitutionRequirment
                      }
                      addCareinstLoading={
                        addCareinstLoading || updateCareinstitutionLoading
                      }
                      updateCareinstitutionRequirment={
                        updateCareinstitutionRequirment
                      }
                      onhandleDelete={onhandleDelete}
                    />
                  </Col>

                  <Col lg={"12"}>
                    <div className='d-flex align-items-center justify-content-center'>
                      <Button
                        className='btn-common  mt-0 mb-2 mx-2'
                        color='primary'>
                        <i className='fa fa-save mr-2' />
                        {languageTranslation("SAVE_BOTH")}
                      </Button>
                      <Button
                        className='btn-common mt-0 mb-2 mx-2'
                        color='secondary'
                        // disabled={
                        //   isUnLinkable ? false : isLinkable ? false : true
                        // }
                        onClick={() =>
                          /* isUnLinkable ?  handleUnlinkBoth() :*/ handleLinkBoth()
                        }>
                        {/* {linkLoading ? (
                            <i className='fa fa-spinner fa-spin mr-2' />
                          ) : (
                          )} */}
                        <i className='fa fa-link mr-2' />
                        {
                          /* isUnLinkable
                            ? 'Unlink'
                            : */ languageTranslation(
                            "LINK"
                          )
                        }
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
