import { IReactSelectInterface } from "./Constant";

export interface IInvoiceList{
  invoiceListLoading: boolean
  invoiceList: any,
  totalCount: number,
  currentPage: number
  }

  export interface IInvoiceNavBar {
    onhandleSelection:(value: IReactSelectInterface , name: string) => void,
    careGiversOptions: IReactSelectInterface[] | undefined,
    careInstitutionOptions: IReactSelectInterface[] | undefined,
    careinstitutionFilter: IReactSelectInterface | undefined,
    careInstitutionDepartmentOption: IReactSelectInterface[] | undefined,
    departmentFilter: IReactSelectInterface | undefined,
    caregiverFilter: IReactSelectInterface | undefined,
    handleDayClick:(selectedDay: any) => void;
    handleArrowDayChange: (name:string) => void
    dateFilter: String
    createInvoiceLoading: boolean
  }