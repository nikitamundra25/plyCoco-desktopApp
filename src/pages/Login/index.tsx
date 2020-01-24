import React, { FunctionComponent } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { LoginValidationSchema } from '../../validations/LoginValidationSchema';
import { ILoginFormValues } from '../../interfaces';
import LoginFormComponent from './LoginFormComponent';
import { useHistory } from 'react-router';
import { LOGIN } from '../../queries';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { CareGiveAttributes, CareInstitutionAttr } from '../../config';

export const Login: FunctionComponent = () => {
  let history = useHistory();
  // Login mutation
  const [doLogin] = useMutation<
    { doLogin: any },
    { email: String; password: String }
  >(LOGIN);

  function compare(a: any, b: any) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.label.toUpperCase();
    const bandB = b.label.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  console.log(CareInstitutionAttr.sort(compare));

  // on login
  const handleSubmit = async (
    values: ILoginFormValues,
    { setSubmitting }: FormikHelpers<ILoginFormValues>,
  ) => {
    const { email, password } = values;

    let loginInput: ILoginFormValues = {
      email,
      password,
    };
    const loginResp = await doLogin({ variables: { ...loginInput } });
    if (
      loginResp.data &&
      loginResp.data.doLogin &&
      loginResp.data.doLogin.message
    ) {
      if (loginResp.data.doLogin.status === 'success') {
        localStorage.setItem('token', loginResp.data.doLogin.token);
        toast.success(loginResp.data.doLogin.message);
        history.push('/dashboard');
      } else {
        toast.error(loginResp.data.doLogin.message);
      }
    }
    //to set submit state to false after successful login

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
};

export default Login;
