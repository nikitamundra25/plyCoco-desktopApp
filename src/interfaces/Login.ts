import { RouteComponentProps } from 'react-router';
import { IredirectPath } from './DefaultLayout';

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

export interface ILoginProps extends RouteComponentProps {
  loginReducer?: ILoginModal;
  //timeInterval: any;
  refreshToken: () => void;
  onLogin: (data: ILoginActionData) => void;
  redirectTo?: (path: IredirectPath) => void;
}

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
