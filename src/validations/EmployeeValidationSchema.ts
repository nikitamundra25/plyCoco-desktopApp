import * as Yup from "yup";
import { IEmployeeFormValues } from "../interfaces";
import { telephoneReqExp, nameRegExp, fileSize, SupportedFormats } from '../config'
import moment from "moment";
import { languageTranslation } from "../helpers";
export const EmployeeValidationSchema: Yup.ObjectSchema<Yup.Shape<object, IEmployeeFormValues>
> = Yup.object().shape<IEmployeeFormValues>({
    email: Yup.string().trim()
        .email(languageTranslation("VALID_EMAIL"))
        .required(languageTranslation("REQUIRED_EMAIL")),
    firstName: Yup.string().trim()
        .matches(nameRegExp, languageTranslation("FIRSTNAME_SPECIALCHARACTER"))
        .max(20, languageTranslation("FIRSTNAME_MAXLENGTH"))
        .required(languageTranslation("FIRSTNAME_REQUIRED")),
    lastName: Yup.string().trim()
        .matches(nameRegExp, languageTranslation("LASTNAME_SPECIALCHARACTER"))
        .max(20, languageTranslation("LASTNAME_MAXLENGTH"))
        .required(languageTranslation("LASTNAME_REQUIRED")),
    telephoneNumber: Yup.string()
        .matches(telephoneReqExp, languageTranslation("TELEPHONE_REQUIRED")),
    userName: Yup.string().trim()
        .required(languageTranslation("USERNAME_REQUIRED")),
    accountHolderName: Yup.string().trim(),
    // .matches(nameRegExp, "Must be a character"),
    bankName: Yup.string().trim(),
    // .matches(nameRegExp, "Must be a character"),
    IBAN: Yup.string(),
    BIC: Yup.string(),
    additionalText: Yup.string(),
    address1: Yup.string(),
    address2: Yup.string(),
    country: Yup.string(),
    zip: Yup.string(),
    joiningDate: Yup.mixed()
        .test('valid-date', 'Please enter a valid date', val => {
            console.log("validate date", moment(val).isValid())
            console.log("min date", moment(val).min("1990-04-20T20:00:00+0800").isValid());
            console.log("max date", moment(val).max(new Date()).isValid());
            // if ((moment(val, 'DD/MM/YYYY').isValid()
            //     && moment(val).min("1999-01-01").isValid()
            //     && moment(val).max(new Date()).isValid()) === true) {
            //     console.log("date is validddddddd---------------");
            // }
            // else {
            //     console.log("not valid &&&&&&&&&&&&&&");
            // }
            return val
        }
        )
        /* .test('is-of-age', 'You must be 18 years or older to sign up ', val => {
            console.log("minnnnnnnnnn", moment().diff(moment(val, 'DD/MM/YYYY'), 'year') >= 50)
            console.log("maxxxxxxxxxx", moment().diff(moment(val, 'DD/MM/YYYY'), 'year') <= 50)
            return moment().diff(moment(val, 'DD/MM/YYYY'), 'year') >= 50
        }) */,
    bankAccountNumber: Yup.string(),
    image: Yup.mixed()
    // .test('fileSize', "File Size is too large", value => value.size <= fileSize)
    // .test('fileType', "Unsupported File Format", value => SupportedFormats.includes(value.type))
    ,

})

