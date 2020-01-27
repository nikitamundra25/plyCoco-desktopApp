import React from "react";
import { AppRoutes } from "../config";
import ToDo from "../pages/CareGiver/ToDos/ToDos";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Login = React.lazy(() => import("../pages/Login"));
const MyProfile = React.lazy(() => import("../pages/MyProfile"));
const Employee = React.lazy(() => import("../pages/Employee"));
const AddEmployee = React.lazy(() => import("../pages/Employee/AddEmployee"));
const ViewEmployee = React.lazy(() => import("../pages/Employee/ViewEmployee"));
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
const CareGiverLayout = React.lazy(() =>
  import("../pages/CareGiver/Sidebar/SidebarLayout/CareGiverLayout")
);
const ConstitutionLayout = React.lazy(() =>
  import("../pages/CareInstitution/Sidebar/SidebarLayout/CareInstitutionLayout")
);
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
  import("../pages/CareGiver/LeasingData")
);
const ChangePassword = React.lazy(() =>
  import("../pages/CareGiver/ChangePassword/ChangePassword")
);
const Email = React.lazy(() => import("../pages/CareGiver/Emails/EmailMenus"));
const InboxEmail = React.lazy(() =>
  import("../pages/CareGiver/Emails/InboxEmail")
);
const SentEmail = React.lazy(() =>
  import("../pages/CareGiver/Emails/SentEmail")
);
const NewEmail = React.lazy(() => import("../pages/CareGiver/Emails/NewEmail"));
const EmailSettings = React.lazy(() =>
  import("../pages/CareGiver/Emails/EmailSettings")
);
const Event = React.lazy(() => import("../pages/CareGiver/Events/Event"));
const Offer = React.lazy(() => import("../pages/CareGiver/Offers/Offer"));
const Invoices = React.lazy(() =>
  import("../pages/CareGiver/Invoices/Invoices")
);
const care_login = React.lazy(() =>
  import("../pages/CareGiver/Logins/CareLogin")
);
const Todos = React.lazy(() => import("../pages/CareGiver/ToDos/ToDos"));
const Signature = React.lazy(() =>
  import("../pages/CareGiver/Signature/Signature")
);
const DocumentUpload = React.lazy(() =>
  import("../pages/CareGiver/Documents/DocumentsUpload")
);
const AddCareInstitution = React.lazy(() =>
  import("../pages/CareInstitution/AddCareInstitution")
);
const Constitution = React.lazy(() => import("../pages/CareInstitution"));

const ViewCareInstitution = React.lazy(() =>
  import("../pages/CareInstitution/ViewCareInstituion")
);
const ViewCareGiver = React.lazy(() =>
  import("../pages/CareGiver/ViewCareGiver")
);

const CareGiverTodo = React.lazy(() => import("../pages/CareGiverTodo"));
const CareInstitutionTodo = React.lazy(() =>
  import("../pages/CareInstitutionTodo")
);
const CareGiverTodoLayout = React.lazy(() =>
  import("../pages/CareGiverTodo/Sidebar/SidebarLayout/CareGiverTodoLayout")
);

const CareInstitutionTodoLayout = React.lazy(() =>
  import("../pages/CareGiverTodo/Sidebar/SidebarLayout/CareGiverTodoLayout")
);

const DocumentTemplateWorkingProof = React.lazy(() =>
  import("../pages/DocumentTemplateManagement/index")
);
const CareInstitutionTodoHideDone = React.lazy(() =>
  import('../pages/CareInstitutionTodo/hideDone'));

  const CareInstitutionTodoHideFuture = React.lazy(() =>
    import("../pages/CareInstitutionTodo/hideFuture")
  );

   const CareInstitutionTodoRequirement = React.lazy(() =>
     import("../pages/CareInstitutionTodo/requirement")
   );

   const CareGiverTodoHideDone = React.lazy(() =>
     import("../pages/CareGiverTodo/hideDone")
   );
    const CareGiverTodoHideFuture = React.lazy(() =>
      import("../pages/CareGiverTodo/hideFuture")
    );

     const EmailTemplateManagement = React.lazy(() =>
       import("../pages/EmailTemplateManagement")
     );
   
