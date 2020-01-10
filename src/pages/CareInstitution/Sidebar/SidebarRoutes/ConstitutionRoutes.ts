import { AppRoutes } from "../../../../config";

export const careGiverRoutes = [
  {
    path: AppRoutes.CARE_INSTITUTION_PERSONAL_DATA,
    name: "Overview"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_OFFER,
    name: "Offers"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_LOGIN,
    name: "Login"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_INVOICE_CYCLE,
    name: "Invoices"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_DOCUMENT,
    name: "Documents"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_DEPARTMENT,
    name: "Departments"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_EMAIL,
    name: "Emails"
  },
  {
    path: AppRoutes.CARE_INSTITUTION_REMINDER,
    name: "Reminders/Todos"
  }
];
