import { IReactSelectInterface } from "./Constant"

export interface ICareInstitutionFormValues {
    salutaion?: IReactSelectInterface,
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber?: number;
    mobileNumber?: number;
    fax: string;
    shortName: string;
    companyName: string;
    street: string;
    city: string;
    gender?: IReactSelectInterface;
    website?: string;
    title?: string;
    country?: IReactSelectInterface;
    state?: IReactSelectInterface;
    createdAt?: Date;
    updatedAt?: Date;
    id?: number
    salt?: String,
    userRole?: String,
    qualificationId?: IReactSelectInterface,
    attributeId?: IReactSelectInterface
    isActive?: Boolean,
    isDeleted?: Boolean,
    zipCode?: string,
    countryId?: string,
    stateId?: string,
    regionId?: number,
    remarks?: string,
    linkedTo?: string,
    anonymousName?: string,
    anonymousName2?: string,
    careGiverCommission?: string,
    doctorCommission?: string,
    leasingPriceListId?: IReactSelectInterface,
    invoiceType?: IReactSelectInterface,
    interval?: IReactSelectInterface,
    emailInvoice?: string,
    addressInvoice?: string,
    isArchive?: Boolean,
}

export interface ICareInstitutionValidationSchema {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    mobileNumber: number;
    city: string,
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