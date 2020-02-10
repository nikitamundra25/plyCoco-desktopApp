import * as Yup from 'yup';
import { ILoginFormValues } from '../../interfaces';
import { languageTranslation } from '../../helpers';

export const LoginValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ILoginFormValues
>> = Yup.object().shape<ILoginFormValues>({
  userName: Yup.string()
    .trim()
    .required(languageTranslation('USERNAME_REQUIRED')),
  password: Yup.string()
    .min(6, languageTranslation('MIN_LENGTH_PASSWORD'))
    .required(languageTranslation('REQUIRED_PASSWORD'))
});
