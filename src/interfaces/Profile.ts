export interface IProfileFormvalues {
  firstName: string;
  lastName: string;
  email: string;
}
export interface IProfileValues extends IProfileFormvalues {
  userRole: string;
}
export interface IChangePasswordValues {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
