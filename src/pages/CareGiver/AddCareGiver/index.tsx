import React, { Component, useState } from "react";
import {  CareGiverValues, ICareGiverInput } from "../../../interfaces";
import { FormikHelpers, Formik, FormikProps } from "formik";
import CareGiverFormComponent from "./CareGiverFormComponent";
import { CareGiverValidationSchema } from "../../../validations/CareGiverValidationSchema";
import { useMutation } from "@apollo/react-hooks";
import { ADD_CAREGIVER } from "../../../queries/CareGiver";
import { Mutation } from "@apollo/react-components";

class CareGiverForm extends Component<any, CareGiverValues> {
  handleSubmit = (
    values: CareGiverValues,
    { setSubmitting }: FormikHelpers<CareGiverValues>,
    addCareGiver: any
  ) => {
    // todo call
    const {
      salutation,
      firstName,
      lastName,
      address1,
      address2,
      street,
      city,
      stateId,
      countryId,
      postCode,
      pinCode,
      email,
      dateOfBirth,
      phoneNumber,
      fax,
      mobilePhone,
      userName,
      bankName,
      qualifications,
      leasing,
      driverLicenseNumber,
      driversLicense,
      vehicleavailable,
      legalForm,
      companyName,
      registrationNumber,
      registerCourt,
      executiveDirector,
      socialSecurityContribution,
      taxNumber,
      remarks,
      workZones,
      status
    } = values
    debugger;
    try {
      let  careGiverInput:ICareGiverInput = {
        salutation,
      firstName,
      lastName,
      address1,
      address2,
      street,
      city,
      stateId,
      countryId,
      postCode,
      pinCode,
      email,
      dateOfBirth,
      phoneNumber,
      fax,
      mobilePhone,
      userName,
      bankName,
      qualifications,
      leasing,
      driverLicenseNumber,
      driversLicense,
      vehicleavailable,
      legalForm,
      companyName,
      registrationNumber,
      registerCourt,
      executiveDirector,
      socialSecurityContribution,
      taxNumber,
      remarks,
      workZones,
      status
        
      } 
    } catch (error) {
      
    }
    const paylaod = {
      variables: {
        careGiverInput: { 
          salutation: values.salutation
         }
      }
    };
    addCareGiver(paylaod);
    setSubmitting(false);
  };

  render() {
    const initialValues: CareGiverValues = {
      salutation: "",
      firstName: "tester",
      lastName: "tester",
      address1: "tester",
      address2: "tester",
      street: "tester",
      city: "tester",
      stateId: "tester",
      countryId: "",
      postCode: "9875563",
      pinCode: "9875563",
      email: "tester@tester.tester",
      dateOfBirth: "12/12/1992",
      phoneNumber: "789952",
      fax: "789654",
      mobilePhone: "9874563215",
      userName: "tester",
      bankName: "tester",
      qualifications:"",
      leasing: "tester",
      driverLicenseNumber: "6978",
      driversLicense: false,
      vehicleavailable: false,
      legalForm: "",
      companyName: "tester",
      registrationNumber: "tester",
      registerCourt: "tester",
      executiveDirector: "tester",
      socialSecurityContribution: false,
      taxNumber: "35tester",
      remarks: "tester",
      workZones:"",
      status: "active"
    };

    return (
      <Mutation mutation={ADD_CAREGIVER}>
        {(addCareGiver: any) => (
          <Formik
            initialValues={initialValues}
            onSubmit={(
              values: CareGiverValues,
              actions: FormikHelpers<CareGiverValues>
            ): Promise<any> | void =>
              this.handleSubmit(values, actions, addCareGiver)
            }
            validationSchema={CareGiverValidationSchema}
            render={(props: FormikProps<CareGiverValues>) => {
              return <CareGiverFormComponent {...props} />;
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default CareGiverForm;
