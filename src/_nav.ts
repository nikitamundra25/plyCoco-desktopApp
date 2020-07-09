import { AppRoutes } from "./config";
import { languageTranslation } from "./helpers";
export default {
  items: [
    {
      name: languageTranslation("MENU_DASHBOARD"),
      icon: "icon-dash",
      url: AppRoutes.HOME,
      authKey: ["all", "superadmin", "basic", "invoice"],
    },
    {
      name: languageTranslation("MENU_EMPLOYEE"),
      icon: "icon-emp",
      url: AppRoutes.EMPLOYEE,
      authKey: ["superadmin"],
    },
    {
      name: languageTranslation("REGION"),
      icon: "icon-reg",
      url: AppRoutes.REGION,
      authKey: ["all", "superadmin", "basic", "invoice"],
    },
    {
      name: languageTranslation("MENU_CAREGIVER"),
      icon: "icon-care",
      url: AppRoutes.CARE_GIVER,
      authKey: ["all", "superadmin", "basic", "invoice"],
    },

    {
      name: languageTranslation("MENU_INSTITUTION"),
      icon: "icon-build",
      url: AppRoutes.CARE_INSTITUTION,
      authKey: ["all", "superadmin", "basic", "invoice"],
    },

    {
      name: languageTranslation("MENU_APPOINTMENTS"),
      icon: "icon-appointment",
      url: AppRoutes.APPOINTMENT,
      authKey: ["all", "superadmin", "basic", "invoice"],
    },
    // {
    //   name: languageTranslation('MENU_EMAIL'),
    //   icon: 'icon-email-temp',
    //   url: AppRoutes.ALL_EMAILS,
    //   authKey: ['all', 'superadmin', 'basic', 'invoice']
    // },
    {
      name: languageTranslation("MENU_TO_DO_CARE_GIVER"),
      icon: "icon-todo-care",
      url: AppRoutes.CAREGIVER_TODO,
      authKey: ["all", "superadmin", "basic", "invoice"],
    },
    {
      name: languageTranslation("MENU_TO_DO_INSTITUTION"),
      icon: "icon-todo-inst",
      url: AppRoutes.CARE_INSTITUTION_TODO,
      authKey: ["all", "superadmin", "basic", "invoice"],
      // url: AppRoutes.REGION
    },
    {
      name: languageTranslation("MENU_BULK_EMAIL"),
      icon: "icon-bulk-email",
      url: AppRoutes.BULK_EMAIL_CAREGIVER,
      authKey: ["all", "superadmin", "basic", "invoice"],
    },

    {
      name: languageTranslation("MENU_BULK_EMAIL_CI"),
      icon: "icon-bulk-email",
      url: AppRoutes.BULK_EMAIL_CANSTITUTION,
      authKey: ["all", "superadmin", "basic", "invoice"],
    },

    {
      name: languageTranslation("MENU_INVOICES"),
      icon: "icon-invoice",
      url: AppRoutes.ALLINVOICES,
      authKey: ["all", "superadmin", "basic", "invoice"],
      children: [
        {
          name: languageTranslation("MENU_INVOICES"),
          icon: "icon-invoice",
          url: AppRoutes.INVOICE,
        },
        {
          name: languageTranslation("MENU_INVOICE_SOLONA"),
          icon: "icon-invoice-solona",
          url: AppRoutes.INVOICESOLONA,
        },
        {
          name: languageTranslation("MENU_PRINT_INVOICE"),
          icon: "icon-print-invoice",
          url: AppRoutes.PRINTINVOICES,
        },
        {
          name: languageTranslation("MENU_CREATE_INVOICE"),
          icon: "icon-create-invoice",
          url: AppRoutes.CREATEINVOICES,
        },
        {
          name: languageTranslation("MENU_LEASING_CREATE_INVOICE"),
          icon: "icon-invoice",
          url: AppRoutes.LEASINGCREATEINVOICE,
        },
        // {
        //   name: languageTranslation("MENU_CREATE_FREETEXT_INVOICE"),
        //   icon: "icon-create-freetext-invoice",
        //   url: AppRoutes.ALLINVOICES,
        // },
        // {
        //   name: languageTranslation("MENU_PAYSLIP_SOLONA"),
        //   icon: "icon-payslip-invoice",
        //   url: AppRoutes.PAYSLIPFORM,
        // },
        // {
        //   name: languageTranslation("MENU_HEALTHINSURANCE_FORM"),
        //   icon: "icon-direct-debit",
        //   url: AppRoutes.HEALTHINSURANCEFORM,
        // },
      ],
    },
    {
      name: languageTranslation("MENU_DOCUMENT_UPLOADS"),
      icon: "icon-upload",
      url: AppRoutes.DOCUMENT_TEMPLATE_WORKING,
      authKey: ["all", "superadmin", "basic", "invoice"],
      // children: [
      //   {
      //     name: languageTranslation("MENU_DOCUMENT_WORKING_PROOF"),
      //     icon: "icon-working-list",
      //     url: AppRoutes.DOCUMENT_TEMPLATE_WORKING
      //   },
      //   {
      //     name: languageTranslation("MENU_DOCUMENT_SICK_NOTES"),
      //     icon: "icon-document",
      //     url: AppRoutes.HOME
      //   }
      // ]
    },
    {
      name: languageTranslation("MENU_FURTHER"),
      icon: "icon-cms",
      url: AppRoutes.FURTHER,
      authKey: ["all", "superadmin", "basic", "invoice"],
      children: [
        {
          name: languageTranslation("MENU_GLOBAL_CALENDAR"),
          icon: "icon-appointment",
          url: AppRoutes.GLOBAL_CALENDAR,
        },
        {
          name: languageTranslation("MENU_FURTHER_EMAIL_TEMPLATES"),
          icon: "icon-email-templates",
          url: AppRoutes.EMAIL_TEMPLATE_MANAGEMENT,
        },
        {
          name: languageTranslation("MENU_ATTRIBUTES"),
          icon: "icon-attribute",
          url: AppRoutes.ATTRIBUTE_MANAGEMENT,
        },
        {
          name: languageTranslation("MENU_FURTHER_EMPLOYEE"),
          icon: "icon-employees",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_FURTHER_PERMISSION"),
          icon: "icon-permission",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_FURTHER_SCHEDULER"),
          icon: "icon-scheduler",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_FURTHER_LEASING_PRICE_LISTS"),
          icon: "icon-price-list",
          url: AppRoutes.HOME,
        },
      ],
    },
    {
      name: languageTranslation("MENU_REPORTS"),
      icon: "icon-document",
      url: AppRoutes.HOME,
      authKey: ["all", "superadmin", "basic", "invoice"],
      children: [
        {
          name: languageTranslation("MENU_REPORTS_TURNOVER"),
          icon: "icon-turnover",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_REPORTS_EMPLOYEE_ACTIVITY"),
          icon: "icon-activity",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_REPORTS_PHONECALL"),
          icon: "icon-call",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_REPORTS_HOLIDAYS"),
          icon: "icon-holidays",
          url: AppRoutes.HOME,
        },

        {
          name: languageTranslation("MENU_REPORTS_MISSING_WORKING_PROOFS"),
          icon: "icon-working-list",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_REPORTS_ACQUISTION"),
          icon: "icon-acquisition",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_REPORTS_TURNOVER_CARETAKER"),
          icon: "icon-turnover-caretakers",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_REPORTS_INACTIVE_CARE_INSTITUTIONS"),
          icon: "icon-care-Institution",
          url: AppRoutes.HOME,
        },
        {
          name: languageTranslation("MENU_REPORTS_INACTIVE_CARE_TAKER"),
          icon: "icon-inactive-caretakers",
          url: AppRoutes.HOME,
        },
      ],
    },
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
  ],
};

export const ValidatedRoutes = [
  {
    url: AppRoutes.EMPLOYEE,
    authKey: "superadmin",
  },
  {
    url: AppRoutes.EDIT_EMPLOYEE,
    authKey: "superadmin",
  },
  {
    url: AppRoutes.VIEW_EMPLOYEE,
    authKey: "superadmin",
  },
  {
    url: AppRoutes.ADD_EMPLOYEE,
    authKey: "superadmin",
  },
];
