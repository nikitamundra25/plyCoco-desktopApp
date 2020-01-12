import * as Yup from 'yup';
import { CareGiverValues, IDateResponse } from '../interfaces';
import { languageTranslation, dateValidator } from '../helpers';
import { nameRegExp, telephoneReqExp } from '../config';

export const CareGiverValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  CareGiverValues
>> = Yup.object().shape<CareGiverValues>({
  salutation: Yup.string(),
  firstName: Yup.string()
    .trim()
    .matches(nameRegExp, languageTranslation('FIRSTNAME_SPECIALCHARACTER'))
    .max(20, languageTranslation('FIRSTNAME_MAXLENGTH'))
    .required(languageTranslation('FIRSTNAME_REQUIRED')),
  lastName: Yup.string()
    .trim()
    .matches(nameRegExp, languageTranslation('LASTNAME_SPECIALCHARACTER'))
    .max(20, languageTranslation('LASTNAME_MAXLENGTH'))
    .required(languageTranslation('LASTNAME_REQUIRED')),
  address1: Yup.string(),
  address2: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  country: Yup.string(),
  postCode: Yup.string(),
  email: Yup.string(),
  dob: Yup.mixed().test({
    name: 'validate-date',
    test: function (val) {
      const { path, createError } = this;
      const { isValid, message }: IDateResponse = dateValidator(val);
      return !val || isValid || createError({ path, message });
    },
  }),
  phone: Yup.string().matches(
    telephoneReqExp,
    languageTranslation('TELEPHONE_REQUIRED'),
  ),
  fax: Yup.string(),
  mobilePhone: Yup.string().matches(
    telephoneReqExp,
    languageTranslation('TELEPHONE_REQUIRED'),
  ),
  username: Yup.string()
    .trim()
    .required(languageTranslation('USERNAME_REQUIRED')),
  bankName: Yup.string(),
  qualification: Yup.string(),
  // .required(messages.REQUIRED_FIELD),
  leasing: Yup.string(),
  legalForm: Yup.string(),
  companyName: Yup.string(),
  registrationNumber: Yup.string(),
  registerCourt: Yup.string(),
  executiveDirector: Yup.string(),
  socialSecurityContribution: Yup.boolean(),
  taxNumber: Yup.string(),
  remarks: Yup.string(),
  driversLicense:Yup.bool().default(false),
    vehicleavailable:Yup.bool().default(false),
    driverLicenseNumber: Yup.string(),
  workZones: Yup.string(),
  status: Yup.string(),
});
