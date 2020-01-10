import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { AppRoutes } from "../../config";
import routes from "../../routes/routes";
import { Region, CareGiver } from "../../config";
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
import Select from "react-select";
import add from "../../assets/img/add.svg";
import save from "../../assets/img/save.svg";
import reminder from "../../assets/img/reminder.svg";
import password from "../../assets/img/password.svg";
import appointment from "../../assets/img/appointment.svg";
import delete_specilalist from "../../assets/img/delete-user.svg";
import delete_appointment from "../../assets/img/delete-appointment.svg";
import send_bills from "../../assets/img/send-bills.svg";
import { languageTranslation } from "../../helpers";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const CareGiverSidebar = React.lazy(() =>
  import("../../pages/CareGiver/Sidebar/SidebarLayout/CareGiverLayout")
);
const CareInstitutionSidebar = React.lazy(() =>
  import("../../pages/CareInstitution/Sidebar/SidebarLayout/CareInstitutionLayout")
);

// Care giver Sidebar
const CareGiverLayout = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <div className="common-detail-page">
          {/* <AppBreadcrumb appRoutes={routes} className="w-100" /> */}
          <div className="common-detail-section">
            <div className="sticky-common-header">
              {/* <div className="d-flex align-items-center username-header">
                    <span className="align-middle">
                      <i className="fa fa-user mr-2"></i>
                    </span>
                    <span className="align-middle">John Doe (Caregiver)</span>
                  </div> */}
              <div className="common-topheader d-flex align-items-center ">
                <div className="user-select">
                  <Select
                    defaultValue={{
                      label: "John Doe",
                      value: 0
                    }}
                    // value={this.state.selectedOption}
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
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={save} alt="" />
                  </span>
                  <span className="header-nav-text">
                    {languageTranslation("SAVE_BUTTON")}
                  </span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={reminder} alt="" />
                  </span>
                  <span className="header-nav-text">
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
                {/* <div className="header-nav-item">
                      <span className="header-nav-text">
                        <UncontrolledButtonDropdown>
                          <DropdownToggle caret>More</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem></DropdownItem>
                            <DropdownItem></DropdownItem>
                            <DropdownItem>Send pay slips</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>
                      </span>
                    </div> */}
              </div>
              <CareGiverSidebar {...props} />
            </div>

            <div className="common-content flex-grow-1">
              <Component {...props} />
            </div>
          </div>
        </div>
      )}
    />
  );
};
const CareInstitutionLayout = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <div className="common-detail-page">
          {/* <AppBreadcrumb appRoutes={routes} className="w-100" /> */}
          <div className="common-detail-section">
            <div className="sticky-common-header">
              {/* <div className="d-flex align-items-center username-header">
                    <span className="align-middle">
                      <i className="fa fa-user mr-2"></i>
                    </span>
                    <span className="align-middle">John Doe (Caregiver)</span>
                  </div> */}
              <div className="common-topheader d-flex align-items-center ">
                <div className="user-select">
                  <Select
                    defaultValue={{
                      label: "John Doe",
                      value: 0
                    }}
                    // value={this.state.selectedOption}
                    placeholder="Select Caregiver"
                    options={CareGiver}
                  />
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={add} alt="" />
                  </span>
                  <span className="header-nav-text">New Caregiver</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={save} alt="" />
                  </span>
                  <span className="header-nav-text">Save</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={reminder} alt="" />
                  </span>
                  <span className="header-nav-text">Create Todo/Reminder</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={password} alt="" />
                  </span>
                  <span className="header-nav-text">New Password</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={appointment} alt="" />
                  </span>
                  <span className="header-nav-text">Display appointments</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={delete_specilalist} alt="" />
                  </span>
                  <span className="header-nav-text">Delete specialist</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={delete_appointment} alt="" />
                  </span>
                  <span className="header-nav-text">
                    Delete future appointments
                  </span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={send_bills} alt="" />
                  </span>
                  <span className="header-nav-text">Send pay slips</span>
                </div>
                {/* <div className="header-nav-item">
                      <span className="header-nav-text">
                        <UncontrolledButtonDropdown>
                          <DropdownToggle caret>More</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem></DropdownItem>
                            <DropdownItem></DropdownItem>
                            <DropdownItem>Send pay slips</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>
                      </span>
                    </div> */}
              </div>
              <CareInstitutionSidebar {...props} />
            </div>
            <div className="common-content flex-grow-1">
              <Component {...props} />
            </div>
          </div>
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

  // componentDidMount() {
  //   if (!localStorage.getItem('token')) {
  //     this.props.history.push(AppRoutes.LOGIN);
  //   }
  // }

  render() {
    return (
      <div className="app">
        <AppHeader>
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
                      route.layoutName === "CareGiver" ? (
                        <CareGiverLayout
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      ) : (
                        <CareInstitutionLayout
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      )
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
