import React from "react";
import { AppRoutes } from "../config";
import { languageTranslation } from "../helpers";

const Dashboard = React.lazy(() => import("../resource/views/pages/Dashboard"));
const Login = React.lazy(() => import("../resource/views/pages/Login"));
const MyProfile = React.lazy(() => import("../resource/views/pages/MyProfile"));
const Employee = React.lazy(() => import("../resource/views/pages/Employee"));
const AddEmployee = React.lazy(() =>
  import("../resource/views/pages/Employee/AddEmployee")
);
const ViewEmployee = React.lazy(() =>
  import("../resource/views/pages/Employee/ViewEmployee")
);
const Department = React.lazy(() =>
  import("../resource/views/pages/Department")
);
const AddDepartment = React.lazy(() =>
  import("../resource/views/pages/Department/AddDepartment")
);
const Region = React.lazy(() => import("../resource/views/pages/Region"));
const CareGiver = React.lazy(() => import("../resource/views/pages/CareGiver"));
const AddCareGiver = React.lazy(() =>
  import("../resource/views/pages/CareGiver/AddCareGiver/index")
);
const AddCareInstitution = React.lazy(() =>
  import("../resource/views/pages/CareInstitution/AddCareInstitution")
);
const Constitution = React.lazy(() =>
  import("../resource/views/pages/CareInstitution")
);

const ViewCareInstitution = React.lazy(() =>
  import("../resource/views/pages/CareInstitution/ViewCareInstituion")
);
const ViewCareGiver = React.lazy(() =>
  import("../resource/views/pages/CareGiver/ViewCareGiver")
);

const CareGiverTodo = React.lazy(() =>
  import("../resource/views/pages/CareGiverTodo")
);
const CareInstitutionTodo = React.lazy(() =>
  import("../resource/views/pages/CareInstitutionTodo")
);
const CareGiverTodoLayout = React.lazy(() =>
  import(
    "../resource/views/pages/CareGiverTodo/Sidebar/SidebarLayout/CareGiverTodoLayout"
  )
);

const CareInstitutionTodoLayout = React.lazy(() =>
  import(
    "../resource/views/pages/CareGiverTodo/Sidebar/SidebarLayout/CareGiverTodoLayout"
  )
);
const AllInvoices = React.lazy(() =>
  import(
    "../resource/views/pages/AllInvoices"
  )
);
const InvoiceSolona = React.lazy(() =>
  import(
    "../resource/views/pages/AllInvoices/InvoiceSolona"
  )
);
const CreateInvoices = React.lazy(() =>
  import(
    "../resource/views/pages/AllInvoices/CreateInvoices"
  )
);

const DocumentTemplateWorkingProof = React.lazy(() =>
  import("../resource/views/pages/DocumentTemplateManagement/index")
);
const CareInstitutionTodoHideDone = React.lazy(() =>
  import("../resource/views/pages/CareInstitutionTodo/hideDone")
);

const CareInstitutionTodoHideFuture = React.lazy(() =>
  import("../resource/views/pages/CareInstitutionTodo/hideFuture")
);

const CareInstitutionTodoRequirement = React.lazy(() =>
  import("../resource/views/pages/CareInstitutionTodo/requirement")
);

const CareGiverTodoHideDone = React.lazy(() =>
  import("../resource/views/pages/CareGiverTodo/hideDone")
);
const CareGiverTodoHideFuture = React.lazy(() =>
  import("../resource/views/pages/CareGiverTodo/hideFuture")
);

const EmailTemplateManagement = React.lazy(() =>
  import("../resource/views/pages/EmailTemplateManagement")
);
const AttributeManageMent = React.lazy(() =>
  import("../resource/views/pages/AttributeManageMent")
);

const BulkEmailCaregiver = React.lazy(() =>
  import("../resource/views/pages/BulkEmailCaregiver")
);

const EmailInbox = React.lazy(() => import("../resource/views/pages/Email"));

