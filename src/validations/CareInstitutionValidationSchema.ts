import * as Yup from "yup";
import { mobMin, mobMax, webRegExp } from "../config";
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
    .required(languageTranslation("FIRSTNAME_REQUIRED")),
  lastName: Yup.string()
    .trim()
    .min(3, languageTranslation("NAME_MINLENGTH"))
    .max(20, languageTranslation("LASTNAME_MAXLENGTH"))
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
  careGiverCommission: Yup.mixed().test(
    "check-num",
    languageTranslation("INVALID_NUM"),
    value => !value || (value && !isNaN(value))
  ),
  doctorCommission: Yup.mixed().test(
    "check-num",
    languageTranslation("INVALID_NUM"),
    value => !value || (value && !isNaN(value))
  ),
  fax: Yup.mixed().test(
    "check-num",
    languageTranslation("INVALID_NUMBER"),
    value => !value || (value && !isNaN(value))
  ),
  website: Yup.string().matches(
    webRegExp,
    { message: languageTranslation("ENTER_VALID_WEB_URL"), excludeEmptyString: true }
  ).nullable()
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
    .max(20, languageTranslation("FIRSTNAME_MAXLENGTH"))
    .required(languageTranslation("FIRSTNAME_REQUIRED")),
  lastName: Yup.string()
    .trim()
    .max(20, languageTranslation("LASTNAME_MAXLENGTH"))
    .min(3, languageTranslation("NAME_MINLENGTH"))
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
