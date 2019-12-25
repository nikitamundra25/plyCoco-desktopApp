import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import { AppRoutes, env } from "./Config";
import FullPageLoader from "./containers/Loader/FullPageLoader";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './Config';

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Page404 = React.lazy(() => import("./views/Pages/Page404/Page404"));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter basename={env === "development" ? "/" : "/admin"}>
          <React.Suspense fallback={<FullPageLoader />}>
            <Switch>
              <Route
                exact
                path="/404"
                name="Page 404"
                render={props => <Page404 {...props} />}
              />
              <Route
                path={AppRoutes.MAIN}
                name="Home"
                render={props => <DefaultLayout {...props} />}
              />
            </Switch>
            <ToastContainer />
          </React.Suspense>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
