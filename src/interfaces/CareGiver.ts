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
    bankName: string,
    qualification: any,
    leasing: string,
    status: string
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
    bankName: string,
    qualification: any,
    leasing: string,
    status: string
}

export interface IEmailMenus<Params extends { [K in keyof Params]?: string } = {}> {
    history: H.History;
    location: H.Location;
}