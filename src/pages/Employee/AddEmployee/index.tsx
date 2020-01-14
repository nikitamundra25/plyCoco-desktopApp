import React, { useEffect, useState, FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import moment from 'moment';
import { EmployeeValidationSchema } from '../../../validations/EmployeeValidationSchema';
import {
  IEmployeeFormValues,
  IEmployeeInput,
  IAddEmployeeRes,
} from '../../../interfaces';
import EmployeeFormComponent from './EmployeeFormComponent';
import { EmployeeQueries } from '../../../queries';
import { logger, languageTranslation } from '../../../helpers';
import { AppRoutes } from '../../../config';

const [ADD_EMPLOYEE, GET_EMPLOYEE_BY_ID, , UPDATE_EMPLOYEE] = EmployeeQueries;

export const EmployeeForm: FunctionComponent = () => {
  // get id from params
  let { id } = useParams();
  let history = useHistory();
  const [
    employeeData,
    setEmployeeData,
  ] = useState<IEmployeeFormValues | null>();
  logger(id, 'id');

  // To add emplyee details into db
  const [addEmployee, { error, data }] = useMutation<
    { addEmployee: IAddEmployeeRes },
    { employeeInput: IEmployeeInput }
  >(ADD_EMPLOYEE);

  // To update employee details into db
  const [updateEmployee] = useMutation<
    { updateEmployee: IAddEmployeeRes },
    { id: number; employeeInput: IEmployeeInput }
  >(UPDATE_EMPLOYEE);

  // To get the employee details by id
  const [
    getEmployeeDetails,
    { data: employeeDetails, error: detailsError, refetch },
  ] = useLazyQuery<any>(GET_EMPLOYEE_BY_ID);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Fetch details by employee id
    if (id) {
      getEmployeeDetails({
        variables: { id },
      });
    }
    if (employeeDetails && employeeDetails.viewEmployee) {
      const { viewEmployee } = employeeDetails;
      setEmployeeData({
        ...viewEmployee,
        ...viewEmployee.employee,
        ...viewEmployee.bankDetails,
        accountHolderName: viewEmployee.bankDetails
          ? viewEmployee.bankDetails.accountHolder
          : '',
        telephoneNumber: viewEmployee.phoneNumber || '',
      });
    }
  }, [employeeDetails]); // Pass empty array to only run once on mount. Here it will run when the value of employeeDetails get changed.

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
      let employeeInput: IEmployeeInput = {
        firstName,
        lastName,
        userName,
        email,
        phoneNumber: telephoneNumber ? telephoneNumber.toString() : '',
        joiningDate: joiningDate
          ? moment(joiningDate).format('YYYY/MM/DD')
          : null,
        country: country && country.label ? country.label : null,
        state: state && state.label ? state.label : null,
        city,
        zipCode: zip,
        address1,
        address2,
        bankName,
        accountHolder: accountHolderName,
        additionalText,
        IBAN,
        BIC,
        profileImage: image,
      };
      // Edit employee details
      if (id) {
        await updateEmployee({
          variables: {
            id: parseInt(id),
            employeeInput,
          },
        });
        toast.success(languageTranslation('EMPLOYEE_UPDATE_SUCCESS_MSG'));
      } else {
        await addEmployee({
          variables: {
            employeeInput,
          },
        });
        toast.success(languageTranslation('EMPLOYEE_ADD_SUCCESS_MSG'));
      }
      history.push(AppRoutes.EMPLOYEE);
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
  // Fetch values in case of edit by default it will be null or undefined
  const {
    email = '',
    firstName = '',
    lastName = '',
    userName = '',
    address1 = '',
    address2 = '',
    city = '',
    zip = '',
    accountHolderName = '',
    bankName = '',
    IBAN = '',
    BIC = '',
    additionalText = '',
    telephoneNumber = undefined,
  } = employeeData ? employeeData : {};

  const values: IEmployeeFormValues = {
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
    city,
    zip,
    joiningDate: '',
  };
  return (
    <Formik
      initialValues={values}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      children={(props: FormikProps<IEmployeeFormValues>) => (
        <EmployeeFormComponent {...props} />
      )}
      validationSchema={EmployeeValidationSchema}
    />
  );
};

export default EmployeeForm;
