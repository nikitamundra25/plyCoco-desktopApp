import { FormikHelpers } from 'formik';

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
    actions: FormikHelpers<IEmailTemplateValues>,
  ) => void;
  bindSubmitForm: any;
  templateData: IEmailTemplateValues | null;
}

export interface IEmailTemplateList {
  onTemplateSelection: (data: any) => void;
}
