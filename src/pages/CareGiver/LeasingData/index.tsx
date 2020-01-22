import React, {
  Component,
  useState,
  FunctionComponent,
  useEffect,
} from 'react';
import {
  ILeasingValues,
  IAddLeasingRes,
  ILeasingInput,
} from '../../../interfaces';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import { Mutation, Query } from '@apollo/react-components';
import LeasingPersonalDataFormComponent from './LeasingPersonalDataFormComponent';
import {
  UPDATE_LEASING_DATA,
  GET_LEASING_DATA_BY_ID,
} from '../../../queries/LeasingQueries';
import { LeasingDataValidationSchema } from '../../../validations/LeasingDataValidationSchema';
import { useParams, useHistory, RouteComponentProps } from 'react-router';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { languageTranslation } from '../../../helpers';
import { toast } from 'react-toastify';
import { GET_LEASING_INFO } from '../../../queries';

export const LeasingPersonalData: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps,
) => {
  let { id } = useParams();
  const [leasingData, setleasingData] = useState<ILeasingValues | null>();

  // To update employee details into db
  const [saveLeasingData] = useMutation<
    { saveLeasingData: IAddLeasingRes },
    { id: number; leasingInput: ILeasingInput }
  >(UPDATE_LEASING_DATA);

  // To get the employee details by id
  const [
    getLeasingInformation,
    { data: leasingDetails, error: detailsError, refetch },
  ] = useLazyQuery<any>(GET_LEASING_INFO);

  // Fetch leasing data on mount
  useEffect(() => {
    // Fetch details by care giver id
    if (id) {
      getLeasingInformation({
        variables: { userId: id },
      });
    }
  }, []);

  useEffect(() => {
    if (leasingDetails) {
    }
  }, [leasingDetails]);

  // function to add/edit employee information
  const handleSubmit = async (
    values: ILeasingValues,
    { setSubmitting, setFieldError }: FormikHelpers<ILeasingValues>,
  ) => {
    //to set submit state to false after successful signup
    const {
      placeOfBirth,
      birthName,
      nationality,
      maritalStatus,
      children,
      factorChildAllowance,
      healthInsuranceType,
      healthInsuranceProvider,
      socialSecurityNumber,
      religion,
      controlId,
      taxBracket,
      preoccupation,
      payrollIBAN,
      status,
    } = values;
    try {
      let leasingInput: ILeasingInput = {
        id,
        placeOfBirth,
        birthName,
        nationality,
        maritalStatus,
        children,
        factorChildAllowance,
        healthInsuranceType,
        healthInsuranceProvider,
        socialSecurityNumber,
        religion,
        controlId,
        taxBracket,
        preoccupation,
        payrollIBAN,
        status,
      };
      // Edit employee details
      if (id) {
        await saveLeasingData({
          variables: {
            id: parseInt(id),
            leasingInput,
          },
        });
        toast.success(languageTranslation('EMPLOYEE_UPDATE_SUCCESS_MSG'));
      }
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
    }
    setSubmitting(false);
  };
  const {
    placeOfBirth = '',
    birthName = '',
    nationality = '',
    maritalStatus = '',
    children = '',
    factorChildAllowance = '',
    healthInsuranceType = '',
    healthInsuranceProvider = '',
    socialSecurityNumber = '',
    religion = '',
    controlId = '',
    taxBracket = '',
    preoccupation = '',
    payrollIBAN = '',
    status = '',
  } = leasingData ? leasingData : {};
  const initialValues: ILeasingValues = {
    placeOfBirth,
    birthName,
    nationality,
    maritalStatus,
    children,
    factorChildAllowance,
    healthInsuranceType,
    healthInsuranceProvider,
    socialSecurityNumber,
    religion,
    controlId,
    taxBracket,
    preoccupation,
    payrollIBAN,
    status,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LeasingDataValidationSchema}
      render={(props: FormikProps<ILeasingValues>) => {
        return <LeasingPersonalDataFormComponent {...props} />;
      }}
    />
  );
};

export default LeasingPersonalData;
