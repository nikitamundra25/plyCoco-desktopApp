import * as Yup from "yup";
import { CareGiverValues, IDateResponse, IRemark, ICareGiverValidationInterface } from "../interfaces";
import { languageTranslation, dateValidator } from "../helpers";
import { nameRegExp, telephoneReqExp } from "../config";

export const CareGiverValidationSchema: Yup.ObjectSchema<
  Yup.Shape<object, ICareGiverValidationInterface>
> = Yup.object().shape<ICareGiverValidationInterface>({
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
    test: function (val) {
      const { path, createError } = this;
      const { isValid, message }: IDateResponse = dateValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  phoneNumber: Yup.string()
    .min(10)
    .max(13),
  mobileNumber: Yup.string()
    .min(10)
    .max(13),
  userName: Yup.string()
    .trim()
    .required(languageTranslation("USERNAME_REQUIRED")),
});
