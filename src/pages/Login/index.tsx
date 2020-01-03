import React, { Component } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { LoginValidationSchema } from '../../validations/LoginValidationSchema';
import { ILoginState, ILoginFormValues } from '../../interfaces';
import LoginFormComponent from './LoginFormComponent';
import { storeCurrLangRequest } from '../../actions';
import { connect } from 'react-redux';
import { languageTranslation } from '../../helpers/langauageTranslation';
import { Dispatch, Action } from 'redux';
class Login extends Component<any, ILoginState> {
  componentDidMount = () => {
    const curLang: string | any = localStorage.getItem('language');
    const languageData: any = languageTranslation(curLang);
    this.props.storeCurrLangRequest(languageData.language);
  };

  handleSubmit = (
    values: ILoginFormValues,
    { setSubmitting }: FormikHelpers<ILoginFormValues>,
  ) => {
    console.log('values', values);
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  storeCurrLangRequest: (data: any): Action<any> =>
    dispatch(storeCurrLangRequest(data)),
});
export default connect(undefined, mapDispatchToProps)(Login);
