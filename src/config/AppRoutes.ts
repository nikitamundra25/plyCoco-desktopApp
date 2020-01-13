import { languageTranslation } from "../helpers";
import { IAppRoutes } from "../interfaces";

export const AppRoutes: IAppRoutes = {
  MAIN: "/",
  HOME: "/dashboard",
  LOGIN: "/login",
  MY_PROFILE: "/profile",
  USERS: "/users",
  EMPLOYEE: "/employee",
  ADD_EMPLOYEE: "/employee/add",
  VIEW_EMPLOYEE: "/employee/view",
  EDIT_EMPLOYEE: "/employee/edit/:userName",
  DEPARTMENT: "/department",
  ADD_DEPARTMENT: "/department/add",
  REGION: "/region",
  ADD_REGION: "/region/add",
  CARE_GIVER: "/caregiver",
  ADD_CARE_GIVER: "/caregiver/add",
  EDIT_CARE_GIVER: "/caregiver/edit",
  PERSONAL_INFORMATION: "/caregiver/personal-information",
  QUALIFICATION_ATTRIBUTE: "/caregiver/qualification-attribute",
  BILLING_SETTING: "/caregiver/billing-setting",
  BILLING: "/caregiver/billing",
  LEASING_PERSONALDATA: "/caregiver/leasing-personaldata",
  SIGNATURE: "/caregiver/signature",
  DOCUMENTS_UPLOAD: "/caregiver/document-upload",
  CHANGE_PASSWORD: "/caregiver/change-password",
  EMAIL: "/caregiver/email",
  INBOX: "/caregiver/email/inbox",
  SENT_EMAIL: "/caregiver/email/sent-email",
  NEW_EMAIL: "/caregiver/email/new-email",
  EMAIL_SETTINGS: "/caregiver/email/settings",
  EVENT: "/caregiver/event",
  OFFER: "/caregiver/offer",
  INVOCES: "/caregiver/invoice",
  TODO: "/caregiver/todo",
  CARE_LOGIN: "/caregiver/loginlist",
  ADD_CARE_INSTITUTION: "/care-institution/add",
  CARE_INSTITUTION: "/care-institution",
  CARE_INSTITUTION_PERSONAL_DATA: "/care-institution/personal-information",
  CARE_INSTITUTION_COMISSION_AGREEMENT:
    "/care-institution/commission-agreement",
  CARE_INSTITUTION_OFFER: "/care-institution/offers",
  CARE_INSTITUTION_LOGIN: "/care-institution/login",
  CARE_INSTITUTION_INVOICE_CYCLE: "/care-institution/invoice-cycle",
  CARE_INSTITUTION_DOCUMENT: "/care-institution/document",
  CARE_INSTITUTION_DEPARTMENT: "/care-institution/department",
  CARE_INSTITUTION_INBOX_EMAIL: "/care-institution/email/inbox",
  CARE_INSTITUTION_SENT_EMAIL: "/care-institution/email/sent-email",
  CARE_INSTITUTION_NEW_EMAIL: "/care-institution/email/new-email",
  CARE_INSTITUTION_REMINDER: "/care-institution/todo"

  // MAIN: languageTranslation("ROUTES_MAIN"),
  // HOME: languageTranslation("ROUTES_HOME"),
  // LOGIN: languageTranslation("ROUTES_LOGIN"),
  // MY_PROFILE: languageTranslation("ROUTES_MY_PROFILE"),
  // USERS: languageTranslation("ROUTES_USERS"),
  // EMPLOYEE: languageTranslation("ROUTES_EMPLOYEE"),
  // ADD_EMPLOYEE: languageTranslation("ROUTES_ADD_EMPLOYEE"),
  // VIEW_EMPLOYEE: languageTranslation("ROUTES_VIEW_EMPLOYEE"),
  // EDIT_EMPLOYEE: languageTranslation("ROUTES_EDIT_EMPLOYEE"),
  // DEPARTMENT: languageTranslation("ROUTES_DEPARTMENT"),
  // ADD_DEPARTMENT: languageTranslation("ROUTES_ADD_DEPARTMENT"),
  // REGION: languageTranslation("ROUTES_REGION"),
  // ADD_REGION: languageTranslation("ROUTES_ADD_REGION"),
  // CARE_GIVER: languageTranslation("ROUTES_CARE_GIVER"),
  // ADD_CARE_GIVER: languageTranslation("ROUTES_ADD_CARE_GIVER"),
  // EDIT_CARE_GIVER: languageTranslation("ROUTES_EDIT_CARE_GIVER"),
  // PERSONAL_INFORMATION: languageTranslation("ROUTES_PERSONAL_INFORMATION"),
  // QUALIFICATION_ATTRIBUTE: languageTranslation(
  //   "ROUTES_QUALIFICATION_ATTRIBUTE"
  // ),
  // BILLING_SETTING: languageTranslation("ROUTES_BILLING_SETTING"),
  // BILLING: languageTranslation("ROUTES_BILLING"),
  // LEASING_PERSONALDATA: languageTranslation("ROUTES_LEASING_PERSONALDATA"),
  // SIGNATURE: languageTranslation("ROUTES_SIGNATURE"),
  // DOCUMENTS_UPLOAD: languageTranslation("ROUTES_DOCUMENTS_UPLOAD"),
  // CHANGE_PASSWORD: languageTranslation("ROUTES_CHANGE_PASSWORD"),
  // EMAIL: languageTranslation("ROUTES_EMAIL"),
  // INBOX: languageTranslation("ROUTES_INBOX"),
  // SENT_EMAIL: languageTranslation("ROUTES_SENT_EMAIL"),
  // NEW_EMAIL: languageTranslation("ROUTES_NEW_EMAIL"),
  // EMAIL_SETTINGS: languageTranslation("ROUTES_EMAIL_SETTINGS"),
  // EVENT: languageTranslation("ROUTES_EVENT"),
  // OFFER: languageTranslation("ROUTES_OFFER"),
  // INVOCES: languageTranslation("ROUTES_INVOCES"),
  // TODO: languageTranslation("ROUTES_TODO"),
  // CARE_LOGIN: languageTranslation("ROUTES_CARE_LOGIN"),
  // ADD_CARE_INSTITUTION: languageTranslation("ROUTES_ADD_CARE_INSTITUTION"),
  // CARE_INSTITUTION: languageTranslation("ROUTES_CARE_INSTITUTION"),
  // CARE_INSTITUTION_PERSONAL_DATA: languageTranslation(
  //   "ROUTES_CARE_INSTITUTION_PERSONAL_DATA"
  // ),

  // CARE_INSTITUTION_COMISSION_AGREEMENT: languageTranslation(
  //   "ROUTE_CARE_INSTITUTION_COMISSION_AGREEMENT"
  // ),
  // CARE_INSTITUTION_OFFER: languageTranslation("ROUTE_CARE_INSTITUTION_OFFER"),
  // CARE_INSTITUTION_LOGIN: languageTranslation("ROUTE_CARE_INSTITUTION_LOGIN"),
  // CARE_INSTITUTION_INVOICE_CYCLE: languageTranslation(
  //   "ROUTE_CARE_INSTITUTION_INVOICE_CYCLE"
  // ),
  // CARE_INSTITUTION_DOCUMENT: languageTranslation(
  //   "ROUTE_CARE_INSTITUTION_DOCUMENT"
  // ),
  // CARE_INSTITUTION_DEPARTMENT: languageTranslation(
  //   "ROUTE_CARE_INSTITUTION_DEPARTMENT"
  // ),
  // CARE_INSTITUTION_EMAIL: languageTranslation("ROUTE_CARE_INSTITUTION_EMAIL"),
  // CARE_INSTITUTION_REMINDER: languageTranslation(
  //   "ROUTE_CARE_INSTITUTION_REMINDER"
  // )
};
