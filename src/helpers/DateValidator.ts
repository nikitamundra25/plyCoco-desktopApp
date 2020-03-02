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
    maxDate: moment().format(),
    label: ""
  }
): IDateResponse => {
  const date = dateString ? dateString.replace(/\D+/g, "") : "";
  // Parse the date parts to integers
  const parts: string[] = dateString ? dateString.split(".") : [];
  const day: number = Number(parts[0]);
  const month: number = Number(parts[1]);
  const year: number = Number(parts[2]);
  if (month > 12 || month === 0) {
    return {
      isValid: false,
      message: "Please enter a valid month"
    };
  }
  const maxTimestamp = moment(options.maxDate || "").unix();
  const minTimeStamp = moment(options.minDate || "").unix();
  if (options.maxDate && moment(new Date(dateString)).unix() > maxTimestamp) {
    return {
      isValid: false,
      message: languageTranslation("MIN_DATE_VALIDATION", {
        date: moment(options.maxDate).format(defaultDateFormat)
      })
    };
  }
  if (options.minDate && moment(new Date(dateString)).unix() < minTimeStamp) {
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
      message: "Please enter a valid date"
    };
  } else {
    return {
      isValid: true,
      message: "Date is valid"
    };
  }
};
