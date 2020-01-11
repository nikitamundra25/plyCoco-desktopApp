import React from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { EmployeeValidationSchema } from '../../../validations/EmployeeValidationSchema';
import { IEmployeeFormValues } from '../../../interfaces';
import EmployeeFormComponent from './EmployeeFormComponent';

export const EmployeeForm = () => {
  const handleSubmit = (
    values: IEmployeeFormValues,
    { setSubmitting }: FormikHelpers<IEmployeeFormValues>,
  ) => {
    //to set submit state to false after successful signup
    setSubmitting(false);
  };
  const values: IEmployeeFormValues = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    telephoneNumber: '',
    accountHolderName: '',
    bankName: '',
    IBAN: '',
    BIC: '',
    additionalText: '',
    address1: '',
    address2: '',
    zip: '',
    joiningDate: '',
    bankAccountNumber: '',
  };
  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      children={(props: FormikProps<IEmployeeFormValues>) => (
        <EmployeeFormComponent {...props} />
      )}
      validationSchema={EmployeeValidationSchema}
    />
  );
};

export default EmployeeForm;