const EmailSent = React.lazy(() =>
  import("../resource/views/pages/Email/SentEmail")
);
const EmailOutbox = React.lazy(() =>
  import("../resource/views/pages/Email/OutboxEmail")
);
const EmailQueue = React.lazy(() =>
  import("../resource/views/pages/Email/MailQueueEmail")
);
const ArchiveEmployee = React.lazy(() =>
  import("../resource/views/pages/Employee/ArchiveEmployee")
);
const ArchiveCaregiver = React.lazy(() =>
  import("../resource/views/pages/CareGiver/ArchiveCaregiver")
);
const ArchiveCareInstitution = React.lazy(() =>
  import("../resource/views/pages/CareInstitution/ArchiveCareInstitution")
);
const Appointment = React.lazy(() =>
  import("../resource/views/pages/Appointment")
);
const PageNotFound = React.lazy(() =>
  import("../resource/views/pages/PageNotFound")
);
const GlobalCalendar = React.lazy(() =>
  import("../resource/views/pages/GlobalCalendar")
);
const BulkEmailCareinstitution = React.lazy(() =>
  import("../resource/views/pages/BulkEmailCareinstitution")
);
const routes = [
  {
    path: AppRoutes.LOGIN,
    name: "Login",
    component: Login,
    exact: true
  },
  {
    path: AppRoutes.MAIN,
    exact: true,
    name: "Dashboard"
  },
  {
    path: AppRoutes.HOME,
    name: "Dashboard",
    component: Dashboard,
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
    path: AppRoutes.EDIT_EMPLOYEE,
    name: "Edit Employee",
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
    path: AppRoutes.CARE_GIVER,
    name: "Caregiver",
    component: CareGiver,
    exact: true
  },
  {
    path: AppRoutes.ADD_CARE_GIVER,
    name: "Add Caregiver",
    component: AddCareGiver,
    exact: true
  },
  {
    path: AppRoutes.CARE_GIVER_VIEW,
    name: "Caregiver View",
    component: ViewCareGiver,
    exact: true
  },
  {
    path: AppRoutes.CARE_INSTITUTION,
    name: "Care Institution",
    component: Constitution,
    exact: true
  },
  {
    path: AppRoutes.ADD_CARE_INSTITUTION,
    name: "Add Care Institution",
    component: AddCareInstitution,
    exact: true
  },
  {
    path: AppRoutes.CARE_INSTITUION_VIEW,
    name: "Care Institution View",
    component: ViewCareInstitution,
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
    exact: true
  },
  {
    path: AppRoutes.DOCUMENT_TEMPLATE_WORKING,
    name: "Document Template Working Proof",
    component: DocumentTemplateWorkingProof,
    exact: true
  },
  {
    path: AppRoutes.BULK_EMAIL_CAREGIVER,
    name: "Bulk Email Caregiver",
    component: BulkEmailCaregiver,
    exact: true
  },
  {
    path: AppRoutes.ALL_EMAILS,
    name: "Email Inbox",
    component: EmailInbox,
    exact: true
  },
  {
    path: AppRoutes.EMAIL_SENT,
    name: "Email Sent",
    component: EmailSent,
    exact: true
  },
  {
    path: AppRoutes.EMAIL_OUTBOX,
    name: "Email outbox",
    component: EmailOutbox,
    exact: true
  },
  {
    path: AppRoutes.EMAIL_QUEUE,
    name: "Email Queue",
    component: EmailQueue,
    exact: true
  },
  {
    path: AppRoutes.ATTRIBUTE_MANAGEMENT,
    name: "Attribute management",
    component: AttributeManageMent,
    exact: true
  },
  {
    path: AppRoutes.EMPLOYEE_ARCHIVE,
    name: "Trash",
    component: ArchiveEmployee,
    exact: true
  },
  {
    path: AppRoutes.CAREGIVER_ARCHIVE,
    name: "Trash",
    component: ArchiveCaregiver,
    exact: true
  },
  {
    path: AppRoutes.CAREINSTITUTION_ARCHIVE,
    name: "Trash",
    component: ArchiveCareInstitution
  },
  {
    path: AppRoutes.APPOINTMENT,
    name: "Appointment",
    component: Appointment,
    exact: true
  },
  {
    path: AppRoutes.GLOBAL_CALENDAR,
    name: languageTranslation("MENU_GLOBAL_CALENDAR"),
    component: GlobalCalendar,
    exact: true
  },
  {
    path: AppRoutes.PAGENOTFOUND,
    name: "Page 404",
    component: PageNotFound,
    exact: true
  },
  {
    path: AppRoutes.BULK_EMAIL_CAREINSTITUTION,
    name: "Bulk Care Instituition",
    component: BulkEmailCareinstitution,
    exact: true
  },
  {
    path: AppRoutes.ALLINVOICES,
    name: "AllInvoices",
    component: AllInvoices,
    exact: true
  },
  {
    path: AppRoutes.INVOICESOLONA,
    name: "InvoiceSolona",
    component: InvoiceSolona,
    exact: true
  },
  {
    path: AppRoutes.CREATEINVOICES,
    name: "CreateInvoices",
    component: CreateInvoices,
    exact: true
  }
];

export default routes;
