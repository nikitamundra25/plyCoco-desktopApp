declare module "@coreui/coreui";
declare module "@coreui/react";
declare module "@coreui/coreui-plugin-chartjs-custom-tooltips";
declare module "@coreui/icons";
declare module "@flag-icon-css";
declare module "@font-awesome";
declare module "@simple-line-icons";
declare module "js-object-validation";
declare module "reactstrap";
declare module "react-datepicker";
declare module "react-apollo";
declare module "draftjs-to-html";
declare module "html-to-draftjs";
declare module "react-multiselect-checkboxes";

declare interface String {
  truncate(n: number, decorator?: string): string;
  isNullOrWhitespace(): boolean;
  isValidEmail(): boolean;
  trimAllSpace(): string;
}
// declare module 'react-day-picker/DayPickerInput';
function createRef<T>(): RefObject<T>;
interface RefObject<T> {
  // immutable
  readonly current: T | null;
}

declare interface Array {
  findInfo: (
    keyToSearch: string,
    searchBy?: string[] | number[],
    keyToGet?: string
  ) => any[];
}
