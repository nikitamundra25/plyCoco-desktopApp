import * as Yup from 'yup';
import { ICaregiverValidationFormValue } from '../../interfaces';
import { languageTranslation } from '../../helpers';
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
  distanceInKM: Yup.mixed()
  .test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  feePerKM: Yup.mixed()
  .test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  otherExpenses: Yup.mixed()
  .test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  )
});
