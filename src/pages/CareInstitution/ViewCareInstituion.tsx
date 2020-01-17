import React, { FunctionComponent, useState, Suspense, useEffect } from "react";
import { RouteComponentProps, useLocation, useParams } from "react-router";
import Select from "react-select";
import { CareGiver, AppRoutes, PAGE_LIMIT } from "../../config";
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
import {
  ICareInstitutionFormValues,
  IHandleSubmitInterface,
  IReactSelectInterface
} from "../../interfaces";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { CareInstitutionQueries } from "../../queries";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";

const [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  GET_CARE_INSTITUION_BY_ID
] = CareInstitutionQueries;

const CareInstitutionSidebar = React.lazy(() =>
  import(
    '../../pages/CareInstitution/Sidebar/SidebarLayout/CareInstitutionLayout'
  ),
);

const CareInstitutionTabs = careInstitutionRoutes;

const ViewCareInstitution: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  RouteComponentProps &
  IHandleSubmitInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & RouteComponentProps
) => {
  let { id } = useParams();
  const Id: any | undefined = id;
  let sortBy: IReactSelectInterface | undefined = {
    label: "3",
    value: "Sort by A-Z"
  };
  const { data: careInstituition, loading, error, refetch } = useQuery<any>(
    GET_CARE_INSTITUTION_LIST,
  );

  let [selectUser, setselectUser] = useState<IReactSelectInterface>({
    label: "",
    value: ""
  });

  let CareInstitutionList: Object[] = [];
  if (careInstituition && careInstituition.getCareInstitutions) {
    const { getCareInstitutions } = careInstituition;
    const { careInstitutionData } = getCareInstitutions;
    careInstitutionData.map((data: any, index: any) => {
      CareInstitutionList.push({
        label: `${data.firstName}${" "}${data.lastName}`,
        value: data.id
      });
    });
  }
  const [activeTab, setactiveTab] = useState(0);
  const { search, pathname } = useLocation();

  useEffect(() => {
    const query: any = qs.parse(search);
    setactiveTab(
      query.tab
        ? CareInstitutionTabs.findIndex(
            d => d.name === decodeURIComponent(query.tab)
          )
        : 0
    );
  }, [search]);

  const onTabChange = (activeTab: number) => {
    props.history.push(
      `${AppRoutes.CARE_INSTITUION_VIEW.replace(
        ":id",
        Id
      )}?tab=${encodeURIComponent(CareInstitutionTabs[activeTab].name)}`
    );
  };
  let [isUserChange, setisUserChange] = useState(false);
  const handleSelect = (e: any) => {
    if (e && e.value) {
      const data: IReactSelectInterface = {
        label: e.label,
        value: e.value
      };
      setselectUser((selectUser = data));
      if (e.value !== Id) {
        props.history.push(
          `${AppRoutes.CARE_INSTITUION_VIEW.replace(
            ":id",
            e.value
          )}?tab=${encodeURIComponent(CareInstitutionTabs[activeTab].name)}`
        );
        setisUserChange((isUserChange = true));
      }
    }
  };

  const handleAddNewCareInstitution = () =>{
    props.history.push(AppRoutes.ADD_CARE_INSTITUTION)
  }

  return (
    <div>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <Suspense fallback={'Loading..'}>
            <div className='sticky-common-header'>
              <div className='common-topheader d-flex align-items-center '>
                <div className='user-select'>
                  <Select
                    defaultValue={selectUser}
                    placeholder='Select Caregiver'
                    value={selectUser}
                    onChange={e => handleSelect(e)}
                    options={CareInstitutionList}
                  />
                </div>
                <div onClick ={handleAddNewCareInstitution} className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={add} alt="" />
                  </span>
                  <span className='header-nav-text'>New Care Institution</span>
                </div>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={reminder} alt='' />
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
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={password} alt='' />
                  </span>
                  <span className='header-nav-text'>New Password</span>
                </div>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={appointment} alt='' />
                  </span>
                  <span className='header-nav-text'>Display Appointments</span>
                </div>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={clear} alt='' />
                  </span>
                  <span className='header-nav-text'>Clear</span>
                </div>
              </div>
              <CareInstitutionSidebar
                tabs={CareInstitutionTabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
              />
            </div>
          </Suspense>
          <Suspense fallback={''}>
            <div className='common-content flex-grow-1'>
              {activeTab === 0 ? (
                <PersonalInformation
                  currentSelectuser={(Data: IReactSelectInterface) => {
                    setselectUser((selectUser = Data));
                  }}
                  handleIsUserChange={() =>
                    setisUserChange((isUserChange = false))
                  }
                  isUserChange={isUserChange}
                  {...props}
                />
              ) : null}
              {activeTab === 1 ? <Offers {...props} /> : null}
              {activeTab === 2 ? <Login {...props} /> : null}
              {activeTab === 3 ? <InvoiceMenu {...props} /> : null}
              {activeTab === 4 ? <Documents {...props} /> : null}
              {activeTab === 5 ? <Departments {...props} /> : null}
              {activeTab === 6 ? <Emails {...props} /> : null}
              {activeTab === 7 ? <Reminders {...props} /> : null}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default ViewCareInstitution;
