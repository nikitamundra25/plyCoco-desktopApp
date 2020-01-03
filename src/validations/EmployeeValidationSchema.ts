import * as Yup from "yup";
import { IEmployeeFormValues } from "../interfaces";
import { messages } from './Messages'
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const telephoneReqExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
// /^\d+$/
const iban = /^([A-Z]{2})([0-9]{2})([A-Z0-9]{9,30})$/
// const firstNameRegExp=/([a-zA-Z])+/
const nameRegExp = /^[A-Za-z]+$/
export const EmployeeValidationSchema: Yup.ObjectSchema<Yup.Shape<object, IEmployeeFormValues>
> = Yup.object().shape<IEmployeeFormValues>({
    email: Yup.string()
        .email(messages.VALID_EMAIL)
        .required(messages.REQUIRED_EMAIL),
    password: Yup.string()
        .min(6, messages.MIN_LENGTH_PASSWORD)
        .required(messages.REQUIRED_PASSWORD),
    firstName: Yup.string()
        .matches(nameRegExp, "First name doesnot contain any number or special characeter")
        .max(20, "First name must be less than 20 characters")
        .required("First Name is required"),
    lastName: Yup.string()
        .matches(nameRegExp, "Surname doesnot contain any number or special characeter")
        .max(20, "Last name must be less than 20 characters")
        .required("Last name is required"),
    telephoneNumber: Yup.string()
        .matches(telephoneReqExp, 'Telephone number is not valid')
        .required("Telephone number is required"),
    userName: Yup.string(),
    // .matches(userRegExp, 'Username must contain a number or a special character'),
    accountHolderName: Yup.string()
        .matches(nameRegExp, "Must be a character"),
    bankName: Yup.string()
        .matches(nameRegExp, "Must be a character"),
    IBAN: Yup.string()
        .matches(iban, "hiiiiiii"),
    BIC: Yup.string(), additionalText: Yup.string(), address1: Yup.string(), address2: Yup.string(), country: Yup.string(), zip: Yup.string(),
    //  date: Yup.date()
    // .nullable()
    // .notRequired()
    // .min(new Date(1900, 0, 1)),

})

