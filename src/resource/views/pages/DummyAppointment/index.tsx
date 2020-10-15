import { useLazyQuery } from "@apollo/react-hooks";
import React, { FunctionComponent, useEffect, useState } from "react";
import { APPOINTMENT_PAGE_LIMIT, dbAcceptableFormat } from "../../../../config";
import { AppointmentsQueries } from "../../../../graphql/queries";
import moment from "moment";
import { SelectableGroup } from "react-selectable-fast";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import { IGetDaysArrayByMonthRes } from "../../../../interfaces";
import { getDaysArrayByMonth } from "../../../../helpers";
import Cell from "../Appointment/Caregiver/Cell";
import CaregiverList from "./Caregiver/CaregiverList";
import "../Appointment/index.scss";

const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
const DummyAppointment: FunctionComponent = () => {
  const [daysData, setDaysData] = useState<IGetDaysArrayByMonthRes>({
    daysArr: [],
    month: moment().month().toString(),
    year: moment().year().toString(),
  });
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
  useEffect(() => {
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(
      moment().month(),
      moment().year()
    );
    setDaysData(res);
    // Default value is start & end of month
    let gte: string = moment().startOf("month").format(dbAcceptableFormat);
    let lte: string = moment().endOf("month").format(dbAcceptableFormat);
    // get careGivers list
    fetchCaregiverList({
      variables: {
        qualificationId: [],
        userRole: "caregiver",
        negativeAttributeId: [],
        limit: 30,
        page: 1,
        showAppointments: "showWithAppointments", //"showWithAppointments",
        positiveAttributeId: [],
        caregiverId: null,
        gte,
        lte,
      },
    });
  }, []);
  return (
    <div className='calender-section'>
      {caregiverLoading ? (
        "Loading..."
      ) : careGiversList && careGiversList.getUserByQualifications ? (
        <div className='custom-appointment-calendar'>
          <CaregiverList
            caregiverData={careGiversList.getUserByQualifications}
          />
        </div>
      ) : (
        <>adfasdf</>
      )}
    </div>
  );
};

export default DummyAppointment;
