import { IReactSelectInterface } from './Constant';

export interface ISearchValues {
  searchValue: string;
  isActive?: IReactSelectInterface;
  sortBy?: IReactSelectInterface;
}

export interface ISearchProps {
  label?: string;
  searchPlacholderText?: string;
  setSearchValues?: any;
}

export interface ISearchToDoValues {
  searchBy?: string;
  sortBy?: IReactSelectInterface;
  priority?: IReactSelectInterface;
  futureOnly?: boolean;
}
