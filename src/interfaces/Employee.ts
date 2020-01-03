export interface IEmployeeFormValues {
  email: string; password: string;
  firstName: string; lastName: string;
  userName: string; telephoneNumber: string;
  accountHolderName: string; bankName: string;
  IBAN: string; BIC: string;
  additionalText: string; address1:
  string; address2: string; country:
  string; zip: string;
  //  date: Date;

}

export interface IEmployeeState {
  email: string;
  password: string;
  firstName: string;
}