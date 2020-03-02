import * as Yup from 'yup';
import { IEmployeeFormValues, IDateResponse } from '../../interfaces';
import {
  fileSize,
  SupportedFormats,
  telephoneReqExp,
  IBANlength,
  telMin,
  telMax,
  IBANReplaceRegex,
  userNameReplaceRegex,
  emailRegex
} from '../../config';
import { languageTranslation, logger, dateValidator } from '../../helpers';
export const EmployeeValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IEmployeeFormValues
>> = Yup.object().shape<IEmployeeFormValues>({
  email: Yup.string()
    .trim()
    // .matches(emailRegex, "Email invalidddddddd")
    .max(120, languageTranslation('EMAIL_MAXLENGTH'))
    .email(languageTranslation('VALID_EMAIL'))
    .required(languageTranslation('REQUIRED_EMAIL')),
  firstName: Yup.string()
    .trim()
    .min(3, languageTranslation('NAME_MINLENGTH'))
    .max(120, languageTranslation('FIRSTNAME_MAXLENGTH'))
    .required(languageTranslation('FIRSTNAME_REQUIRED')),
  lastName: Yup.string()
    .trim()
    .max(120, languageTranslation('LASTNAME_MAXLENGTH'))
    .min(3, languageTranslation('NAME_MINLENGTH'))
    .required(languageTranslation('LASTNAME_REQUIRED')),
  userName: Yup.string()
    .trim()
    .max(120, languageTranslation('USERNAME_MAXLENGTH'))
    .required(languageTranslation('USERNAME_REQUIRED')),
  // .matches(userNameReplaceRegex, "Invalid username"),
  accountHolderName: Yup.string()
    .trim()
    .min(3, languageTranslation('NAME_MINLENGTH')),
  bankName: Yup.string()
    .trim()
    .min(3, languageTranslation('NAME_MINLENGTH')),
  BIC: Yup.string(),
  additionalText: Yup.string(),
  // .max(255, languageTranslation("REMARK_LIMIT")),
  address1: Yup.string(),
  address2: Yup.string(),
  zip: Yup.string(),
  joiningDate: Yup.mixed().test({
    name: 'validate-date',
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: IDateResponse = dateValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  image: Yup.mixed()
    .test(
      'fileFormat',
      languageTranslation('UNSUPPORTED_FORMAT'),
      value => !value || (value && SupportedFormats.includes(value.type))
    )
    .test(
      'fileSize',
      languageTranslation('FILE_SIZE_TO_LARGE'),
      value => !value || (value && value.size <= fileSize)
    ),
  IBAN: Yup.mixed().test(
    'len',
    languageTranslation('IBAN_INVALID'),
    value =>
      !value ||
      !value.replace(IBANReplaceRegex, '') ||
      (value && value.replace(IBANReplaceRegex, '').length === IBANlength)
  ),
  telephoneNumber: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('TEL_NUMERROR'),
      value => !value || (value && !isNaN(value))
    )
    .test(
      'num-length',
      languageTranslation('TEL_MINLENGTH'),
      value =>
        !value || (value && value.length >= telMin && value.length <= telMax)
    ),
  city: Yup.string(),
  country: Yup.object().shape({
    value: Yup.string().required(languageTranslation('COUNTRY_REQUIRED')),
    label: Yup.string().required(languageTranslation('COUNTRY_REQUIRED'))
  }),
  state: Yup.object().shape({
    value: Yup.string().required(languageTranslation('STATE_REQUIRED')),
    label: Yup.string().required(languageTranslation('STATE_REQUIRED'))
  })
});
