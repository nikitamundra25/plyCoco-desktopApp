import * as Yup from 'yup';
import { ICaregiverValidationFormValue } from '../../interfaces';
import { languageTranslation } from '../../helpers';
import { NumberWithCommaRegex } from '../../config';

export const CareGiverValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICaregiverValidationFormValue
>> = Yup.object().shape<ICaregiverValidationFormValue>({
  fee: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  nightFee: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  weekendAllowance: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  holidayAllowance: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  )
});
