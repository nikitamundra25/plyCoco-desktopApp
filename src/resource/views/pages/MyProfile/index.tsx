import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row, Card, CardHeader, CardBody, Button } from 'reactstrap';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { AppBreadcrumb } from '@coreui/react';
import { ProfileFormComponent } from './ProfileFormComponent';
import { AdminProfileMutations } from '../../../../graphql/Mutations';
import { ChangePwdFormComponent } from './ChangePwdFormComponent';
import { languageTranslation } from '../../../../helpers';
import routes from '../../../../routes/routes';
import {
  ProfileValidationSchema,
  ChangePasswordValidationSchema,
} from '../../../validations';
import { ProfileQueries } from '../../../../graphql/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { IProfileValues, IChangePasswordValues } from '../../../../interfaces';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';

const [UPDATE_ADMIN_PROFILE, CHANGE_PASSWORD] = AdminProfileMutations;
const [VIEW_PROFILE] = ProfileQueries;

const MyProfile: FunctionComponent = () => {
  const [profileValues, setProfileValues] = useState<IProfileValues | null>(
    null,
  );
  // update profile mutation
  const [updateAdminProfile, { loading }] = useMutation<
    {
      updateAdminProfile: any;
    },
    { userInput: IProfileValues }
  >(UPDATE_ADMIN_PROFILE, {
    onCompleted() {
      toast.success(languageTranslation('UPDATE_PROFILE_SUCCESS'));
    },
    onError: (error: ApolloError) => {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    },
  });
  // Change password
  const [changePassword, { loading: changePwdLoading, error }] = useMutation<
    {
      changePassword: any;
    },
    { password: string; oldPassword: string }
  >(CHANGE_PASSWORD, {
    onCompleted() {
      toast.success(languageTranslation('UPDATE_PASSWORD_SUCCESS'));
    },
    onError: (error: ApolloError) => {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    },
  });
  const { data: profileData } = useQuery(VIEW_PROFILE);
  useEffect(() => {
    if (profileData) {
      const {
        viewAdminProfile: { firstName, lastName, email },
      } = profileData;
      setProfileValues({ firstName, lastName, email });
    }
  }, [profileData]);
  // Function to update profile
  const handleSubmit = async (
    values: IProfileValues,
    { setSubmitting }: FormikHelpers<IProfileValues>,
  ) => {
    try {
      updateAdminProfile({ variables: { userInput: { ...values } } });
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    }
  };
  // Function to update password into db
  const onChangePassword = async (
    { oldPassword, password }: IChangePasswordValues,
    { resetForm }: FormikHelpers<IChangePasswordValues>,
  ) => {
    try {
      await changePassword({ variables: { oldPassword, password } });
      resetForm();
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    }
  };
  const { firstName = '', lastName = '', email = '' } = profileValues
    ? profileValues
    : {};
  const values = {
    firstName,
    lastName,
    email,
  };
  const ChangePasswordValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />
      </CardHeader>
      <CardBody>
        <Row>
          <Formik
            initialValues={values}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            children={(props: FormikProps<any>) => (
              <ProfileFormComponent {...props} loading={loading} />
            )}
            validationSchema={ProfileValidationSchema}
          />
          <Formik
            initialValues={ChangePasswordValues}
            enableReinitialize={true}
            onSubmit={onChangePassword}
            children={(props: FormikProps<IChangePasswordValues>) => (
              <ChangePwdFormComponent
                {...props}
                changePwdLoading={changePwdLoading}
              />
            )}
            validationSchema={ChangePasswordValidationSchema}
          />
        </Row>
      </CardBody>
    </Card>
  );
};

export default MyProfile;
