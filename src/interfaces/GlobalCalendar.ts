import { FormikProps } from "formik";
import { IState } from "./Country";

// props for CalendarView
export interface ICalendarViewProps {
  isLoading: boolean;
  states: IState[];
}
// props for add holiday
export interface IAddHolidayProps {
  isOpen: boolean;
  handleClose?: () => void;
  states: IState[];
}
//
export interface IAddHolidaysFormValues {
  date: Date | string;
  note?: string;
  states?: number[];
}
export interface IAddHolidayFormikProps {
  inputs: IAddHolidaysFormValues[];
}
export interface IAddHolidaysFormProps {
  states: IState[];
  fieldsInfo: FormikProps<IAddHolidayFormikProps>;
  addNewHoliday: (values: IAddHolidayFormikProps) => void;
  removeHoliday: (values: IAddHolidayFormikProps, index: number) => void;
}
