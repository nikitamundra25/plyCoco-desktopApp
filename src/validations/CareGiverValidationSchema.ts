import * as Yup from 'yup';
import { CareGiverValues } from '../interfaces';
import { messages } from './Messages';

export const CareGiverValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  CareGiverValues
>> = Yup.object().shape<CareGiverValues>({
  salutation: Yup.string()
    .required(messages.REQUIRED_FIELD),
  firstName: Yup.string()
    .required(messages.REQUIRED_FIELD),
  lastName: Yup.string()
    .required(messages.REQUIRED_FIELD),
  address1: Yup.string()
    .required(messages.REQUIRED_FIELD),
  address2: Yup.string()
    .required(messages.REQUIRED_FIELD),
  street: Yup.string()
    .required(messages.REQUIRED_FIELD),
  city: Yup.string()
    .required(messages.REQUIRED_FIELD),
  state: Yup.string()
    .required(messages.REQUIRED_FIELD),
  country: Yup.string()
    .required(messages.REQUIRED_FIELD),
  postCode: Yup.string()
    .required(messages.REQUIRED_FIELD),
  email: Yup.string()
    .required(messages.REQUIRED_FIELD),
  dob: Yup.string()
    .required(messages.REQUIRED_FIELD),
  phone: Yup.string()
    .required(messages.REQUIRED_FIELD),
  fax: Yup.string()
    .required(messages.REQUIRED_FIELD),
  mobilePhone: Yup.string()
    .required(messages.REQUIRED_FIELD),
  username: Yup.string()
    .required(messages.REQUIRED_FIELD),
  bankName: Yup.string()
    .required(messages.REQUIRED_FIELD),
  qualification: Yup.string()
    .required(messages.REQUIRED_FIELD),
  leasing: Yup.string()
    .required(messages.REQUIRED_FIELD),
  driverLicenseNumber: Yup.string()
    .required(messages.REQUIRED_FIELD),
  driversLicense: Yup.boolean(),
  vehicleavailable: Yup.boolean(),
  legalForm: Yup.string()
    .required(messages.REQUIRED_FIELD),
  companyName: Yup.string()
    .required(messages.REQUIRED_FIELD),
  registrationNumber: Yup.string()
    .required(messages.REQUIRED_FIELD),
  registerCourt: Yup.string()
    .required(messages.REQUIRED_FIELD),
  executiveDirector: Yup.string()
    .required(messages.REQUIRED_FIELD),
  socialSecurityContribution: Yup.boolean(),
  taxNumber: Yup.string()
    .required(messages.REQUIRED_FIELD),
  remarks: Yup.string()
    .required(messages.REQUIRED_FIELD),
  workZones: Yup.string()
    .required(messages.REQUIRED_FIELD),
  status: Yup.string()
    .required(messages.REQUIRED_FIELD),
});
