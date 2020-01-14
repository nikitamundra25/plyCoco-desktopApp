import React, { Component, useState } from "react";
import { ILeasingValues } from "../../../interfaces";
import { FormikHelpers, Formik, FormikProps } from "formik";
import { Mutation, Query } from "@apollo/react-components";
import LeasingPersonalDataFormComponent from "./LeasingPersonalDataFormComponent";
import {
  GET_LEASING_DATA,
  ADD_LEASING_DATA
} from "../../../queries/LeasingQueries";

class LeasingPersonalData extends Component<any, ILeasingValues> {
  handleSubmit = (
    values: ILeasingValues,
    { setSubmitting }: FormikHelpers<ILeasingValues>,
    saveLeasingData: any
  ) => {
    // todo call
    debugger;
    const paylaod = {
      variables: {
        careGiverInput: { ...values }
      }
    };
    saveLeasingData(paylaod);
    setSubmitting(false);
  };

  render() {
    const initialValues: ILeasingValues = {
      placeOfBirth: "",
      birthName: "",
      nationality: "",
      maritalStatus: "",
      children: "",
      factorChildAllowance: "",
      healthInsuranceType: "",
      healthInsuranceProvider: "",
      socialSecurityNumber: "",
      religion: "",
      controlId: "",
      taxBracket: "",
      preoccupation: "",
      payrollIBAN: "",
      status: ""
    };

    return (
      <Mutation mutation={ADD_LEASING_DATA}>
        {(saveLeasingData: any) => {
          return (
            <Formik
              initialValues={initialValues}
              onSubmit={(
                values: ILeasingValues,
                actions: FormikHelpers<ILeasingValues>
              ): Promise<any> | void =>
                this.handleSubmit(values, actions, saveLeasingData)
              }
              // validationSchema={CareGiverValidationSchema}
              render={(props: FormikProps<ILeasingValues>) => {
                return <LeasingPersonalDataFormComponent {...props} />;
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

/* const fetchLeasingData = (props:any) =>{
  return (
    <Query 
      query={GET_LEASING_DATA}    
    >
    {({loading, error, data}:any)=>{
      if(loading) return "Loading..."
      if(error) return `Error! ${error.message}`;
      return <LeasingPersonalData data={data} />
    }}

    </Query>
  )
} */

export default LeasingPersonalData;
