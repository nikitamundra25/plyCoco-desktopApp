import React, { FunctionComponent } from 'react';
import { Formik, FormikProps } from 'formik';
import { TemplateFormComponent } from './TemplateFormComponent';
import {
  IEmailTemplateValues,
  IAddEmailTemplateProps,
} from '../../../interfaces';
import { EmailTemplateValidationSchema } from '../../../validations/EmailTemplateValidationSchema';

export const AddTemplate: FunctionComponent<IAddEmailTemplateProps> = (
  props: IAddEmailTemplateProps,
) => {
  const { handleSubmit } = props;
  const values: IEmailTemplateValues = {
    type: '',
    menuEntry: '',
    subject: '',
    body: '',
  };
  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      children={(props: FormikProps<IEmailTemplateValues>) => (
        <TemplateFormComponent {...props} />
      )}
      validationSchema={EmailTemplateValidationSchema}
    />
  );
};
