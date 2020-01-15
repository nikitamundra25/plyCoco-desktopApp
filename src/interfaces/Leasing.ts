export interface ILeasingValues {
  placeOfBirth: string;
  birthName: string;
  nationality: string;
  maritalStatus: string;
  children: string;
  factorChildAllowance: string;
  healthInsuranceType: string;
  healthInsuranceProvider: string;
  socialSecurityNumber: string;
  religion: string;
  controlId: string;
  taxBracket: string;
  preoccupation: string;
  payrollIBAN: string;
  status: string;
}

export interface IAddLeasingRes {
  userId: string;
}

export interface ILeasingInput {
  id?: string;
  placeOfBirth: string;
  birthName: string;
  nationality: string;
  maritalStatus: string;
  children: string;
  factorChildAllowance: string;
  healthInsuranceType: string;
  healthInsuranceProvider: string;
  socialSecurityNumber: string;
  religion: string;
  controlId: string;
  taxBracket: string;
  preoccupation: string;
  payrollIBAN: string;
  status: string;
}
