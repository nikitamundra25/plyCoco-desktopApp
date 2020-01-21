import React, { Component, FunctionComponent } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { LoginValidationSchema } from '../../validations/LoginValidationSchema';
import { ILoginState, ILoginFormValues } from '../../interfaces';
import LoginFormComponent from './LoginFormComponent';
import { useHistory } from 'react-router';
import { LOGIN } from '../../queries';
import { useMutation } from '@apollo/react-hooks';


export const Login: FunctionComponent = () => {
  let history = useHistory();
  const [doLogin, { error, data }] = useMutation<
    { doLogin: any },
    { email: String, password: String }
  >(LOGIN);
  const handleSubmit = (
    values: ILoginFormValues,
    { setSubmitting }: FormikHelpers<ILoginFormValues>,
  ) => {
    //to set submit state to false after successful login
    const {
      email, password
    } = values

    let loginInput: ILoginFormValues = {
      email, password
    }
    doLogin({ variables: { ...loginInput } })
    history.push('/dashboard')
    setSubmitting(false);
  };

  const values: ILoginFormValues = { email: '', password: '' };
  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      children={(props: FormikProps<ILoginFormValues>) => (
        <LoginFormComponent {...props} />
      )}
      validationSchema={LoginValidationSchema}
    />
  );

}


export default Login;
