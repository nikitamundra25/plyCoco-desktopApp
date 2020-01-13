import { ValueType } from 'react-select';
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
  country?: ValueType<IReactSelectInterface>;
  state?: ValueType<IReactSelectInterface>;
  zip: string;
  joiningDate: string;
  bankAccountNumber: string;
  image?: File;
}

export interface IEmployeeInput {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  salt: string;
  phoneNumber: string;
  joiningDate: Date;
  employeeCustomId: string;
  countryId: string;
  stateId: string;
  city: string;
  zipCode: string;
  address1: string;
  address2: string;
  regionId: string;
  userRole: string;
  bankName: string;
  bankAccountNumber: string;
  accountHolder: string;
  additionalText: string;
  IBAN: string;
  BIC: string;
}

export interface IAddEmployeeRes {
  userId: string;
}
