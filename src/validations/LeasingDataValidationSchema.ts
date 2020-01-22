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
    .max(20, languageTranslation('FIRSTNAME_MAXLENGTH'))
    .required(languageTranslation('FIRSTNAME_REQUIRED')),
  nationality: Yup.string()
    .trim()
    .matches(nameRegExp, languageTranslation('LASTNAME_SPECIALCHARACTER'))
    .max(20, languageTranslation('LASTNAME_MAXLENGTH'))
    .required(languageTranslation('LASTNAME_REQUIRED')),
  maritalStatus: Yup.string().required(
    languageTranslation('MARITAL_STATUS_REQUIRED'),
  ),
  children: Yup.string(),
  factorChildAllowance: Yup.string(),
  healthInsuranceType: Yup.string(),
  healthInsuranceProvider: Yup.string(),
  socialSecurityNumber: Yup.string(),
  religion: Yup.string(),
  controlId: Yup.string(),

  taxBracket: Yup.string(),
  preoccupation: Yup.string(),
  payrollIBAN: Yup.string(),
  status: Yup.string(),
});
