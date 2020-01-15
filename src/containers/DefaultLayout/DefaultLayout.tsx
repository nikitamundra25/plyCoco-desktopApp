import React, { Component, Suspense, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import { AppRoutes } from "../../config";
import routes from "../../routes/routes";
import { CareGiver } from "../../config";
// sidebar nav config
import navigation from "../../_nav";
import {
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
import Select from "react-select";
import add from "../../assets/img/add.svg";
import save from "../../assets/img/save.svg";
import reminder from "../../assets/img/reminder.svg";
import password from "../../assets/img/password.svg";
import appointment from "../../assets/img/appointment.svg";
import delete_specilalist from "../../assets/img/delete-user.svg";
import delete_appointment from "../../assets/img/delete-appointment.svg";
import send_bills from "../../assets/img/send-bills.svg";
import clear from "../../assets/img/clear.svg";
import new_contact from "../../assets/img/new-contact.svg";
import { languageTranslation } from "../../helpers";
import CreateTodo from "../../pages/CareInstitution/CreateTodo";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const CareGiverSidebar = React.lazy(() =>
  import("../../pages/CareGiver/Sidebar/SidebarLayout/CareGiverLayout")
);
const CareInstitutionSidebar = React.lazy(() =>
  import(
    "../../pages/CareInstitution/Sidebar/SidebarLayout/CareInstitutionLayout"
  )
);

// Care giver Sidebar
const CareGiverLayout = ({ component: Component, ...rest }: any) => {
  const [state, setState] = useState({
    show: false
  });
  const handleClose = () => {
    setState({ show: false });
  };

  return (
    <Route
      {...rest}
      render={props => (
        <div className="common-detail-page">
          <div className="common-detail-section">
            <div className="sticky-common-header">
              <div className="common-topheader d-flex align-items-center ">
                <div className="user-select">
                  <Select
                    defaultValue={{
                      label: "John Doe",
                      value: "0"
                    }}
                    placeholder="Select Caregiver"
                    options={CareGiver}
                  />
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={add} alt="" />
                  </span>
                  <span className="header-nav-text">
                    {languageTranslation("CG_MENU_NEW_CAREGIVER")}
                  </span>
                </div>
                {/* <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={save} alt='' />
                  </span>
                  <span className="header-nav-text">
                    {languageTranslation("SAVE_BUTTON")}
                  </span>
                </div> */}
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={reminder} alt="" />
                  </span>
                  <span
                    className="header-nav-text"
                    onClick={() => {
                      setState({ show: true });
                    }}
                  >
                    {languageTranslation("CG_MENU_CREATE_TODO")}
                  </span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={password} alt="" />
                  </span>
                  <span className="header-nav-text">
                    {languageTranslation("CG_MENU_NEW_PASSWORD")}
                  </span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={appointment} alt="" />
                  </span>
                  <span className="header-nav-text">
                    {languageTranslation("CG_MENU_DISPLAY_APPOINTMENTS_")}
                  </span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={delete_specilalist} alt="" />
                  </span>
                  <span className="header-nav-text">
                    {languageTranslation("CG_MENU_DELETE_SPECIALIST")}
                  </span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={delete_appointment} alt="" />
                  </span>
                  <span className="header-nav-text">
                    {languageTranslation("CG_MENU_DELETE_FUTURE_APPOINTMENTS_")}
                  </span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={send_bills} alt="" />
                  </span>
                  <span className="header-nav-text">
                    {languageTranslation("CG_MENU_SEND_PAY_SLIP")}
                  </span>
                </div>
              </div>
              <CareGiverSidebar {...props} />
            </div>

            <div className="common-content flex-grow-1">
              <Component {...props} />
            </div>
          </div>
          <CreateTodo show={state.show} handleClose={handleClose} />
        </div>
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
  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    const scrollPositionY = window.scrollY;
    // console.log(scrollPositionY, "scrollPositionY");
    const header: HTMLElement | null = document.getElementById("sidebar");
    if (header) {
      if (scrollPositionY >= 35) {
        header.classList.add("sidebar-sticky");
      } else {
        header.classList.remove("sidebar-sticky");
      }
    }
  };
  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };

  render() {
    return (
      <div className="app">
        <AppHeader>
          <Suspense fallback={<Loader />}>
            <DefaultHeader {...this.props} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed minimized display="lg" id="sidebar">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense fallback={<Loader />}>
              <AppSidebarNav navConfig={navigation} {...this.props} isOpen />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Suspense fallback={<Loader />}>
                <Switch>
                  {routes.map((route: any, idx) => {
                    return route.layout ? (
                      route.layoutName === "CareGiver" ? (
                        <CareGiverLayout
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      ) : null
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
