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
  taxBracket,
  taxNumberLimit,
  NumberWithCommaRegex
} from '../../config';
import moment from 'moment';

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
      const { isValid, message }: IDateResponse = dateValidator(val, {
        maxDate: moment()
          .subtract(13, 'years')
          .format(),
        minDate: moment()
          .subtract(100, 'years')
          .format()
      });
      return !val || isValid || createError({ path, message });
    }
  }),
  phoneNumber: Yup.mixed(),
  mobileNumber: Yup.mixed(),
  taxNumber: Yup.mixed()
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
  caregiverInvoiceTax: Yup.mixed()
  .test(
    "check-num",
    languageTranslation("CAREGIVER_INVOICE_NUM_ERROR"),
    value => !value || (value && !isNaN(value))
  )
  .test(
    "check-limit",
    languageTranslation("CAREGIVER_INVOICE_TAX_ERROR"),
    value => !value || value <= taxBracket
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
    .integer(languageTranslation("AGE_VALIDATION_MESSAGE"))
    .typeError(languageTranslation("AGE_MUST_NUMBER"))
    .min(13, languageTranslation("AGE_VALIDATION"))
    .max(100, languageTranslation("AGE_MAXLENGTH")),
  country: Yup.mixed().required(languageTranslation('COUNTRY_REQUIRED')),
  state: Yup.mixed().required(languageTranslation('STATE_REQUIRED'))
});
