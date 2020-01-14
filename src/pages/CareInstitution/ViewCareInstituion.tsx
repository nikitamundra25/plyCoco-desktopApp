import React, { Component, useState, Suspense } from "react";
import { RouteComponentProps } from "react-router";
import Select from "react-select";
import { CareGiver, AppRoutes } from "../../config";
import add from "../../assets/img/add.svg";
import save from "../../assets/img/save.svg";
import reminder from "../../assets/img/reminder.svg";
import password from "../../assets/img/password.svg";
import appointment from "../../assets/img/appointment.svg";
import clear from "../../assets/img/clear.svg";
import { careInstitutionRoutes } from "./Sidebar/SidebarRoutes/ConstitutionRoutes";
import PersonalInformation from "./PersonalInfo";
import Offers from "./Offers";
import Login from "./Login";
import InvoiceMenu from "./invoiceMenu";
import Documents from "./Documents";
import Departments from "./Departments";
import Emails from "./Emails";
import Reminders from "./Reminders";
import qs from "query-string";

const CareInstitutionSidebar = React.lazy(() =>
  import(
    "../../pages/CareInstitution/Sidebar/SidebarLayout/CareInstitutionLayout"
  )
);

const CareInstitutionTabs = careInstitutionRoutes

class ViewCareInstitution extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      startDate: ""
    };
  }

  componentDidUpdate = ({ location }: RouteComponentProps) => {
    if (this.props.location.search !== location.search) {
      const query: any = qs.parse(this.props.location.search);
      this.setState({
        activeTab: query.tab
          ? CareInstitutionTabs.findIndex(d => d.name === decodeURIComponent(query.tab))
          : 0
      });
    }
  }
  onTabChange = (activeTab: number) => {
    this.props.history.push(
      `${AppRoutes.CARE_INSTITUION_VIEW}?tab=${encodeURIComponent(CareInstitutionTabs[activeTab].name)}`
    );
  };

  render() {
    const {
      activeTab
    } = this.state
    return (
      <div>
        <div className="common-detail-page">
          <div className="common-detail-section">
            <Suspense fallback={"Loading.."}>
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
                    <span className="header-nav-text">New Care Institution</span>
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
                    <span
                      className="header-nav-text"
                    // onClick={() => {
                    //   this.setState({ show: true });
                    // }}
                    >
                      Create Todo/Reminder
                    </span>
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
                    <span className="header-nav-text">Display Appointments</span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={clear} alt="" />
                    </span>
                    <span className="header-nav-text">Clear</span>
                  </div>
                </div>
                <CareInstitutionSidebar
                  tabs={CareInstitutionTabs}
                  activeTab={activeTab}
                  onTabChange={this.onTabChange}
                />
              </div>
            </Suspense>
            <Suspense fallback={""}>
              <div className="common-content flex-grow-1">
                {activeTab === 0 ? (
                  <PersonalInformation
                    {...this.props}
                  />
                ) : null}
                {activeTab === 1 ? (
                  <Offers
                    {...this.props}
                  />
                ) : null}
                {activeTab === 2 ? (
                  <Login
                    {...this.props}
                  />
                ) : null}
                {activeTab === 3 ? (
                  <InvoiceMenu
                    {...this.props}
                  />
                ) : null}
                {activeTab === 4 ? (
                  <Documents
                    {...this.props}
                  />
                ) : null}
                {activeTab === 5 ? (
                  <Departments
                    {...this.props}
                  />
                ) : null}
                {activeTab === 6 ? (
                  <Emails
                    {...this.props}
                  />
                ) : null}
                {activeTab === 7 ? (
                  <Reminders
                    {...this.props}
                  />
                ) : null}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewCareInstitution;
