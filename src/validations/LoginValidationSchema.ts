import * as Yup from "yup";
import { ILoginFormValues } from "../interfaces";
import { messages } from './Messages'
export const LoginValidationSchema: Yup.ObjectSchema<Yup.Shape<object, ILoginFormValues>
> = Yup.object().shape<ILoginFormValues>({
    email: Yup.string()
        .email(messages.VALID_EMAIL)
        .required(messages.REQUIRED_EMAIL),
    password: Yup.string()
        .min(6, messages.MIN_LENGTH_PASSWORD)
        .required(messages.REQUIRED_PASSWORD)
})

