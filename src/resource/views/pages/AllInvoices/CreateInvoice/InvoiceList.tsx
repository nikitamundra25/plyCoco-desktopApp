import React, { FunctionComponent, useState } from 'react';
import { UncontrolledTooltip, Table } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import { IInvoiceList } from '../../../../../interfaces';
import Loader from '../../../containers/Loader/Loader';
import {
  AppRoutes,
  PAGE_LIMIT,
  defaultDateFormat,
  dbAcceptableFormat,
  defaultDateTimeFormatForDashboard,
} from '../../../../../config';
import { useHistory, useLocation } from 'react-router-dom';
import PaginationComponent from '../../../components/Pagination';
import * as qs from 'query-string';
import moment from 'moment';
import {
  getNightMinutes,
  getMinutes,
  convertIntoHours,
  getSundayMinutes,
} from '../../../../../helpers';

const InvoiceList: FunctionComponent<IInvoiceList & any> = (
  props: IInvoiceList & any,
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
      '?',
    );
    history.push(path);
  };

  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  return (
    <>
      <div className='table-minheight createinvoices-table'>
        <Table bordered hover responsive>
          <thead className='thead-bg'>
            <tr>
              <th className='sno-col  text-center'>
                {languageTranslation('S_NO')}
              </th>
              <th className='invoiceid-col'> {languageTranslation('ID')}</th>
              <th className='h-col'>h</th>
              <th className='text-col'> {languageTranslation('TEXT')}</th>
              <th className='datetime-col'>{languageTranslation('BEGIN')}</th>
              <th className='datetime-col'>{languageTranslation('THE_END')}</th>
              <th className='datetime-col'>
                {languageTranslation('BREAK')} {languageTranslation('BEGIN')}
              </th>
              <th className='datetime-col'>
                {languageTranslation('BREAK')} {languageTranslation('END')}
              </th>
              <th className='price-col'> {languageTranslation('PRICE')}</th>
              <th className='price-col'>{languageTranslation('NIGHT_IN_H')}</th>
              <th className='price-col'>
                {languageTranslation('NIGNT_IN')}{' '}
                <i className='fa fa-euro pl-1' aria-hidden='true'></i>
              </th>
              <th className='price-col'>
                {languageTranslation('WEEKEND_IN_H')}
              </th>
              <th className='price-col'>
                {languageTranslation('WEEKEND_IN')}{' '}
                <i className='fa fa-euro pl-1' aria-hidden='true'></i>
              </th>
              <th className='price-col'>
                {languageTranslation('HOLIDAY_IN_H')}
              </th>
              <th className='price-col'>
                {languageTranslation('HOLIDAY_IN')}{' '}
                <i className='fa fa-euro pl-1' aria-hidden='true'></i>
              </th>
              <th className='price-col'> {languageTranslation('KM')}</th>
              <th className='price-col'>{languageTranslation('KM_PRICE')}</th>
              <th className='price-col'>{languageTranslation('EXPENSES')}</th>
              <th className='price-col'>{languageTranslation('TOTAL')}</th>
              <th className='price-col'>{languageTranslation('COMMISSION')}</th>
              <th className='price-col'>{languageTranslation('TOTAL')}</th>
              <th className={'text-center action-col'}>
                {languageTranslation('TABEL_HEAD_CG_ACTION')}
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceListLoading ? (
              <tr>
                <td className={'table-loader'} colSpan={22}>
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
                let reqStartDate = moment(reqDate + ' ' + startTime).format();
                let reqEndDate: any = moment(reqDate + ' ' + endTime).format();

                var date1 = moment(reqStartDate);
                var date2 = moment(reqEndDate);
                var diff = date2.diff(date1, 'minutes');

                if (diff < 0) {
                  reqEndDate = moment(reqEndDate)
                    .add('days', 1)
                    .format();
                }
                if (list && list.ca && list.ca.workingHoursFrom) {
                  workBegain = list.ca.workingHoursFrom.split(',');
                  workEnd = list.ca.workingHoursTo.split(',');
                } else {
                  reqWorkBegain = moment(reqStartDate).format(
                    defaultDateFormat,
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
                    : moment(reqStartDate).format('HH:mm');
                let enddate =
                  workEnd && workEnd.length ? workEnd[0] : reqWorkEnd;
                let end_time =
                  workEnd && workEnd.length
                    ? workEnd[1]
                    : moment(reqEndDate).format('HH:mm');
                console.log(
                  initialdate,
                  'initialdate',
                  start_time,
                  moment(
                    `${initialdate} ${start_time}`,
                    `${dbAcceptableFormat} HH:mm`,
                  ).format(),
                );

                let datetimeA: any = initialdate
                  ? moment(
                      `${initialdate} ${start_time}`,
                      `${dbAcceptableFormat} HH:mm`,
                    ).format()
                  : '';
                let datetimeB: any = enddate
                  ? moment(
                      `${enddate} ${end_time}`,
                      `${dbAcceptableFormat} HH:mm`,
                    ).format()
                  : null;

                // let duration = datetimeB && datetimeA ? moment.duration(datetimeB.diff(datetimeA)) : null;
                // let hours = duration ? duration.asHours() : null;

                let time = list.cr ? list.cr.f || list.cr.s || list.cr.n : '';
                let timeStamp: any = '';
                console.log('time', time);
                if (time === 'f' || time === 's' || time === 'n') {
                  timeStamp = '08';
                } else {
                  let splitData =
                    time === 'f'
                      ? 'f'
                      : time === 's'
                      ? 's'
                      : time === 'n'
                      ? 'n'
                      : '';
                  console.log('splitData', splitData);
                  // let split = time.split()
                  timeStamp = '';
                }
                //Show Weekend day
                const dayData = new Date(list.date).getDay();
                let isWeekendDay: boolean = dayData === 0 ? true : false;
                let hasHoliday: any;
                if (careGiverHolidays && careGiverHolidays.length) {
                  hasHoliday = careGiverHolidays.filter(
                    (data: any) => data.date === list.date,
                  );
                }

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
                let startHourSunday =
                  list && list.ca && list.ca.nightAllowance
                    ? list.ca.nightAllowance
                    : '22:00';
                let finalStartHourSunday = initialdate + ',' + startHourSunday;
                let finalEndHourSunday = initialdate + ',' + '6:00';
                let finalMidnightHour = initialdate + ',' + '00:00';
                let startHour =
                  list && list.ca && list.ca.workingHoursFrom
                    ? list.ca.workingHoursFrom
                    : reqStartDate;
                console.log('startHour', startHour);
                let endHour =
                  list && list.ca && list.ca.workingHoursFrom
                    ? list.ca.workingHoursTo
                    : reqEndDate;
                console.log('endHour', endHour);

                let startBreak =
                  list && list.ca && list.ca.breakFrom ? list.ca.breakFrom : '';
                console.log('startBreak', startBreak);
                let endBreak =
                  list && list.ca && list.ca.breakTo ? list.ca.breakTo : '';
                console.log('endBreak', endBreak);

                let workingMinutes: any = startHour
                  ? getMinutes(startHour, endHour)
                  : 0.0;
                let workingHours = convertIntoHours(workingMinutes);

                let totalBreakMinutes: any =
                  startBreak && endBreak ? getMinutes(startBreak, endBreak) : 0;
                let totalBreakHours = convertIntoHours(totalBreakMinutes);

                let totalWorkingMinutes = workingMinutes - totalBreakMinutes;
                let totalWorkingHours = convertIntoHours(totalWorkingMinutes);

                // NIGHT MINUTES
                let nightWorkingMinutes: any = getNightMinutes(
                  finalStartHourSunday,
                  finalEndHourSunday,
                  startHour,
                  endHour,
                );
                let nightWorkingHours: any =
                  nightWorkingMinutes !== NaN
                    ? convertIntoHours(nightWorkingMinutes)
                    : 0;
                console.log('nightWorkingHours', nightWorkingHours);
                console.log('nightWorkingMinutes', nightWorkingMinutes);
                console.log(
                  '>>>>>>>>>>>>>>>>list.ca.nightAllowance',
                  finalStartHourSunday,
                );
                console.log(
                  '>>>>>>>>>>>>>>>>finalStartHourSunday',
                  initialdate,
                );
                const nightHoursToAdd: any = nightWorkingMinutes / 60;
                let nightAllottedRates: any =
                  parseFloat(list.ca.nightFee) * parseFloat(nightHoursToAdd);
                console.log(
                  '++++++++++++++++++++nightAllottedRates',
                  nightAllottedRates,
                  'pppppppppppp',
                  parseFloat(list.ca.nightFee),
                );

                // SUNDAY MINUTES
                let sundayWorkingMinutes: any = getSundayMinutes(
                  startHour,
                  endHour,
                  finalMidnightHour,
                );
                let sundayWorkingHours = convertIntoHours(sundayWorkingMinutes);
                console.log(
                  '*******************sundayWorkingMinutes',
                  sundayWorkingMinutes,
                );
                console.log(
                  '*******************sundayWorkingHours',
                  sundayWorkingHours,
                );

                //Find Total Ammount
                let totalAmount: number | any = 0;
                if (list && list.ca) {
                  let weekendRate: any = list.ca.weekendAllowance
                    ? list.ca.weekendAllowance
                    : 0;
                  let holidayRate: any = list.ca.holidayAllowance
                    ? list.ca.holidayAllowance
                    : 0;
                  let nightRate: any = list.ca.nightFee ? list.ca.nightFee : 0;
                  let fees: any = list.ca.fee * 100;
                  let transportation: any = list.ca.distanceInKM
                    ? list.ca.distanceInKM
                    : 0 * list.ca.feePerKM
                    ? list.ca.feePerKM
                    : 0;
                  let hours: any = parseFloat(diffDate).toFixed(2);
                  let expenses =
                    list.ca && list.ca.otherExpenses
                      ? list.ca.otherExpenses
                      : 0;
                  if (sundayWorkingMinutes !== 0) {
                    console.log('================In this sunday');

                    totalAmount =
                      fees * hours +
                      weekendRate * (sundayWorkingMinutes / 60) +
                      transportation +
                      nightAllottedRates +
                      expenses;
                  } else {
                    totalAmount =
                      fees * hours +
                      transportation +
                      expenses +
                      nightAllottedRates;
                  }
                }
                console.log('++++++++++++++++++++', totalAmount);

                return (
                  <tr key={index}>
                    <td className='sno-col text-center'>
                      <span className=' checkbox-custom pl-4'>
                        <input
                          type='checkbox'
                          id='check'
                          className=''
                          name={'status'}
                          onChange={(e: any) => handleCheckedChange(e, list)}
                          // checked={"true"}
                        />
                        <label className=''>{count++}</label>
                      </span>
                    </td>
                    <td className='invoiceid-col'> {list.id}</td>
                    <td className='h-col'>
                      {/* {parseFloat(diffDate).toFixed(2)}{" "} */}
                      {list.workingHours}{' '}
                    </td>
                    <td className='text-col'>
                      {list.cr && list.cr.division
                        ? list.cr.division.name
                        : '-'}
                    </td>
                    <td className='datetime-col'>
                      {list.ca && list.ca.workingHoursFrom
                        ? moment(
                            list.ca.workingHoursFrom,
                            `${dbAcceptableFormat},hh:mm`,
                          ).format(defaultDateTimeFormatForDashboard)
                        : moment(reqStartDate).format(
                            defaultDateTimeFormatForDashboard,
                          )}{' '}
                    </td>
                    <td className='datetime-col'>
                      {list.ca && list.ca.workingHoursTo
                        ? moment(
                            list.ca.workingHoursTo,
                            `${dbAcceptableFormat},hh:mm`,
                          ).format(defaultDateTimeFormatForDashboard)
                        : moment(reqEndDate).format(
                            defaultDateTimeFormatForDashboard,
                          )}
                    </td>
                    <td className='datetime-col'>
                      {list.ca && list.ca.breakTo
                        ? moment(
                            list.ca.breakTo,
                            `${dbAcceptableFormat},hh:mm`,
                          ).format(defaultDateTimeFormatForDashboard)
                        : '-'}
                    </td>
                    <td className='datetime-col'>
                      {list.ca && list.ca.breakFrom
                        ? moment(
                            list.ca.breakFrom,
                            `${dbAcceptableFormat},hh:mm`,
                          ).format(defaultDateTimeFormatForDashboard)
                        : '-'}
                    </td>
                    <td className='price-col'>
                      {list.ca && list.ca.fee ? (
                        <>
                          {list.ca.fee}.00
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      ) : (
                        <>
                          {parseFloat('0').toFixed(2)}
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      )}
                    </td>
                    <td className='price-col'>{list.nightWorkingHours}</td>
                    <td className='price-col'>
                      {list.ca && list.ca.nightFee ? (
                        <>
                          {parseFloat(list.ca.nightFee).toFixed(2)}
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      ) : (
                        <>
                          {parseFloat('0').toFixed(2)}
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      )}
                    </td>
                    <td className='price-col'>{list.sundayWorkingHours}</td>
                    {/* <td className='price-col'>
                      {!isNaN(nightAllottedRates)
                        ? parseFloat(nightAllottedRates).toFixed(2)
                        : parseFloat('0').toFixed(2)}
                      <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                    </td> */}
                    <td className='price-col'>
                      {list.ca && list.ca.weekendAllowance ? (
                        <>
                          {list.ca.weekendAllowance}.00
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      ) : (
                        <>
                          {parseFloat('0').toFixed(2)}
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      )}
                    </td>
                    {/* <td className='price-col'>
                      {list.ca && list.ca.weekendAllowance && isWeekendDay ? (
                        <>
                          {(
                            parseFloat(list.ca.weekendAllowance) *
                            parseFloat(diffDate)
                          ).toFixed(2)}
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      ) : (
                        <>
                          00.00
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      )}
                    </td> */}
                    <td className='price-col'>{list.holidayWorkingHours}</td>
                    <td className='price-col'>
                      {list.ca && list.ca.holidayAllowance ? (
                        <>
                          {list.ca.holidayAllowance}.00
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      ) : (
                        <>
                          {parseFloat('0').toFixed(2)}
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      )}
                    </td>
                    {/* <td className='price-col'>
                      {list.ca &&
                      list.ca.holidayAllowance &&
                      hasHoliday &&
                      hasHoliday.length ? (
                        <>
                          {(
                            parseFloat(list.ca.holidayAllowance) *
                            parseFloat(diffDate)
                          ).toFixed(2)}
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      ) : (
                        <>
                          00.00
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      )}
                    </td>
                     */}
                    <td className='price-col'>
                      {list.ca && list.ca.distanceInKM ? (
                        list.ca.distanceInKM
                      ) : (
                        <>{parseFloat('0').toFixed(2)}</>
                      )}{' '}
                    </td>
                    <td className='price-col'>
                      {list.ca && list.ca.feePerKM ? (
                        <>
                          {list.ca.feePerKM}
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      ) : (
                        '-'
                      )}{' '}
                    </td>
                    <td className='price-col'>
                      {list.ca && list.ca.otherExpenses ? (
                        <>
                          {list.ca.otherExpenses}
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      ) : (
                        <>
                          00.00
                          <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                        </>
                      )}{' '}
                    </td>
                    <td className='price-col'>
                      {list.ca &&
                      ((list.ca.distanceInKM && list.ca.feePerKM) ||
                        list.ca.otherExpenses)
                        ? (list.ca.distanceInKM ? list.ca.distanceInKM : 0) *
                            (list.ca.feePerKM ? list.ca.feePerKM : 0) +
                          (list.ca && list.ca.otherExpenses
                            ? list.ca.otherExpenses
                            : 0)
                        : '00'}
                      .00<i className='fa fa-euro pl-1' aria-hidden='true'></i>
                    </td>
                    <td className='price-col'>
                      {list.commission ? (
                        <>{parseFloat(list.commission).toFixed(2)}</>
                      ) : (
                        // <>{(4 * parseFloat(diffDate)).toFixed(2)}</>
                        <>00.00</>
                      )}
                      <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                    </td>
                    <td className='price-col'>
                      {list.amount ? (
                        <>{parseFloat(list.amount).toFixed(2)}</>
                      ) : (
                        <>00.00</>
                      )}
                      {/* !isNaN(totalAmount)
                        ? parseFloat(totalAmount).toFixed(2)
                        : parseFloat('0').toFixed(2) */}
                      <i className='fa fa-euro pl-1' aria-hidden='true'></i>
                    </td>
                    <td className='action-col'>
                      <div className='action-btn'>
                        <span
                          className='btn-icon mr-2'
                          id={`viewcaregiver`}
                          onClick={() =>
                            history.push(
                              AppRoutes.CARE_GIVER_VIEW.replace(
                                ':id',
                                list.ca.userId,
                              ),
                            )
                          }
                        >
                          <UncontrolledTooltip
                            placement='top'
                            target={`viewcaregiver`}
                          >
                            View Caregiver Profile
                          </UncontrolledTooltip>
                          <i className='fa fa-eye'></i>
                        </span>
                        <span
                          className='btn-icon mr-2'
                          id={`viewcareinstitution`}
                          onClick={() =>
                            history.push(
                              AppRoutes.CARE_INSTITUION_VIEW.replace(
                                ':id',
                                list.cr.userId,
                              ),
                            )
                          }
                        >
                          <UncontrolledTooltip
                            placement='top'
                            target={`viewcareinstitution`}
                          >
                            View Care Institution Profile
                          </UncontrolledTooltip>
                          <i className='fa fa-eye'></i>
                        </span>
                        <span
                          onClick={() =>
                            history.push({
                              pathname: AppRoutes.APPOINTMENT,
                              state: {
                                caregiver: list.ca.userId,
                                name: list.ca.name,
                                canstitution: list.cr.userId,
                                avabilityId: list.avabilityId,
                              },
                            })
                          }
                          className='btn-icon mr-2'
                          id={`appointmentdetails`}
                        >
                          <UncontrolledTooltip
                            placement='top'
                            target={`appointmentdetails`}
                          >
                            Show Appointment Details
                          </UncontrolledTooltip>
                          <i className='fa fa-calendar'></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className={'text-center no-hover-row'}>
                <td colSpan={12} className={'pt-5 pb-5'}>
                  <div className='no-data-section'>
                    <div className='no-data-icon'>
                      <i className='icon-ban' />
                    </div>
                    <h4 className='mb-1'>
                      {languageTranslation('NO_INVOICE_FOR_LIST')}{' '}
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
