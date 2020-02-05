import { FormikHelpers } from 'formik';
import { IReactSelectInterface } from './Constant';
import { Dispatch, SetStateAction } from 'react';

export interface IEmailTemplateValues {
  id?: number;
  type: IReactSelectInterface | undefined;
  typeValue?: string;
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
}
export interface IAddEmailTemplateProps {
  handleSubmit: (
    values: IEmailTemplateValues,
    actions: FormikHelpers<IEmailTemplateValues>
  ) => void;
  bindSubmitForm: any;
  templateData: IEmailTemplateValues | null;
  typeListOptions: IReactSelectInterface[] | undefined;
  setTypeId: any;
  setTemplateData: any;
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
  handleSubmit: () => void;
  onAddNewTemplate: () => void;
  onTypeChange: (selectedType: any) => void;
  addEmailLoading: boolean;
}
