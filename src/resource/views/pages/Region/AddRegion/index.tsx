import React, { useState, FunctionComponent } from 'react';
import { IRegionFormValue, IRegionInput } from '../../../../../interfaces';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import RegionFormComponent from './RegionFormComponent';
import { RegionValidationSchema } from '../../../../validations/RegionValidationSchema';
import { RegionQueries } from '../../../../../queries/Region';
import { useParams, useHistory } from 'react-router';
import { logger } from '../../../../../helpers';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { AppRoutes } from '../../../../../config';

const [ADD_REGION] = RegionQueries;
let toastId: any = null;

export const AddRegion: FunctionComponent<{
  toggle: () => void;
  refetch: any;
}> = (props: { toggle: () => void; refetch: any }) => {
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
    {
      setSubmitting,
      setFieldValue,
      setFieldTouched,
      resetForm,
    }: FormikHelpers<IRegionFormValue>,
  ) => {
    const { regionName } = values;
    try {
      let regionInput: IRegionFormValue = {
        regionName,
      };
      toast.dismiss();
      await addRegion({
        variables: {
          regionInput,
        },
      });
      if (!toast.isActive(toastId)) {
        toastId = toast.success('Region Added Successfully.');
      }
      props.toggle();
      props.refetch();
      history.push(AppRoutes.REGION);
      setTimeout(() => {
        setFieldValue('regionName', '');
        setFieldTouched('regionName', false);
      }, 2000);
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }

    setSubmitting(false);
  };
  const values: IRegionFormValue = { regionName: '' };

  return (
    <Formik
      initialValues={values}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      children={(props: FormikProps<IRegionFormValue>) => (
        <RegionFormComponent {...props} />
      )}
      validationSchema={RegionValidationSchema}
    />
  );
};

export default AddRegion;
