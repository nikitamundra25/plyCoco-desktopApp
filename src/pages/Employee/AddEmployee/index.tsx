import React, { Component } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { EmployeeValidationSchema } from "../../../validations/EmployeeValidationSchema";
import { IEmployeeFormValues, IEmployeeState } from "../../../interfaces";
import EmployeeFormComponent from "./EmployeeFormComponent";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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

export const EmployeeForm = () => {
  const handleSubmit = (
    values: IEmployeeFormValues,
    { setSubmitting }: FormikHelpers<IEmployeeFormValues>
  ) => {
    //to set submit state to false after successful signup
    if (values.bankName) {
      console.log("inside bank name");
    }
    console.log("values areeeeee", values);
    setSubmitting(false);
  };
  // const { data, loading, error, refetch } = useQuery(GET_USERS);

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
    zip: "",
    joiningDate: "",
    bankAccountNumber: "",
    city: ""
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
