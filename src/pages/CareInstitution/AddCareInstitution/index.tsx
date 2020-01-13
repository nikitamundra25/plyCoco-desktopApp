import React, { Component } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { CareInstituionValidationSchema } from '../../../validations';
import { ICareInstitutionFormValues, IEmployeeState } from '../../../interfaces';
import AddCareInstitution from './AddCareInstitution';
import { CareInstitution } from "../../../queries";
import { useMutation } from '@apollo/react-hooks';


const [
  GET_CARE_INSTITUTION,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION
] = CareInstitution;


export const CareInstitutionForm = () => {

  const [addCareInstitution, { error, data }] = useMutation<{ addCareInstitution: ICareInstitutionFormValues }>(ADD_CARE_INSTITUTION);


  const handleSubmit = (
    values: any,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>,
  ) => {
    //to set submit state to false after successful signup
    console.log("Value", values);

    setSubmitting(false);
    addCareInstitution(values)
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
      validationSchema={CareInstituionValidationSchema}
    />
  );
};

export default CareInstitutionForm;
