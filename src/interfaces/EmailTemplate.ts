import { FormikHelpers } from 'formik';

export interface IEmailTemplateValues {
  type: string;
  menuEntry: string;
  subject: string;
  body: string;
}

export interface IAddEmailTemplateProps {
  handleSubmit: (
    values: IEmailTemplateValues,
    actions: FormikHelpers<IEmailTemplateValues>,
  ) => void;
}
