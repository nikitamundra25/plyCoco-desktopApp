import React, { FunctionComponent, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { LoginValidationSchema } from '../../../validations/LoginValidationSchema';
import { ILoginFormValues, ILoginResponse } from '../../../../interfaces';
import LoginFormComponent from './LoginFormComponent';
import { LOGIN } from '../../../../graphql/queries';
import { AppRoutes } from '../../../../config';

export const Login: FunctionComponent = () => {
  let history = useHistory();
  // Login mutation
  const [adminLogin, { loading }] = useMutation<
    {
      adminLogin: ILoginResponse;
    },
    { authInput: ILoginFormValues }
  >(LOGIN, {
    onCompleted({ adminLogin: { token, message, status } }) {
      if (status === 'failed') {
        toast.error(message);
      } else {
        localStorage.setItem('token', token);
        history.push(AppRoutes.MAIN);
      }
    },
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push(AppRoutes.HOME);
    }
  }, []);
  // on login
  const handleSubmit = (
    { email, password }: ILoginFormValues,
    { setSubmitting }: FormikHelpers<ILoginFormValues>,
  ) => {
    try {
      adminLogin({
        variables: { authInput: { email, password } },
      });
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    }
  };

  const values: ILoginFormValues = { email: '', password: '' };
  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      children={(props: FormikProps<ILoginFormValues>) => (
        <LoginFormComponent {...props} loading={loading} />
      )}
      validationSchema={LoginValidationSchema}
    />
  );
};

export default Login;
