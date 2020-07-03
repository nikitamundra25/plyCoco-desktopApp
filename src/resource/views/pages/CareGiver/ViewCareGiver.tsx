  import React, { FunctionComponent, useState, Suspense, useEffect } from "react";
import {
  RouteComponentProps,
  useLocation,
  useParams,
  useHistory,
} from "react-router";
import Select from "react-select";
import qs from "query-string";
import { useQuery, useLazyQuery,useMutation } from "@apollo/react-hooks";
import {
  AppRoutes,
  deactivatedListColor,
  leasingListColor,
  selfEmployesListColor,
  CaregiverTIMyoCYAttrId,
} from "../../../../config";
import { careGiverRoutes } from "./Sidebar/SidebarRoutes/CareGiverRoutes";
import { IReactSelectInterface } from "../../../../interfaces";
import Loader from "../../containers/Loader/Loader";
import { CareGiverQueries } from "../../../../graphql/queries";
import {
  AdminProfileMutations,
} from "../../../../graphql/Mutations";
import CustomOption from "../../components/CustomOptions";
import { languageTranslation, errorFormatter } from "../../../../helpers";
import add from "../../../assets/img/add.svg";
import reminder from "../../../assets/img/reminder.svg";
import password from "../../../assets/img/password.svg";
import appointment from "../../../assets/img/appointment.svg";
import clear from "../../../assets/img/clear.svg";
import CaregiverCustomAsyncList from "../../components/DropdownList/CareGiverCustomAsyncSelect";
import { ConfirmBox } from "../../components/ConfirmBox";
import { toast } from "react-toastify";

const CareGiverSidebar = React.lazy(() =>
  import("./Sidebar/SidebarLayout/CareGiverLayout")
);
const PersonalInfo = React.lazy(() => import("./PersonalInfo"));
const Offer = React.lazy(() => import("./Offers"));
const LoginLogs = React.lazy(() => import("../../components/Logins"));
const Invoices = React.lazy(() => import("./Invoices/Invoices"));
const ToDo = React.lazy(() => import("../../components/ToDosInnerList"));
const Documents = React.lazy(() => import("./Documents"));
const Email = React.lazy(() => import("./Emails"));
const CreateTodo = React.lazy(() =>
  import("../../components/CreateTodo/index")
);
const LeasingPersonalData = React.lazy(() => import("./LeasingData"));
const GroupedBelow = React.lazy(() => import("./GroupedBelow"));

const [, GET_CAREGIVER_BY_ID , , , , , , , GET_CAREGIVER_BY_NAME] = CareGiverQueries;
const [, , GENERATE_NEW_PASSWORD] = AdminProfileMutations;
const CareGiverRoutesTabs = careGiverRoutes;
let toastId: any = "";

