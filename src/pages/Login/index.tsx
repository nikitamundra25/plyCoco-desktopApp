import React, { Component } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { LoginValidationSchema } from "../../validations/LoginValidationSchema";
import { ILoginState, ILoginFormValues } from "../../interfaces";
import LoginFormComponent from "./LoginFormComponent";
import { storeCurrLangRequest } from "../../actions";
import { connect } from "react-redux";
import { languageTranslation } from "../../helpers/LangauageTranslation";
import { Dispatch, Action } from "redux";
class Login extends Component<any, ILoginState> {
   handleSubmit = (
    values: ILoginFormValues,
    { setSubmitting }: FormikHelpers<ILoginFormValues>
  ) => {
    console.log("values", values);
    //to set submit state to false after successful login
    setSubmitting(false);
  };

  render() {
    const values: ILoginFormValues = { email: "", password: "" };
    return (
      <Formik
        initialValues={values}
        onSubmit={this.handleSubmit}
        children={(props: FormikProps<ILoginFormValues>) => (
          <LoginFormComponent {...props} {...this.props} />
        )}
        validationSchema={LoginValidationSchema}
      />
    );
  }
}

export default Login