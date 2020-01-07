import { AppRoutes } from "../../../../config";

export const careGiverRoutes = [
  {
    path: AppRoutes.PERSONAL_INFORMATION,
    name: "Personal Information",
    icon: "fa fa-id-card"
  },
  {
    path: AppRoutes.QUALIFICATION_ATTRIBUTE,
    name: "Qualification Attributes",
    icon: "fa fa-graduation-cap"
  },
  {
    path: AppRoutes.BILLING_SETTING,
    name: "Billing Settings",
    icon: "fa fa-credit-card"
  },
  {
    path: AppRoutes.LEASING_PERSONALDATA,
    name: "Leasing Personal Data",
    icon: "fa fa-id-card"
  },
  {
    path: AppRoutes.OFFER,
    name: "Offers",
    icon: "fa fa-gift"
  },
  {
    path: AppRoutes.CARE_LOGIN,
    name: "Login History",
    icon: "fa fa-bookmark"
  },
  {
    path: AppRoutes.INVOCES,
    name: "Invoices",
    icon: "fa fa-file-text"
  },
  // {
  //   path: AppRoutes.SIGNATURE,
  //   name: "Signature",
  //   icon: "fa fa-edit"
  // },
  {
    path: AppRoutes.DOCUMENTS_UPLOAD,
    name: "Documents",
    icon: "fa fa-upload"
  },
  {
    path: AppRoutes.INBOX,
    name: "Emails",
    icon: "fa fa-envelope"
  },
  // {
  //   path: AppRoutes.INBOX,
  //   name: "SMS",
  //   icon: "fa fa-comments"
  // },
  {
    path: AppRoutes.CHANGE_PASSWORD,
    name: "Change Password",
    icon: "fa fa-lock"
  },

  {
    path: AppRoutes.EVENT,
    name: "Events",
    icon: "fa fa-calendar"
  },
  {
    path: AppRoutes.TODO,
    name: "To-Dos",
    icon: "fa fa-list-alt"
  }
];

// export default routes;
