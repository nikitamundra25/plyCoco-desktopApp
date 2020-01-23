import * as Yup from "yup";
import {
  CareGiverValues,
  IDateResponse,
  IRemark,
  ICareGiverValidationInterface
} from "../interfaces";
import { languageTranslation, dateValidator } from "../helpers";
import { nameRegExp, telephoneReqExp, telMin, telMax } from "../config";

export const CareGiverValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICareGiverValidationInterface
>> = Yup.object().shape<ICareGiverValidationInterface>({
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
  email: Yup.string()
    .trim()
    .email(languageTranslation("VALID_EMAIL"))
    .required(languageTranslation("REQUIRED_EMAIL")),
  dateOfBirth: Yup.mixed().test({
    name: "validate-date",
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: IDateResponse = dateValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
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
        !value || (value && value.length >= telMin && value.length <= telMax)
    ),
  mobileNumber: Yup.string()
    .test(
      "check-num",
      languageTranslation("MOB_NUMERROR"),
      value => !value || (value && !isNaN(value))
    )
    .test(
      "num-length",
      languageTranslation("MOB_MAXLENGTH"),
      value =>
        !value || (value && value.length >= telMin && value.length <= telMax)
    ),
  userName: Yup.string()
    .trim()
    .required(languageTranslation("USERNAME_REQUIRED")),
  fee: Yup.string().test(
    "check-num",
    languageTranslation("FEE_NUMERROR"),
    value => !value || (value && !isNaN(value))
  ),
  night: Yup.string().test(
    "check-num",
    languageTranslation("NIGHT_NUMERROR"),
    value => !value || (value && !isNaN(value))
  ),
  weekendAllowance: Yup.string().test(
    "check-num",
    languageTranslation("WEEKEND_ALLOWANCE_NUMERROR"),
    value => !value || (value && !isNaN(value))
  ),
  holiday: Yup.string().test(
    "check-num",
    languageTranslation("HOLIDAY_NUMERROR"),
    value => !value || (value && !isNaN(value))
  )
});
