import { FormikHelpers } from 'formik';
import { IReactSelectInterface } from './Constant';

export interface IEmailTemplateValues {
  id?: number;
  type: IReactSelectInterface | undefined;
  menuEntry: string;
  subject: string;
  body: any;
  typeId?: any;
}
export interface IEmailTemplateSubmitValues {
  type: string;
  typeId: any;
  menuEntry: string;
  subject: string;
  body: any;
  attachments: any;
}
export interface IAddEmailTemplateProps {
  handleSubmit: (
    values: IEmailTemplateValues,
    actions: FormikHelpers<IEmailTemplateValues>,
  ) => void;
  bindSubmitForm: any;
  templateData: IEmailTemplateValues | null;
  typeListOptions: IReactSelectInterface[] | undefined;
  setTypeId: any;
  attachment: IEmailAttachmentData[] | [];
  uploadDocument: any;
}

export interface IEmailTemplateList {
  onTemplateSelection: (data: any) => void;
  data: any;
  loading: any;
  activeTemplate: string | null;
}

export interface IEmailTemplateMenu {
  typeListOptions: IReactSelectInterface[] | undefined;
  templateType: IReactSelectInterface | null;
  activeTemplate: string | null;
  handleSubmit: () => void;
  onAddNewTemplate: () => void;
  onTypeChange: (selectedType: any) => void;
  onDeleteEmailTemplate: () => void;
  addEmailLoading: boolean;
}

export interface IEmailTemplateData {
  id: number;
  menuEntry: string;
  subject: string;
  body: any;
}

export interface IEmailAttachmentData {
  url: string | ArrayBuffer | null;
  fileName: string;
  size: number;
  path: string;
  file: File | null;
}
