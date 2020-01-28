import { FormikHelpers } from 'formik';
import { IReactSelectInterface } from './Constant';

export interface IEmailTemplateValues {
  id?: number;
  type: string;
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
}

export interface IEmailTemplateList {
  onTemplateSelection: (data: any) => void;
  data: any;
}

export interface IEmailTemplateMenu {
  typeListOptions: IReactSelectInterface[] | undefined;
  templateType: IReactSelectInterface | null;
  handleSubmit: () => void;
  onAddNewTemplate: () => void;
  onTypeChange: (selectedType: any) => void;
}
