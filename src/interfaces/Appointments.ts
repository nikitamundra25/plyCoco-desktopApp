import { IReactSelectInterface } from './Constant';

export interface IDaysArray {
  date: string;
  day: string;
  isoString: string;
  isWeekend: boolean;
}

export interface IGetDaysArrayByMonthRes {
  daysArr: IDaysArray[];
  month: string;
  year: string;
}

export interface IAppointmentNav {
  handlePrevious: () => void;
  handleQualification: (value: any) => void;
  handleNext: () => void;
  handleDayClick: (selectedDay: Date) => void;
  daysData: IGetDaysArrayByMonthRes | null;
  qualificationList: IReactSelectInterface[] | undefined;
  careInstitutionList: any;
  careGiversList: any;
}

export interface IAppointmentCareGiverList {
  daysData: IGetDaysArrayByMonthRes | null;
  careGiversList: any;
  loading: boolean;
  onAddingRow: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    index: number
  ) => void | undefined;
  handleSelectedUser: (value: object, name: string) => void;
  handleSecondStar: (list: object, index: number, name: string) => void;
  handleReset: (name: string) => void;
}

export interface IAppointmentCareInstitutionList {
  daysData: IGetDaysArrayByMonthRes | null;
  careInstitutionList: any;
  loading: boolean;
  onAddingRow: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    index: number
  ) => void | undefined;
  handleSelectedUser: (value: object, name: string) => void;
  handleSecondStar: (list: object, index: number, name: string) => void;
  handleReset: (name: string) => void;
}

export interface IAppointmentCareGiverForm {
  selectedCareGiver?: any;
}

export interface ICaregiverFormValue {
  firstName: string;
  lastName: string;
  fee?: string;
  nightAllowance?: IReactSelectInterface;
  weekendAllowance?: string;
  holidayAllowance?: string;
  nightFee?: string;
  workingProofRecieved?: boolean;
  distanceInKM?: string;
  feePerKM?: string;
  travelAllowance?: string;
  otherExpenses?: string;
  workingHoursFrom?: string;
  workingHoursTo?: string;
  breakFrom?: string;
  breakTo?: string;
  remarksCareGiver?: string;
  remarksInternal?: string;
  f?: boolean;
  s?: boolean;
  n?: boolean;
}

export interface ICaregiverValidationFormValue {
  fee?: string;
  nightAllowance?: IReactSelectInterface;
  weekendAllowance?: string;
  holidayAllowance?: string;
  nightFee?: string;
}
export interface ICareinstitutionFormValue {
  firstName: string;
  lastName: string;
}
export interface IAppointmentCareInstitutionForm {
  selectedCareinstitution: any;
}
