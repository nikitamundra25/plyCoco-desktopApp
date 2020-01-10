import { AppRoutes } from "../../../../config";
import { languageTranslation } from "../../../../helpers";

export const careGiverRoutes = [
  {
    path: AppRoutes.PERSONAL_INFORMATION,
    name: languageTranslation("CG_SUB_MENU_OVERVIEW")

  },
  {
    path: AppRoutes.OFFER,
    name: languageTranslation("OFFERS")

  },
  {
    path: AppRoutes.CARE_LOGIN,
    name: languageTranslation("CG_SUB_MENU_LOGIN")

  },
  {
    path: AppRoutes.INVOCES,
    name: languageTranslation("MENU_INVOICES")

  },
  {
    path: AppRoutes.DOCUMENTS_UPLOAD,
    name: languageTranslation("CG_SUB_MENU_DOCUMENTS")

  },
  {
    path: AppRoutes.INBOX,
    name: languageTranslation("MENU_EMAIL")

  },

  {
    path: AppRoutes.TODO,
    name: languageTranslation("CG_SUB_MENU_REMINDER")

  },
  {
    path: AppRoutes.LEASING_PERSONALDATA,
    name: languageTranslation("CG_SUB_MENU_LEASING")

  },
  {
    path: AppRoutes.QUALIFICATION_ATTRIBUTE,
    name: languageTranslation("CG_SUB_MENU_GROUPED")

  }
];

