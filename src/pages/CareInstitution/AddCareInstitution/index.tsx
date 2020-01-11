import React, { Component } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { EmployeeValidationSchema } from '../../../validations/EmployeeValidationSchema';
import { ICareInstitutionFormValues, IEmployeeState } from '../../../interfaces';
import AddCareInstitution from './AddCareInstitution';
import gql from 'graphql-tag';

const GET_USERS = gql`
  query userList {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

export const CareInstitutionForm = () => {
  const handleSubmit = (
    values: ICareInstitutionFormValues,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>,
  ) => {
    //to set submit state to false after successful signup
    setSubmitting(false);
  };
  // const { data, loading, error, refetch } = useQuery(GET_USERS);
  // console.log(data, 'dataaaaa');
  const values: ICareInstitutionFormValues = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    phoneNumber: '',
    mobileNumber: 0,
    fax: '',
    shortName: '',
    companyName: '',
    street: '',
    city: '',
    zip: '',
    state: {
      label: 'Select State',
      value: '',
    },
    country: {
      label: 'Select Country',
      value: '',
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      children={(props: FormikProps<ICareInstitutionFormValues>) => (
        <AddCareInstitution {...props} />
      )}
      validationSchema={EmployeeValidationSchema}
    />
  );
};

export default CareInstitutionForm;
