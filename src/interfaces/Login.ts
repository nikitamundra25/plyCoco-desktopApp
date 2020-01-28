import { RouteComponentProps } from 'react-router';

export interface ILoginModal {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData?: any;
  error?: object;
}

export interface ILoginActionData {
  email: string;
  password: string;
}

export interface ILoginProps extends RouteComponentProps {}

export interface ILoginErrors {
  email: string;
  password: string;
}

export interface ILoginState {
  email: string;
  password: string;
  errors: ILoginErrors;
}

export interface IProxyLoginActionData {
  id: string;
}
export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  message: string;
  status: string;
}
