import React from "react";
import { Form, Button } from "reactstrap";
import { Formik, FormikProps, FormikHelpers } from 'formik';
import CareInstitutionContact from "./CareInstitutionContact";
import "../careinstitution.scss";
import PersonalInfoForm from "./PersonalInfoForm";
import { ICareInstitutionContact, ICareInstitutionFormValues } from "../../../interfaces";
import { CareInstituionValidationSchema } from "../../../validations";
const PersonalInformation: any = (props: any) => {

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

  const values: ICareInstitutionFormValues = {
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

  return (
    <Form className="form-section forms-main-section">
      <Formik
        initialValues={values}
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
