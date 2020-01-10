import React, { Component } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { LoginValidationSchema } from '../../validations/LoginValidationSchema';
import { ILoginState, ILoginFormValues } from '../../interfaces';
import LoginFormComponent from './LoginFormComponent';

class Login extends Component<any, ILoginState> {
  handleSubmit = (
    values: ILoginFormValues,
    { setSubmitting }: FormikHelpers<ILoginFormValues>,
  ) => {
    //to set submit state to false after successful login
    setSubmitting(false);
  };

  render() {
    const values: ILoginFormValues = { email: '', password: '' };
    return (
      <Formik
        initialValues={values}
        onSubmit={this.handleSubmit}
        children={(props: FormikProps<ILoginFormValues>) => (
          <LoginFormComponent {...props} />
        )}
        validationSchema={LoginValidationSchema}
      />
    );
  }
}

export default Login;
