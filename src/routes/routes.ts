import React from "react";
import { AppRoutes } from "../config";
import { languageTranslation } from "../helpers";
import { TempPage } from "../resource/views/pages/Temp";

const Dashboard = React.lazy(() => import("../resource/views/pages/Dashboard"));
const Login = React.lazy(() => import("../resource/views/pages/Login"));
const MyProfile = React.lazy(() => import("../resource/views/pages/MyProfile"));
const Employee = React.lazy(() => import("../resource/views/pages/Employee"));
const DummyAppointment = React.lazy(
  () => import("../resource/views/pages/DummyAppointment")
);
const AddEmployee = React.lazy(
  () => import("../resource/views/pages/Employee/AddEmployee")
);
const ViewEmployee = React.lazy(
  () => import("../resource/views/pages/Employee/ViewEmployee")
);
const Department = React.lazy(
  () => import("../resource/views/pages/Department")
);
const AddDepartment = React.lazy(
  () => import("../resource/views/pages/Department/AddDepartment")
);
const Region = React.lazy(() => import("../resource/views/pages/Region"));
const CareGiver = React.lazy(() => import("../resource/views/pages/CareGiver"));
const AddCareGiver = React.lazy(
  () => import("../resource/views/pages/CareGiver/AddCareGiver/index")
);
const AddCareInstitution = React.lazy(
  () => import("../resource/views/pages/CareInstitution/AddCareInstitution")
);
const Constitution = React.lazy(
  () => import("../resource/views/pages/CareInstitution")
);

const ViewCareInstitution = React.lazy(
  () => import("../resource/views/pages/CareInstitution/ViewCareInstituion")
);
const ViewCareGiver = React.lazy(
  () => import("../resource/views/pages/CareGiver/ViewCareGiver")
);

const CareGiverTodo = React.lazy(
  () => import("../resource/views/pages/CareGiverTodo")
);
const CareInstitutionTodo = React.lazy(
  () => import("../resource/views/pages/CareInstitutionTodo")
);
const CareGiverTodoLayout = React.lazy(
  () =>
    import(
      "../resource/views/pages/CareGiverTodo/Sidebar/SidebarLayout/CareGiverTodoLayout"
    )
);

const CareInstitutionTodoLayout = React.lazy(
  () =>
    import(
      "../resource/views/pages/CareGiverTodo/Sidebar/SidebarLayout/CareGiverTodoLayout"
    )
);
const INVOICE = React.lazy(
  () => import("../resource/views/pages/AllInvoices/SelfEmpInvoiceList")
);
const InvoiceSolona = React.lazy(
  () => import("../resource/views/pages/AllInvoices/CreateInvoiceSolona")
);
// const DrowInvoice = React.lazy(() =>
//   import("../resource/views/pages/AllInvoices/DrowInvoice")
// );

const PaySlipForm = React.lazy(
  () => import("../resource/views/pages/AllInvoices/PaySlipForm")
);

const CreateInvoices = React.lazy(
  () => import("../resource/views/pages/AllInvoices/CreateInvoice")
);
const PrintInvoices = React.lazy(
  () => import("../resource/views/pages/AllInvoices/PrintInvoices")
);

const HealthInsuranceForm = React.lazy(
  () => import("../resource/views/pages/AllInvoices/HealthInsuranceForm")
);

const DocumentTemplateWorkingProof = React.lazy(
  () => import("../resource/views/pages/DocumentTemplateManagement/index")
);
const CareInstitutionTodoHideDone = React.lazy(
  () => import("../resource/views/pages/CareInstitutionTodo/hideDone")
);

const CareInstitutionTodoHideFuture = React.lazy(
  () => import("../resource/views/pages/CareInstitutionTodo/hideFuture")
);

const CareInstitutionTodoRequirement = React.lazy(
  () => import("../resource/views/pages/CareInstitutionTodo/requirement")
);

const CareGiverTodoHideDone = React.lazy(
  () => import("../resource/views/pages/CareGiverTodo/hideDone")
);
const CareGiverTodoHideFuture = React.lazy(
  () => import("../resource/views/pages/CareGiverTodo/hideFuture")
);

