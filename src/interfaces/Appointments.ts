import { IReactSelectInterface } from './Constant';

export interface IDaysArray {
  date: string;
  day: string;
  isoString: string;
  dateString?: string;
  isWeekend: boolean;
  today?: any;
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
  qualification: IReactSelectInterface[] | undefined;
  filterByAppointments: IReactSelectInterface | undefined;
  careGiversListArr: any;
  careInstitutionListArr: any;
  applyFilter: (
    userRole: string | null,
    positiveId: number[],
    negativeId: number[],
  ) => void;
  handleSelectAppointment: (selectOption: IReactSelectInterface) => void;
  onFilterByUserId: (userId: string, userRole: string) => void;
  handleResetFilters: () => void;
  handleUserList: (value: any, name: string) => void;
  careinstitutionSoloFilter: IReactSelectInterface | undefined;
  caregiverSoloFilter: IReactSelectInterface | undefined;
  isPositive: number[];
  setIsPositive: React.Dispatch<React.SetStateAction<number[]>>;
  isNegative: number[];
  positive: number[];
  negative: number[];
  setIsNegative: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface IAppointmentCareGiverList {
  updateLinkedStatus: (name: string) => void;
  fetchDataValues?: any;
  updateCaregiverStatus: (name: string) => Promise<void>;
  daysData: IGetDaysArrayByMonthRes | null;
  careGiversList: any;
  loading: boolean;
  onAddingRow: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    index: number,
  ) => void | undefined;
  // handleSecondStar: (list: object, name: string) => void;
  handleReset: (name: string) => void;
  totalCaregiver: number;
  getNext: (skip: number) => void;
  fetchingCaregivers?: boolean;
  selectedCells?: any[];
  qualification?: any;
  gte?: any;
  lte?: any;
  selctedAvailability?: any;
  qualificationList?: any[];
  activeDateCaregiver?: any[];
  onReserve?: () => void;
  onDeleteEntries?: (userRole: string) => void;
  onCaregiverQualificationFilter?: () => void;
  onNewAvailability?: () => void;
  handleSelection?: (selectedCells: any, name: string) => void;
  selectedCellsCareinstitution?: any;
  onLinkAppointment?: any;
  fetchingCareGiverData?: () => void;
  careInstitutionList?: any[];
  onTerminateAggrement: () => Promise<void>;
  locationState: any;
  careinstitutionSoloFilter: IReactSelectInterface | undefined;
  onhandleCaregiverStar: (id: string, isSecondStar: boolean) => void;
  starMarkCaregiver: boolean;
  starCaregiver: IStarInterface;
  updateLeasingContractStatus: (status: string) => void;
}

export interface IAppointmentCareInstitutionList {
  daysData: IGetDaysArrayByMonthRes | null;
  careInstitutionList: any;
  loading: boolean;
  onAddingRow: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    index: number,
  ) => void | undefined;
  handleSelectedUser: (
    value: object,
    date: IDaysArray[] | null,
    name: string,
  ) => void;
  onhandleSecondStarCanstitution: (list: any) => void;
  handleFirstStarCanstitution: (id: string) => void;
  handleReset: (name: string) => void;
  careInstituionDeptData: any;
  starCanstitution: IStarInterface;
  secondStarCanstitution: boolean;
  deptLoading: boolean;
  selectedCareGiver: any;
  selectedCareinstitution: any;
  activeDateCaregiver: IDate | undefined;
  activeDateCareinstitution: IDate | undefined;
  handleSelection: (value: any, name: string) => void;
  fetchingCareInstitutions?: boolean;
}

export interface IAppointmentCareGiverForm {
  selectedCareGiver?: any;
  activeDateCaregiver?: IDate | undefined;
  addCaregiverRes?: any;
  timeSlotError?: string;
  onhandleDelete: (id: string) => void;
  careGiversListArr: any;
  handleSelectUserList: (value: any, name: string) => void;
  handleLastTimeData: (id: string, values: ICaregiverFormValue) => void;
}

export interface IDate {
  date?: any;
  day?: string;
  isWeekend?: boolean;
  isoString?: any;
  dateString?: string;
}

export interface IStarInterface {
  isStar: boolean;
  setIndex?: number;
  id: string;
  isSecondStar?: boolean;
  divisionId?: any
}

export interface ICaregiverFormValue {
  appointmentId: string | null;
  name?: string;
  // firstName: string;
  // lastName: string;
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
  status?: string;
  workingHoursFromDate?: string;
  workingHoursFromTime?: string;
  workingHoursToDate?: string;
  workingHoursToTime?: string;
  breakFromDate?: string;
  breakFromTime?: string;
  breakToDate?: string;
  breakToTime?: string;
  dateString?: string;
  createdBy?: string;
  createdAt?: any;
  updatedAt?: any;
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
  workingHoursFromDate?: string;
  workingHoursFromTime?: string;
  workingHoursToDate?: string;
  workingHoursToTime?: string;
  breakFromDate?: string;
  breakFromTime?: string;
  breakToDate?: string;
  breakToTime?: string;
  dateString?: string;
}

export interface ICareinstituionValidationFormValue {
  startTime: string;
  endTime: string;
  department?: any;
  qualificationId: string;
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
  handleQualification: (value: any) => void;
  onhandleDelete: (name: string, id: string) => void;
  careInstitutionListArr: any;
  handleSelectUserList: (value: any, name: string) => void;
}
export interface IAddCargiverAppointmentRes {
  id: string;
  userId: string;
  status: string;
  divisionId: any;
  qualificationId: any;
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
  qualificationForCharge?: IReactSelectInterface | undefined;
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
  status?: string;
  careInstitutionDepartment?: IReactSelectInterface[] | undefined;
  createdBy?: string;
  updatedAt?: any;
  createdAt?: any;
}

export interface ICareinstitutionFormSubmitValue {
  userId: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  divisionId: number | null;
  qualificationId: number[];
  qualificationForCharge?: any;
  address: string;
  contactPerson: string;
  departmentOfferRemarks: string | null;
  departmentBookingRemarks: string;
  departmentRemarks: string;
  isWorkingProof: boolean;
  offerRemarks: string;
  bookingRemarks: string;
  comments?: string;
  f: string;
  s: string;
  n: string;
  status: string;
  isLeasing?: boolean;
  createdBy?: string;
  createdAt?: any;
}

export interface IUnlinkInterface {
  show: boolean;
  handleClose: () => any;
  handleUnlinkData: (linkedBy: string, check: boolean) => void;
}

export interface IUnlinkAppointmentInput {
  appointmentId: number;
  unlinkedBy: string;
  deleteAll: boolean;
}

export interface IlinkAppointmentInput {
  avabilityId: number;
  requirementId: number;
  date: any;
  status: string;
}

export interface IunlinkResponse {
  deleteAppointment?: any;
  deleteAll?: string;
  unlinkedBy: string;
}
