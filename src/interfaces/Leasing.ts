import { IReactSelectInterface } from './Constant';

export interface ILeasingValues {
  placeOfBirth: string;
  birthName: string;
  nationality?: IReactSelectInterface;
  maritalStatus?: IReactSelectInterface;
  children: number;
  factorChildAllowance: number;
  healthInsuranceType?: IReactSelectInterface;
  healthInsuranceProvider?: IReactSelectInterface;
  socialSecurityNumber: string;
  religion?: IReactSelectInterface;
  controlId: string;
  taxBracket: string;
  preoccupation?: IReactSelectInterface;
  payrollIBAN: string;
  status?: IReactSelectInterface;
  firstDay: string;
  lastDay: string;
  monthlyWorkingHrs: number | null;
  weeklyWorkingHrs: number | null;
}

export interface IPayslipValues {
  date : Date,
  totalSalary : string,
  comment : string
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
  firstDay: string;
  lastDay: string;
  monthlyWorkingHrs: number | null;
  weeklyWorkingHrs: number | null;
}
