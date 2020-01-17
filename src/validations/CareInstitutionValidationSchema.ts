import * as Yup from 'yup';
import { ICareInstitutionValidationSchema, IDateResponse, ICareInstitutionContactValidationSchema } from '../interfaces';
import {
  nameRegExp,
  mobMin,
  mobMax,
  webRegExp
} from '../config';
import { languageTranslation, logger, dateValidator } from '../helpers';


export const CareInstituionValidationSchema: Yup.ObjectSchema<Yup.Shape<
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
    .required(languageTranslation('USERNAME_REQUIRED')),
  mobileNumber: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('MOB_NUMERROR'),
      value => !value || (value && !isNaN(value)),
    )
    .test(
      'num-length',
      languageTranslation('MOB_MAXLENGTH'),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax),
    ),
  city: Yup.string(),
  website: Yup.string()
    .trim()
    .matches(webRegExp, languageTranslation("ENTER_VALID_WEB_URL")),
});

export const CareInstituionContactValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICareInstitutionContactValidationSchema
>> = Yup.object().shape<ICareInstitutionContactValidationSchema>({
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
  mobileNumber: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('MOB_NUMERROR'),
      value => !value || (value && !isNaN(value)),
    )
    .test(
      'num-length',
      languageTranslation('MOB_MAXLENGTH'),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax),
    ),
  city: Yup.string()
});
