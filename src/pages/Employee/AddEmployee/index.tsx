import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { EmployeeValidationSchema } from "../../../validations/EmployeeValidationSchema";
import {
  IEmployeeFormValues,
  IEmployeeInput,
  IAddEmployeeRes
} from "../../../interfaces";
import EmployeeFormComponent from "./EmployeeFormComponent";
import { EmployeeQueries } from "../../../queries";
import { logger } from "../../../helpers";
import { toast } from "react-toastify";
import { AppRoutes } from "../../../config";

const [ADD_EMPLOYEE, GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE] = EmployeeQueries;

export const EmployeeForm = () => {
  let { id, userName } = useParams();
  logger(userName, id, "userName");
  // To add emplyee details into db
  const [addEmployee, { error, data }] = useMutation<
    { addEmployee: IAddEmployeeRes },
    { employeeInput: IEmployeeInput }
  >(ADD_EMPLOYEE);
  // To Edit employee details by id
  const [updateEmployee] = useMutation<
    { updateEmployee: IAddEmployeeRes },
    { employeeInput: IEmployeeInput }
  >(ADD_EMPLOYEE);

  // Fetch details by employee id
  const [getEmployeeById, { data: employeeDetails }] = useLazyQuery<any>(
    GET_EMPLOYEE_BY_ID
  );

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("calling did mount");
  }, []); // Pass empty array to only run once on mount.

  // function to add/edit employee information
  const handleSubmit = async (
    values: IEmployeeFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<IEmployeeFormValues>
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
      image
    } = values;
    try {
      let employeeInput: IEmployeeInput = {
        firstName,
        lastName,
        userName,
        email,
        phoneNumber: telephoneNumber ? telephoneNumber.toString() : "",
        joiningDate: joiningDate ? joiningDate : null,
        countryId: country && country.value ? parseInt(country.value) : null,
        stateId: state && state.value ? parseInt(state.value) : null,
        city,
        zipCode: zip,
        address1,
        address2,
        bankName,
        accountHolder: accountHolderName,
        additionalText,
        IBAN,
        BIC
      };
      await addEmployee({
        variables: {
          employeeInput
        }
      });
      toast.success("Employee added sucessfully");
      // this.props.history.push(AppRoutes.EMPLOYEE);
    } catch (error) {
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "")
        .replace("GraphQL error: ", "");
      // setFieldError('email', message);
      toast.error(message);
    }
    setSubmitting(false);
  };
  const values: IEmployeeFormValues = {
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    telephoneNumber: undefined,
    accountHolderName: "",
    bankName: "",
    IBAN: "",
    BIC: "",
    additionalText: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    joiningDate: "",
    bankAccountNumber: ""
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
