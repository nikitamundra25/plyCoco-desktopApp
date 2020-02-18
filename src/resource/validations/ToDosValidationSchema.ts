import * as Yup from 'yup';
import { languageTranslation } from '../../helpers';
import {
  ICreateTodoFormValidationSchema
} from '../../interfaces';

export const CreateTodoFormValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICreateTodoFormValidationSchema
>> = Yup.object().shape<ICreateTodoFormValidationSchema>({
  timeOfDay: Yup.string()
    .max(250, languageTranslation('NAME_MAXLENGTH'))
    .required(languageTranslation('NAME_REQUIRED')),
  comment: Yup.string()
    .required(languageTranslation('NAME_REQUIRED')),
});
