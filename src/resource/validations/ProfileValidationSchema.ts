import * as Yup from 'yup';
import { IChangePasswordValues, IProfileFormvalues } from '../../interfaces';
import { languageTranslation } from '../../helpers';

export const ProfileValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IProfileFormvalues
>> = Yup.object().shape<IProfileFormvalues>({
  firstName: Yup.string().required(languageTranslation('FIRSTNAME_REQUIRED')),
  lastName: Yup.string().required(languageTranslation('LASTNAME_REQUIRED')),
  email: Yup.string()
    .email(languageTranslation('VALID_EMAIL'))
    .required(languageTranslation('REQUIRED_EMAIL')),
});

export const ChangePasswordValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IChangePasswordValues
>> = Yup.object().shape<IChangePasswordValues>({
  oldPassword: Yup.string().required(
    languageTranslation('REQUIRED_OLD_PASSWORD'),
  ),
  password: Yup.string().required(languageTranslation('REQUIRED_PASSWORD')),
  confirmPassword: Yup.string()
    .required(languageTranslation('REQUIRED_CONFIRM_PASSWORD'))
    .min(6, languageTranslation('MIN_LENGTH_PASSOWRD'))
    .max(18, languageTranslation('MAX_LENGTH_PASSOWRD'))
    .oneOf(
      [Yup.ref('password'), null],
      languageTranslation('UNMATCH_PASSOWRD'),
    ),
});
