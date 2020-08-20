import React, { FunctionComponent, useState } from "react";
import { UncontrolledTooltip, Table } from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import { IInvoiceList } from "../../../../../interfaces";
import Loader from "../../../containers/Loader/Loader";
import {
  AppRoutes,
  PAGE_LIMIT,
  defaultDateFormat,
} from "../../../../../config";
import { useHistory, useLocation } from "react-router-dom";
import PaginationComponent from "../../../components/Pagination";
import * as qs from "query-string";
import moment from "moment";
import {
  nightCommission,
  holidayCommission,
  weekendCommission,
  nightCommissionTim,
  defaultDateTimeFormatForDashboard,
  dbAcceptableFormat,
} from "../../../../../config/constant";
import {
  getNightMinutes,
  getMinutes,
  convertIntoHours,
  getSundayMinutes,
} from "../../../../../helpers";
const LeasingList: FunctionComponent<IInvoiceList & any> = (
  props: IInvoiceList & any
) => {
  const { search, pathname } = useLocation();
  const {
    invoiceListLoading,
    invoiceList,
    totalCount,
    currentPage,
    selectedAppointment,
    handleCheckedChange,
    careGiverHolidays,
  } = props;
  let history = useHistory();

  const onPageChanged = (currentPage: number) => {
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      "?"
    );
    history.push(path);
  };

  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  // let qualiFilter: any;
  // qualiFilter = invoiceList.filter((item: any) => {
  //   return item &&
  //     item.ca &&
  //     item.ca.user &&
  //     item.ca.user.caregiver &&
  //     item.ca.user.caregiver.attributes
  //     ? item.ca.user.caregiver.attributes.includes(9)
  //     : null;
  // });
  // console.log('qualiFilter', qualiFilter);
  console.log("invoiceList", invoiceList);
  return (
    <>
      <div className="table-minheight createinvoices-table">
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="sno-col text-center">
                {languageTranslation("S_NO")}
              </th>
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
              <th className="price-col">
                {" "}
                {languageTranslation("QUALIFICATION_PER_HOUR")}
              </th>
              <th className="price-col">
                {languageTranslation("MARGIN_PER_HOUR")}
              </th>
              <th className="price-col">{languageTranslation("NIGHT_IN_H")}</th>
              <th className="price-col">
                {languageTranslation("NIGNT_IN")}
                <i className="fa fa-euro pl-1" aria-hidden="true"></i>
              </th>
              <th className="price-col">
                {languageTranslation("SUNDAY_IN_H")}
              </th>
              <th className="price-col">
                {languageTranslation("SUNDAY_IN")}
                <i className="fa fa-euro pl-1" aria-hidden="true"></i>
              </th>
              <th className="price-col">
                {languageTranslation("HOLIDAY_IN_H")}
              </th>
              <th className="price-col">
                {" "}
                {languageTranslation("HOLIDAY_IN")}
                <i className="fa fa-euro pl-1" aria-hidden="true"></i>
              </th>
              <th className="price-col">{languageTranslation("TIMYOC_SUM")}</th>
              <th className="price-col">
                {languageTranslation("CAREGIVER_GROSS")}
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceListLoading ? (
              <tr>
                <td className={"table-loader"} colSpan={22}>
                  <Loader />
                </td>
              </tr>
            ) : invoiceList && invoiceList.length ? (
              invoiceList.map((list: any, index: number) => {
                let workBegain: any,
                  workEnd: any,
                  reqWorkBegain: any,
                  reqWorkEnd: any;
                let reqDate = list.cr.date;
                let startTime = list.cr.startTime;
                let endTime = list.cr.endTime;
                let reqStartDate = moment(reqDate + " " + startTime).format();
                let reqEndDate: any = moment(reqDate + " " + endTime).format();

                var date1 = moment(reqStartDate);
                var date2 = moment(reqEndDate);
                var diff = date2.diff(date1, "minutes");

                if (diff < 0) {
                  reqEndDate = moment(reqEndDate).add("days", 1).format();
                }

                let transportation: number =
                  list.ca && list.ca.feePerKM ? list.ca.feePerKM : 0;
                let expenses: number =
                  list.ca && list.ca.otherExpenses ? list.ca.otherExpenses : 0;

                if (list && list.ca && list.ca.workingHoursFrom) {
                  workBegain = list.ca.workingHoursFrom.split(",");
                  workEnd = list.ca.workingHoursTo.split(",");
                } else {
                  reqWorkBegain = moment(reqStartDate).format(
                    defaultDateFormat
                  );
                  reqWorkEnd = moment(reqEndDate).format(defaultDateFormat);
                }
                //Combime date and time
                let initialdate =
                  workBegain && workBegain.length
                    ? workBegain[0]
                    : reqWorkBegain;
                let start_time =
                  workBegain && workBegain.length
                    ? workBegain[1]
                    : moment(reqStartDate).format("HH:mm");
                let enddate =
                  workEnd && workEnd.length ? workEnd[0] : reqWorkEnd;
                let end_time =
                  workEnd && workEnd.length
                    ? workEnd[1]
                    : moment(reqEndDate).format("HH:mm");
                let datetimeA: any = initialdate
                  ? moment(
                      `${initialdate} ${start_time}`,
                      `${dbAcceptableFormat} HH:mm`
                    ).format()
                  : "";
                let datetimeB: any = enddate
                  ? moment(
                      `${enddate} ${end_time}`,
                      `${dbAcceptableFormat} HH:mm`
                    ).format()
                  : null;
                let diffDate: any;
                if (list.ca.workingHoursFrom) {
                  diffDate =
                    (new Date(datetimeB).getTime() -
                      new Date(datetimeA).getTime()) /
                    (3600 * 1000);
                } else {
                  diffDate =
                    (new Date(reqEndDate).getTime() -
                      new Date(reqStartDate).getTime()) /
                    (3600 * 1000);
                }
                console.log("diffDate", diffDate);

                let time = list.cr ? list.cr.f || list.cr.s || list.cr.n : "";
                let timeStamp: any = "";
                if (time === "f" || time === "s" || time === "n") {
                  timeStamp = "08";
                } else {
                  let splitData =
                    time === "f"
                      ? "f"
                      : time === "s"
                      ? "s"
                      : time === "n"
                      ? "n"
                      : "";
                  // let split = time.split();
                  timeStamp = "";
                }
                console.log("++++++++++++list.ca", list.ca.user.caregiver);
                console.log("++++++++++++list", list);
                console.log("++++++++++++list.cr", list.cr.qualification);

                let qualificationAllowance: any =
                  list.cr &&
                  list.cr.qualification &&
                  list.cr.qualification.qualificationAllowance !== null
                    ? Number(list.cr.qualification.qualificationAllowance)
                    : 12.5;
                let basicAllowance =
                  list.ca.user &&
                  list.ca.user.caregiver &&
                  list.ca.user.caregiver.leasingPricingList !== null
                    ? Number(list.ca.user.caregiver.leasingPricingList)
                    : 12.5;

                let travelAllowance =
                  Number(list.ca.distanceInKM) * Number(list.ca.feePerKM);
                let otherAllowance = Number(list.ca.otherExpenses);

                let salaryPerHour =
                  Number(qualificationAllowance) + Number(basicAllowance);
                let salaryPerHourNight = Number(salaryPerHour * 0.25);
                let salaryPerHourSunday = Number(salaryPerHour * 0.5);
                let salaryPerHourHoliday = Number(salaryPerHour * 1);

                console.log("============salaryPerHourNight================");
                console.log(salaryPerHourNight);
                console.log("==============salaryPerHourSunday==============");
                console.log(salaryPerHourSunday);
                console.log("==============salaryPerHourHoliday==============");
                console.log(salaryPerHourHoliday);
                console.log("=============travelAllowance===============");
                console.log(travelAllowance);
                console.log("=============otherAllowance===============");
                console.log(otherAllowance);
                console.log(
                  "===============qualificationAllowance============="
                );
                console.log(qualificationAllowance);
                console.log("===============basicAllowance=============");
                console.log(basicAllowance);

                let startHour =
                  list && list.ca && list.ca.workingHoursFrom
                    ? list.ca.workingHoursFrom
                    : reqStartDate;
                console.log("startHour", startHour);
                let endHour =
                  list && list.ca && list.ca.workingHoursFrom
                    ? list.ca.workingHoursTo
                    : reqEndDate;
                console.log("endHour", endHour);
                let startHourSunday =
                  list && list.ca && list.ca.nightAllowance
                    ? list.ca.nightAllowance
                    : "22:00";

                let finalStartHourSunday = initialdate + "," + startHourSunday;
                let finalEndHourSunday = initialdate + "," + "6:00";
                let finalMidnightHour = initialdate + "," + "00:00";
                // SUNDAY MINUTES
                let sundayWorkingMinutes: any = getSundayMinutes(
                  startHour,
                  endHour,
                  finalMidnightHour
                );
                let sundayWorkingHours = convertIntoHours(sundayWorkingMinutes);
                console.log(
                  "*******************sundayWorkingMinutes",
                  sundayWorkingMinutes
                );
                console.log(
                  "*******************sundayWorkingHours",
                  sundayWorkingHours
                );

                // NIGHT MINUTES
                let nightWorkingMinutes: any = getNightMinutes(
                  finalStartHourSunday,
                  finalEndHourSunday,
                  startHour,
                  endHour
                );
                let nightWorkingHours: any =
                  nightWorkingMinutes !== NaN
                    ? convertIntoHours(nightWorkingMinutes)
                    : 0;
                console.log("nightWorkingHours", nightWorkingHours);
                console.log("nightWorkingMinutes", nightWorkingMinutes);
                console.log(
                  ">>>>>>>>>>>>>>>>list.ca.nightAllowance",
                  finalStartHourSunday
                );
                console.log(
                  ">>>>>>>>>>>>>>>>finalStartHourSunday",
                  initialdate
                );

                let startBreak = list.ca.breakFrom;
                console.log("startBreak", startBreak);
                let endBreak = list.ca.breakTo;
                console.log("endBreak", endBreak);

                // MAIN MINUTES
                let workingMinutes: any = getMinutes(startHour, endHour);
                let workingHours = convertIntoHours(workingMinutes);

                let totalBreakMinutes: any | number = getMinutes(
                  startBreak,
                  endBreak
                );
                let totalBreakHours = convertIntoHours(totalBreakMinutes);
                let reqTotalBreakMin: any = !isNaN(totalBreakMinutes)
                  ? totalBreakMinutes
                  : 0;
                let totalWorkingMinutes = workingMinutes - reqTotalBreakMin;
                let totalWorkingHours = convertIntoHours(totalWorkingMinutes);

                let feeAllowance = Number(
                  totalWorkingMinutes * (salaryPerHour / 60)
                );
                console.log(
                  "feeAllowance",
                  feeAllowance,
                  "reqTotalBreakMin",
                  reqTotalBreakMin
                );

                let nightAllowance = Number(
                  nightWorkingMinutes * (salaryPerHourNight / 60)
                );
                console.log("nightAllowance", nightAllowance);

                let sundayAllowance = Number(
                  sundayWorkingMinutes * (salaryPerHourSunday / 60)
                );
                console.log("sundayAllowance", sundayAllowance);

                let totalSalary = Number(
                  feeAllowance +
                    nightAllowance +
                    sundayAllowance +
                    travelAllowance +
                    otherAllowance
                );
                let workSalary = Number(
                  feeAllowance + nightAllowance + sundayAllowance
                );
                console.log("totalSalary", totalSalary);

                return (
                  <tr key={index}>
                    <td className="sno-col text-center">
                      <span className=" checkbox-custom pl-4">
                        <input
                          type="checkbox"
                          id="check"
                          className=""
                          name={"status"}
                          onChange={(e: any) => handleCheckedChange(e, list)}
                        />
                        <label className="">{count++}</label>
                      </span>
                    </td>
                    <td className="invoiceid-col"> {list.id}</td>
                    <td className="h-col">{parseFloat(diffDate).toFixed(2)}</td>
                    <td className="text-col">
                      {list && list.cr && list.cr.division
                        ? list.cr.division.name
                        : "-"}
                    </td>
                    <td className="datetime-col">
                      {list.ca && list.ca.workingHoursFrom
                        ? list.ca.workingHoursFrom
                        : moment(reqStartDate).format(
                            defaultDateTimeFormatForDashboard
                          )}{" "}
                    </td>
                    <td className="datetime-col">
                      {list.ca && list.ca.workingHoursTo
                        ? list.ca.workingHoursTo
                        : moment(reqEndDate).format(
                            defaultDateTimeFormatForDashboard
                          )}
                    </td>
                    <td className="datetime-col">
                      {list.ca && list.ca.breakTo ? list.ca.breakTo : "-"}
                    </td>
                    <td className="datetime-col">
                      {list.ca && list.ca.breakFrom ? list.ca.breakFrom : "-"}
                    </td>
                    <td className="price-col">
                      {qualificationAllowance ? qualificationAllowance : 0}
                    </td>
                    <td className="price-col">00.00 &euro;</td>
                    <td className="price-col">{nightWorkingHours}</td>
                    <td className="price-col">
                      {list.ca && list.ca.nightFee ? (
                        <>
                          {parseFloat(list.ca.nightFee).toFixed(2)}
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      ) : (
                        <>
                          {parseFloat("0").toFixed(2)}
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      )}
                    </td>
                    <td className="price-col">{<>{sundayWorkingHours}</>}</td>
                    <td className="price-col">
                      {list.ca && list.ca.weekendAllowance ? (
                        <>
                          {(
                            parseFloat(list.ca.weekendAllowance) *
                            parseFloat(diffDate)
                          ).toFixed(2)}{" "}
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      ) : (
                        <>
                          00.00
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      )}
                    </td>
                    <td className="price-col">
                      {list.ca && list.ca.holidayAllowance ? (
                        <>
                          {list.ca.holidayAllowance}.00
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="price-col">
                      {list.ca && list.ca.holidayAllowance ? (
                        <>
                          {(
                            parseFloat(list.ca.holidayAllowance) *
                            parseFloat(diffDate)
                          ).toFixed(2)}{" "}
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      ) : (
                        <>
                          00.00
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      )}
                    </td>
                    <td className="price-col">{totalSalary}</td>
                    <td className="price-col">{totalWorkingHours}</td>
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

export default LeasingList;
