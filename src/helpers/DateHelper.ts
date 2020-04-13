import { defaultDateFormat } from "./../config/constant";
import { IDateValidatorOptions } from "./../interfaces/DateFunction";
import { IDateResponse } from "../interfaces";
import moment from "moment";
import { languageTranslation } from "./LangauageTranslation";

export const dateValidator = (
  dateString: string,
  options: IDateValidatorOptions = {
    seperator: ".",
    minDate: moment()
      .subtract(100, "years")
      .format(),
    maxDate: moment().format()
  }
): IDateResponse => {
  const date = dateString ? dateString.replace(/\D+/g, "") : "";
  // Parse the date parts to integers
  const parts: string[] = dateString
    ? dateString.split(options.seperator || ".")
    : [];
  const day: number = Number(parts[0]);
  const month: number = Number(parts[1]);
  const year: number = Number(parts[2]);
  if (!dateString) {
    return {
      isValid: false,
      message: languageTranslation("ENTER_DATE")
    };
  }
  if (month > 12 || month === 0) {
    return {
      isValid: false,
      message: languageTranslation("ENTER_VALID_MONTH")
    };
  }
  const maxTimestamp = moment(options.maxDate || "").unix();
  const minTimeStamp = moment(options.minDate || "").unix();
  const currentTimeStamp = moment()
    .set({
      dates: day,
      months: month - 1,
      years: year,
      hours: 0,
      minutes: 0,
      seconds: 0
    })
    .unix();
  if (options.maxDate && currentTimeStamp > maxTimestamp) {
    return {
      isValid: false,
      message: languageTranslation("MIN_DATE_VALIDATION", {
        date: moment(options.maxDate).format(defaultDateFormat)
      })
    };
  }
  if (options.minDate && currentTimeStamp < minTimeStamp) {
    return {
      isValid: false,
      message: languageTranslation("MAX_DATE_VALIDATION", {
        date: moment(options.minDate).format(defaultDateFormat)
      })
    };
  }

  const monthLength: number[] = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];

  if (date !== "") {
    // To check leap year
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
      monthLength[1] = 29;
    return {
      isValid: day > 0 && day <= monthLength[month - 1],
      message: languageTranslation("ENTER_VALID_DATE")
    };
  } else {
    return {
      isValid: true,
      message: "Date is valid"
    };
  }
};

/**
 * get next n years
 */
export const getYears = (n: number = 10): number[] => {
  const years: number[] = [];
  const currentYear: number = moment().get("year");
  for (let i = 0; i < n; i++) {
    years.push(currentYear + i);
  }
  return years;
};


export const dateDiffernceValidator = (dateFrom: any, dateTo:any, dateCheck: any) => {
  let d1:any = dateFrom.split(".");
  let d2:any = dateTo.split(".");
  let c:any = dateCheck.split(".");
  
  let from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
  let to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
  let check = new Date(c[2], parseInt(c[1])-1, c[0]);
  
  console.log(check > from && check < to)
  let res: any = check > from && check < to
  return res;
}