import * as Yup from 'yup';
import {
  ICaregiverValidationFormValue,
  ICareinstituionValidationFormValue,
  ITimeResponse
} from '../../interfaces';
import { languageTranslation, timeValidator } from '../../helpers';
import { NumberWithCommaRegex } from '../../config';

export const CareGiverValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICaregiverValidationFormValue
>> = Yup.object().shape<ICaregiverValidationFormValue>({
  fee: Yup.mixed()
    .required(languageTranslation('FEE_REQUIRED'))
    .test(
      'check-num',
      languageTranslation('INVALID_NUMBER'),
      value => !value || NumberWithCommaRegex.test(value)
    ),
  nightFee: Yup.mixed()
    .required(languageTranslation('NIGHT_FEE_REQUIRED'))
    .test(
      'check-num',
      languageTranslation('INVALID_NUMBER'),
      value => !value || NumberWithCommaRegex.test(value)
    ),
  weekendAllowance: Yup.mixed()
    .required(languageTranslation('WEEKEND_ALLOWANCE_REQUIRED'))
    .test(
      'check-num',
      languageTranslation('INVALID_NUMBER'),
      value => !value || NumberWithCommaRegex.test(value)
    ),
  holidayAllowance: Yup.mixed()
    .required(languageTranslation('HOLIDAY_ALLOWANCE_REQUIRED'))
    .test(
      'check-num',
      languageTranslation('INVALID_NUMBER'),
      value => !value || NumberWithCommaRegex.test(value)
    ),
  distanceInKM: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  feePerKM: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  otherExpenses: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  )
});

export const CareInstitutionValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICareinstituionValidationFormValue
>> = Yup.object().shape<ICareinstituionValidationFormValue>({
  startTime: Yup.string()
    .required(languageTranslation('START_TIME_REQUIRED'))
    .test({
      name: 'validate-time',
      test: function(val) {
        const { path, createError } = this;
        const { isValid, message }: ITimeResponse = timeValidator(val);
        return !val || isValid || createError({ path, message });
      }
    }),
  endTime: Yup.string()
    .required(languageTranslation('END_TIME_REQUIRED'))
    .test({
      name: 'validate-time',
      test: function(val) {
        const { path, createError } = this;
        const { isValid, message }: ITimeResponse = timeValidator(val);
        return !val || isValid || createError({ path, message });
      }
    })
});
