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
  country?: string | null;
  state?: string | null;
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
  profileImage?: File;
}

export interface IAddEmployeeRes {
  userId: string;
}

export interface IEmployee {
  id: string;
  firstName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  region: string;
  assignedCanstitution: string;
  isActive: boolean;
}
