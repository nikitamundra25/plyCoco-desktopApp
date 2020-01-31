import React, { FunctionComponent } from 'react';
import { Formik, FormikProps } from 'formik';
import { TemplateFormComponent } from './TemplateFormComponent';
import {
  IEmailTemplateValues,
  IAddEmailTemplateProps
} from '../../../../../interfaces';
import { EmailTemplateValidationSchema } from '../../../../validations/EmailTemplateValidationSchema';

export const AddTemplate: FunctionComponent<IAddEmailTemplateProps> = (
  props: IAddEmailTemplateProps
) => {
  const {
    handleSubmit,
    bindSubmitForm,
    templateData,
    typeListOptions,
    setTypeId
  } = props;
  const {
    type = { label: '', value: '' },
    menuEntry = '',
    subject = '',
    body = '',
    id = undefined
  } = templateData ? templateData : {};
  const values: IEmailTemplateValues = {
    type,
    menuEntry,
    subject,
    body,
    id
  };
  console.log('values', values);

  console.log('temp data', templateData);

  return (
    <Formik
      initialValues={values}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      children={(props: FormikProps<IEmailTemplateValues>) => {
        const { submitForm } = props;
        bindSubmitForm(submitForm);
        return (
          <TemplateFormComponent
            {...props}
            typeListOptions={typeListOptions}
            setTypeId={setTypeId}
          />
        );
      }}
      validationSchema={EmailTemplateValidationSchema}
    />
  );
};
