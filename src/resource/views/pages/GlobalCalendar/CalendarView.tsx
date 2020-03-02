import React, { FunctionComponent, useEffect, useState } from "react";
import Loader from "../../containers/Loader/Loader";
import { languageTranslation } from "../../../../helpers";
import {
  IState,
  ICalendarViewProps,
  IHolidayData
} from "../../../../interfaces";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { GlobalHolidaysQueries } from "../../../../graphql/queries";
import moment from "moment";
import { defaultDateFormat } from "../../../../config";
import classnames from "classnames";
import { GlobalCalendarMutations } from "../../../../graphql/Mutations";
const CalendarView: FunctionComponent<ICalendarViewProps> = ({
  isLoading,
  states,
  refresh
}): JSX.Element => {
  const [GET_GLOBAL_HOLIDAYS] = GlobalHolidaysQueries;
  const [DELETE_HOLIDAY] = GlobalCalendarMutations;
  const [
    getGlobalHolidays,
    { data: holidays, loading, refetch }
  ] = useLazyQuery<any>(GET_GLOBAL_HOLIDAYS);
  const [
    deleteGlobalCalendarHoliday,
    { data: deletedRecordData, loading: isDeleting }
  ] = useMutation<{ deleteGlobalCalendarHoliday: any }, { id: number }>(
    DELETE_HOLIDAY
  );
  const [holidaysData, setHolidaysData] = useState<IHolidayData[]>([]);
  // check if get states are loaded
  useEffect(() => {
    if (!isLoading && states) {
      getGlobalHolidays();
      refresh(refetch);
    }
  }, [isLoading, states]);
  // check if get holidays query returned success
  useEffect(() => {
    if (!loading && holidays && holidays.getGlobalHolidays) {
      setHolidaysData(holidays.getGlobalHolidays);
    }
  }, [holidays, loading]);
  //
  const deleteHoliday = async (id: number): Promise<void> => {
    console.log(id);
    await deleteGlobalCalendarHoliday({
      variables: {
        id
      }
    });
    refetch();
  };
  return (
    <div className="sticky-table table-responsive">
      <table className={"main-table table table-hover"}>
        <thead className="thead-bg">
          <tr>
            <th className="text-center">
              {languageTranslation("DATE_AND_EVENT")}
            </th>
            {isLoading ? (
              <th colSpan={8}>
                <Loader />
              </th>
            ) : (
              states.map((state: IState, index: number) => (
                <th className="text-center" key={index}>
                  {state.name}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading || loading ? (
            <tr className="text-center">
              <td colSpan={8}>
                <Loader />
              </td>
            </tr>
          ) : !holidaysData.length ? (
            <tr className="text-center">
              <td colSpan={8}>No data</td>
            </tr>
          ) : (
            holidaysData.map((holiday: IHolidayData) => {
              return (
                <React.Fragment key={holiday.id}>
                  <tr>
                    <th>
                      {moment(holiday.date).format(defaultDateFormat)}
                      {holiday.note ? ` - ${holiday.note}` : null}
                      &nbsp;&nbsp;&nbsp;
                      <a
                        href=""
                        onClick={(e: any) => {
                          e.preventDefault();
                          deleteHoliday(holiday.id);
                        }}
                        className={"text-right"}
                      >
                        <i className={"fa fa-trash"} />
                      </a>
                    </th>
                    {states.map((state: IState, index: number) => (
                      <td
                        className={classnames({
                          "text-center": true,
                          "leave-applicable":
                            holiday.states &&
                            holiday.states.findIndex(
                              (d: IState) => d.id === state.id
                            ) > -1
                        })}
                        key={index}
                      ></td>
                    ))}
                  </tr>
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarView;
