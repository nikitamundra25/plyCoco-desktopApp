import * as Yup from "yup";
import { IEmployeeFormValues, IDateResponse } from "../interfaces";
import {
  nameRegExp,
  fileSize,
  SupportedFormats,
  telephoneReqExp,
  IBANlength,
  telMin,
  telMax,
  IBANReplaceRegex
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
    .min(3, languageTranslation("NAME_MINLENGTH"))
    .max(20, languageTranslation("FIRSTNAME_MAXLENGTH"))
    .matches(nameRegExp, languageTranslation("FIRSTNAME_SPECIALCHARACTER"))
    .required(languageTranslation("FIRSTNAME_REQUIRED")),
  lastName: Yup.string()
    .trim()
    .max(20, languageTranslation("LASTNAME_MAXLENGTH"))
    .min(3, languageTranslation("NAME_MINLENGTH"))
    .matches(nameRegExp, languageTranslation("LASTNAME_SPECIALCHARACTER"))
    .required(languageTranslation("LASTNAME_REQUIRED")),
  userName: Yup.string()
    .trim()
    .required(languageTranslation("USERNAME_REQUIRED")),
  accountHolderName: Yup.string()
    .trim()
    .min(3, languageTranslation("NAME_MINLENGTH")),
  bankName: Yup.string()
    .trim()
    .min(3, languageTranslation("NAME_MINLENGTH")),
  BIC: Yup.string(),
  additionalText: Yup.string(),
  address1: Yup.string(),
  address2: Yup.string(),
  zip: Yup.string(),
  joiningDate: Yup.mixed().test({
    name: "validate-date",
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: IDateResponse = dateValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  image: Yup.mixed()
    .test(
      "fileFormat",
      languageTranslation("UNSUPPORTED_FORMAT"),
      value => !value || (value && SupportedFormats.includes(value.type))
    )
    .test(
      "fileSize",
      languageTranslation("FILE_SIZE_TO_LARGE"),
      value => !value || (value && value.size <= fileSize)
    ),
  IBAN: Yup.mixed().test(
    "len",
    languageTranslation("IBAN_INVALID"),
    value =>
      !value ||
      !value.replace(IBANReplaceRegex, "") ||
      (value && value.replace(IBANReplaceRegex, "").length === IBANlength)
  ),
  telephoneNumber: Yup.mixed()
    .test(
      "check-num",
      languageTranslation("TEL_NUMERROR"),
      value => !value || (value && !isNaN(value))
    )
    .test(
      "num-length",
      languageTranslation("TEL_MINLENGTH"),
      value =>
        !value || (value && value.length >= telMin && value.length <= telMax)
    ),
  city: Yup.string()
});
