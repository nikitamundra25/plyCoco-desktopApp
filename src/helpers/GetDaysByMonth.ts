import moment from 'moment';
import 'moment/locale/de';
import {
  appointmentDateFormat,
  appointmentDayFormat,
  appointmentMonthFormat,
  appointmentYearFormat,
  dbAcceptableFormat
} from '../config';
import { IDaysArray, IGetDaysArrayByMonthRes } from '../interfaces';
import { date } from 'yup';

// To set locale in germany
moment.locale('de');

export const getDaysArrayByMonth = (
  month: number = moment().month(),
  year: number = moment().year()
): IGetDaysArrayByMonthRes => {
  let daysInMonth = moment()
    .month(month)
    .year(year)
    .daysInMonth();
  let daysArr: IDaysArray[] = [];
  while (daysInMonth) {
    let current = moment()
      .month(month)
      .year(year)
      .date(daysInMonth);
    daysArr.unshift({
      date: moment(current).format(appointmentDateFormat),
      day: moment(current).format(appointmentDayFormat),
      isoString: moment(current).toISOString(),
      dateString: moment(current).format(dbAcceptableFormat),
      // To check whether the given date is weekend or not
      isWeekend:
        [0, 6].indexOf(new Date(moment(current).format()).getDay()) != -1,
      today: new Date()
    });
    daysInMonth--;
  }
  return {
    daysArr,
    month: moment()
      .month(month)
      .format(appointmentMonthFormat),
    year: moment()
      .year(year)
      .format(appointmentYearFormat)
  };
};
