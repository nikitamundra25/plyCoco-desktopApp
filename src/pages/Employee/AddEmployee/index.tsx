import React from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { EmployeeValidationSchema } from "../../../validations/EmployeeValidationSchema";
import { IEmployeeFormValues } from "../../../interfaces";
import EmployeeFormComponent from "./EmployeeFormComponent";
import { useMutation } from "@apollo/react-hooks";
import { EmployeeQueries } from "../../../queries";
const [ADD_EMPLOYEE] = EmployeeQueries;
import { logger } from "../../../helpers";

export const EmployeeForm = () => {
  // const [addUser, { data }] = useMutation<IAddEmployee>(ADD_EMPLOYEE);
  // logger(data);
  // logger("employeeee data");
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
