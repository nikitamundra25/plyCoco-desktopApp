import React, { useState, FunctionComponent, useEffect } from 'react';
import {
  ILeasingValues,
  IAddLeasingRes,
  ILeasingInput,
  IReactSelectInterface,
} from '../../../interfaces';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import LeasingPersonalDataFormComponent from './LeasingPersonalDataFormComponent';
import { LeasingDataValidationSchema } from '../../../validations/LeasingDataValidationSchema';
import { useParams, RouteComponentProps } from 'react-router';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { languageTranslation } from '../../../helpers';
import { toast } from 'react-toastify';
import {
  GET_LEASING_INFO,
  ADD_UPDATE_CARE_GIVER_LEASING_INFO,
} from '../../../queries';
import {
  Nationality,
  MaritalStatus,
  Religion,
  Preoccupation,
  HealthInsuranceProvider,
  HealthInsuranceType,
} from '../../../config';

export const LeasingPersonalData: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps,
) => {
  let { id } = useParams();
  const [leasingData, setleasingData] = useState<ILeasingValues | null>();

  // To update employee details into db
  const [addUpdateLeasingInformation] = useMutation<
    { addUpdateLeasingInformation: IAddLeasingRes },
    { userId: number; leasingInformationInput: ILeasingInput }
  >(ADD_UPDATE_CARE_GIVER_LEASING_INFO);

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
        variables: { userId: parseInt(id) },
      });
    }
  }, []);

  const setLabelValue = (
    value: string,
    fieldOptions: IReactSelectInterface[],
  ) => {
    console.log(value, fieldOptions, 'dataaaaa');

    if (value) {
      return fieldOptions.filter(
        (item: IReactSelectInterface) => item.value === value,
      )[0];
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    if (leasingDetails) {
      console.log(leasingDetails, 'leasingDetails');
      const { getLeasingInformation } = leasingDetails;
      if (getLeasingInformation) {
        setleasingData({
          ...getLeasingInformation,
          nationality: setLabelValue(
            getLeasingInformation.nationality,
            Nationality,
          ),
          maritalStatus: setLabelValue(
            getLeasingInformation.maritalStatus,
            MaritalStatus,
          ),
          religion: setLabelValue(getLeasingInformation.religion, Religion),
          preoccupation: setLabelValue(
            getLeasingInformation.preOccupation,
            Preoccupation,
          ),
          healthInsuranceProvider: setLabelValue(
            getLeasingInformation.healthInsuranceProvider,
            HealthInsuranceProvider,
          ),
          healthInsuranceType: setLabelValue(
            getLeasingInformation.healthInsuranceType,
            HealthInsuranceType,
          ),
        });
      }
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
        placeOfBirth,
        birthName,
        nationality: nationality && nationality.value ? nationality.value : '',
        maritalStatus:
          maritalStatus && maritalStatus.value ? maritalStatus.value : '',
        children,
        factorChildAllowance: factorChildAllowance ? factorChildAllowance : '',
        healthInsuranceType:
          healthInsuranceType && healthInsuranceType.value
            ? healthInsuranceType.value
            : '',
        healthInsuranceProvider:
          healthInsuranceProvider && healthInsuranceProvider.value
            ? healthInsuranceProvider.value
            : '',
        socialSecurityNumber,
        religion: religion && religion.value ? religion.value : '',
        controlId,
        taxBracket,
        preOccupation:
          preoccupation && preoccupation.value ? preoccupation.value : '',
        payrollIBAN,
        status: status && status.value ? status.value : '',
      };
      if (id) {
        await addUpdateLeasingInformation({
          variables: {
            userId: parseInt(id),
            leasingInformationInput: leasingInput,
          },
        });
      }
      toast.success(languageTranslation('CARE_GIVER_LEASING_UPDATE_SUCCESS'));
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
  console.log(leasingData, 'leasingData');

  const {
    placeOfBirth = '',
    birthName = '',
    nationality = undefined,
    maritalStatus = undefined,
    children = '',
    factorChildAllowance = '',
    healthInsuranceType = undefined,
    healthInsuranceProvider = undefined,
    socialSecurityNumber = '',
    religion = undefined,
    controlId = '',
    taxBracket = '',
    preoccupation = undefined,
    payrollIBAN = '',
    status = undefined,
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
      enableReinitialize={true}
      onSubmit={handleSubmit}
      validationSchema={LeasingDataValidationSchema}
      render={(props: FormikProps<ILeasingValues>) => {
        return <LeasingPersonalDataFormComponent {...props} />;
      }}
    />
  );
};

export default LeasingPersonalData;
