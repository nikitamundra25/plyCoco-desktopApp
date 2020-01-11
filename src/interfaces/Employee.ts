import { ValueType } from 'react-select';
import { IReactSelectInterface } from './Constant';

export interface IEmployeeFormValues {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  telephoneNumber: string;
  accountHolderName: string;
  bankName: string;
  IBAN: string;
  BIC: string;
  additionalText: string;
  address1: string;
  address2: string;
  country?: ValueType<IReactSelectInterface>;
  zip: string;
  joiningDate: string;
  bankAccountNumber: string;
  image?: File;
}

export interface IEmployeeState {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  telephoneNumber: string;
  accountHolderName: string;
  bankName: string;
  IBAN: string;
  BIC: string;
  additionalText: string;
  address1: string;
  address2: string;
  country: string;
  zip: string;
  joiningDate: string;
  bankAccountNumber: string;
  image?: File;
}
