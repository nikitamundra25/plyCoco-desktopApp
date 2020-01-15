import React, { FunctionComponent, useState, Suspense, useEffect } from "react";
import { RouteComponentProps, useLocation, useParams } from "react-router";
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
import { ICareInstitutionFormValues, IHandleSubmitInterface } from "../../interfaces";
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { CareInstitutionQueries } from "../../queries";
import { useLazyQuery } from "@apollo/react-hooks";

const [GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  GET_CARE_INSTITUION_BY_ID] = CareInstitutionQueries

const CareInstitutionSidebar = React.lazy(() =>
  import(
    "../../pages/CareInstitution/Sidebar/SidebarLayout/CareInstitutionLayout"
  )
);

const CareInstitutionTabs = careInstitutionRoutes

const ViewCareInstitution: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> & RouteComponentProps & IHandleSubmitInterface> = (props: FormikProps<ICareInstitutionFormValues> & RouteComponentProps) => {

  let { id } = useParams();
  const Id: any | undefined = id

  const [getCareInstituitionList, { data: careInstituition }] = useLazyQuery(
    GET_CARE_INSTITUTION_LIST,
  );
  let CareInstitutionList: Object[] = []
  if (careInstituition && careInstituition.getCareInstitutions) {
    const { getCareInstitutions } = careInstituition;
    getCareInstitutions.map((data: any, index: any) => {
      CareInstitutionList.push({
        name: `${data.firstName}${" "}${data.lastName}`,
        id: data.id
      })
    })
  }
  const [activeTab, setactiveTab] = useState(0)
  const { search, pathname } = useLocation();
  useEffect(() => {
    const query: any = qs.parse(search);
    setactiveTab(
      query.tab
        ? CareInstitutionTabs.findIndex(d => d.name === decodeURIComponent(query.tab))
        : 0
    )
  }, [search]);

  const onTabChange = (activeTab: number) => {
    props.history.push(
      `${AppRoutes.CARE_INSTITUION_VIEW.replace(":id", Id)}?tab=${encodeURIComponent(CareInstitutionTabs[activeTab].name)}`
    );
  };


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
                onTabChange={onTabChange}
              />
            </div>
          </Suspense>
          <Suspense fallback={""}>
            <div className="common-content flex-grow-1">
              {activeTab === 0 ? (
                <PersonalInformation
                  handleSubmit={() => {
                    console.log("sdadadasdada");

                  }}
                  {...props}
                />
              ) : null}
              {activeTab === 1 ? (
                <Offers
                  {...props}
                />
              ) : null}
              {activeTab === 2 ? (
                <Login
                  {...props}
                />
              ) : null}
              {activeTab === 3 ? (
                <InvoiceMenu
                  {...props}
                />
              ) : null}
              {activeTab === 4 ? (
                <Documents
                  {...props}
                />
              ) : null}
              {activeTab === 5 ? (
                <Departments
                  {...props}
                />
              ) : null}
              {activeTab === 6 ? (
                <Emails
                  {...props}
                />
              ) : null}
              {activeTab === 7 ? (
                <Reminders
                  {...props}
                />
              ) : null}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
export default ViewCareInstitution;
