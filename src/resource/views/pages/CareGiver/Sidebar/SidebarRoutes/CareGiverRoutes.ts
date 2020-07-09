import { languageTranslation } from "../../../../../../helpers";

export const careGiverRoutes = [
  {
    viewName: languageTranslation("OVERVIEW_LABEL"),
    name: "overView"
  },
  {
    viewName: languageTranslation("OFFERS_LABEL"),
    name: "offers"
  },
  {
    viewName:  languageTranslation("LOGIN"),
    name:"login"
  },
  {
    viewName: languageTranslation("INVOICE_LABEL_LOWERCASE"),
    name: "invoices"
  },
  {
    viewName: languageTranslation("DOCUMENT_LABEL"),
    name:"documents"
  },
  {
    viewName: languageTranslation("EMAIL_LABEL_LOWERCASE"),
    name:"emails"
  },
  {
    viewName: languageTranslation("REMAINDER_TODOS_LABEL"),
    name:"reminders/todos"
  },
  {
    viewName: languageTranslation("LEASING_LABLE"),
    name:"leasing"
  },
  {
    viewName: languageTranslation("GROUPED_BELOW_LABEL"),
    name:"grouped below"
  },
];
