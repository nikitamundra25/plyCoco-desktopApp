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
} from "../../../../../config/constant";
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
  let qualiFilter: any;
  qualiFilter = invoiceList.filter((item: any) => {
    return item &&
      item.ca &&
      item.ca.user &&
      item.ca.user.caregiver &&
      item.ca.user.caregiver.attributes
      ? item.ca.user.caregiver.attributes.includes(9)
      : null;
  });
  console.log("qualiFilter", qualiFilter);
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
            ) : qualiFilter && qualiFilter.length ? (
              qualiFilter.map((list: any, index: number) => {
                let transportation: number =
                  list.ca && list.ca.feePerKM ? list.ca.feePerKM : 0;
                let expenses: number =
                  list.ca && list.ca.otherExpenses ? list.ca.otherExpenses : 0;

                let workBegain: any, workEnd: any;
                if (list && list.ca && list.ca.workingHoursFrom) {
                  workBegain = list.ca.workingHoursFrom.split(",");
                  workEnd = list.ca.workingHoursTo.split(",");
                }
                //Combime date and time
                let initialdate =
                  workBegain && workBegain.length ? workBegain[0] : null;
                let start_time =
                  workBegain && workBegain.length ? workBegain[1] : null;
                let enddate = workEnd && workEnd.length ? workEnd[0] : null;
                let end_time = workEnd && workEnd.length ? workEnd[1] : null;
                let datetimeA: any = initialdate
                  ? moment(
                      `${initialdate} ${start_time}`,
                      `${defaultDateFormat} HH:mm`
                    ).format()
                  : "";
                let datetimeB: any = enddate
                  ? moment(
                      `${enddate} ${end_time}`,
                      `${defaultDateFormat} HH:mm`
                    ).format()
                  : null;
                let diffDate: any =
                  (new Date(datetimeB).getTime() -
                    new Date(datetimeA).getTime()) /
                  (3600 * 1000);
                let time = list.cr ? list.cr.f || list.cr.s || list.cr.n : "";
                let timeStamp: any = "";
                console.log("time", time);
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
                  timeStamp = "";
                }
                //Show Weekend day
                let isWeekendDay: boolean = false;
                const dayData = new Date(list.date).getDay();
                isWeekendDay = dayData === 6 || dayData === 0 ? true : false;
                // show holiday
                let hasHoliday: any;
                if (careGiverHolidays && careGiverHolidays.length) {
                  hasHoliday = careGiverHolidays.filter(
                    (data: any) => data.date === list.date
                  );
                }
                // show night
                let isNight: boolean = false;
                // const dayData = new Date(list.date).getDay();
                isNight = dayData === 6 || dayData === 0 ? true : false;

                //Find Total Ammount
                let totalAmount: number = 0;
                if (list && list.ca) {
                  totalAmount = list.ca.fee * 100;
                }
                {
                  /* Caregiver Gross - Invoice (Timyocy to Caregiver)
Brutto = BS + QA
Leasing - ((Brutto + (Holiday = Brutto * 1) + (Sunday = Brutto * 0.5) + (Night = Brutto * 0.2)) * Hours ) + 2 * transprotation + expenses) * days) */
                }
                let days: number = 1,
                  hours: number = 1,
                  NP: number = 1,
                  Brutto: number = 1;
                // find caregiver gross
                let holidayPrice: number = 0,
                  weekendPrice: number = 0,
                  nightPrice: number = 0;
                if (hasHoliday && hasHoliday.length) {
                  holidayPrice += Brutto * holidayCommission;
                }
                if (isWeekendDay) {
                  weekendPrice += Brutto * weekendCommission;
                }
                if (isNight) {
                  nightPrice += Brutto * nightCommission;
                }

                // find timyocy sum
                let holidayPriceTim: number = 0,
                  weekendPriceTim: number = 0,
                  nightPriceTim: number = 0;
                if (hasHoliday && hasHoliday.length) {
                  holidayPriceTim += NP * holidayCommission;
                }
                if (isWeekendDay) {
                  weekendPriceTim += NP * weekendCommission;
                }
                if (isNight) {
                  nightPriceTim += NP * nightCommissionTim;
                }

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
                          // checked={"true"}
                        />
                        <label className="">{count++}</label>
                      </span>
                    </td>
                    <td className="invoiceid-col"> {list.id}</td>
                    <td className="h-col">{timeStamp} </td>
                    <td className="text-col">
                      {list && list.cr && list.cr.division
                        ? list.cr.division.name
                        : "-"}
                    </td>
                    <td className="datetime-col">
                      {list.ca && list.ca.workingHoursFrom
                        ? list.ca.workingHoursFrom
                        : "-"}{" "}
                    </td>
                    <td className="datetime-col">
                      {list.ca && list.ca.workingHoursTo
                        ? list.ca.workingHoursTo
                        : "-"}
                    </td>
                    <td className="datetime-col">
                      {list.ca && list.ca.breakTo ? list.ca.breakTo : "-"}
                    </td>
                    <td className="datetime-col">
                      {list.ca && list.ca.breakFrom ? list.ca.breakFrom : "-"}
                    </td>
                    <td className="price-col">
                      qualification price
                      {/* {list.ca && list.ca.nightFee ? list.ca.nightFee : '-'}{' '} */}
                    </td>
                    <td className="price-col">
                      00.00
                      <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                    </td>
                    <td className="price-col">
                      {list.ca && list.ca.nightFee ? (
                        <>
                          {list.ca.nightFee}.00
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="price-col">
                      {list.ca && list.ca.nightFee ? (
                        <>
                          {list.ca.nightFee}.00
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="price-col">
                      {list.ca && list.ca.weekendAllowance ? (
                        <>
                          {list.ca.weekendAllowance}.00
                          <i className="fa fa-euro pl-1" aria-hidden="true"></i>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="price-col">
                      {list.ca && list.ca.weekendAllowance && isWeekendDay ? (
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
                      {list.ca &&
                      list.ca.holidayAllowance &&
                      hasHoliday &&
                      hasHoliday.length ? (
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
                    <td className="price-col">
                      {(NP +
                        holidayPriceTim +
                        weekendPriceTim +
                        nightPriceTim) *
                        hours +
                        2 * (transportation + expenses) * days}
                    </td>
                    <td className="price-col">
                      {(Brutto + holidayPrice + weekendPrice + nightPrice) *
                        hours +
                        2 * (transportation + expenses) * days}
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
      {
        /* qualiFilter && qualiFilter.length > 10 */ totalCount ? (
          <PaginationComponent
            totalRecords={totalCount}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        ) : null
      }
    </>
  );
};

export default LeasingList;
