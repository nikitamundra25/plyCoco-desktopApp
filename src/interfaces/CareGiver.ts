import { Location } from "history";
import * as H from "history";

export interface ICareGiverInput {
  id?: string;
  salutation: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  street: string;
  city: string;
  stateId: string;
  regionId?: string;
  countryId: string;
  postCode: string;
  pinCode?: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  userName: string;
  legalForm: string;
  fax: string;
  qualifications: string[];
  taxNumber: string;
  remarks: string;
  driversLicense: boolean;
  driverLicenseNumber: string;
  vehicleavailable: boolean;
  socialSecurityContribution: boolean;
  workZones: string; //[]
  status: string;
  companyName: string;
  bankName: string;
  leasing: string;
  registrationNumber: string;
  mobilePhone: string;
  registerCourt: string;
  executiveDirector: string;
  employed?: boolean;
}

export interface CareGiverValues {
  salutation: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  street: string;
  city: string;
  stateId: string;
  regionId?: string;
  countryId: string;
  postCode: string;
  pinCode?: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  fax: string;
  mobilePhone: string;
  userName: string;
  companyName: string;
  legalForm: string;
  bankName: string;
  qualifications: any;
  leasing: string;
  registrationNumber: string;
  registerCourt: string;
  taxNumber: string;
  remarks: string;
  driversLicense: boolean;
  vehicleavailable: boolean;
  driverLicenseNumber: string;
  executiveDirector: string;
  socialSecurityContribution: boolean;
  workZones: string; //[],
  status: string;
}

export interface IEmailMenus<
  Params extends { [K in keyof Params]?: string } = {}
  > {
  history: H.History;
  location: H.Location;
}

export interface IBillingSettingsValues {
  feePerHour: string;
  nightAllowancePerHour: string;
  weekendAllowancePerHour: string;
  holidayAllowancePerHourFee: string;
  nextInvoiceNumber: string;
  statementsMaturity: string;
  bankName: string;
  accountHolderName: string;
  iban: string;
  bic: string;
  additionalText: string;
}

export interface IPersonalObject {
  userName?: string;
  stateId: string;
  regionId?: string;
  registartionSince?: string;
  gender?: string;
  title?: string;
  salutation: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  street: string;
  city: string;
  postCode: string;
  pinCode?: string;
  countryId: string;
  phoneNumber: string;
  fax: string;
  mobilePhone: string;
  email: string;
  taxNumber: string;
  bankName: string;
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
}

interface IBillingSettingsObject {
  fee: string;
  night: string;
  weekendAllowancePerHour: string;
  holidayAllowancePerHourFee: string;
  nightAllowancePerHour: string;
  leasingPrice: string;
  invoiceInterval: string;
}

export interface ICareGiverValues {
  personalInformation: IPersonalObject;
  billingSettings?: IBillingSettingsObject;
}

export interface ICareGiver {
  id: string;
  salutation: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  street: string;
  city: string;
  stateId: string;
  countryId: string;
  postCode: string;
  email: string;
  phoneNumber: string;
  qualification: string[];
  legalForm: string;
  workZones: string[];
  status: string;
}
