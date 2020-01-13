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
    country?: IReactSelectInterface;
    state?: IReactSelectInterface;
    createdAt?: Date;
    updatedAt?: Date;
    id?: number
    salt?: String,
    userRole?: String,
    qualificationId?: number,
    isActive?: Boolean,
    isDeleted?: Boolean,
    zipCode?: string,
    countryId?: string,
    stateId?: string,
    regionId?: number,
    remarks?: String,
    linkedTo?: String,
    careGiverCommission?: String,
    doctorCommission?: String,
    leasingPriceListId?: String,
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