const EmailTemplateManagement = React.lazy(
  () => import("../resource/views/pages/EmailTemplateManagement")
);
const AttributeManageMent = React.lazy(
  () => import("../resource/views/pages/AttributeManageMent")
);

const BulkEmailCaregiver = React.lazy(
  () => import("../resource/views/pages/BulkEmailCaregiver")
);

const BulkEmailCanstitution = React.lazy(
  () => import("../resource/views/pages/BulkEmailCareinstitution")
);

const EmailInbox = React.lazy(() => import("../resource/views/pages/Email"));

const EmailSent = React.lazy(
  () => import("../resource/views/pages/Email/SentEmail")
);
const EmailOutbox = React.lazy(
  () => import("../resource/views/pages/Email/OutboxEmail")
);
const EmailQueue = React.lazy(
  () => import("../resource/views/pages/Email/MailQueueEmail")
);
const ArchiveEmployee = React.lazy(
  () => import("../resource/views/pages/Employee/ArchiveEmployee")
);
const ArchiveCaregiver = React.lazy(
  () => import("../resource/views/pages/CareGiver/ArchiveCaregiver")
);
const ArchiveCareInstitution = React.lazy(
  () => import("../resource/views/pages/CareInstitution/ArchiveCareInstitution")
);
const Appointment = React.lazy(
  () => import("../resource/views/pages/Appointment")
);
const PageNotFound = React.lazy(
  () => import("../resource/views/pages/PageNotFound")
);
const GlobalCalendar = React.lazy(
  () => import("../resource/views/pages/GlobalCalendar")
);
const BulkEmailCareinstitution = React.lazy(
  () => import("../resource/views/pages/BulkEmailCareinstitution")
);

const openpdf = React.lazy(
  () =>
    import("../resource/views/pages/BulkEmailCaregiver/PDF/LeasingContactPdf")
);

const pdf1 = React.lazy(
  () =>
    import(
      "../resource/views/pages/BulkEmailCaregiver/PDF/TerminationAgreementPdf"
    )
);
const pdf2 = React.lazy(
  () =>
    import(
      "../resource/views/pages/BulkEmailCaregiver/PDF/ConfirmAppointmentPdf"
    )
);

