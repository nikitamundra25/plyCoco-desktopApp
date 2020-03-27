export interface ILoginFormValues {
  userName: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  message: string;
  status: string;
  sessionExpire: number;
}
