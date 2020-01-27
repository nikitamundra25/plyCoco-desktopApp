import { AppRoutes } from "./config";
import { languageTranslation } from "./helpers";
export default {
  items: [
    {
      name: languageTranslation("MENU_DASHBOARD"),
      icon: "icon-dash",
      url: AppRoutes.HOME
    },
    {
      name: languageTranslation("MENU_EMPLOYEE"),
      icon: "icon-emp",
      url: AppRoutes.EMPLOYEE
    },
    {
      name: languageTranslation("REGION"),
      icon: "icon-reg",
      url: AppRoutes.REGION
    },
    {
      name: languageTranslation("MENU_CAREGIVER"),
      icon: "icon-care",
      url: AppRoutes.CARE_GIVER
    },

    {
      name: languageTranslation("MENU_INSTITUTION"),
      icon: "icon-build",
      url: AppRoutes.CARE_INSTITUTION
    },

    {
      name: languageTranslation("MENU_APPOINTMENTS"),
      icon: "icon-appointment",
      url: AppRoutes.HOME
    },
    {
      name: languageTranslation("MENU_EMAIL"),
      icon: "icon-email-temp",
      url: AppRoutes.HOME
    },
    {
      name: languageTranslation("MENU_TO_DO_CARE_GIVER"),
      icon: "icon-todo-care",
      url: AppRoutes.CAREGIVER_TODO
    },
    {
      name: languageTranslation("MENU_TO_DO_INSTITUTION"),
      icon: "icon-todo-inst",
      url: AppRoutes.CARE_INSTITUTION_TODO
      // url: AppRoutes.REGION
    },
    {
      name: languageTranslation("MENU_BULK_EMAIL"),
      icon: "icon-bulk-email",
      url: AppRoutes.HOME
    },
    {
      name: languageTranslation("MENU_INVOICES"),
      icon: "icon-invoice",
      url: AppRoutes.HOME
      // url: AppRoutes.REGION
    },
    {
      name: languageTranslation("MENU_DOCUMENT_UPLOADS"),
      icon: "icon-upload",
      url: AppRoutes.DOCUMENT_TEMPLATE_WORKING,
      children: [
        {
          name: languageTranslation("MENU_DOCUMENT_WORKING_PROOF"),
          icon: "icon-working-list",
          url: AppRoutes.DOCUMENT_TEMPLATE_WORKING
        },
        {
          name: languageTranslation("MENU_DOCUMENT_STICK_NOTES"),
          icon: "icon-document",
          url: AppRoutes.HOME
        }
      ]
    },
    {
      name: languageTranslation("MENU_FURTHER"),
      icon: "icon-cms",
      url: AppRoutes.HOME,
      children: [
        // {
        //   name: languageTranslation("MENU_FURTHER_BULK_EMAIL_CANSTITUTION"),
        //   icon: "icon-bulk-email",
        //   url: AppRoutes.HOME
        // },
        {
          name: languageTranslation("MENU_FURTHER_EMAIL_TEMPLATES"),
          icon: "icon-email-templates",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_FURTHER_EMPLOYEE"),
          icon: "icon-employees",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_FURTHER_PERMISSION"),
          icon: "icon-permission",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_FURTHER_SCHEDULER"),
          icon: "icon-scheduler",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_FURTHER_LEASING_PRICE_LISTS"),
          icon: "icon-price-list",
          url: AppRoutes.HOME
        }
      ]
      // children: [{
      //   name: "MENU_CONTENT_MANAGEMENT_SYSTEM",
      //   icon: "icon-cms",
      //   url: AppRoutes.HOME
      //   //url: AppRoutes.REGION
      // },
      // {
      //   name: "MENU_CONTENT_MANAGEMENT_SYSTEM_bdh",
      //   icon: "icon-cms",
      //   url: AppRoutes.HOME
      //   //url: AppRoutes.REGION
      // }],

      //url: AppRoutes.REGION
    },
    {
      name: languageTranslation("MENU_REPORTS"),
      icon: "icon-document",
      url: AppRoutes.HOME,
      children: [
        {
          name: languageTranslation("MENU_REPORTS_TURNOVER"),
          icon: "icon-turnover",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_REPORTS_EMPLOYEE_ACTIVITY"),
          icon: "icon-activity",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_REPORTS_PHONECALL"),
          icon: "icon-call",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_REPORTS_HOLIDAYS"),
          icon: "icon-holidays",
          url: AppRoutes.HOME
        },

        {
          name: languageTranslation("MENU_REPORTS_MISSING_WORKING_PROOFS"),
          icon: "icon-working-list",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_REPORTS_ACQUISTION"),
          icon: "icon-acquisition",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_REPORTS_TURNOVER_CARETAKER"),
          icon: "icon-turnover-caretakers",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_REPORTS_INACTIVE_CARE_INSTITUTIONS"),
          icon: "icon-care-Institution",
          url: AppRoutes.HOME
        },
        {
          name: languageTranslation("MENU_REPORTS_INACTIVE_CARE_TAKER"),
          icon: "icon-inactive-caretakers",
          url: AppRoutes.HOME
        }
      ]
    }
    // {
    //   name: languageTranslation("MENU_ATTRIBUTES"),
    //   icon: "icon-attribute",
    //   url: AppRoutes.HOME
    //   //url: AppRoutes.REGION
    // },
    // {
    //   name: languageTranslation("MENU_SUPPORT"),
    //   icon: "icon-call",
    //   url: AppRoutes.HOME
    //   //url: AppRoutes.REGION
    // }
    // {
    //   name: languageTranslation("MENU_CONTENT_MANAGEMENT_SYSTEM"),
    //   icon: "icon-cms",
    //   url: AppRoutes.HOME
    //   //url: AppRoutes.REGION
    // },
  ]
};
