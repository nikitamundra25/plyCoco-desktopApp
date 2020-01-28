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
  const { handleSubmit, bindSubmitForm, templateData } = props;
  console.log(templateData, 'templateDatatemplateData');

  const { type = '', menuEntry = '', subject = '', body = '' } = templateData
    ? templateData
    : {};
  const values: IEmailTemplateValues = {
    type,
    menuEntry,
    subject,
    body,
  };
  return (
    <Formik
      initialValues={values}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      children={(props: FormikProps<IEmailTemplateValues>) => {
        const { submitForm } = props;
        bindSubmitForm(submitForm);
        return <TemplateFormComponent {...props} />;
      }}
      validationSchema={EmailTemplateValidationSchema}
    />
  );
};
