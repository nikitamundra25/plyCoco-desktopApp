import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { AppRoutes } from "../config";

const Login = React.lazy(() => import("../resource/views/pages/Login"));

class AppRoutesComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path={AppRoutes.LOGIN}
          render={props => <Login {...props} {...this.props} />}
        />
      </Switch>
    );
  }
}

/**
 *
 */
export default AppRoutesComponent;
