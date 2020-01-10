import { AppRoutes } from "../../../../config";
import { languageTranslation } from "../../../../helpers";

export const careGiverRoutes = [
  {
    path: AppRoutes.PERSONAL_INFORMATION,
    name: languageTranslation("CG_SUB_MENU_OVERVIEW")
    //icon: "fa fa-id-card"
  },
  {
    path: AppRoutes.OFFER,
    name: languageTranslation("OFFERS")
    //icon: "fa fa-gift"
  },
  {
    path: AppRoutes.CARE_LOGIN,
    name: languageTranslation("CG_SUB_MENU_LOGIN")
    //icon: "fa fa-bookmark"
  },
  {
    path: AppRoutes.INVOCES,
    name: languageTranslation("MENU_INVOICES")
    //icon: "fa fa-file-text"
  },
  {
    path: AppRoutes.DOCUMENTS_UPLOAD,
    name: languageTranslation("CG_SUB_MENU_DOCUMENTS")
    //icon: "fa fa-upload"
  },
  {
    path: AppRoutes.INBOX,
    name: languageTranslation("MENU_EMAIL")
    //icon: "fa fa-envelope"
  },

  {
    path: AppRoutes.TODO,
    name: languageTranslation("CG_SUB_MENU_REMINDER")
    //icon: "fa fa-list-alt"
  },
  {
    path: AppRoutes.LEASING_PERSONALDATA,
    name: languageTranslation("CG_SUB_MENU_LEASING")
    //icon: "fa fa-id-card"
  },
  {
    path: AppRoutes.QUALIFICATION_ATTRIBUTE,
    name: languageTranslation("CG_SUB_MENU_GROUPED")
    //icon: "fa fa-graduation-cap"
  }
  // {
  //   path: AppRoutes.BILLING_SETTING,
  //   name: "Billing Settings",
  //   //icon: "fa fa-credit-card"
  // },

  // {
  //   path: AppRoutes.SIGNATURE,
  //   name: "Signature",
  //   icon: "fa fa-edit"
  // },

  // {
  //   path: AppRoutes.INBOX,
  //   name: "Emails",
  //   //icon: "fa fa-envelope"
  // },
  // {
  //   path: AppRoutes.INBOX,
  //   name: "SMS",
  //   icon: "fa fa-comments"
  // },
  // {
  //   path: AppRoutes.CHANGE_PASSWORD,
  //   name: "Change Password",
  //   //icon: "fa fa-lock"
  // },

  // {
  //   path: AppRoutes.EVENT,
  //   name: "Events",
  //   //icon: "fa fa-calendar"
  // },
];

// export default routes;
