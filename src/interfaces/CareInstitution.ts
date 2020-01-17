import { IReactSelectInterface } from './Constant';

export interface ICareInstitutionFormValues {
  salutation?: IReactSelectInterface;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: number;
  mobileNumber?: number;
  fax: string;
  shortName: string;
  companyName: string;
  street: string;
  city: string;
  gender?: IReactSelectInterface;
  website?: string;
  title?: string;
  country?: IReactSelectInterface;
  state?: IReactSelectInterface;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  salt?: String;
  userRole?: String;
  qualificationId?: IReactSelectInterface;
  attributeId?: IReactSelectInterface;
  isActive?: Boolean;
  isDeleted?: Boolean;
  zipCode?: string;
  countryId?: string;
  stateId?: string;
  regionId?: number;
  remarks?: [ICareInstitutionRemarks] | undefined;
  linkedTo?: string;
  anonymousName?: string;
  anonymousName2?: string;
  careGiverCommission?: string;
  doctorCommission?: string;
  leasingPriceListId?: IReactSelectInterface;
  invoiceType?: IReactSelectInterface;
  interval?: IReactSelectInterface;
  emailInvoice?: string;
  addressInvoice?: string;
  isArchive?: Boolean;
}

export interface ICareInstitutionValidationSchema {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  mobileNumber: number;
  city: string;
}

export interface ICareInstitutionContactValidationSchema {
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  city: string;
}

export interface ICareInstitutionContact {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  mobileNumber?: string;
  faxNumber?: string;
  contactType?: IReactSelectInterface;
  remaks?: string;
  comments: string;
  salutation?: IReactSelectInterface;
  country?: IReactSelectInterface;
  countryId?: string;
  street?: string;
  stateId?: string;
  gender?: IReactSelectInterface;
  id?: string;
  title?: string;
  state?: IReactSelectInterface;
  city?: string;
  zipCode?: string;
  groupAttributes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICareInstitutionListDataInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  isActive: boolean;
  canstitution: ICareInstitutionObjectInterface;
}

export interface ICareInstitutionObjectInterface {
  companyName: string;
  shortName: string;
}
export interface ICareInstitutionRemarks {
  data: string;
  createdAt: Date;
  createdBy: string;
}
