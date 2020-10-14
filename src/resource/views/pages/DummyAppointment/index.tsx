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
        limit: 1000,
        page: 1,
        showAppointments: null, //"showWithAppointments",
        positiveAttributeId: [],
        caregiverId: null,
        gte,
        lte,
      },
    });
  }, []);
  return (
    <>
      {caregiverLoading ? (
        "Loading..."
      ) : careGiversList && careGiversList.getUserByQualifications ? (
        <table>
          <thead>
            <tr>
              {daysData.daysArr.map(
                ({ date, day, isoString, isWeekend }: any, index: number) => {
                  return (
                    <th key={index}>
                      <div className='custom-appointment-col calender-col text-center'>
                        <div className='custom-appointment-calendar-date'>
                          {" "}
                          {date}
                        </div>
                        <div className='custom-appointment-calendar-day'>
                          {day}
                        </div>
                      </div>
                    </th>
                  );
                }
              )}
            </tr>
          </thead>
          <tbody>
            <SelectableGroup
              allowClickWithoutSelected
              className='custom-row-selector'
              clickClassName='tick'
              resetOnStart={true}
              allowCtrlClick={false}
              onSelectionFinish={(cells: any) => {
                console.log(cells);
              }}
              ignoreList={[
                ".name-col",
                ".h-col",
                ".s-col",
                ".u-col",
                ".v-col",
              ]}>
              <InfiniteLoader
                isRowLoaded={({ index }) =>
                  !!careGiversList.getUserByQualifications.result[index]
                }
                rowCount={careGiversList.getUserByQualifications.result.length}
                loadMoreRows={({ startIndex, stopIndex }) => {
                  console.log(startIndex, stopIndex);
                  return new Promise((resolve) => resolve());
                }}>
                {({ onRowsRendered, registerChild }) => (
                  <AutoSizer className='autosizer-div'>
                    {({ width }) => (
                      <List
                        ref={registerChild}
                        height={500}
                        onRowsRendered={onRowsRendered}
                        rowCount={
                          careGiversList.getUserByQualifications.result.length
                        }
                        width={620}
                        rowHeight={20}
                        rowRenderer={({ index, key, style }) => {
                          {
                            return (
                              <tr>
                                {daysData.daysArr.map((key: any, i: number) => {
                                  let cellIndex = `${index}-${i}`;
                                  return (
                                    <React.Fragment key={cellIndex}>
                                      <td>{key.dateString}</td>
                                    </React.Fragment>
                                  );
                                })}
                              </tr>
                            );
                          }
                        }}
                      />
                    )}
                  </AutoSizer>
                )}
              </InfiniteLoader>
            </SelectableGroup>
          </tbody>
        </table>
      ) : (
        <>adfasdf</>
      )}
    </>
  );
};

export default DummyAppointment;
