import React, { Component, useState } from "react";
import { CareGiverState, CareGiverValues } from "../../../interfaces";
import { FormikHelpers, Formik, FormikProps } from "formik";
import CareGiverFormComponent from "./CareGiverFormComponent";
import { CareGiverValidationSchema } from "../../../validations/CareGiverValidationSchema";
import { useMutation } from "@apollo/react-hooks";
import { ADD_CAREGIVER } from "../../../queries/CareGiver";
import { Mutation } from "@apollo/react-components";

class CareGiverForm extends Component<any, CareGiverState> {
  handleSubmit = (
    values: CareGiverValues,
    { setSubmitting }: FormikHelpers<CareGiverValues>,
    addCareGiver: any
  ) => {
    // todo call
    debugger;
    const paylaod = {
      variables: {
        careGiverInput: { ...values }
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
      state: "tester",
      country: "",
      postCode: "9875563",
      email: "tester@tester.tester",
      dob: "12/12/1992",
      phone: "789952",
      fax: "789654",
      mobilePhone: "9874563215",
      username: "tester",
      bankName: "tester",
      qualification: ["tester"],
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
      workZones: "",
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
