import React, { useEffect } from "react";
import { Form, Button } from "reactstrap";
import { Formik, FormikProps, FormikHelpers } from 'formik';
import CareInstitutionContact from "./CareInstitutionContact";
import "../careinstitution.scss";
import PersonalInfoForm from "./PersonalInfoForm";
import { ICareInstitutionContact, ICareInstitutionFormValues } from "../../../interfaces";
import { CareInstituionValidationSchema } from "../../../validations";
import { useParams } from "react-router";
import { CareInstitutionQueries } from "../../../queries";
import { useLazyQuery } from "@apollo/react-hooks";

const [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  GET_CARE_INSTITUION_BY_ID] = CareInstitutionQueries

const PersonalInformation: any = (props: any) => {

  let { id } = useParams();
  const Id: any | undefined = id

  // To get the care instituion details by id
  const [
    getCareInstitutionDetails,
    { data: careInstituionDetails, error: detailsError, refetch },
  ] = useLazyQuery<any>(GET_CARE_INSTITUION_BY_ID);

  useEffect(() => {
    // Fetch details by employee id
    if (id) {
      getCareInstitutionDetails({
        variables: { careInstitutionId: parseInt(Id) },
      });
    }
  }, [])

  const handleContactSubmit = (
    values: ICareInstitutionContact,
    { setSubmitting }: FormikHelpers<ICareInstitutionContact>
  ) => {
    //to set submit state to false after successful signup
    setSubmitting(false);
  };

  const contactFormValues: ICareInstitutionContact = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    phoneNumber: '',
    mobileNumber: '',
    faxNumber: '',
    constactType: '',
    comments: '',
    groupAttributes: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const handleSubmit = (
    values: ICareInstitutionFormValues,
    // { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>,
  ) => {
    //to set submit state to false after successful signup
    // setSubmitting(false);
    console.log("Data", values);

  };
  let values: ICareInstitutionFormValues
  if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
    const { getCareInstitution } = careInstituionDetails
    values = {
      id: Id,
      email: getCareInstitution.email,
      firstName: getCareInstitution.firstName,
      lastName: getCareInstitution.lastName,
      userName: getCareInstitution.userName,
      fax: '',
      shortName: '',
      companyName: '',
      street: '',
      city: '',
    };
    
  } else {
    values = {
      email: '',
      firstName: '',
      lastName: '',
      userName: '',
      fax: '',
      shortName: '',
      companyName: '',
      street: '',
      city: '',
    };
  }

  return (
    <Form className="form-section forms-main-section">
      <Formik
        initialValues={values}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        children={(props: FormikProps<ICareInstitutionFormValues>) => (
          <PersonalInfoForm {...props} />
        )}
        validationSchema={CareInstituionValidationSchema}
      />

      <Formik
        initialValues={contactFormValues}
        onSubmit={handleContactSubmit}
        children={(props: FormikProps<ICareInstitutionContact>) => (
          <CareInstitutionContact {...props} />
        )}
        validationSchema={""}
      />
    </Form>
  );
};
export default PersonalInformation;
