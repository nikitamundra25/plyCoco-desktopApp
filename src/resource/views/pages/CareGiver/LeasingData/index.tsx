import React, { useState, FunctionComponent, useEffect } from 'react';
import {
  ILeasingValues,
  IAddLeasingRes,
  ILeasingInput,
  IReactSelectInterface,
  IPayslipValues
} from '../../../../../interfaces';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import LeasingPersonalDataFormComponent from './LeasingPersonalDataFormComponent';
import LeasingPaySlipComponent from './PaySlip';
import { LeasingDataValidationSchema } from '../../../../validations/LeasingDataValidationSchema';
import { useParams, RouteComponentProps } from 'react-router';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { languageTranslation } from '../../../../../helpers';
import { toast } from 'react-toastify';
import {
  Nationality,
  MaritalStatus,
  Religion,
  Preoccupation,
  HealthInsuranceProvider,
  HealthInsuranceType,
  StatusOptions
} from '../../../../../config';
import { CareGiverMutations } from '../../../../../graphql/Mutations';
import { CareGiverQueries } from '../../../../../graphql/queries';
import Loader from '../../../containers/Loader/Loader';

const [, , GET_LEASING_INFO, , , , , , , ,GET_ALL_PAYSLIP_CAREGIVER] = CareGiverQueries;
const [, , , , ADD_UPDATE_CARE_GIVER_LEASING_INFO] = CareGiverMutations;

export const LeasingPersonalData: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  let { id } = useParams();
  const [leasingData, setleasingData] = useState<ILeasingValues | null>();
  const [payslipData, setpayslipData] = useState<ILeasingValues | null>();

  // To update employee details into db
  const [addUpdateLeasingInformation] = useMutation<
    { addUpdateLeasingInformation: IAddLeasingRes },
    { userId: number; leasingInformationInput: ILeasingInput }
  >(ADD_UPDATE_CARE_GIVER_LEASING_INFO);

  // To get the employee details by id
  const [
    getLeasingInformation,
    { data: leasingDetails, loading, refetch }
  ] = useLazyQuery<any>(GET_LEASING_INFO);

  // To get the employee details by id
    const [
      getAllPayslipCaregiver,
      { data: payslipDetails, loading: payslipLoading}
  ] = useLazyQuery<any>(GET_ALL_PAYSLIP_CAREGIVER);


  

  // Fetch leasing data on mount & user update
  useEffect(() => {
    // Fetch details by caregiver id
    if (id) {
      getLeasingInformation({
        variables: { userId: parseInt(id) }
      });
    }
  }, [id]);

  // Fetch payslip data on mount & user update
  useEffect(() => {
      // Fetch details by caregiver id
      if (id) {
        getAllPayslipCaregiver({
          variables: { userId: parseInt(id) }
        });
      }
  }, [id]);

  // console.log('payslipDetails',payslipDetails)

  const setLabelValue = (
    value: string,
    fieldOptions: IReactSelectInterface[]
  ) => {
    if (value) {
      return fieldOptions.filter(
        (item: IReactSelectInterface) => item.value === value
      )[0];
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    if (leasingDetails) {
      const { getLeasingInformation } = leasingDetails;
      if (getLeasingInformation) {
        setleasingData({
          ...getLeasingInformation,
          nationality: setLabelValue(
            getLeasingInformation.nationality,
            Nationality
          ),
          maritalStatus: setLabelValue(
            getLeasingInformation.maritalStatus,
            MaritalStatus
          ),
          status: setLabelValue(getLeasingInformation.status, StatusOptions),
          religion: setLabelValue(getLeasingInformation.religion, Religion),
          preoccupation: setLabelValue(
            getLeasingInformation.preOccupation,
            Preoccupation
          ),
          healthInsuranceProvider: setLabelValue(
            getLeasingInformation.healthInsuranceProvider,
            HealthInsuranceProvider
          ),
          healthInsuranceType: setLabelValue(
            getLeasingInformation.healthInsuranceType,
            HealthInsuranceType
          )
        });
      } else {
        setleasingData(null);
      }
    }
  }, [leasingDetails]);

  // function to add/edit employee information
  const handleSubmit = async (
    values: ILeasingValues,
    { setSubmitting, setFieldError }: FormikHelpers<ILeasingValues>
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
      firstDay,
      lastDay,
      monthlyWorkingHrs,
      weeklyWorkingHrs
    } = values;
    try {
      let leasingInput: ILeasingInput = {
        placeOfBirth,
        birthName,
        nationality: nationality && nationality.value ? nationality.value : '',
        maritalStatus:
          maritalStatus && maritalStatus.value ? maritalStatus.value : '',
        children: children ? children.toString() : '',
        factorChildAllowance: factorChildAllowance
          ? factorChildAllowance.toString()
          : '',
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
        firstDay,
        lastDay,
        monthlyWorkingHrs: monthlyWorkingHrs
          ? parseInt(monthlyWorkingHrs.toString())
          : null,
        weeklyWorkingHrs: weeklyWorkingHrs
          ? parseInt(weeklyWorkingHrs.toString())
          : null
      };
      if (id) {
        await addUpdateLeasingInformation({
          variables: {
            userId: parseInt(id),
            leasingInformationInput: leasingInput
          }
        });
        toast.success(languageTranslation('CARE_GIVER_LEASING_UPDATE_SUCCESS'));
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
    nationality = undefined,
    maritalStatus = undefined,
    children = 0,
    factorChildAllowance = 0,
    healthInsuranceType = undefined,
    healthInsuranceProvider = undefined,
    socialSecurityNumber = '',
    religion = undefined,
    controlId = '',
    taxBracket = '',
    preoccupation = undefined,
    payrollIBAN = '',
    status = undefined,
    firstDay = '',
    lastDay = '',
    monthlyWorkingHrs = null,
    weeklyWorkingHrs = null
  } = leasingData ? leasingData : {};

  const initialValues: ILeasingValues = {
    placeOfBirth: placeOfBirth ? placeOfBirth : '',
    birthName: birthName ? birthName : '',
    nationality,
    maritalStatus,
    children: children ? children : 0,
    factorChildAllowance: factorChildAllowance ? factorChildAllowance : 0,
    healthInsuranceType,
    healthInsuranceProvider,
    socialSecurityNumber: socialSecurityNumber ? socialSecurityNumber : '',
    religion,
    controlId: controlId ? controlId : '',
    taxBracket: taxBracket ? taxBracket : '',
    preoccupation,
    payrollIBAN: payrollIBAN ? payrollIBAN : '',
    status,
    firstDay:firstDay||'',
    lastDay:lastDay||'',
    monthlyWorkingHrs,
    weeklyWorkingHrs
  };

  return (
    <>
      {loading ? (
        <div className='overview-loader'>
          <Loader />
        </div>
      ) : (
        <>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            validationSchema={LeasingDataValidationSchema}
            children={(props: FormikProps<ILeasingValues>) => {
              return <LeasingPersonalDataFormComponent {...props} />;
            }}
          />
          <LeasingPaySlipComponent 
              payslipDetails={payslipDetails}
              loading={payslipLoading}
          />
        </>
      )}
    </>
  );
};

export default LeasingPersonalData;
