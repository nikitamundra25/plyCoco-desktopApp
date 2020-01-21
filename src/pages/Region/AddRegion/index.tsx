import React, { useEffect, useState, FunctionComponent } from 'react';
import {
  IRegionFormValue,
  IAddEmployeeRes,
  IRegionInput,
} from '../../../interfaces';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import RegionFormComponent from './RegionFormComponent';
import { RegionValidationSchema } from '../../../validations/RegionValidationSchema';
import { RegionQueries } from '../../../queries/Region';
import { useParams, useHistory } from 'react-router';
import { logger } from '../../../helpers';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { AppRoutes } from '../../../config';

const [ADD_REGION, GET_REGIONS] = RegionQueries;

export const AddRegion: FunctionComponent<{ toggle: () => void }> = (props: {
  toggle: () => void;
}) => {
  // get id from params
  let { id } = useParams();
  let history = useHistory();
  const [regionData, setRegionData] = useState<IRegionFormValue | null>();
  logger(id, 'id');

  // To add emplyee details into db
  const [addRegion, { error, data }] = useMutation<
    { addRegion: IRegionInput },
    { regionInput: IRegionInput }
  >(ADD_REGION);

  const handleSubmit = async (
    values: IRegionFormValue,
    { setSubmitting }: FormikHelpers<IRegionFormValue>,
  ) => {
    const { regionName } = values;
    try {
      let regionInput: IRegionFormValue = {
        regionName,
      };
      await addRegion({
        variables: {
          regionInput,
        },
      });
      toast.success('Region Added Successfully.');
      props.toggle();
      history.push(AppRoutes.REGION);
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
    }

    setSubmitting(false);
  };
  const values: IRegionFormValue = { regionName: '' };

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
