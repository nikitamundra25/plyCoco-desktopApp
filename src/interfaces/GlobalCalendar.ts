import { FormikProps } from "formik";
import { IState } from "./Country";

// props for CalendarView
export interface ICalendarViewProps {
  isLoading: boolean;
  states: IState[];
  refresh: (refetch: (variables?: any) => void) => void;
  onEdit?: (info: IAddHolidaysFormValues) => void;
}

//
export interface IAddHolidaysFormValues {
  id?: number;
  date: string;
  note?: string;
  states?: number[];
}

// props for add holiday
export interface IAddHolidayProps {
  isOpen: boolean;
  handleClose?: () => void;
  states: IState[];
  refresh: () => void;
  editInfo?: IAddHolidaysFormValues;
}
export interface IAddHolidayFormikProps {
  inputs: IAddHolidaysFormValues[];
}
export interface IAddHolidaysFormProps {
  states: IState[];
  fieldsInfo: FormikProps<IAddHolidayFormikProps>;
  addNewHoliday: (values: IAddHolidayFormikProps) => void;
  removeHoliday: (values: IAddHolidayFormikProps, index: number) => void;
  isEditMode?: boolean;
}

export interface IHolidayData {
  id: number;
  date: string;
  note?: string;
  states?: IState[];
  applicableStates?: number[];
}
