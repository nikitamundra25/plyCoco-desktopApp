import React, { useEffect, useState, FunctionComponent } from "react";
import { IRegionFormValue } from "../../../interfaces";
import { FormikHelpers, Formik, FormikProps } from "formik";
import RegionFormComponent from "./RegionFormComponent";
import { RegionValidationSchema } from "../../../validations/RegionValidationSchema";

export const AddRegion: FunctionComponent = () => {
  const handleSubmit = (
    values: IRegionFormValue,
    { setSubmitting }: FormikHelpers<IRegionFormValue>
  ) => {
    //to set submit state to false after successful login
    console.log("values", values);
    setSubmitting(false);
  };
  const values: IRegionFormValue = { nameofRegion: "" };

  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      children={(props: FormikProps<IRegionFormValue>) => (
        <RegionFormComponent {...props} />
      )}
      validationSchema={RegionValidationSchema}
    />
  );
};

export default AddRegion;
