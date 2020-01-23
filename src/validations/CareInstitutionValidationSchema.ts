import * as Yup from "yup";
import { nameRegExp, mobMin, mobMax, webRegExp } from "../config";
import { languageTranslation, logger, dateValidator } from "../helpers";
import {
  ICareInstitutionValidationSchema,
  ICareInstitutionContactValidationSchema
} from "../interfaces";

export const CareInstituionValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICareInstitutionValidationSchema
>> = Yup.object().shape<ICareInstitutionValidationSchema>({
  email: Yup.string()
    .trim()
    .email(languageTranslation("VALID_EMAIL"))
    .required(languageTranslation("REQUIRED_EMAIL")),
  firstName: Yup.string()
    .trim()
    .min(3, languageTranslation("NAME_MINLENGTH"))
    .max(20, languageTranslation("FIRSTNAME_MAXLENGTH"))
    .required(languageTranslation("FIRSTNAME_REQUIRED"))
    .matches(nameRegExp, languageTranslation("FIRSTNAME_SPECIALCHARACTER")),
  lastName: Yup.string()
    .trim()
    .min(3, languageTranslation("NAME_MINLENGTH"))
    .max(20, languageTranslation("LASTNAME_MAXLENGTH"))
    .matches(nameRegExp, languageTranslation("LASTNAME_SPECIALCHARACTER"))
    .required(languageTranslation("LASTNAME_REQUIRED")),
  userName: Yup.string()
    .trim()
    .required(languageTranslation("USERNAME_REQUIRED")),
  mobileNumber: Yup.mixed()
    .test(
      "check-num",
      languageTranslation("MOB_NUMERROR"),
      value => !value || (value && !isNaN(value))
    )
    .test(
      "num-length",
      languageTranslation("MOB_MAXLENGTH"),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax)
    ),
  phoneNumber: Yup.mixed()
    .test(
      "check-num",
      languageTranslation("PHONE_NUMERROR"),
      value => !value || (value && !isNaN(value))
    )
    .test(
      "num-length",
      languageTranslation("PHONE_MAXLENGTH"),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax)
    ),
  careGiverCommission: Yup.string().test(
    "check-num",
    languageTranslation("HOLIDAY_NUMERROR"),
    value => !value || (value && !isNaN(value))
  ),
  doctorCommission: Yup.string().test(
    "check-num",
    languageTranslation("HOLIDAY_NUMERROR"),
    value => !value || (value && !isNaN(value))
  )
});

export const CareInstituionContactValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICareInstitutionContactValidationSchema
>> = Yup.object().shape<ICareInstitutionContactValidationSchema>({
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
    .max(20, languageTranslation("LASTNAME_MAXLENGTH"))
    .min(3, languageTranslation("NAME_MINLENGTH"))
    .matches(nameRegExp, languageTranslation("LASTNAME_SPECIALCHARACTER"))
    .required(languageTranslation("LASTNAME_REQUIRED")),
  mobileNumber: Yup.mixed()
    .test(
      "check-num",
      languageTranslation("MOB_NUMERROR"),
      value => !value || (value && !isNaN(value))
    )
    .test(
      "num-length",
      languageTranslation("MOB_MAXLENGTH"),
      value =>
        !value || (value && value.length >= mobMin && value.length <= mobMax)
    )
});
