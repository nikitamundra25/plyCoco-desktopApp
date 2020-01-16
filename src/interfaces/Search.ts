import { IReactSelectInterface } from './Constant';

export interface ISearchValues {
  searchValue: string;
  isActive?: IReactSelectInterface;
  sortBy?: IReactSelectInterface;
}

export interface ISearchProps {
  label?: string;
}
