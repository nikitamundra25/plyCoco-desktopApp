import { IReactSelectInterface } from './Constant';

export interface IEmployeeFormValues {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  telephoneNumber?: number;
  accountHolderName: string;
  bankName: string;
  IBAN: string;
  BIC: string;
  additionalText: string;
  address1: string;
  address2: string;
  country?: IReactSelectInterface;
  state?: IReactSelectInterface;
  zip: string;
  joiningDate: string;
  image?: File;
  city: string;
}

export interface IEmployeeInput {
  id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  joiningDate: string | null;
  countryId?: number | null;
  stateId?: number | null;
  city: string;
  zipCode: string;
  address1: string;
  address2: string;
  regionId?: string;
  bankName: string;
  accountHolder: string;
  additionalText: string;
  IBAN: string;
  BIC: string;
}

export interface IAddEmployeeRes {
  userId: string;
}
