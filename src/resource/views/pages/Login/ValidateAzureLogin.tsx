import React, { FunctionComponent, useEffect } from "react";
import * as querystring from "querystring";
import * as MSAL from "msal";
const ValidateAzureLogin: FunctionComponent<any> = () => {
  useEffect(() => {
    const data = querystring.parse(location.hash.replace("#", ""));
    console.log(data);
  }, []);
  return <>fasdfasf</>;
};

export default ValidateAzureLogin;
