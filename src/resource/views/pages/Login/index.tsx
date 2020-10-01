import React, { FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import moment from "moment";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { ApolloError } from "apollo-client";
import { LoginValidationSchema } from "../../../validations/LoginValidationSchema";
import { ILoginFormValues, ILoginResponse } from "../../../../interfaces";
import LoginFormComponent from "./LoginFormComponent";
import { LOGIN } from "../../../../graphql/Mutations";
import { AppRoutes } from "../../../../config";
import { errorFormatter } from "../../../../helpers";
import * as Msal from "msal";

let toastId: any = null;

export const Login: FunctionComponent = () => {
  let history = useHistory();
  // Login mutation
  const [adminLogin, { loading }] = useMutation<
    {
      adminLogin: ILoginResponse;
    },
    { authInput: ILoginFormValues }
  >(LOGIN, {
    onCompleted({ adminLogin: { token, message, sessionExpire, status } }) {
      toast.dismiss();
      if (status === "failed") {
        toast.error(message);
      } else {
        let expirationTime: number = moment().unix() + sessionExpire;
        localStorage.setItem("adminToken", token);
        localStorage.setItem("expirationTime", expirationTime.toString());
        history.push(AppRoutes.MAIN);
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  });
  // If user is already logged In then it will be redirect to dashboard
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      history.push(AppRoutes.HOME);
    }
  }, []);
  // on login
  const handleSubmit = (
    { userName, password }: ILoginFormValues,
    { setSubmitting }: FormikHelpers<ILoginFormValues>
  ) => {
    try {
      adminLogin({
        variables: {
          authInput: { userName: userName ? userName.trim() : "", password }
        }
      });
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  };
  //
  // const onOutlookLogin = (e: any) => {
  //   e.preventDefault();
  //   const msalConfig: Msal.Configuration = {
  //     auth: {
  //       clientId: "61e4553f-98b3-41b4-bad1-295ce2dbcd54",
  //       authority: "https://login.microsoftonline.com/common",
  //       redirectUri: "http://localhost:3000/superadmin/validate-redirection"
  //     },
  //     cache: {
  //       cacheLocation: "localStorage",
  //       storeAuthStateInCookie: true
  //     }
  //   };
  //   const msObject = new Msal.UserAgentApplication(msalConfig);
  //   const loginRequest = {
  //     scopes: [
  //       "openid",
  //       "profile",
  //       "offline_access",
  //       "https://outlook.office.com/Mail.Read"
  //     ]
  //   };

  //   msObject.loginPopup(loginRequest).then(loginResponse => {
  //     console.log(loginResponse, msObject.getAccount());
  //   });
  // };

  const values: ILoginFormValues = { userName: "", password: "" };
  return (
    <>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        children={(props: FormikProps<ILoginFormValues>) => (
          <LoginFormComponent {...props} loading={loading} />
        )}
        validationSchema={LoginValidationSchema}
      />
      {/* <button className={"btn btn-primary"} onClick={onOutlookLogin}>
        Login With Outlook
      </button> */}
    </>
  );
};

export default Login;
