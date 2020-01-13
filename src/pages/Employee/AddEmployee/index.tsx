import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { EmployeeValidationSchema } from '../../../validations/EmployeeValidationSchema';
import {
  IEmployeeFormValues,
  IEmployeeInput,
  IAddEmployeeRes,
} from '../../../interfaces';
import EmployeeFormComponent from './EmployeeFormComponent';
import { EmployeeQueries } from '../../../queries';
import { logger } from '../../../helpers';

const [ADD_EMPLOYEE] = EmployeeQueries;

export const EmployeeForm = () => {
  let { userName } = useParams();
  logger(userName, 'userName');
  const [addEmployee, { error, data }] = useMutation<
    { addEmployee: IAddEmployeeRes },
    { employee: IEmployeeInput }
  >(ADD_EMPLOYEE);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('calling did mount');
  }, []); // Pass empty array to only run once on mount.
  const handleSubmit = (
    values: IEmployeeFormValues,
    { setSubmitting }: FormikHelpers<IEmployeeFormValues>,
  ) => {
    //to set submit state to false after successful signup
    if (values.bankName) {
      console.log('inside bank name');
    }
    console.log('values areeeeee', values);
    setSubmitting(false);
  };
  const values: IEmployeeFormValues = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    telephoneNumber: undefined,
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
