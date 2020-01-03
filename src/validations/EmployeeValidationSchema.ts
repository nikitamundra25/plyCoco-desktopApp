import * as Yup from "yup";
import { IEmployeeFormValues } from "../interfaces";
import { messages } from './Messages'
const telephoneReqExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
const nameRegExp = /^[A-Za-z]+$/
export const EmployeeValidationSchema: Yup.ObjectSchema<Yup.Shape<object, IEmployeeFormValues>
> = Yup.object().shape<IEmployeeFormValues>({
    email: Yup.string()
        .email(messages.VALID_EMAIL)
        .required(messages.REQUIRED_EMAIL),
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
    userName: Yup.string()
        .required("Username is required"),
    accountHolderName: Yup.string()
        .matches(nameRegExp, "Must be a character"),
    bankName: Yup.string()
        .matches(nameRegExp, "Must be a character"),
    IBAN: Yup.string(),
    BIC: Yup.string(),
    additionalText: Yup.string(),
    address1: Yup.string(),
    address2: Yup.string(),
    country: Yup.string(),
    zip: Yup.string(),
    joiningDate: Yup.string()


})

