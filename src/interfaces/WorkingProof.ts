import { IReactSelectInterface } from "./Constant";

export interface IWorkingProofFormValues {
  document: File | null;
}

export interface IWorkingProofValidationSchema {
  document: File | null;
}

export interface IAppointmentInput {
  appointmentId: number | null
   workProofId : number | null
}

export interface IDocumentInterface {
  id: any;
  document: string;
  fileName: string;
  createdAt?: Date;
}

export interface IDocumentInputInterface {
  isDocumentTemplate: boolean;
  document: File | null;
}

export interface IDocumentPreviewInterface {
  documentUrls: string;
  imageUrls: string;
  currentAngel: number
}

export interface IDocumentPerformedWorkInterface{
  careGiversOptions: IReactSelectInterface[] | undefined
  handleChange: (value:any, name:string) => void
  appointmentList: any
  caregiverDataLoading: boolean
  qualificationList: any
  onFilterById:(value:any) => void;
  handleSelect: (e:React.ChangeEvent<HTMLInputElement> , id:string) => void;
  checkboxMark: any
}