import * as Yup from "yup";
import { ILoginFormValues } from "../interfaces";

export const LoginValidationSchema: Yup.ObjectSchema<Yup.Shape<object, ILoginFormValues>
> = Yup.object().shape<ILoginFormValues>({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is Required"),
    password: Yup.string()
        .min(6, "Password is too Short!")
        .required("Password is Required")
})

