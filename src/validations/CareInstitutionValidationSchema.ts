import * as Yup from 'yup';
import { ICareInstitutionValidationSchema, IDateResponse } from '../interfaces';
import {
  telephoneReqExp,
  nameRegExp,
  fileSize,
  SupportedFormats,
} from '../config';
import { languageTranslation, logger, dateValidator } from '../helpers';


export const EmployeeValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICareInstitutionValidationSchema
>> = Yup.object().shape<ICareInstitutionValidationSchema>({
  email: Yup.string()
    .trim()
    .email(languageTranslation('VALID_EMAIL'))
    .required(languageTranslation('REQUIRED_EMAIL')),
  firstName: Yup.string()
    .trim()
    .matches(nameRegExp, languageTranslation('FIRSTNAME_SPECIALCHARACTER'))
    .max(20, languageTranslation('FIRSTNAME_MAXLENGTH'))
    .required(languageTranslation('FIRSTNAME_REQUIRED')),
  lastName: Yup.string()
    .trim()
    .matches(nameRegExp, languageTranslation('LASTNAME_SPECIALCHARACTER'))
    .max(20, languageTranslation('LASTNAME_MAXLENGTH'))
    .required(languageTranslation('LASTNAME_REQUIRED')),
  userName: Yup.string()
    .trim()
    .required(languageTranslation('USERNAME_REQUIRED'))
});
