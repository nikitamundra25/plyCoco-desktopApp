import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { AppRoutes } from "../../config";
import routes from "../../routes/routes";
// sidebar nav config
import navigation from "../../_nav";
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
import Loader from "../Loader/Loader";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const CareGiverSidebar = React.lazy(() =>
  import("../../pages/CareGiver/CareGiverLayout")
);

// Care giver Sidebar
const CareGiverLayout = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Row>
          <Col lg={"12"}>
            <div className="care-detail-page">
              <AppBreadcrumb appRoutes={routes} />
              <div className="caregiver-detail-section">
                <CareGiverSidebar {...props} />
                <div className="caregiver-content flex-grow-1">
                  <Component {...props} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    />
  );
};

class DefaultLayout extends Component<any, any> {
  timeInterval: any = null;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: true,
      userDetails: {}
    };
  }

  // componentDidMount() {
  //   if (!localStorage.getItem('token')) {
  //     this.props.history.push(AppRoutes.LOGIN);
  //   }
  // }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={<Loader />}>
            <DefaultHeader {...this.props} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed minimized display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense fallback={<Loader />}>
              <AppSidebarNav navConfig={navigation} {...this.props} isOpen />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} /> */}
            <Container fluid>
              <Suspense fallback={<Loader />}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.layout ? (
                      <CareGiverLayout
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                      />
                    ) : route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                      />
                    ) : null;
                  })}
                  <Redirect from={AppRoutes.MAIN} to={AppRoutes.HOME} />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        {/* <AppFooter>
          <Suspense fallback={<Loader />}>
            <DefaultFooter />
          </Suspense>
        </AppFooter> */}
      </div>
    );
  }
}

export default DefaultLayout;