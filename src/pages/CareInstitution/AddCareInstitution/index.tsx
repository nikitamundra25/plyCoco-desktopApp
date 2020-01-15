import React, { Component } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { CareInstituionValidationSchema } from '../../../validations';
import { ICareInstitutionFormValues } from '../../../interfaces';
import AddCareInstitution from './AddCareInstitution';
import { CareInstitutionQueries } from "../../../queries";
import { useMutation } from '@apollo/react-hooks';
import { logger, languageTranslation } from "../../../helpers";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { AppRoutes } from '../../../config';

const [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION
] = CareInstitutionQueries;


export const CareInstitutionForm = () => {

  const [addCareInstitution, { error, data }] = useMutation<{ addCareInstitution: ICareInstitutionFormValues }>(ADD_CARE_INSTITUTION);

  let history = useHistory();
  
  const handleSubmit = async (
    values: ICareInstitutionFormValues,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>,
  ) => {
    //to set submit state to false after successful signup
    try {
      const dataSubmit: any = {
        salutation: values && values.salutation ? values.salutation.label : "",
        city: values.city,
        companyName: values.companyName,
        email: values.email,
        fax: values.fax,
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: values.mobileNumber,
        phoneNumber: values.phoneNumber,
        shortName: values.shortName,
        street: values.street,
        userName: values.userName,
        zipCode: values.zipCode,
        countryId: values && values.country ? values.country.value : "",
        stateId: values && values.state ? values.state.value : "",
      }
      setSubmitting(false);
      await addCareInstitution({
        variables: {
          careInstitutionInput: dataSubmit
        }
      })
      toast.success(languageTranslation('CARE_INSTITUTION_ADD_SUCCESS_MSG'));
      history.push(AppRoutes.CARE_INSTITUTION);
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
      logger(error)
    }
  };
  // const { data, loading, error, refetch } = useQuery(GET_USERS);
  // console.log(data, 'dataaaaa');
  const values: ICareInstitutionFormValues = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    fax: '',
    shortName: '',
    companyName: '',
    street: '',
    city: '',
    isArchive: false,
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
