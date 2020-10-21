import React, { FunctionComponent, useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { APPOINTMENT_PAGE_LIMIT, dbAcceptableFormat } from "../../../../config";
import {
  AppointmentsQueries,
  GET_QUALIFICATION_ATTRIBUTE,
} from "../../../../graphql/queries";
import moment from "moment";
import {
  IGetDaysArrayByMonthRes,
  IQualifications,
  IReactSelectInterface,
} from "../../../../interfaces";
import { getDaysArrayByMonth, languageTranslation } from "../../../../helpers";
import CaregiverList from "./Caregiver/CaregiverList";
import CareInstitutionList from "./CareInstitution/CareinstitutionList";
import "../Appointment/index.scss";
import AppointmentNav from "./AppointmentNav.tsx";
import Loader from "../../containers/Loader/Loader";

const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
const DummyAppointment: FunctionComponent = () => {
  const [daysData, setDaysData] = useState<IGetDaysArrayByMonthRes>({
    daysArr: [],
    month: moment().month().toString(),
    year: moment().year().toString(),
  });
  //  set page
  const [page, setPage] = useState<number>(1);

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

    if (careGiversList && careGiversList.getUserByQualifications) {
      const { getUserByQualifications } = careGiversList;
      const { result, totalCount } = getUserByQualifications;
      // setTotalCaregiver(totalCount);
      if (result && result.length) {
        result.forEach((user: any, index: number) => {
          user.availabilityData = [];
          user.attribute = [];
          if (user.caregiver_avabilities && user.caregiver_avabilities.length) {
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
                  moment(d.dateString).isSame(moment(available.date), "day")
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
  }, [careInstitutionList]);

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
      console.log("temptemp", temp);
      setcareinstitutionList(temp);
      // }
    }
  };
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
        <div className="calender-section">
          {caregiversList && caregiversList.length ? (
            <div className="custom-appointment-calendar">
              <CaregiverList
                caregiverData={caregiversList}
                onAddingRow={onAddingRow}
                setcaregiversList={(data: any) => setcaregiversList(data)}
                fetchMoreData={fetchMoreData}
                caregiverLoading={caregiverLoading}
                setDaysData={setDaysData}
                daysData={daysData}
                totalCount={
                  careGiversList && careGiversList.getUserByQualifications
                    ? careGiversList.getUserByQualifications.totalCount
                    : 0
                }
              />
            </div>
          ) : (
            <div className={"mt-5"}>
              <Loader />
            </div>
          )}
          {careinstitutionList && careinstitutionList.length ? (
            <div className="custom-appointment-calendar">
              <CareInstitutionList
                careinstitutionData={careinstitutionList}
                onAddingRow={onAddingRow}
                fetchMoreData={fetchMoreData}
                caregiverLoading={caregiverLoading}
                setDaysData={setDaysData}
                daysData={daysData}
                totalCount={
                  careGiversList && careGiversList.getUserByQualifications
                    ? careGiversList.getUserByQualifications.totalCount
                    : 0
                }
              />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DummyAppointment;