const createLeasingInvoice = React.lazy(
  () => import("../resource/views/pages/AllInvoices/CreateLeasingInvoice")
);
const routes = [
  {
    path: AppRoutes.LOGIN,
    name: languageTranslation("ROUTE_LOGIN"),
    component: Login,
    exact: true,
  },
  {
    path: AppRoutes.MAIN,
    exact: true,
    name: languageTranslation("DASHBOARD"),
  },
  {
    path: AppRoutes.HOME,
    name: languageTranslation("DASHBOARD"),
    component: Dashboard,
    exact: true,
  },
  {
    path: AppRoutes.MY_PROFILE,
    name: languageTranslation("PROFILE"),
    component: MyProfile,
    exact: true,
  },
  {
    path: AppRoutes.EMPLOYEE,
    name: languageTranslation("EMPLOYEE"),
    component: Employee,
    exact: true,
  },
  {
    path: AppRoutes.ADD_EMPLOYEE,
    name: languageTranslation("ADD_EMPLOYEE"),
    component: AddEmployee,
    exact: true,
  },
  {
    path: AppRoutes.EDIT_EMPLOYEE,
    name: languageTranslation("EDIT_EMPLOYEE"),
    component: AddEmployee,
    exact: true,
  },
  {
    path: AppRoutes.VIEW_EMPLOYEE,
    name: languageTranslation("VIEW_EMPLOYEE"),
    component: ViewEmployee,
    exact: true,
  },
  {
    path: AppRoutes.DEPARTMENT,
    name: languageTranslation("DEPARTMENT"),
    component: Department,
    exact: true,
  },
  {
    path: AppRoutes.ADD_DEPARTMENT,
    name: languageTranslation("ADD_DEPARTMENT"),
    component: AddDepartment,
    exact: true,
  },
  {
    path: AppRoutes.REGION,
    name: languageTranslation("REGION"),
    component: Region,
    exact: true,
  },
  {
    path: AppRoutes.CARE_GIVER,
    name: languageTranslation("MENU_CAREGIVER"),
    component: CareGiver,
    exact: true,
  },
  {
    path: AppRoutes.ADD_CARE_GIVER,
    name: languageTranslation("ADD_CAREGIVER"),
    component: AddCareGiver,
    exact: true,
  },
  {
    path: AppRoutes.CARE_GIVER_VIEW,
    name: languageTranslation("CAREGIVER_VIEW_ROUTE"),
    component: ViewCareGiver,
    exact: true,
  },
  {
    path: AppRoutes.CARE_INSTITUTION,
    name: languageTranslation("MENU_INSTITUTION"),
    component: Constitution,
    exact: true,
  },
  {
    path: AppRoutes.ADD_CARE_INSTITUTION,
    name: languageTranslation("ADD_CARE_INSTITUTION"),
    component: AddCareInstitution,
    exact: true,
  },
  {
    path: AppRoutes.CARE_INSTITUION_VIEW,
    name: languageTranslation("CARE_INSTITUTION_VIEW"),
    component: ViewCareInstitution,
    exact: true,
  },
  {
    path: AppRoutes.CAREGIVER_TODO,
    name: languageTranslation("CREATE_TODO_LABEL"),
    component: CareGiverTodo,
    exact: true,
    layout: CareGiverTodoLayout,
    layoutName: "CareGiverTodoLayout",
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO,
    name: languageTranslation("CREATE_TODO_CAREINSTITUTION"),
    component: CareInstitutionTodo,
    exact: true,
    layout: CareInstitutionTodoLayout,
    layoutName: "CareInstitutionTodoLayout",
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO_HIDE_DONE,
    name: languageTranslation("CAREINST_HIDE_DONE_LABEL"),
    component: CareInstitutionTodoHideDone,
    exact: true,
    layout: CareInstitutionTodoLayout,
    layoutName: "CareInstitutionTodoLayout",
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO_HIDE_FUTURE,
    name: languageTranslation("CAREINST_HIDE_FUTURE_TODO"),
    component: CareInstitutionTodoHideFuture,
    exact: true,
    layout: CareInstitutionTodoLayout,
    layoutName: "CareInstitutionTodoLayout",
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO_REQUIREMENT,
    name: languageTranslation("CREATE_TODO_CAREINSTITUTION_REQ"),
    component: CareInstitutionTodoRequirement,
    exact: true,
    layout: CareInstitutionTodoLayout,
    layoutName: "CareInstitutionTodoLayout",
  },
  {
    path: AppRoutes.CARE_GIVER_HIDE_DONE,
    name: languageTranslation("CAREGIVER_HIDE_DONE_LABEL"),
    component: CareGiverTodoHideDone,
    exact: true,
    layout: CareGiverTodoLayout,
    layoutName: "CareGiverTodoLayout",
  },
  {
    path: AppRoutes.CARE_GIVER_HIDE_FUTURE,
    name: languageTranslation("CAREGIVER_HIDE_FUTURE_TODO"),
    component: CareGiverTodoHideFuture,
    exact: true,
    layout: CareGiverTodoLayout,
    layoutName: "CareGiverTodoLayout",
  },

  {
    path: AppRoutes.EMAIL_TEMPLATE_MANAGEMENT,
    name: languageTranslation("EMAIL_TEMPLATE_MGMT"),
    component: EmailTemplateManagement,
    exact: true,
  },
  {
    path: AppRoutes.DOCUMENT_TEMPLATE_WORKING,
    name: languageTranslation("DOCUMENT_TEMPLATE_WORKPROOF"),
    component: DocumentTemplateWorkingProof,
    exact: true,
  },
  {
    path: AppRoutes.BULK_EMAIL_CAREGIVER,
    name: languageTranslation("BULK_EMAIL_CAREGIVER"),
    component: BulkEmailCaregiver,
    exact: true,
  },
  {
    path: AppRoutes.BULK_EMAIL_CANSTITUTION,
    name: languageTranslation("MENU_BULK_EMAIL_CI"),
    component: BulkEmailCanstitution,
    exact: true,
  },
  {
    path: AppRoutes.ALL_EMAILS,
    name: languageTranslation("EMAIL_INBOX"),
    component: EmailInbox,
    exact: true,
  },
  {
    path: AppRoutes.EMAIL_SENT,
    name: languageTranslation("EMAIL_SENT"),
    component: EmailSent,
    exact: true,
  },
  {
    path: AppRoutes.EMAIL_OUTBOX,
    name: languageTranslation("EMAIL_OUTBOX"),
    component: EmailOutbox,
    exact: true,
  },
  {
    path: AppRoutes.EMAIL_QUEUE,
    name: languageTranslation("EMAIL_QUEUE"),
    component: EmailQueue,
    exact: true,
  },
  {
    path: AppRoutes.ATTRIBUTE_MANAGEMENT,
    name: languageTranslation("ATTRIBUTE_MANAGEMENT"),
    component: AttributeManageMent,
    exact: true,
  },
  {
    path: AppRoutes.EMPLOYEE_ARCHIVE,
    name: languageTranslation("TRASH"),
    component: ArchiveEmployee,
    exact: true,
  },
  {
    path: AppRoutes.CAREGIVER_ARCHIVE,
    name: languageTranslation("TRASH"),
    component: ArchiveCaregiver,
    exact: true,
  },
  {
    path: AppRoutes.CAREINSTITUTION_ARCHIVE,
    name: languageTranslation("TRASH"),
    component: ArchiveCareInstitution,
  },
  {
    path: AppRoutes.APPOINTMENT,
    name: languageTranslation("APPOINTMENT"),
    component: Appointment,
    exact: true,
  },
  {
    path: AppRoutes.GLOBAL_CALENDAR,
    name: languageTranslation("MENU_GLOBAL_CALENDAR"),
    component: GlobalCalendar,
    exact: true,
  },
  {
    path: AppRoutes.PAGENOTFOUND,
    name: languageTranslation("PAGE_404"),
    component: PageNotFound,
    exact: true,
  },
  {
    path: AppRoutes.BULK_EMAIL_CAREINSTITUTION,
    name: languageTranslation("BULK_EMAIL_CAREINSTITUTION"),
    component: BulkEmailCareinstitution,
    exact: true,
  },
  {
    path: AppRoutes.INVOICE,
    name: languageTranslation("INVOICE_LABEL"),
    component: INVOICE,
    exact: true,
  },
  {
    path: AppRoutes.INVOICESOLONA,
    name: languageTranslation("INVOICE_SOLONA"),
    component: InvoiceSolona,
    exact: true,
  },
  // {
  //   path: AppRoutes.DROWINVOICE,
  //   name: "DrowInvoice",
  //   component: DrowInvoice,
  //   exact: true
  // },
  {
    path: AppRoutes.CREATEINVOICES,
    name: languageTranslation("CREATE_INVOICE"),
    component: CreateInvoices,
    exact: true,
  },
  {
    path: AppRoutes.LEASINGCREATEINVOICE,
    name: languageTranslation("MENU_LEASING_CREATE_INVOICE"),
    component: createLeasingInvoice,
    exact: true,
  },
  {
    path: AppRoutes.PRINTINVOICES,
    name: languageTranslation("PRINT_INVOICE"),
    component: PrintInvoices,
    exact: true,
  },
  {
    path: AppRoutes.PAYSLIPFORM,
    name: languageTranslation("PAY_SLIP_FORM"),
    component: PaySlipForm,
    exact: true,
  },
  {
    path: AppRoutes.HEALTHINSURANCEFORM,
    name: languageTranslation("HEALTH_INSURANCE_FORM"),
    component: HealthInsuranceForm,
    exact: true,
  },
  {
    path: "/pdf1",
    name: languageTranslation("PDF_1"),
    component: pdf1,
    exact: true,
  },
  {
    path: "/pdf2",
    name: languageTranslation("PDF_2"),
    component: pdf2,
    exact: true,
  },
  {
    path: "/openpdf",
    name: languageTranslation("OPEN_PDF"),
    component: openpdf,
    exact: true,
  },
  {
    path: AppRoutes.NEW_APPOINTMENTS,
    name: "New Appointments",
    component: DummyAppointment,
    exact: true,
  },
  {
    path: "/temp",
    name: "New Appointments",
    component: TempPage,
    exact: true,
  },
];

export default routes;
