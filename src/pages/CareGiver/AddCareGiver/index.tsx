import React, { Component, useState, FunctionComponent } from "react";
import {
  CareGiverValues,
  ICareGiverInput,
  IAddCargiverRes
} from "../../../interfaces";
import { FormikHelpers, Formik, FormikProps } from "formik";
import CareGiverFormComponent from "./CareGiverFormComponent";
import { CareGiverValidationSchema } from "../../../validations/CareGiverValidationSchema";
import { useMutation } from "@apollo/react-hooks";
import { ADD_CAREGIVER, GET_CAREGIVERS } from "../../../queries/CareGiver";
import { Mutation } from "@apollo/react-components";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { languageTranslation } from "../../../helpers";
import { AppRoutes } from "../../../config";

export const CareGiverForm: FunctionComponent = () => {
  let history = useHistory();

  const [caregiverData, setCaregiverData] = useState<CareGiverValues | null>();

  // To add emplyee details into db
  const [addCaregiver, { error, data }] = useMutation<
    { addCaregiver: IAddCargiverRes },
    { careGiverInput: ICareGiverInput }
  >(ADD_CAREGIVER);

  // function to add/edit employee information
  const handleSubmit = async (
    values: CareGiverValues,
    { setSubmitting, setFieldError }: FormikHelpers<CareGiverValues>
  ) => {
    //to set submit state to false after successful signup
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
      mobileNumber,
      userName,
      qualifications,
      driverLicenseNumber,
      driversLicense,
      vehicleAvailable,
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
    } = values;
    try {
      let careGiverInput: ICareGiverInput = {
        salutation: salutation && salutation.label ? salutation.label : "",
        firstName,
        lastName,
        address1,
        address2,
        street,
        city,
        stateId: stateId && stateId.value ? parseInt(stateId.value) : undefined,
        countryId:
          countryId && countryId.value ? parseInt(countryId.value) : undefined,
        postCode,
        pinCode,
        email,
        dateOfBirth,
        phoneNumber,
        fax,
        mobileNumber,
        userName,
        qualifications:
          qualifications && qualifications.length
            ? qualifications.map(quali => quali.value)
            : [],
        driverLicenseNumber,
        driversLicense,
        vehicleAvailable,
        legalForm: legalForm && legalForm.value ? legalForm.value : "",
        companyName,
        registrationNumber,
        registerCourt,
        executiveDirector,
        socialSecurityContribution,
        taxNumber,
        remarks,
        workZones:
          workZones && workZones.length ? workZones.map(wz => wz.value) : [],
        status
      };
      await addCaregiver({
        variables: {
          careGiverInput
        },
        update: (cache, { data: { addCaregiver } }: any) => {
          const data: any = cache.readQuery({ query: GET_CAREGIVERS });
          cache.writeQuery({
            query: GET_CAREGIVERS,
            data: { getCaregivers: data.getCaregivers.concat([addCaregiver]) }
          });
        }
      });
      toast.success(languageTranslation("CAREGIVER_ADD_SUCCESS_MSG"));

      history.push(AppRoutes.CARE_GIVER);
    } catch (error) {
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "")
        .replace("GraphQL error: ", "");
      // setFieldError('email', message);
      toast.error(message);
      setSubmitting(false);
    }
  };

  const {
    salutation = undefined,
    firstName = "",
    lastName = "",
    address1 = "",
    address2 = "",
    street = "",
    city = "",
    stateId = undefined,
    countryId = undefined,
    postCode = "",
    pinCode = "",
    email = "",
    dateOfBirth = "",
    phoneNumber = "",
    fax = "",
    mobileNumber = "",
    userName = "",
    qualifications = undefined,
    driverLicenseNumber = "",
    driversLicense = false,
    vehicleAvailable = false,
    legalForm = undefined,
    companyName = "",
    registrationNumber = "",
    registerCourt = "",
    executiveDirector = "",
    socialSecurityContribution = false,
    taxNumber = "",
    remarks = [{ commentBy: "", description: "", commentAt: "" }],
    workZones = undefined,
    status = ""
  } = caregiverData ? caregiverData : {};

  const initialValues: CareGiverValues = {
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
    mobileNumber,
    userName,
    qualifications,
    driverLicenseNumber,
    driversLicense,
    vehicleAvailable,
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
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CareGiverValidationSchema}
      render={(props: FormikProps<CareGiverValues>) => {
        return <CareGiverFormComponent {...props} />;
      }}
    />
  );
};

export default CareGiverForm;
