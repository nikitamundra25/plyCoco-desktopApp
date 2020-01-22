import { IReactSelectInterface } from './Constant';

export interface ILeasingValues {
  placeOfBirth: string;
  birthName: string;
  nationality?: IReactSelectInterface;
  maritalStatus?: IReactSelectInterface;
  children: number | null;
  factorChildAllowance: number | null;
  healthInsuranceType?: IReactSelectInterface;
  healthInsuranceProvider?: IReactSelectInterface;
  socialSecurityNumber: string;
  religion?: IReactSelectInterface;
  controlId: string;
  taxBracket: string;
  preoccupation?: IReactSelectInterface;
  payrollIBAN: string;
  status?: IReactSelectInterface;
}

export interface IAddLeasingRes {
  userId: string;
}

export interface ILeasingInput {
  placeOfBirth: string;
  birthName: string;
  nationality?: string | null;
  maritalStatus: string;
  children: string;
  factorChildAllowance: string;
  healthInsuranceType: string;
  healthInsuranceProvider: string;
  socialSecurityNumber: string;
  religion: string;
  controlId: string;
  taxBracket: string;
  preOccupation: string;
  payrollIBAN: string;
  status: string;
}
