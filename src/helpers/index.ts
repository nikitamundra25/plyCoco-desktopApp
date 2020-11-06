export * from "./Logger";
export * from "./LangauageTranslation";
export * from "./DateHelper";
export * from "./StripHtml";
export * from "./HtmlToDraftConverter";
export * from "./FormatFIleSize";
export * from "./TimeValidator";
export * from "./ErrorFormatter";
export * from "./GermanNumberFormat";
export * from "./GetDaysByMonth";
export * from "./TimeDifference";
export * from "./ConverturlIntoBase64";
export * from "./NightHoursMinutes";
/**
 *
 * @param func
 * @param wait
 * @param immediate
 */
export const debounce = (func: any, wait: any, immediate?: boolean) => {
  let timeout: any;

  return function executedFunction(this: any) {
    const context = this,
      args = arguments,
      later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      },
      callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};
