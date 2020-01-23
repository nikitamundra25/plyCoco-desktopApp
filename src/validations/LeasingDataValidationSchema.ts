import * as Yup from 'yup';
import { ILeasingValues } from '../interfaces';
import { languageTranslation } from '../helpers';

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
  socialSecurityNumber: Yup.string(),
  religion: Yup.mixed(),
  controlId: Yup.string(),
  taxBracket: Yup.string(),
  preoccupation: Yup.mixed(),
  payrollIBAN: Yup.string(),
  status: Yup.mixed(),
});
