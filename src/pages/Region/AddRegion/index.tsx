import React, { useEffect, useState, FunctionComponent } from "react";
import {
  IRegionFormValue,
  IAddEmployeeRes,
  IRegionInput
} from "../../../interfaces";
import { FormikHelpers, Formik, FormikProps } from "formik";
import RegionFormComponent from "./RegionFormComponent";
import { RegionValidationSchema } from "../../../validations/RegionValidationSchema";
import { RegionQueries } from "../../../queries/Region";
import { useParams, useHistory } from "react-router";
import { logger } from "../../../helpers";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";

const [ADD_REGION] = RegionQueries;

export const AddRegion: FunctionComponent = () => {
  // get id from params
  let { id } = useParams();
  let history = useHistory();
  const [regionData, setRegionData] = useState<IRegionFormValue | null>();
  logger(id, "id");

  // To add emplyee details into db
  const [addRegion, { error, data }] = useMutation<
    { addRegion: IRegionInput },
    { regionInput: IRegionInput }
  >(ADD_REGION);

  //  // To get the employee details by id
  // const [
  //   getRegionDetails,
  //   { data: regionDetails, error: detailsError, refetch }
  // ] = useLazyQuery<any>(GET_REGION_BY_ID);

  // // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Fetch details by employee id
  //   if (id) {
  //     getRegionDetails({
  //       variables: { id }
  //     });
  //   }
  const handleSubmit = async (
    values: IRegionFormValue,
    { setSubmitting }: FormikHelpers<IRegionFormValue>
  ) => {
    const { regionName } = values;
    try {
      let regionInput: IRegionFormValue = {
        regionName
      };
      await addRegion({
        variables: {
          regionInput
        }
      });
      toast.success("Region Added Successfully");
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
  const values: IRegionFormValue = { regionName: "" };

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
