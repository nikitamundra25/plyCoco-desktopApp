import { AppRoutes } from "./config";
import { languageTranslation } from "./helpers";
export default {
  items: [
    {
      name: languageTranslation("SIDEBAR_EMPLOYEE"),
      icon: "fa fa-users",
      url: AppRoutes.EMPLOYEE
    },
    {
      name: languageTranslation("SIDEBAR_REGION"),
      icon: "fa fa-sitemap",
      url: AppRoutes.REGION
    },
    {
      name: languageTranslation("SIDEBAR_CAREGIVER"),
      icon: "fa fa-h-square",
      url: AppRoutes.CARE_GIVER
    },

    {
      name: languageTranslation("SIDEBAR_CANSTITUTION"),
      icon: "fa fa-building"
      //url: AppRoutes.REGION
    },
    {
      name: languageTranslation("SIDEBAR_PUBLIC_HOLIDAY_CAL"),
      icon: "fa fa-calendar"
      // url: AppRoutes.REGION
    },
    {
      name: languageTranslation("SIDEBAR_ATTRIBUTES"),
      icon: "fa fa-list-ul"
      //url: AppRoutes.REGION
    },
    {
      name: languageTranslation("SIDEBAR_DOCUMENT_TEMPLATES"),
      icon: "fa fa-file"
      // url: AppRoutes.CARE_GIVER
    },
    {
      name: languageTranslation("SIDEBAR_EMAIL_TEMPLATES"),
      icon: "fa fa-envelope"
      // url: AppRoutes.REGION
    }
  ]
};
