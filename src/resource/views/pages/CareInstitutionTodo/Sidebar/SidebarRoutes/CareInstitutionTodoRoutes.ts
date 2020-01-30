import { AppRoutes } from '../../../../../../config';
import { languageTranslation } from '../../../../../../helpers';

export const CareInstitutionTodoRoutes = [
  {
    path: AppRoutes.CARE_INSTITUTION_TODO_HIDE_DONE,
    name: languageTranslation('HIDE_DONE'),
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO_HIDE_FUTURE,
    name: languageTranslation('HIDE_FUTURE_ONES'),
  },
  {
    path: AppRoutes.CARE_INSTITUTION_TODO_REQUIREMENT,
    name: languageTranslation('REQUIREMENT'),
  },
];
