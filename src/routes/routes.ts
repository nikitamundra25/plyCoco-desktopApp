import React from "react";
import { AppRoutes } from "../config";
import ToDo from "../pages/CareGiver/ToDos";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Login = React.lazy(() => import("../pages/Login"));
const MyProfile = React.lazy(() => import("../pages/MyProfile"));
const Employee = React.lazy(() => import("../pages/Employee"));
const AddEmployee = React.lazy(() => import("../pages/Employee/AddEmployee"));
const ViewEmployee = React.lazy(() => import("../pages/Employee/ViewEmployee"));
const EditEmployee = React.lazy(() => import("../pages/Employee/EditEmployee"));
const Department = React.lazy(() => import("../pages/Department"));
const AddDepartment = React.lazy(() =>
  import("../pages/Department/AddDepartment")
);
const Region = React.lazy(() => import("../pages/Region"));
const AddRegion = React.lazy(() => import("../pages/Region/AddRegion"));
const CareGiver = React.lazy(() => import("../pages/CareGiver"));
const AddCareGiver = React.lazy(() =>
  import("../pages/CareGiver/AddCareGiver")
);
const EditCareGiver = React.lazy(() =>
  import("../pages/CareGiver/EditCareGiver")
);
const CareGiverLayout = React.lazy(() =>
  import("../pages/CareGiver/CareGiverLayout")
);
const PersonalInformation = React.lazy(() =>
  import("../pages/CareGiver/PersonalInformation")
);
const QualificationAttribute = React.lazy(() =>
  import("../pages/CareGiver/QualificationAttribute")
);
const Billing = React.lazy(() => import("../pages/CareGiver/Billing"));
const LeasingPersonalData = React.lazy(() =>
  import("../pages/CareGiver/LeasingPersonalData")
);
const ChangePassword = React.lazy(() =>
  import("../pages/CareGiver/ChangePassword")
);
const Email = React.lazy(() => import("../pages/CareGiver/Email"));
const Event = React.lazy(() => import("../pages/CareGiver/Event"));
const Offer = React.lazy(() => import("../pages/CareGiver/Offer"));
const Invoices = React.lazy(() => import("../pages/CareGiver/Invoices"));
const Todos = React.lazy(() => import("../pages/CareGiver/ToDos"));

const routes = [
  { path: AppRoutes.MAIN, exact: true, name: "Home" },
  {
    path: AppRoutes.HOME,
    name: "Dashboard",
    component: Dashboard,
    exact: true
  },
  {
    path: AppRoutes.LOGIN,
    name: "",
    component: Login,
    exact: true
  },
  {
    path: AppRoutes.MY_PROFILE,
    name: "Profile",
    component: MyProfile,
    exact: true
  },
  {
    path: AppRoutes.EMPLOYEE,
    name: "Employee",
    component: Employee,
    exact: true
  },
  {
    path: AppRoutes.ADD_EMPLOYEE,
    name: "Add Employee",
    component: AddEmployee,
    exact: true
  },
  {
    path: AppRoutes.VIEW_EMPLOYEE,
    name: "View Employee",
    component: ViewEmployee,
    exact: true
  },
  {
    path: AppRoutes.EDIT_EMPLOYEE,
    name: "Edit Employee",
    component: EditEmployee,
    exact: true
  },
  {
    path: AppRoutes.DEPARTMENT,
    name: "Department",
    component: Department,
    exact: true
  },

  {
    path: AppRoutes.ADD_DEPARTMENT,
    name: "Add Department",
    component: AddDepartment,
    exact: true
  },
  {
    path: AppRoutes.REGION,
    name: "Region",
    component: Region,
    exact: true
  },
  {
    path: AppRoutes.ADD_REGION,
    name: "Add Region",
    component: AddRegion,
    exact: true
  },
  {
    path: AppRoutes.CARE_GIVER,
    name: "Care Giver",
    component: CareGiver,
    exact: true
  },
  {
    path: AppRoutes.ADD_CARE_GIVER,
    name: "Add Care Giver",
    component: AddCareGiver,
    exact: true
  },
  {
    path: AppRoutes.EDIT_CARE_GIVER,
    name: "Edit Care Giver",
    component: EditCareGiver,
    exact: true
  },
  {
    path: AppRoutes.PERSONAL_INFORMATION,
    name: "Personal Information",
    component: PersonalInformation,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.BILLING,
    name: "Billing Setting",
    component: Billing,
    layout: CareGiverLayout,
    exact: true
  },
  {
    path: AppRoutes.QUALIFICATION_ATTRIBUTE,
    name: "Qualification Attribute",
    component: QualificationAttribute,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.LEASING_PERSONALDATA,
    name: "Leasing Personal Data",
    component: LeasingPersonalData,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.CHANGE_PASSWORD,
    name: "Change Password",
    component: ChangePassword,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.EMAIL,
    name: "Email",
    component: Email,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.EVENT,
    name: "Event",
    component: Event,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.INVOCES,
    name: "Invoices",
    component: Invoices,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.OFFER,
    name: "Offer",
    component: Offer,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.TODO,
    name: "Todos",
    component: Todos,
    exact: true,
    layout: CareGiverLayout
  }
];

export default routes;
