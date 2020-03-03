import { ICareInstitutionFormValues } from './CareInstitution';

export interface IReactSelectInterface {
  label: string;
  value: string;
  color?: string;
  companyName?: string;
}

export interface IHandleSelectInterface {
  handleSelect: (selectOption: IReactSelectInterface, name: string) => void;
}

export interface IHandleSubmitInterface {
  handleSubmit: (values: ICareInstitutionFormValues) => void;
}

export interface IObjectType {
  [key: string]: string | number;
}

export interface IReplaceObjectInterface {
  [key: string]: string;
}

export interface IMatchingColorInterface {
  status: string;
  color: string;
}
