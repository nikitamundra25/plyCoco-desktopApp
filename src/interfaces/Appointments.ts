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
  handleToday: () => void;
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
  handleSelectedUser: (
    value: object,
    date: IDaysArray[] | null,
    name: string,
    handleSelectedAvailability: any
  ) => void;
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
  handleSelectedUser: (
    value: object,
    date: IDaysArray[] | null,
    name: string
  ) => void;
  onhandleSecondStarCanstitution: (list: any) => void;
  handleFirstStarCanstitution: (id: string) => void;
  handleReset: (name: string) => void;
  careInstituionDeptData: any;
  starCanstitution: IStarInterface;
  secondStarCanstitution: boolean;
  deptLoading: boolean;
}

export interface IAppointmentCareGiverForm {
  selectedCareGiver?: any;
  activeDateCaregiver?: IDate | undefined;
  addCaregiverRes?: any;
  timeSlotError?: string;
}

export interface IDate {
  date: any;
  day: string;
  isWeekend: boolean;
  isoString: any;
}

export interface IStarInterface {
  isStar: boolean;
  setIndex: number;
}

export interface ICaregiverFormValue {
  appointmentId: string | null;
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
  distanceInKM?: string;
  feePerKM?: string;
  otherExpenses?: string;
}

export interface ICareinstituionValidationFormValue {
  startTime: string;
  endTime: string;
}
// export interface ICareinstitutionFormValue {
//   firstName: string;
//   lastName: string;
//   careInstitutionTimesOptions: IReactSelectTimeInterface[] | undefined;
// }
export interface IAppointmentCareInstitutionForm {
  selectedCareinstitution: any;
  qualificationList: IReactSelectInterface[] | undefined;
  careInstitutionDepartment: IReactSelectInterface[] | undefined;
  addCareinstitutionRes: any;
  secondStarCanstitution: boolean;
}
export interface IAddCargiverAppointmentRes {
  id: string;
  userId: string;
  status: string;
}

export interface IReactSelectTimeInterface {
  label: string;
  value: string;
  data: any;
}

export interface ICareinstitutionFormValue {
  appointmentId: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  qualificationId: IReactSelectInterface[] | undefined;
  address: string;
  contactPerson: string;
  departmentOfferRemarks?: string;
  departmentBookingRemarks: string;
  departmentRemarks: string;
  isWorkingProof: boolean;
  offerRemarks: string;
  bookingRemarks: string;
  shift?: IReactSelectTimeInterface | undefined;
  department?: IReactSelectInterface | undefined;
  comments: string;
}

export interface ICareinstitutionFormSubmitValue {
  userId: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  divisionId: number | null;
  qualificationId: number[];
  address: string;
  contactPerson: string;
  departmentOfferRemarks: string | null;
  departmentBookingRemarks: string;
  departmentRemarks: string;
  isWorkingProof: boolean;
  offerRemarks: string;
  bookingRemarks: string;
  comments?: string;
}
