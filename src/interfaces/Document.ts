import { IReactSelectInterface } from './Constant';

export interface IDocumentSubmitValues {
  userId: number | null;
  document: string;
  documentType: string;
  remarks: string;
}
export interface IDocumentUrls {
  url: string | ArrayBuffer | null;
  name: string;
  date: string;
}
export interface IDocumentUploadModal {
  show: boolean;
  handleClose: () => void;
  handleSaveDocument: () => void;
  onDrop: () => void;
  documentUrls: IDocumentUrls;
}
export interface IDocumentList {
  setShowDocumentPopup: () => void;
}
export interface IDocumentListInteface {
  documentListing: any;
  handleCheckElement: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    status: string
  ) => Promise<void>;
  documentId: {
    id: string;
    checked: boolean;
  } | null;
  onDeleteDocument: (id: string) => Promise<void>;
  onUpdateDocument: (data: any, isMissingDocEditable: boolean) => void;
  loading: boolean;
}
export interface IDocumentModelInterface {
  // Functions
  handleClose: () => void;
  handleSaveDocument: () => void;
  onUpdateDocument: (data: any, isMissingDocEditable: boolean) => void;
  documentIdUpdate: any;
  onDrop: (acceptedFiles: File[]) => void;
  show: boolean;
  documentUrls: IDocumentUrls | null;
  handleChange: (e: any) => void;
  documentType: IReactSelectInterface | undefined;
  setDocumentType: React.Dispatch<
    React.SetStateAction<IReactSelectInterface | undefined>
  >;
  remarkValue: string;
  loading: boolean;
  isMissingDocEditable: boolean;
  statusValue: boolean;
  fileName: any;
  isSubmit: boolean;
  documentTypeList: IReactSelectInterface[];
  unsupportedFile: string | null;
  defaultDocument: boolean | undefined;
  setRequiredDoc: any;
}
