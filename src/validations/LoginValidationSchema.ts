import * as Yup from "yup";
import { ILoginFormValues } from "../interfaces";
import { languageTranslation } from "../helpers/LangauageTranslation";

export const LoginValidationSchema: Yup.ObjectSchema<Yup.Shape<object, ILoginFormValues>
> = Yup.object().shape<ILoginFormValues>({
    email: Yup.string()
        .email(languageTranslation("VALID_EMAIL"))
        .required(languageTranslation("REQUIRED_EMAIL")),
    password: Yup.string()
        .min(6, languageTranslation("MIN_LENGTH_PASSWORD"))
        .required(languageTranslation("REQUIRED_PASSWORD"))
})