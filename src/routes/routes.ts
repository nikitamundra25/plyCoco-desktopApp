import React from "react";
import { AppRoutes } from "../config";
import ToDo from "../pages/CareGiver/ToDos/ToDos";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Login = React.lazy(() => import("../pages/Login"));
const MyProfile = React.lazy(() => import("../pages/MyProfile"));
const Employee = React.lazy(() => import("../pages/Employee"));
const EmployeeFormComponent = React.lazy(() =>
  import("../pages/Employee/AddEmployee")
);
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
  import("../pages/CareGiver/AddCareGiver/index")
);
const EditCareGiver = React.lazy(() =>
  import("../pages/CareGiver/EditCareGiver")
);
const CareGiverLayout = React.lazy(() =>
  import("../pages/CareGiver/Sidebar/SidebarLayout/CareGiverLayout")
);
const ConstitutionLayout = React.lazy(() => import("../pages/Constitution/Sidebar/SidebarLayout/ConstitutionLayout"))
const PersonalInformation = React.lazy(() =>
  import("../pages/CareGiver/PersonalInfo/PersonalInformation")
);
const QualificationAttribute = React.lazy(() =>
  import("../pages/CareGiver/QualificationAttributes/QualificationAttribute")
);
const BillingSetting = React.lazy(() =>
  import("../pages/CareGiver/Billings/BillingSettings")
);
const Billing = React.lazy(() => import("../pages/CareGiver/Billings"));
const LeasingPersonalData = React.lazy(() =>
  import("../pages/CareGiver/LeasingData/LeasingPersonalData")
);
const ChangePassword = React.lazy(() =>
  import("../pages/CareGiver/ChangePassword/ChangePassword")
);
const Email = React.lazy(() => import("../pages/CareGiver/Emails/EmailMenus"));
const InboxEmail = React.lazy(() => import("../pages/CareGiver/Emails/InboxEmail"));
const SentEmail = React.lazy(() => import("../pages/CareGiver/Emails/SentEmail"));
const NewEmail = React.lazy(() => import("../pages/CareGiver/Emails/NewEmail"));
const EmailSettings = React.lazy(() =>
  import("../pages/CareGiver/Emails/EmailSettings")
);
const Event = React.lazy(() => import("../pages/CareGiver/Events/Event"));
const Offer = React.lazy(() => import("../pages/CareGiver/Offers/Offer"));
const Invoices = React.lazy(() => import("../pages/CareGiver/Invoices/Invoices"));
const care_login = React.lazy(() => import("../pages/CareGiver/Logins/CareLogin"));
const Todos = React.lazy(() => import("../pages/CareGiver/ToDos/ToDos"));
const Signature = React.lazy(() => import("../pages/CareGiver/Signature/Signature"));
const DocumentUpload = React.lazy(() =>
  import("../pages/CareGiver/Documents/DocumentsUpload")
);
const AddConstitution = React.lazy(() => import("../pages/Constitution/AddConstitution/AddConstitution"))
const Constitution = React.lazy(() => import("../pages/Constitution"))

const routes = [
  {
    path: AppRoutes.ADD_CARE_GIVER,
    name: "Add Care Giver",
    component: AddCareGiver,
    exact: true,
  },
  {
    path: AppRoutes.ADD_CONSTITUTION,
    name: "Add Constitution",
    component: AddConstitution,
    exact: true,
  },
  {
    path: AppRoutes.ADD_DEPARTMENT,
    name: "Add Department",
    component: AddDepartment,
    exact: true,
  },
  {
    path: AppRoutes.ADD_EMPLOYEE,
    name: "Add Employee",
    component: EmployeeFormComponent,
    exact: true,
  },
  {
    path: AppRoutes.ADD_REGION,
    name: "Add Region",
    component: AddRegion,
    exact: true,
  },
  {
    path: AppRoutes.BILLING_SETTING,
    name: "Billing",
    component: BillingSetting,
    layout: CareGiverLayout,
    exact: true,
  },
  {
    path: AppRoutes.CARE_GIVER,
    name: "Care Giver",
    component: CareGiver,
    exact: true,
  },
  {
    path: AppRoutes.CARE_LOGIN,
    name: "Care Login",
    component: care_login,
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
    path: AppRoutes.CONSTITUTION,
    name: "Constitution",
    component: Constitution,
    exact: true,
  },
  { path: AppRoutes.MAIN, exact: true, name: "Dashboard" },
  {
    path: AppRoutes.HOME,
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: AppRoutes.DEPARTMENT,
    name: "Department",
    component: Department,
    exact: true,
  },
  {
    path: AppRoutes.DOCUMENTS_UPLOAD,
    name: "Document Upload",
    component: DocumentUpload,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.EDIT_CARE_GIVER,
    name: "Edit Care Giver",
    component: EditCareGiver,
    exact: true,
  },
  {
    path: AppRoutes.EDIT_EMPLOYEE,
    name: "Edit Employee",
    component: EditEmployee,
    exact: true,
  },
  {
    path: AppRoutes.EMAIL_SETTINGS,
    name: "Email Settings",
    component: EmailSettings,
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
    path: AppRoutes.EMPLOYEE,
    name: "Employee",
    component: Employee,
    exact: true,
  },
  {
    path: AppRoutes.EVENT,
    name: "Event",
    component: Event,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.INBOX,
    name: "Inbox Email",
    component: InboxEmail,
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
    path: AppRoutes.LEASING_PERSONALDATA,
    name: "Leasing Personal Data",
    component: LeasingPersonalData,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.LOGIN,
    name: "Login",
    component: Login,
    exact: true,
  },
  {
    path: AppRoutes.NEW_EMAIL,
    name: "New Email",
    component: NewEmail,
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
    path: AppRoutes.PERSONAL_INFORMATION,
    name: "Personal Information",
    component: PersonalInformation,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.MY_PROFILE,
    name: "Profile",
    component: MyProfile,
    exact: true,
  },
  {
    path: AppRoutes.QUALIFICATION_ATTRIBUTE,
    name: "Qualification Attribute",
    component: QualificationAttribute,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.REGION,
    name: "Region",
    component: Region,
    exact: true,
  },
  {
    path: AppRoutes.SENT_EMAIL,
    name: "Sent Email",
    component: SentEmail,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.SIGNATURE,
    name: "Signature",
    component: Signature,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.TODO,
    name: "Todos",
    component: Todos,
    exact: true,
    layout: CareGiverLayout
  },
  {
    path: AppRoutes.VIEW_EMPLOYEE,
    name: "View Employee",
    component: ViewEmployee,
    exact: true,
  },
];

export default routes;
