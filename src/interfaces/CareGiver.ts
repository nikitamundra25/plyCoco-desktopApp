import { Location } from "history";
import * as H from 'history';

export interface CareGiverState {
    salutation: string,
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    street: string,
    city: string,
    state: string,
    country: string,
    postCode: string,
    email: string,
    dob: string,
    phone: string,
    fax: string,
    mobilePhone: string,
    username: string,
    companyName: string,
    bankName: string,
    qualification: any,
    leasing: string,
    status: string,
    legalForm: string,
    registrationNumber: string,
    registerCourt: string,
    taxNumber: string,
    vehicleavailable: boolean,
    driversLicense: boolean,
    driverLicenseNumber: string,
    remarks: string,
    executiveDirector: string,
    socialSecurityContribution: boolean,
    workZones: string//[]
}

export interface CareGiverValues {
    salutation: string,
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    street: string,
    city: string,
    state: string,
    country: string,
    postCode: string,
    email: string,
    dob: string,
    phone: string,
    fax: string,
    mobilePhone: string,
    username: string,
    companyName: string,
    legalForm: string,
    bankName: string,
    qualification: any,
    leasing: string,
    registrationNumber: string,
    registerCourt: string,
    taxNumber: string,
    remarks: string,
    driversLicense: boolean,
    vehicleavailable: boolean,
    driverLicenseNumber: string,
    executiveDirector: string,
    socialSecurityContribution: boolean,
    workZones: string,//[],
    status: string
}

export interface IEmailMenus<Params extends { [K in keyof Params]?: string } = {}> {
    history: H.History;
    location: H.Location;
}

export interface IBillingSettingsValues {
    feePerHour: string,
    nightAllowancePerHour: string,
    weekendAllowancePerHour: string,
    holidayAllowancePerHourFee: string,
    nextInvoiceNumber: string,
    statementsMaturity: string,
    bankName: string,
    accountHolderName: string,
    iban: string,
    bic: string,
    additionalText: string

}