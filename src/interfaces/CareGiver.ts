import { Location } from 'history';
import * as H from 'history';
import { IReactSelectInterface } from './Constant';
import { ICareInstitutionRemarks } from './CareInstitution';
import { number } from 'prop-types';
import {
  IEmailInputAttachmenttypes,
  IEmailAttachmentData,
} from './EmailTemplate';

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
  remarks?: IRemark[];
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
  createdBy: string;
  description: string;
}

export interface CareGiverValues {
  id?: number;
  userId?: number;
  salutation?: IReactSelectInterface;
  firstName?: String;
  lastName?: String;
  userName?: String;
  gender?: IReactSelectInterface;
  email: String;
  phoneNumber?: String;
  mobileNumber?: String;
  title?: String;
  dateOfBirth?: string;
  createdAt?: Date;
  age?: number;
  street?: String;
  city?: String;
  postalCode?: String;
  address1?: String;
  address2?: String;
  countryId?: string;
  country?: IReactSelectInterface;
  regionId?: IReactSelectInterface;
  state?: IReactSelectInterface;
  stateId?: string;
  fax?: String;
  taxNumber?: String;
  bankName?: String;
  IBAN?: String;
  driversLicense?: string | undefined;
  driverLicenseNumber?: String;
  vehicleAvailable?: string | undefined;
  socialSecurityContribution?: Boolean;
  workZones?: JSON;
  status?: String;
  belongTo?: IReactSelectInterface;
  employed?: Boolean;
  companyName?: String;
  registrationNumber?: String;
  registerCourt?: String;
  executiveDirector?: String;
  legalForm?: IReactSelectInterface;
  legalFormValue?: IReactSelectInterface;
  qualifications?: IReactSelectInterface[];
  attributeId?: IReactSelectInterface[];
  remarks?: JSON;
  comments?: String;
  nightAllowance?: IReactSelectInterface;
  invoiceInterval?: IReactSelectInterface;
  leasingPricingList?: IReactSelectInterface;
}

export interface ICareGiverValidationInterface {
  salutation?: IReactSelectInterface;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  userName?: string;
  fee?: number | null;
  night?: number | null;
  weekendAllowance?: number | null;
  holiday?: number | null;
  comments?: string;
  taxNumber?: string;
  age?: number | null;
  fax?: string;
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
  qualifications?: string[];
  workZones?: string[];
  remarks?: IRemark[];
  status: string;
}

export interface ICareGiverValues {
  id?: string;
  userId?: number;
  salutation?: IReactSelectInterface;
  firstName?: String;
  lastName?: String;
  userName?: String;
  gender?: IReactSelectInterface;
  email: String;
  phoneNumber?: String;
  mobileNumber?: String;
  title?: String;
  dateOfBirth?: string;
  createdAt?: Date;
  age?: string;
  street?: String;
  city?: String;
  postalCode?: String;
  address1?: String;
  address2?: String;
  countryId?: string;
  country?: IReactSelectInterface;
  state?: IReactSelectInterface;
  stateId?: string;
  fax?: String;
  taxNumber?: String;
  bankName?: String;
  IBAN?: String;
  driversLicense?: string | undefined;
  driverLicenseNumber?: String;
  vehicleAvailable?: string | undefined;
  socialSecurityContribution?: Boolean;
  workZones?: JSON;
  status?: String;
  belongTo?: IReactSelectInterface;
  employed?: boolean | undefined;
  companyName?: String;
  registrationNumber?: String;
  registerCourt?: String;
  regionId?: IReactSelectInterface;
  executiveDirector?: String;
  legalForm?: IReactSelectInterface;
  legalFormValue?: IReactSelectInterface;
  qualifications?: IReactSelectInterface[];
  attributeId?: IAttributeOptions[];
  remarks?: ICareInstitutionRemarks[];
  remarkData?: string;
  remarkValue?: string; // for edit
  comments?: String;
  invoiceInterval?: IReactSelectInterface;
  leasingPricingList?: IReactSelectInterface;
  fee?: string;
  nightAllowance?: IReactSelectInterface;
  weekendAllowance?: string;
  holiday?: string;
  night?: string;
}

export interface IPersonalInfoObject {
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
  qualifications?: string[];
  workZones?: string[];
  remarks?: IRemark[];
  status: string;
}

export interface IEditCareGInput {
  personalInformation: IPersonalInfoObject;
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
  caregiverDetails: object;
}

export interface IAddCargiverRes {
  userId: string;
}

export interface IAddEmailVariables {
  userId: number;
  to: string;
  from: string;
  subject: string;
  body: string;
  parentId: number | null;
  status: string;
  attachments: IEmailInputAttachmenttypes[];
  files: any;
}

export interface INewEmailProps {
  emailData: any;
  selectedUserName: string;
}

export interface IEmailData {
  body: string;
  createdAt: string;
  id: number;
  subject: string;
  to: string;
  userId: number;
  attachments: IEmailInputAttachmenttypes[];
}

export interface IEmailPreviewProps {
  emailData: IEmailData | null;
  selectedUserName: string;
  sendBy?: string;
  length?: any;
}

export interface IEmailFormComponentPorps {
  subject: string;
  body: any;
  isSubmit: boolean;
  onEditorStateChange: (editorState: any) => void;
  sendEmail: (e: React.FormEvent<HTMLFormElement>) => void;
  uploadDocument?: (data: IEmailAttachmentData) => void;
  attachments: IEmailAttachmentData[];
}

export interface IEmailQueryVar {
  userId: number;
  from: string;
  searchBy: string;
}

export interface IEmailListProps extends IEmailSearchFilterProps {
  emailList: any;
  selectedUserName: string;
  loading: boolean;
  onRefresh: (from: string) => void;
}

export interface IBelongsToData {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IEmailSearchFilterProps {
  searchBy: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

export interface IAttributeValues {
  id: number;
  name: string;
  color: string;
}

export interface IAttributeOptions {
  label: string;
  value: string;
  color: string | null;
}
