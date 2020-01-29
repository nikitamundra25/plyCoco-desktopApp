import * as Yup from 'yup';
import { ILeasingValues, IDateResponse } from '../../interfaces';
import { languageTranslation, dateValidator } from '../../helpers';
import {
  IBANReplaceRegex,
  IBANlength,
  workingHours,
  ssn,
  taxBracket,
  alphaNumeric,
} from '../../config';

export const LeasingDataValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ILeasingValues
>> = Yup.object().shape<ILeasingValues>({
  placeOfBirth: Yup.string(),
  birthName: Yup.string()
    .trim()
    .max(20, languageTranslation('FIRSTNAME_MAXLENGTH')),
  nationality: Yup.mixed(),
  maritalStatus: Yup.mixed(),
  children: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || (value && !isNaN(value)),
  ),
  factorChildAllowance: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || (value && !isNaN(value)),
  ),
  healthInsuranceType: Yup.mixed(),
  healthInsuranceProvider: Yup.mixed(),
  socialSecurityNumber: Yup.string()
    .test(
      'check-num',
      languageTranslation('SOCIAL_SECURITY_NUM_ERROR'),
      value => !value || value.toString().length < ssn,
    )
    .matches(alphaNumeric, languageTranslation('SOCIAL_SECURITY_SPCHAR_ERROR')),
  religion: Yup.mixed(),
  controlId: Yup.string(),
  taxBracket: Yup.mixed()
    .test(
      'check-num',
      languageTranslation('TAX_BRACKET_NUM_ERROR'),
      value => !value || (value && !isNaN(value)),
    )
    .test(
      'check-limit',
      languageTranslation('TAX_BRACKET_LESS_ERROR'),
      value => !value || value <= taxBracket,
    ),
  preoccupation: Yup.mixed(),
  payrollIBAN: Yup.mixed().test(
    'len',
    languageTranslation('IBAN_INVALID'),
    value =>
      !value ||
      !value.replace(IBANReplaceRegex, '') ||
      (value && value.replace(IBANReplaceRegex, '').length === IBANlength),
  ),
  status: Yup.mixed(),
  firstDay: Yup.mixed().test({
    name: 'validate-date',
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: IDateResponse = dateValidator(val, 'leasing');
      return !val || isValid || createError({ path, message });
    },
  }),
  lastDay: Yup.mixed().test({
    name: 'validate-date',
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: IDateResponse = dateValidator(val, 'leasing');
      return !val || isValid || createError({ path, message });
    },
  }),
  monthlyWorkingHrs: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_HRS'),
    value =>
      !value ||
      (value && !isNaN(value) && value.toString().length < workingHours),
  ),
  weeklyWorkingHrs: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_HRS'),
    value =>
      !value ||
      (value && !isNaN(value) && value.toString().length < workingHours),
  ),
});
