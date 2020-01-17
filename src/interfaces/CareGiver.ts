import { Location } from "history";
import * as H from "history";
import { IReactSelectInterface } from "./Constant";

export interface ICareGiverInput {
  id?: string;
  salutation?: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  street: string;
  city: string;
  stateId?: number;
  regionId?: string;
  countryId?: number;
  postCode: string;
  pinCode?: string;
  email: string;
  dateOfBirth?: string;
  phoneNumber: string;
  userName: string;
  legalForm: string;
  fax: string;
  qualifications?: string[];
  taxNumber: string;
  remarks: IRemark[];
  driversLicense: boolean;
  driverLicenseNumber: string;
  vehicleAvailable: boolean;
  socialSecurityContribution: boolean;
  workZones?: string[];
  status: string;
  companyName: string;
  registrationNumber: string;
  mobileNumber: string;
  registerCourt: string;
  executiveDirector: string;
  employed?: boolean;
}

export interface IRemark {
  commentBy: string;
  description: string;
  commentAt: string;
}

export interface CareGiverValues {
  salutation?: IReactSelectInterface;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  street: string;
  city: string;
  stateId?: IReactSelectInterface;
  regionId?: IReactSelectInterface;
  countryId?: IReactSelectInterface;
  postCode: string;
  pinCode?: string;
  email: string;
  dateOfBirth?: string;
  phoneNumber: string;
  fax: string;
  mobileNumber: string;
  userName: string;
  companyName: string;
  legalForm?: IReactSelectInterface;
  qualifications?: IReactSelectInterface[];
  registrationNumber: string;
  registerCourt: string;
  taxNumber: string;
  remarks: IRemark[];
  driversLicense: boolean;
  vehicleAvailable: boolean;
  driverLicenseNumber: string;
  executiveDirector: string;
  socialSecurityContribution: boolean;
  workZones?: IReactSelectInterface[];
  status: string;
}

export interface IEmailMenus<
  Params extends { [K in keyof Params]?: string } = {}
> {
  history: H.History;
  location: H.Location;
}

export interface IBillingSettingsValues {
  fee: string;
  weekendAllowancePerHour: string;
  holidayAllowancePerHourFee: string;
  nightAllowancePerHour: string;
  invoiceInterval: string;
  leasingPrice: string;
}

export interface IPersonalObject {
  userName?: string;
  stateId?: number;
  regionId?: string;
  registartionSince?: string;
  gender?: string;
  title?: string;
  salutation?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  age: string;
  address1: string;
  address2: string;
  street: string;
  city: string;
  postCode: string;
  pinCode?: string;
  countryId?: number;
  phoneNumber: string;
  fax: string;
  mobileNumber: string;
  email: string;
  taxNumber: string;
  iban: string;
  password?: string;
  belongTo?: string;
  legalForm: string;
  companyName: string;
  registerCourt: string;
  registrationNumber: string;
  executiveDirector: string;
  employed: boolean;
  additionalText: string;
  driversLicense: boolean;
  vehicleAvailable: boolean;
  driverLicenseNumber: string;
  socialSecurityContribution: boolean;
  qualifications?: IReactSelectInterface[];
  workZones?: IReactSelectInterface[];
  remarks?: IRemark[];
  status: string;
}

export interface ICareGiverValues {
  personalInformation: IPersonalObject;
  billingSettings?: IBillingSettingsValues;
}

export interface ICareGiver {
  id: string;
  userName: string;
  salutation: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  street: string;
  city: string;
  stateId?: number;
  countryId?: number;
  postCode: string;
  email: string;
  phoneNumber: string;
  qualifications?: string[];
  legalForm: string;
  workZones?: string[];
  status: string;
}

export interface IAddCargiverRes {
  userId: string;
}
