import * as Yup from 'yup';
import { mobMin, mobMax, webRegExp, NumberWithCommaRegex } from '../../config';
import { languageTranslation, timeValidator } from '../../helpers';
import {
  ICareInstitutionValidationSchema,
  ICareInstitutionContactValidationSchema,
  IAddDepartmentFormValidationSchema,
  IAddTimeFormValidationSchema,
  ITimeResponse
} from '../../interfaces';

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
    .min(3, languageTranslation('NAME_MINLENGTH'))
    .max(120, languageTranslation('FIRSTNAME_MAXLENGTH'))
    .required(languageTranslation('FIRSTNAME_REQUIRED')),
  lastName: Yup.string()
    .trim()
    .min(3, languageTranslation('NAME_MINLENGTH'))
    .max(120, languageTranslation('LASTNAME_MAXLENGTH'))
    .required(languageTranslation('LASTNAME_REQUIRED')),
  userName: Yup.string()
    .trim()
    .required(languageTranslation('USERNAME_REQUIRED')),
  companyName: Yup.string()
    .trim()
    .required(languageTranslation('COMPANY_REQUIRED')),
  mobileNumber: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('MOB_NUMERROR'),
      value => !value || (value && !isNaN(value))
    )
    .test(
      'num-length',
      languageTranslation('MOB_MAXLENGTH'),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax)
    ),
  phoneNumber: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('PHONE_NUMERROR'),
      value => !value || (value && !isNaN(value))
    )
    .test(
      'num-length',
      languageTranslation('PHONE_MAXLENGTH'),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax)
    ),
  careGiverCommission: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  doctorCommission: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  fax: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || (value && !isNaN(value))
  ),
  website: Yup.string()
    .matches(webRegExp, {
      message: languageTranslation('ENTER_VALID_WEB_URL'),
      excludeEmptyString: true
    })
    .nullable(),
  country: Yup.mixed()
    .required(languageTranslation('COUNTRY_REQUIRED'))
  ,
  state: Yup.mixed()
    .required(languageTranslation('STATE_REQUIRED'))
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
    .max(20, languageTranslation('FIRSTNAME_MAXLENGTH'))
    .min(3, languageTranslation('NAME_MINLENGTH'))
    .required(languageTranslation('FIRSTNAME_REQUIRED')),
  lastName: Yup.string()
    .trim()
    .max(20, languageTranslation('LASTNAME_MAXLENGTH'))
    .min(3, languageTranslation('NAME_MINLENGTH'))
    .required(languageTranslation('LASTNAME_REQUIRED')),
  mobileNumber: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('MOB_NUMERROR'),
      value => !value || (value && !isNaN(value))
    )
    .test(
      'num-length',
      languageTranslation('MOB_MAXLENGTH'),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax)
    ),
  phoneNumber: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('PHONE_NUMERROR'),
      value => !value || (value && !isNaN(value))
    )
    .test(
      'num-length',
      languageTranslation('PHONE_MAXLENGTH'),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax)
    ),
  phoneNumber2: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('PHONE_NUMERROR'),
      value => !value || (value && !isNaN(value))
    )
    .test(
      'num-length',
      languageTranslation('PHONE_MAXLENGTH'),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax)
    ),
  faxNumber: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || (value && !isNaN(value))
  ),
  contactType: Yup.object().shape({
    value: Yup.string().required(languageTranslation('CONTACT_REQUIRED')),
    label: Yup.string().required(languageTranslation('CONTACT_REQUIRED'))
  }),
  country: Yup.mixed()
    .required(languageTranslation('COUNTRY_REQUIRED')),
  state: Yup.mixed()
    .required(languageTranslation('STATE_REQUIRED'))
});

export const AddDepartmentValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IAddDepartmentFormValidationSchema
>> = Yup.object().shape<IAddDepartmentFormValidationSchema>({
  name: Yup.string()
    .trim()
    .min(3, languageTranslation('NAME_MINLENGTH'))
    .max(20, languageTranslation('NAME_MAXLENGTH'))
    .required(languageTranslation('NAME_REQUIRED')),
  anonymousName: Yup.string(),
  anonymousName2: Yup.string(),
  address: Yup.string(),
  contactPerson: Yup.string(),
  phoneNumber: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('PHONE_NUMERROR'),
      value => !value || (value && !isNaN(value))
    )
    .test(
      'num-length',
      languageTranslation('PHONE_MAXLENGTH'),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax)
    ),
  faxNumber: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || (value && !isNaN(value))
  ),
  email: Yup.string()
    .trim()
    .email(languageTranslation('VALID_EMAIL'))
    .required(languageTranslation('REQUIRED_EMAIL')),
  commentsOffer: Yup.string(),
  commentsCareGiver: Yup.string(),
  commentsVisibleInternally: Yup.string()
});

export const AddTimeValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IAddTimeFormValidationSchema
>> = Yup.object().shape<IAddTimeFormValidationSchema>({
  begin: Yup.mixed().test({
    name: 'validate-time',
    test: function (val) {
      const { path, createError } = this;
      const { isValid, message }: ITimeResponse = timeValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  end: Yup.mixed().test({
    name: 'validate-time',
    test: function (val) {
      const { path, createError } = this;
      const { isValid, message }: ITimeResponse = timeValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  comment: Yup.string()
});