const routes = [
  {
    path: AppRoutes.ADD_CARE_GIVER,
    name: "Add Caregiver",
    component: AddCareGiver,
    exact: true
  },
  {
    path: AppRoutes.ADD_CARE_INSTITUTION,
    name: "Add Care Institution",
    component: AddCareInstitution,
    exact: true
  },
  {
    path: AppRoutes.ADD_DEPARTMENT,
    name: "Add Department",
    component: AddDepartment,
    exact: true
  },
  {
    path: AppRoutes.ADD_EMPLOYEE,
    name: "Add Employee",
    component: AddEmployee,
    exact: true
  },
  {
    path: AppRoutes.ADD_REGION,
    name: "Add Region",
    component: AddRegion,
    exact: true
  },
  {
    path: AppRoutes.BILLING_SETTING,
    name: "Billing",
    component: BillingSetting,
    layout: CareGiverLayout,
    layoutName: "CareGiver",
    exact: true
  },
  {
    path: AppRoutes.CARE_GIVER,
    name: "Caregiver",
    component: CareGiver,
    exact: true
  },
  {
    path: AppRoutes.CARE_LOGIN,
    name: "Care Login",
    component: care_login,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.CHANGE_PASSWORD,
    name: "Change Password",
    component: ChangePassword,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.CARE_INSTITUTION,
    name: "Care Institution",
    component: Constitution,
    exact: true
  },
  {
    path: AppRoutes.MAIN,
    exact: true,
    name: "Dashboard"
  },
  {
    path: AppRoutes.CARE_INSTITUION_VIEW,
    name: "Care Institution View",
    component: ViewCareInstitution,
    exact: true
    // layout: ConstitutionLayout,
    // layoutName: 'Constitution',
  },
  {
    path: AppRoutes.CARE_GIVER_VIEW,
    name: "Caregiver View",
    component: ViewCareGiver,
    exact: true
  },
  {
    path: AppRoutes.HOME,
    name: "Dashboard",
    component: Dashboard,
    exact: true
  },
  {
    path: AppRoutes.DEPARTMENT,
    name: "Department",
    component: Department,
    exact: true
  },
  {
    path: AppRoutes.DOCUMENTS_UPLOAD,
    name: "Document Upload",
    component: DocumentUpload,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.EDIT_EMPLOYEE,
    name: "Edit Employee",
    component: AddEmployee,
    exact: true
  },
  {
    path: AppRoutes.EMAIL_SETTINGS,
    name: "Email Settings",
    component: EmailSettings,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.EVENT,
    name: "Event",
    component: Event,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.EMPLOYEE,
    name: "Employee",
    component: Employee,
    exact: true
  },
  {
    path: AppRoutes.EVENT,
    name: "Event",
    component: Event,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.INBOX,
    name: "Inbox Email",
    component: InboxEmail,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.INVOCES,
    name: "Invoices",
    component: Invoices,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.LEASING_PERSONALDATA,
    name: "Leasing Personal Data",
    component: LeasingPersonalData,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.LOGIN,
    name: "Login",
    component: Login,
    exact: true
  },
  {
    path: AppRoutes.NEW_EMAIL,
    name: "New Email",
    component: NewEmail,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.OFFER,
    name: "Offer",
    component: Offer,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.PERSONAL_INFORMATION,
    name: "Personal Information",
    component: PersonalInformation,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.MY_PROFILE,
    name: "Profile",
    component: MyProfile,
    exact: true
  },
  {
    path: AppRoutes.QUALIFICATION_ATTRIBUTE,
    name: "Qualification Attribute",
    component: QualificationAttribute,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.REGION,
    name: "Region",
    component: Region,
    exact: true
  },
  {
    path: AppRoutes.SENT_EMAIL,
    name: "Sent Email",
    component: SentEmail,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.SIGNATURE,
    name: "Signature",
    component: Signature,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.TODO,
    name: "Todos",
    component: Todos,
    exact: true,
    layout: CareGiverLayout,
    layoutName: "CareGiver"
  },
  {
    path: AppRoutes.VIEW_EMPLOYEE,
    name: "View Employee",
    component: ViewEmployee,
    exact: true
  },
  {
    path: AppRoutes.CAREGIVER_TODO,
    name: "Caregiver Todo",
    component: CareGiverTodo,
    exact: true,
    layout: CareGiverTodoLayout,
    layoutName: "CareGiverTodoLayout"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO,
    name: "Care Institution Todo",
    component: CareInstitutionTodo,
    exact: true,
    layout: CareInstitutionTodoLayout,
    layoutName: "CareInstitutionTodoLayout"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO_HIDE_DONE,
    name: "Care Institution Todo Hide Done",
    component: CareInstitutionTodoHideDone,
    exact: true,
    layout: CareInstitutionTodoLayout,
    layoutName: "CareInstitutionTodoLayout"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO_HIDE_FUTURE,
    name: "Care Institution Todo Hide Future",
    component: CareInstitutionTodoHideFuture,
    exact: true,
    layout: CareInstitutionTodoLayout,
    layoutName: "CareInstitutionTodoLayout"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO_REQUIREMENT,
    name: "Care Institution Todo Requirement",
    component: CareInstitutionTodoRequirement,
    exact: true,
    layout: CareInstitutionTodoLayout,
    layoutName: "CareInstitutionTodoLayout"
  },
  {
    path: AppRoutes.CARE_GIVER_HIDE_DONE,
    name: "Care Giver Todo Hide Done",
    component: CareGiverTodoHideDone,
    exact: true,
    layout: CareGiverTodoLayout,
    layoutName: "CareGiverTodoLayout"
  },
  {
    path: AppRoutes.CARE_GIVER_HIDE_FUTURE,
    name: "Care Giver Todo Hide Future",
    component: CareGiverTodoHideFuture,
    exact: true,
    layout: CareGiverTodoLayout,
    layoutName: "CareGiverTodoLayout"
  },

  {
    path: AppRoutes.EMAIL_TEMPLATE_MANAGEMENT,
    name: "Email Template Management",
    component: EmailTemplateManagement,
    exact: true,
   
  },
  {
    path: AppRoutes.DOCUMENT_TEMPLATE_WORKING,
    name: "Document Template Working Proof",
    component: DocumentTemplateWorkingProof,
    exact: true
  }
];

export default routes;
