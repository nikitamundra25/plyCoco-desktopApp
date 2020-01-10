import * as Yup from "yup";
import { IEmployeeFormValues } from "../interfaces";
import {
  telephoneReqExp,
  nameRegExp,
  fileSize,
  SupportedFormats
} from "../config";
import { languageTranslation, logger, dateValidator } from "../helpers";
export const EmployeeValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IEmployeeFormValues
>> = Yup.object().shape<IEmployeeFormValues>({
  email: Yup.string()
    .trim()
    .email(languageTranslation("VALID_EMAIL"))
    .required(languageTranslation("REQUIRED_EMAIL")),
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
  telephoneNumber: Yup.string().matches(
    telephoneReqExp,
    languageTranslation("TELEPHONE_REQUIRED")
  ),
  userName: Yup.string()
    .trim()
    .required(languageTranslation("USERNAME_REQUIRED")),
  accountHolderName: Yup.string().trim(),
  bankName: Yup.string().trim(),
  IBAN: Yup.string(),
  BIC: Yup.string(),
  additionalText: Yup.string(),
  address1: Yup.string(),
  address2: Yup.string(),
  country: Yup.string(),
  zip: Yup.string(),
  joiningDate: Yup.mixed().test({
    name: "validate-date",
    test: function (val) {
      const { path, createError } = this;
      const {
        isValid,
        message
      }: { isValid: boolean; message: string } = dateValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  bankAccountNumber: Yup.string(),
  image: Yup.mixed()
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= fileSize
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SupportedFormats.includes(value.type)
    )
});
