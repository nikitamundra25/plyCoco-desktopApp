import { ICareInstitutionFormValues } from './CareInstitution';

export interface IReactSelectInterface {
  label: string;
  value: string;
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
