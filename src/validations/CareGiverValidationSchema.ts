import * as Yup from "yup";
import { CareGiverValues, IDateResponse, IRemark } from "../interfaces";
import { languageTranslation, dateValidator } from "../helpers";
import { nameRegExp, telephoneReqExp } from "../config";

export const CareGiverValidationSchema: Yup.ObjectSchema<
  Yup.Shape<object, CareGiverValues>
> = Yup.object().shape<CareGiverValues>({
  firstName: Yup.string()
    .trim()
    .matches(nameRegExp, languageTranslation("FIRSTNAME_SPECIALCHARACTER"))
    .max(20, languageTranslation("FIRSTNAME_MAXLENGTH"))
    .required(languageTranslation("FIRSTNAME_REQUIRED")),
  lastName: Yup.string()
    .trim()
    .matches(nameRegExp, languageTranslation("LASTNAME_SPECIALCHARACTER"))
    .max(20, languageTranslation("LASTNAME_MAXLENGTH"))
    .required(languageTranslation("LASTNAME_REQUIRED")),
  address1: Yup.string(),
  address2: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  postCode: Yup.string(),
  email: Yup.string(),
  // dateOfBirth: Yup.mixed().test({
  //   name: 'validate-date',
  //   test: function (val) {
  //     const { path, createError } = this;
  //     const { isValid, message }: IDateResponse = dateValidator(val);
  //     return !val || isValid || createError({ path, message });
  //   },
  // }),
  phoneNumber: Yup.string()
    .min(10)
    .max(13),
  fax: Yup.string(),
  mobileNumber: Yup.string()
    .min(10)
    .max(13),
  userName: Yup.string()
    .trim()
    .required(languageTranslation("USERNAME_REQUIRED")),
  // bankName: Yup.string(),
  // .required(messages.REQUIRED_FIELD),
  companyName: Yup.string(),
  registrationNumber: Yup.string(),
  registerCourt: Yup.string(),
  executiveDirector: Yup.string(),
  socialSecurityContribution: Yup.boolean(),
  taxNumber: Yup.string(),
  remarks: Yup.object().shape<IRemark>({
    createdBy: Yup.string(),
    description: Yup.string()
  }),
  driversLicense: Yup.bool().default(false),
  vehicleAvailable: Yup.bool().default(false),
  driverLicenseNumber: Yup.string(),
  status: Yup.string()
});
