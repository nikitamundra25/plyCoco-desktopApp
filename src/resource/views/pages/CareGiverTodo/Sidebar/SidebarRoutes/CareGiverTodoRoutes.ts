import { AppRoutes } from '../../../../../../config';
import { languageTranslation } from '../../../../../../helpers';

export const CareGiverTodoRoutes = [
  {
    path: AppRoutes.CARE_GIVER_HIDE_DONE,
    name: languageTranslation('HIDE_DONE'),
  },
  {
    path: AppRoutes.CARE_GIVER_HIDE_FUTURE,
    name: languageTranslation('HIDE_FUTURE_ONES'),
  },
];
