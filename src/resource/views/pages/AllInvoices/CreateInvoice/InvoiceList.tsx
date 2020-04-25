import React, { FunctionComponent, useState } from "react";
import { UncontrolledTooltip, Table } from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import { IInvoiceList } from "../../../../../interfaces";
import Loader from "../../../containers/Loader/Loader";
import { AppRoutes, PAGE_LIMIT, defaultDateFormat, dbAcceptableFormat } from "../../../../../config";
import { useHistory, useLocation } from "react-router-dom";
import PaginationComponent from "../../../components/Pagination";
import * as qs from "query-string";
import moment from "moment";

const InvoiceList: FunctionComponent<IInvoiceList & any> = (props: IInvoiceList & any) => {
  const { search, pathname } = useLocation();
  const { invoiceListLoading, invoiceList, totalCount, currentPage, selectedAppointment, handleCheckedChange, careGiverHolidays } = props;
  let history = useHistory();

  const onPageChanged = (currentPage: number) => {
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      "?"
    );
    history.push(path);
  };

  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  return (
    <>
      <div className="table-minheight createinvoices-table">
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="sno-col">{languageTranslation("S_NO")}</th>
              <th className="invoiceid-col"> {languageTranslation("ID")}</th>
              <th className="h-col">h</th>
              <th className="text-col"> {languageTranslation("TEXT")}</th>
              <th className="datetime-col">{languageTranslation("BEGIN")}</th>
              <th className="datetime-col">{languageTranslation("THE_END")}</th>
              <th className="datetime-col">
                {languageTranslation("BREAK")} {languageTranslation("BEGIN")}
              </th>
              <th className="datetime-col">
                {languageTranslation("BREAK")} {languageTranslation("END")}
              </th>
              <th className="price-col"> {languageTranslation("PRICE")}</th>
              <th className="price-col">{languageTranslation("NIGHT_PER_HOUR")}</th>
              <th className="price-col">{languageTranslation("TOTAL_NIGHT_CHARGE")}</th>
              <th className="price-col">{languageTranslation("WEEKEND")}</th>
              <th className="price-col">{languageTranslation("WEEKEND")}</th>
              <th className="price-col">{languageTranslation("HOLIDAY")}</th>
              <th className="price-col">{languageTranslation("HOLIDAY")}</th>
              <th className="price-col"> {languageTranslation("KM")}</th>
              <th className="price-col">{languageTranslation("KM_PRICE")}</th>
              <th className="price-col">{languageTranslation("EXPENSES")}</th>
              <th className="price-col">{languageTranslation("TOTAL")}</th>
              <th className="price-col">{languageTranslation("COMMISSION")}</th>
              <th className="price-col">{languageTranslation("TOTAL")}</th>
              <th className={"text-center action-col"}>
                {languageTranslation("TABEL_HEAD_CG_ACTION")}
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceListLoading ? (
              <tr>
                <td className={"table-loader"} colSpan={8}>
                  <Loader />
                </td>
              </tr>
            ) : invoiceList && invoiceList.length ? (
              invoiceList.map((list: any, index: number) => {
                let workBegain: any, workEnd: any
                if (list && list.ca && list.ca.workingHoursFrom) {
                  workBegain = list.ca.workingHoursFrom.split(",")
                  workEnd = list.ca.workingHoursTo.split(",")
                }
                //Combime date and time 
                let initialdate = workBegain && workBegain.length ? workBegain[0] : null;
                let start_time = workBegain && workBegain.length ? workBegain[1] : null;
                let enddate = workEnd && workEnd.length ? workEnd[0] : null;
                let end_time = workEnd && workEnd.length ? workEnd[1] : null;
                console.log(initialdate, 'initialdate', start_time, moment(`${initialdate} ${start_time}`, `${dbAcceptableFormat} HH:mm`).format());

                let datetimeA: any = initialdate ? moment(`${initialdate} ${start_time}`, `${dbAcceptableFormat} HH:mm`).format() : "";
                let datetimeB: any = enddate ? moment(`${enddate} ${end_time}`, `${dbAcceptableFormat} HH:mm`).format() : null;

                // let duration = datetimeB && datetimeA ? moment.duration(datetimeB.diff(datetimeA)) : null;
                // let hours = duration ? duration.asHours() : null;
                let diffDate: any = (new Date(datetimeB).getTime() - new Date(datetimeA).getTime()) / (3600 * 1000)
                let time = list.cr ? list.cr.f || list.cr.s || list.cr.n : ""
                let timeStamp: any = ""
                console.log("time", time);
                if (time === "f" || time === "s" || time === "n") {
                  timeStamp = "08"
                } else {
                  let splitData = time === "f" ? "f" : time === "s" ? "s" : time === "n" ? "n" : ""
                  console.log("splitData", splitData);
                  // let split = time.split()
                  timeStamp = ""
                }
                //Show Weekend day
                const dayData = new Date(list.date).getDay()
                let isWeekendDay: boolean = (dayData === 6) || (dayData === 0) ? true : false
                let hasHoliday: any
                if (careGiverHolidays && careGiverHolidays.length) {
                  hasHoliday = careGiverHolidays.filter((data: any) => data.date === list.date)
                }
                let nightStartTime: any = "22:00", nightEndTime: any = "06:00"
                if (list && list.ca && list.ca.nightAllowance) {
                  if (list.ca.nightAllowance === "From 10 p.m.") {
                    nightStartTime = "22:00"
                    nightEndTime = "06:00"
                  } else if (list.ca.nightAllowance === "From 8 p.m.") {
                    nightStartTime = "20:00"
                    nightEndTime = "04:00"
                  } else if (list.ca.nightAllowance === "From 8:45 p.m.") {
                    nightStartTime = "20:45"
                    nightEndTime = "04:45"
                  } else if (list.ca.nightAllowance === "From 9 p.m.") {
                    nightStartTime = "21:00"
                    nightEndTime = "05:00"
                  }
                }
                let nightST: any = moment("22:00", "H:mm").format("HH:mm"), nightET: any = moment("06:00", "H:mm").format("HH:mm");
                let startTime: any = moment("20:00", "H:mm").format("HH:mm"), endTime: any = moment("03:00", "H:mm").format("HH:mm")

                //Conditions to get time include night shift hours
                let condiA1: any = moment.utc(moment(startTime, "HH").diff(moment(nightST, "HH"))).format("H")
                let condiA2: any = moment.utc(moment(nightET, "HH").diff(moment(startTime, "HH"))).format("H")

                console.log("####################", (12 > condiA1) && (condiA1 > 0), " ?????????????", condiA2);


                if (list && list.ca && list.ca.nightFee) {
                  if (((12 > condiA1) && (condiA1 > 0)) || ((12 > condiA2) && (condiA2 > 0))) {
                    console.log("*********************in this condition");
                    
                  } else if (((nightST - endTime) > 0)) {

                  }
                }
                console.log(">>>>>>>>>>>>>>>>nightStartTime", nightStartTime);
                console.log(">>>>>>>>>>>>>>>>nightEndTime", nightEndTime);
                //Find Total Ammount
                let totalAmount: number = 0
                if (list && list.ca) {
                  let weekendRate: any = list.ca.weekendAllowance ? list.ca.weekendAllowance : 0
                  let holidayRate: any = list.ca.holidayAllowance ? list.ca.holidayAllowance : 0
                  let nightRate: any = list.ca.nightFee ? list.ca.nightFee : 0
                  let fees: any = (list.ca.fee * 100)
                  let transportation: any = (list.ca.distanceInKM ? list.ca.distanceInKM : 0 * list.ca.feePerKM ? list.ca.feePerKM : 0)
                  let hours: any = (list.ca.workingHoursFrom ? parseFloat(diffDate).toFixed(2) : 0)
                  let expenses = (list.ca && list.ca.otherExpenses ? list.ca.otherExpenses : 0)
                  if (isWeekendDay && hasHoliday && hasHoliday.length) {
                    if (weekendRate > holidayRate) {
                      totalAmount = ((((fees + weekendRate) * hours) + transportation + expenses))
                    } else if (holidayRate > weekendRate) {
                      totalAmount = ((((fees + holidayRate) * hours) + transportation + expenses))
                    }
                  } else {
                    totalAmount = (((fees * hours) + transportation + expenses))
                  }
                }
                console.log("++++++++++++++++++++", totalAmount);

                return (
                  <tr className="sno-col" key={index}>
                    <td className="checkbox-th-column text-center">
                      <span className=" checkbox-custom pl-4">
                        <input
                          type="checkbox"
                          id="check"
                          className=""
                          name={"status"}
                          onChange={(e: any) => handleCheckedChange(e, list)}
                        // checked={"true"}
                        />
                        <label className="">{count++}</label>
                      </span>
                    </td>
                    <td className="invoiceid-col"> {list.id}</td>
                    <td className="h-col">{list.ca && list.ca.workingHoursFrom ? parseFloat(diffDate).toFixed(2) : "-"} </td>
                    <td className="text-col">{list.cr && list.cr.division ? list.cr.division.name : "-"}</td>
                    <td className="datetime-col">{list.ca && list.ca.workingHoursFrom ? list.ca.workingHoursFrom : "-"} </td>
                    <td className="datetime-col">{list.ca && list.ca.workingHoursTo ? list.ca.workingHoursTo : "-"}</td>
                    <td className="datetime-col">{list.ca && list.ca.breakTo ? list.ca.breakTo : "-"}</td>
                    <td className="datetime-col">{list.ca && list.ca.breakFrom ? list.ca.breakFrom : "-"}</td>
                    <td className="price-col">{list.ca && list.ca.fee ? <>{list.ca.fee * 100}.00 &euro;</> : "-"}</td>
                    <td className="price-col">{list.ca && list.ca.nightFee ? <>{list.ca.nightFee}.00 &euro;</> : "-"}</td>
                    <td className="price-col">00.00 &euro;</td>
                    <td className="price-col">{list.ca && list.ca.weekendAllowance ? <>{list.ca.weekendAllowance}.00 &euro;</> : "-"}</td>
                    <td className="price-col">{list.ca && list.ca.weekendAllowance && isWeekendDay ? <>{(parseFloat(list.ca.weekendAllowance) * parseFloat(diffDate)).toFixed(2)} &euro;</> : <>00.00 &euro;</>}</td>
                    <td className="price-col">{list.ca && list.ca.holidayAllowance ? <>{list.ca.holidayAllowance}.00 &euro;</> : "-"}</td>
                    <td className="price-col">{list.ca && list.ca.holidayAllowance && hasHoliday && hasHoliday.length ? <>{(parseFloat(list.ca.holidayAllowance) * parseFloat(diffDate)).toFixed(2)} &euro;</> : <>00.00 &euro;</>}</td>
                    <td className="price-col">{list.ca && list.ca.distanceInKM ? list.ca.distanceInKM : "-"} </td>
                    <td className="price-col">{list.ca && list.ca.feePerKM ? <>{list.ca.feePerKM}&euro;</> : "-"} </td>
                    <td className="price-col">{list.ca && list.ca.otherExpenses ? <>{list.ca.otherExpenses} &euro;</> : <>00.00 &euro;</>} </td>
                    <td className="price-col">{list.ca && ((list.ca.distanceInKM && list.ca.feePerKM) || (list.ca.otherExpenses)) ? ((list.ca.distanceInKM ? list.ca.distanceInKM : 0) * (list.ca.feePerKM ? list.ca.feePerKM : 0)) + (list.ca && list.ca.otherExpenses ? list.ca.otherExpenses : 0) : "00"}.00 &euro;</td>
                    <td className="price-col">{list.ca && list.ca.workingHoursFrom ? <>{(4 * parseFloat(diffDate)).toFixed(2)}</> : <>00.00</>} &euro;</td>
                    <td className="price-col">{totalAmount} &euro;</td>
                    <td className="action-col">
                      <div className="action-btn">
                        <span className="btn-icon mr-2" id={`viewcaregiver`}
                          onClick={() =>
                            history.push(
                              AppRoutes.CARE_GIVER_VIEW.replace(
                                ":id",
                                list.ca.userId
                              )
                            )
                          }
                        >
                          <UncontrolledTooltip
                            placement="top"
                            target={`viewcaregiver`}
                          >
                            View Caregiver Profile
                        </UncontrolledTooltip>
                          <i className="fa fa-eye"></i>
                        </span>
                        <span
                          className="btn-icon mr-2"
                          id={`viewcareinstitution`}
                          onClick={() =>
                            history.push(
                              AppRoutes.CARE_INSTITUION_VIEW.replace(
                                ":id",
                                list.cr.userId
                              )
                            )
                          }
                        >
                          <UncontrolledTooltip
                            placement="top"
                            target={`viewcareinstitution`}
                          >
                            View Care Institution Profile
                        </UncontrolledTooltip>
                          <i className="fa fa-eye"></i>
                        </span>
                        <span
                          onClick={() =>
                            history.push({
                              pathname: AppRoutes.APPOINTMENT,
                              state: { caregiver: list.ca.userId, name: list.ca.name, canstitution: list.cr.userId, avabilityId: list.avabilityId }
                            })
                          }
                          className="btn-icon mr-2" id={`appointmentdetails`}>
                          <UncontrolledTooltip
                            placement="top"
                            target={`appointmentdetails`}
                          >
                            Show Appointment Details
                        </UncontrolledTooltip>
                          <i className="fa fa-calendar"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
                  <tr className={"text-center no-hover-row"}>
                    <td colSpan={12} className={"pt-5 pb-5"}>
                      <div className="no-data-section">
                        <div className="no-data-icon">
                          <i className="icon-ban" />
                        </div>
                        <h4 className="mb-1">
                          {languageTranslation("NO_INVOICE_FOR_LIST")}{" "}
                        </h4>

                      </div>
                    </td>
                  </tr>
                )}
          </tbody>
        </Table>
      </div>
      {totalCount ? (
        <PaginationComponent
          totalRecords={totalCount}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      ) : null}
    </>
  );
};

export default InvoiceList;
