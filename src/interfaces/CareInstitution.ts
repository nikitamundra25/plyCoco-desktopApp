import { IReactSelectInterface } from "./Constant"

export interface ICareInstitutionFormValues {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber: string;
    mobileNumber: number;
    fax: string;
    shortName: string;
    companyName: string;
    street: string;
    city: string;
    zip: string;
    state: IReactSelectInterface;
    country: IReactSelectInterface;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICareInstitutionValidationSchema {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
}

export interface ICareInstitutionContact {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber: string;
    mobileNumber: string;
    faxNumber: string;
    constactType: string;
    comments: string;
    groupAttributes: string;
    createdAt: Date;
    updatedAt: Date;
}