const ViewCareGiver: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  let { id } = useParams();
  const Id: any | undefined = id;
  let history = useHistory();

  const [showToDo, setShowToDo] = useState<boolean>(false);
  // To fetch the list of all caregiver
  // const [
  //   fetchCareGivers,
  //   { data: careGivers, loading, refetch }
  // ] = useLazyQuery<any>(GET_CAREGIVERS, {
  //   fetchPolicy: 'no-cache'
  // });

  
  // generate new password for the user
  const [GenerateNewPassword] = useMutation<any, any>(GENERATE_NEW_PASSWORD);

  // fetch caregivers list new query GET_CAREGIVER_BY_NAME
  const [
    fetchCareGiversList,
    { data: careGiversList, loading, refetch },
  ] = useLazyQuery<any>(GET_CAREGIVER_BY_NAME, {
    fetchPolicy: "no-cache",
  });

  const { data } = useQuery<any>(GET_CAREGIVER_BY_ID, {
    variables: {
      id: Id ? parseInt(Id) : '',
    },
  });
  console.log('datadata',data);
  

  let [selectUser, setselectUser] = useState<IReactSelectInterface>({
    label: "",
    value: "",
    color: "",
  });

  const [activeTab, setactiveTab] = useState(0);
  const { search, pathname } = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Fetch list of caregivers
    //  fetchCareGivers({
    //     variables: {
    //       searchBy: '',
    //       sortBy: 3,
    //       limit: 500,
    //       page: 1,
    //       isActive: ''
    //     }
    //   });
    fetchCareGiversList({
      variables: {
        searchBy: "",
        limit: 500,
        page: 1,
      },
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    // gernerate new password for caregiver
    const generateNewPassword = async (caregiverData: any): Promise<void> => {
      console.log('selectUserselectUser',Id)
      const { value } = await ConfirmBox({
        title: languageTranslation("CONFIRM_LABEL"),
        text: languageTranslation("CONFIRM_REGENERATE_PASSWORD_MESSAGE", {
          userRole: languageTranslation("CAREGIVER_USERROLE"),
          email: data.getCaregiver.email,
        }),
      });
      if (!value) {
        return;
      }
      if (toast.isActive(toastId)) {
        toast.dismiss(toastId);
      }
      try {
        await GenerateNewPassword({
          variables: {
            userId: Id,
          },
        });
  
        toastId = toast.success(
          languageTranslation("NEW_PASSWORD_SENT_SUCCESS", {
            email: caregiverData.email,
          })
        );
      } catch (error) {
        const message = errorFormatter(error.message);
        toastId = toast.error(message);
      }
    };
    //

  const handleScroll = () => {
    const scrollPositionY = window.scrollY;
    const buttonDiv: HTMLElement | null = document.getElementById(
      "caregiver-add-btn"
    );
    if (buttonDiv) {
      if (scrollPositionY >= 12) {
        buttonDiv.classList.add("sticky-save-btn");
      } else {
        buttonDiv.classList.remove("sticky-save-btn");
      }
    }
  };

  const careGiverOpt: IReactSelectInterface[] | undefined = [];
  if (
    careGiversList &&
    careGiversList.getCaregiverByName &&
    careGiversList.getCaregiverByName.result
  ) {
    careGiverOpt.push({
      label: languageTranslation("NAME"),
      value: languageTranslation("ID"),
      color: "",
    });
    careGiversList.getCaregiverByName.result.forEach(
      ({ id, firstName, lastName, isActive, caregiver }: any) => {
        let { attributes = [] } = caregiver ? caregiver : {};
        // To check null values
        attributes = attributes ? attributes : [];
        careGiverOpt.push({
          label: `${lastName}${" "}${firstName}`,
          value: id,
          color: !isActive
            ? deactivatedListColor
            : attributes.includes(CaregiverTIMyoCYAttrId)
            ? leasingListColor
            : attributes.includes("Plycoco")
            ? selfEmployesListColor
            : "",
        });
      }
    );
  }
  console.log("careGiverOpt", careGiverOpt);

  // It's used to set active tab
  useEffect(() => {
    const query: any = qs.parse(search);
    setactiveTab(
      query.tab
        ? careGiverRoutes.findIndex(
            (d) => d.name === decodeURIComponent(query.tab)
          )
        : 0
    );
  }, [search]);

  const [isnewDataUpdate, setisnewDataUpdate] = useState(false);

  // Set selected caregiver
  useEffect(() => {
    const currenCareGiver = careGiverOpt.filter(
      (careGiver: any) => parseInt(careGiver.value) === parseInt(Id)
    )[0];
    if(currenCareGiver && currenCareGiver.value !== ""){ 
    setselectUser(currenCareGiver);
    }
  }, [careGiversList, pathname]);

  const [newContactAdded, setnewContactAdded] = useState(false);

  const onTabChange = (activeTab: number) => {
    props.history.push(
      `${AppRoutes.CARE_GIVER_VIEW.replace(":id", Id)}?tab=${encodeURIComponent(
        careGiverRoutes[activeTab].name
      )}`
    );
  };
  let [isUserChange, setisUserChange] = useState(false);
  const handleSelect = (e: any) => {
    if (e && e.value) {
      const data: IReactSelectInterface = {
        label: e.label,
        value: e.value,
        color: e.color,
      };
      setselectUser((selectUser = data));

      if (e.value !== Id) {
        const {
          location: { search },
        } = props;
        const query = qs.parse(search);
        props.history.push(
          [
            `${AppRoutes.CARE_GIVER_VIEW.replace(":id", e.value)}`,
            qs.stringify({ ...query }),
          ].join("?")
        );
        // props.history.push(
        //   `${AppRoutes.CARE_GIVER_VIEW.replace(
        //     ":id",
        //     e.value
        //   )}?tab=${encodeURIComponent(careGiverRoutes[activeTab].name)}`
        // );
        setisUserChange((isUserChange = true));
      }
    }
  };

  const handleAddNewCareGiver = () => {
    props.history.push(AppRoutes.ADD_CARE_GIVER);
  };

  return (
    <div>
      <div className="common-detail-page">
        <div className="common-detail-section">
          {loading ? (
            <div className="detailview-loader">
              <Loader />
            </div>
          ) : (
            <>
              <Suspense fallback={""}>
                <div className="sticky-common-header">
                  <div className="common-topheader d-flex align-items-center ">
                    <div className="user-select">
                      {/* <Select
                        classNamePrefix='custom-inner-reactselect'
                        className={
                          'custom-reactselect custom-reactselect-menu-width'
                        }
                        defaultValue={selectUser}
                        placeholder='Select Caregiver'
                        value={selectUser}
                        onChange={(e: any) => handleSelect(e)}
                        options={careGiverOpt}
                        components={{ Option: CustomOption }}
                        isOptionDisabled={option =>
                          option.value === languageTranslation('ID')
                        }
                      /> */}
                      <CaregiverCustomAsyncList
                        placeholderLabel={languageTranslation(
                          "SELECT_CAREGIVER"
                        )}
                        onChange={(e: any) => handleSelect(e)}
                        value={
                          selectUser && selectUser.value !== ""
                            ? selectUser
                            : null
                        }
                      />
                    </div>
                    <div
                      onClick={handleAddNewCareGiver}
                      className="header-nav-item"
                    >
                      <span className="header-nav-icon">
                        <img src={add} alt="" />
                      </span>
                      <span className="header-nav-text">
                        {languageTranslation("CG_MENU_NEW_CAREGIVER")}
                      </span>
                    </div>
                    <div
                      className="header-nav-item"
                      onClick={() => setShowToDo(true)}
                    >
                      <span className="header-nav-icon">
                        <img src={reminder} alt="" />
                      </span>
                      <span className="header-nav-text">
                        {languageTranslation("CG_MENU_CREATE_TODO")}
                      </span>
                    </div>
                    <div className="header-nav-item"
                           id={`regenerate-password-${Id}`} 
                           onClick={() =>
                             generateNewPassword('123')
                           }
                      >
                      <span className="header-nav-icon">
                        <img src={password} alt="" />
                      </span>
                      <span className="header-nav-text">
                        {languageTranslation("CG_MENU_NEW_PASSWORD")}
                      </span>
                    </div>
                    <div
                      className="header-nav-item"
                      onClick={() =>
                        history.push({
                          pathname: AppRoutes.APPOINTMENT,
                          state: { caregiver: Id, name: selectUser.label },
                        })
                      }
                    >
                      <span className="header-nav-icon">
                        <img src={appointment} alt="" />
                      </span>
                      <span className="header-nav-text">
                        {languageTranslation("CG_MENU_DISPLAY_APPOINTMENTS_")}
                      </span>
                    </div>
                    <div className="header-nav-item">
                      <span className="header-nav-icon">
                        <img src={clear} alt="" />
                      </span>
                      <span className="header-nav-text">
                        {languageTranslation("CLEAR")}
                      </span>
                    </div>
                  </div>
                  <CareGiverSidebar
                    tabs={CareGiverRoutesTabs}
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                  />
                </div>
              </Suspense>
              <Suspense
                fallback={
                  <div className="overview-loader">
                    <Loader />
                  </div>
                }
              >
                <div className="common-content flex-grow-1">
                  {activeTab === 0 ? (
                    <PersonalInfo careGiverOpt={careGiverOpt} />
                  ) : null}
                  {activeTab === 1 ? <Offer {...props} /> : null}
                  {activeTab === 2 ? <LoginLogs /> : null}
                  {activeTab === 3 ? <Invoices /> : null}
                  {activeTab === 4 ? <Documents /> : null}
                  {activeTab === 5 ? (
                    <Email
                      selectedUserName={
                        selectUser && selectUser.label ? selectUser.label : ""
                      }
                      userLastName=""
                      userRole={
                        careGiversList &&
                        careGiversList.getCaregiverByName &&
                        careGiversList.getCaregiverByName.result &&
                        selectUser &&
                        selectUser.value
                          ? careGiversList.getCaregiverByName.result.find(
                              (careGiver: any) =>
                                careGiver.id === selectUser.value
                            ).userRole
                          : ""
                      }
                    />
                  ) : null}
                  {activeTab === 6 ? (
                    <ToDo
                      {...props}
                      userRole="caregiver"
                      isnewDataUpdate={isnewDataUpdate}
                      Id={Id}
                    />
                  ) : null}
                  {activeTab === 7 ? <LeasingPersonalData {...props} /> : null}
                  {activeTab === 8 ? <GroupedBelow /> : null}
                </div>
              </Suspense>
            </>
          )}
        </div>
      </div>
      <CreateTodo
        {...props}
        show={showToDo ? true : false}
        handleClose={() => setShowToDo(false)}
        name={selectUser ? selectUser.label : null}
        userRole={"careGiver"}
        newDataUpdate={() => setisnewDataUpdate(true)}
        setisnewDataUpdate={() => setisnewDataUpdate(false)}
        Id={Id}
        newContactAdded={false}
        setnewContactAdded={() => setnewContactAdded(false)}
      />
    </div>
  );
};
export default ViewCareGiver;
