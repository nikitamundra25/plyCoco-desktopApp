import * as Yup from 'yup';
import { ILeasingValues } from '../interfaces';
import { languageTranslation } from '../helpers';
import { nameRegExp } from '../config';

export const LeasingDataValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ILeasingValues
>> = Yup.object().shape<ILeasingValues>({
  placeOfBirth: Yup.string(),
  birthName: Yup.string()
    .trim()
    .matches(nameRegExp, languageTranslation('FIRSTNAME_SPECIALCHARACTER'))
    .max(20, languageTranslation('FIRSTNAME_MAXLENGTH')),
  nationality: Yup.mixed(),
  maritalStatus: Yup.mixed(),
  children: Yup.number().typeError(languageTranslation('INVALID_NUMBER')),
  // .integer('sdsadjasdja')
  // .strict(true),
  factorChildAllowance: Yup.number().typeError(
    languageTranslation('INVALID_NUMBER'),
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
