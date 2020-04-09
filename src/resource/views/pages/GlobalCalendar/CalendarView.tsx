import React, { FunctionComponent, useEffect, useState } from "react";
import { UncontrolledTooltip, Input, CardBody } from "reactstrap";
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
import { ConfirmBox } from "../../components/ConfirmBox";
import { toast } from "react-toastify";
import right_arrow from "../../../assets/img/rightarrow.svg";
import left_arrow from "../../../assets/img/leftarrow.svg";
const CalendarView: FunctionComponent<ICalendarViewProps> = ({
  isLoading,
  states,
  refresh,
  onEdit
}): JSX.Element => {
  const [startDate, setStartDate] = useState<string>(
    moment()
      .startOf("year")
      .format()
  );
  const [endDate, setEndDate] = useState<string>(
    moment()
      .endOf("year")
      .format()
  );
  const [GET_GLOBAL_HOLIDAYS] = GlobalHolidaysQueries;
  const [_, DELETE_HOLIDAY] = GlobalCalendarMutations;
  const [
    getGlobalHolidays,
    { data: holidays, loading, refetch, called }
  ] = useLazyQuery<any>(GET_GLOBAL_HOLIDAYS, {
    notifyOnNetworkStatusChange: true,
  });
  const [deleteGlobalCalendarHoliday] = useMutation<
    { deleteGlobalCalendarHoliday: any },
    { id: number }
  >(DELETE_HOLIDAY);
  const [holidaysData, setHolidaysData] = useState<IHolidayData[]>([]);
  const [hideWeekeds, setHideWeekeds] = useState<boolean>(false);

  // check if get states are loaded
  useEffect(() => {
    if (!isLoading && states && states.length) {
      getGlobalHolidays({
        variables: {
          applicableStates: states.map((state: IState) => state.id),
          startDate,
          endDate,
          hideWeekends: false
        }
      });
    }
  }, [isLoading, states]);
  useEffect(() => {
    if (refetch) {
      refresh(refetch);
    }
  }, [refetch]);
  // check if get holidays query returned success
  useEffect(() => {
    if (!loading && holidays && holidays.getGlobalHolidays) {
      setHolidaysData(holidays.getGlobalHolidays);
    }
  }, [holidays, loading]);
  //
  const deleteHoliday = async (id: number): Promise<void> => {
    toast.dismiss();
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("HOLIDAY_DELETE_CONFIRMATION")
    });
    if (!value) {
      return;
    }
    await deleteGlobalCalendarHoliday({
      variables: {
        id
      }
    });
    toast.success(
      languageTranslation("DELETED_SUCCESSFULLY", {
        item: languageTranslation("HOLIDAY")
      })
    );
    refetch();
  };
  // handle checkbox changes
  const onWeekendCheckChange = () => {
    refetch({
      hideWeekends: !hideWeekeds
    });
    setHideWeekeds(!hideWeekeds);
  };
  // yearChange
  const yearChange = (years: number) => {
    const newStartDate = moment(startDate)
      .add(years, "year")
      .format();
    const newEndDate = moment(endDate)
      .add(years, "year")
      .format();
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    refetch({
      startDate: newStartDate,
      endDate: newEndDate
    });
  };
  return (
    <>
      <>
        <div className="common-detail-page">
          <div className="common-detail-section">
            <div className="sticky-common-header">
              <div className="common-topheader d-flex  align-items-center px-2 mb-1 appointment-commonheader">
                <div className="header-nav-item" onClick={() => yearChange(-1)}>
                  <span className="header-nav-icon pr-0">
                    <img src={left_arrow} alt="" />
                  </span>
                </div>
                <div className="DayPickerInput">
                  <Input
                    className="form-control"
                    placeholder={"February 2020"}
                    type="input"
                    value={`${moment(startDate).format("YYYY")}`}
                    name="text"
                  />
                </div>
                <div className="header-nav-item" onClick={() => yearChange(1)}>
                  <span className="header-nav-icon pr-0">
                    <img src={right_arrow} alt="" />
                  </span>
                </div>
                &nbsp;&nbsp;
                <span className=" checkbox-custom pl-4">
                  <input
                    type="checkbox"
                    id="check"
                    className=""
                    name={"status"}
                    onChange={onWeekendCheckChange}
                    checked={hideWeekeds}
                  />
                  <label className="" htmlFor="check">
                    {languageTranslation("HIDE_WEEKENDS")}
                  </label>
                </span>
                {/* <Input type="text" readonly className="form-control header-input-wrap ml-3" /> */}
              </div>
            </div>
          </div>
        </div>  
        
      </>
      <CardBody className="position-relative">
    <div
    className={`${!(isLoading || loading || !called) && !holidaysData.length ? "no-data-table-wrap" : ""}`}
    >
      <div className="sticky-table table-responsive">
        <table className={"main-table table table-hover"}>
          <thead className="thead-bg">
            <tr>
              <th className="text-center">
                {languageTranslation("DATE_AND_EVENT")}
              </th>
              {states.map((state: IState, index: number) => (
                <th className="text-center" key={index}>
                  {state.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!(isLoading || loading || !called) && !holidaysData.length ? (
              <tr className="text-center">
                <td colSpan={states.length || 8}
                 className={`table-data-td`}
                >
                 <div className="no-data-avaible">{languageTranslation("NO_HOLIDAY_ADDED")} </div>
                </td>
              </tr>
            ) : (
              holidaysData.map((holiday: IHolidayData) => {
                return (
                  <React.Fragment key={holiday.id}>
                    <tr>
                      <th>
                        <div className="position-relative word-wrap">
                          <div className="holiday-text-wrap one-line-text">
                            {moment(holiday.date).format(defaultDateFormat)}
                            {holiday.note ? ` - ${holiday.note}` : null}
                          </div>
                          <div className="action-btn ">
                            <a
                              href=""
                              onClick={(e: any) => {
                                e.preventDefault();
                                onEdit
                                  ? onEdit({
                                      id: holiday.id,
                                      date: holiday.date,
                                      note: holiday.note,
                                      states: holiday.applicableStates
                                    })
                                  : undefined;
                              }}
                              id={`edit${holiday.id}`}
                            >
                              <UncontrolledTooltip
                                placement="top"
                                target={`edit${holiday.id}`}
                              >
                                {languageTranslation("EDIT")}
                              </UncontrolledTooltip>
                              <i className={"fa fa-edit"} />
                            </a>

                            <a
                              href=""
                              onClick={(e: any) => {
                                e.preventDefault();
                                deleteHoliday(holiday.id);
                              }}
                              id={`delete${holiday.id}`}
                            >
                              <UncontrolledTooltip
                                placement="top"
                                target={`delete${holiday.id}`}
                              >
                                {languageTranslation("DELETE")}
                              </UncontrolledTooltip>
                              <i className={"fa fa-trash"} />
                            </a>
                          </div>
                        </div>
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
{/* 
        {isLoading || loading ? (
          <div className="global-calendar-table-loader">
            <Loader />
          </div>
        ) : null} */}
      </div>
    </div>  
      {isLoading || loading ? (
          <div className="global-calendar-table-loader">
            <Loader />
          </div>
        ) : null}
 </CardBody>
    </>
  );
};

export default CalendarView;
