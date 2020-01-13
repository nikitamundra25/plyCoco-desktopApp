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
  let { id, userName } = useParams();
  logger(userName, id, 'userName');
  const [addEmployee, { error, data }] = useMutation<
    { addEmployee: IAddEmployeeRes },
    { employeeInput: IEmployeeInput }
  >(ADD_EMPLOYEE);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('calling did mount');
  }, []); // Pass empty array to only run once on mount.

  // function to add/edit employee information
  const handleSubmit = async (
    values: IEmployeeFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<IEmployeeFormValues>,
  ) => {
    //to set submit state to false after successful signup
    const {
      email,
      firstName,
      lastName,
      userName,
      telephoneNumber,
      accountHolderName,
      bankName,
      IBAN,
      BIC,
      additionalText,
      address1,
      address2,
      country,
      state,
      city,
      zip,
      joiningDate,
      image,
    } = values;
    try {
      await addEmployee({
        variables: {
          employeeInput: {
            firstName,
            lastName,
            userName,
            email,
            phoneNumber: telephoneNumber ? telephoneNumber.toString() : '',
            joiningDate,
            countryId: country ? country.value : '',
            stateId: state ? state.value : '',
            city,
            zipCode: zip,
            address1,
            address2,
            regionId: '',
            bankName,
            accountHolder: accountHolderName,
            additionalText,
            IBAN,
            BIC,
          },
        },
      });
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      setFieldError('email', message);
    }
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
    city: '',
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
