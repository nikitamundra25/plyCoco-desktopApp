import { AppRoutes } from "../../../../config";
import { languageTranslation } from "../../../../helpers";

export const CareGiverTodoRoutes = [
  {
    path: AppRoutes.PERSONAL_INFORMATION,
    name: languageTranslation("CG_SUB_MENU_OVERVIEW")
  },
  {
    path: AppRoutes.OFFER,
    name: languageTranslation("OFFERS")
  }
];
