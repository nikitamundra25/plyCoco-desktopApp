import * as Yup from 'yup';
import {
  CareGiverValues,
  IDateResponse,
  IRemark,
  ICareGiverValidationInterface
} from '../../interfaces';
import { languageTranslation, dateValidator } from '../../helpers';
import {
  telephoneReqExp,
  telMin,
  telMax,
  fee,
  taxNumberLimit,
  NumberWithCommaRegex
} from '../../config';
export const CareGiverValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICareGiverValidationInterface
>> = Yup.object().shape<ICareGiverValidationInterface>({
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
  email: Yup.string()
    .trim()
    .email(languageTranslation('VALID_EMAIL'))
    .required(languageTranslation('REQUIRED_EMAIL')),
  dateOfBirth: Yup.mixed().test({
    name: 'validate-date',
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: IDateResponse = dateValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
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
        !value || (value && value.length >= telMin && value.length <= telMax)
    ),
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
        !value || (value && value.length >= telMin && value.length <= telMax)
    ),
  taxNumber: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('TAX_NUMERROR'),
      value => !value || (value && !isNaN(value))
    )
    .test(
      'num-length',
      languageTranslation('TAX_MAXLENGTH'),
      value => !value || (value && value.length <= taxNumberLimit)
    ),
  userName: Yup.string()
    .trim()
    .required(languageTranslation('USERNAME_REQUIRED')),
  fee: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  // .number()
  //   .nullable()
  //   .typeError('Fee must be number')
  //   .max(10000, "Fee can't be greater than 10000"),
  night: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  weekendAllowance: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  holiday: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  age: Yup.number()
    .nullable()
    .integer('Age must be a valid integer')
    .typeError('Age must be a number')
    .min(18, 'You must have 18 years of age')
    .max(100, "Age can't be greater than 100 years"),
  fax: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || (value && !isNaN(value))
  )
});
