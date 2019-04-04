import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "reactstrap";

// sidebar nav config
import navigation from "../../_nav";
import { AppRoutes } from "../../Config";
import { ApiHelper } from "../../Helpers/ApiHelper";
// routes config
import routes from "../../routes";
import Loader from "../Loader/Loader";
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from "@coreui/react";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: true,
      userDetails: {},
    };
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  componentDidUpdate({ location }) {
    const { pathname } = location;
    if (pathname !== this.props.location.pathname) {
      this.setState({
        isAuthenticated: true,
      });
      this.checkAuthentication();
    }
  }

  signOut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push(AppRoutes.LOGIN);
  }

  checkAuthentication = async () => {
    try {
      const res = await new ApiHelper().FetchFromServer(
        "/user",
        "/view",
        "GET",
        true,
        undefined
      );
      if (!res.isError) {
        this.setState({
          isAuthenticated: true,
          isLoading: false,
          userDetails: res.data.data,
        });
      } else {
        localStorage.removeItem("token");
        this.props.history.push(AppRoutes.LOGIN);
      }
    } catch (error) {
      localStorage.removeItem("token");
      this.props.history.push(AppRoutes.LOGIN);
    }
  };

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={<Loader />}>
            <DefaultHeader
              history={this.props.history}
              onLogout={e => this.signOut(e)}
              userDetails={this.state.userDetails}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} isOpen />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={<Loader />}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from={AppRoutes.MAIN} to={AppRoutes.HOME} />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={<Loader />}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
