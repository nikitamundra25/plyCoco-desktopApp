import { Location } from "history";
import * as H from 'history';

export interface CareGiverState {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    bankName: string,
    qualification: any,
    leasing: string,
    status: string
}

export interface CareGiverValues {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    bankName: string,
    qualification: any,
    leasing: string,
    status: string
}

export interface IEmailMenus<Params extends { [K in keyof Params]?: string } = {}> {
    history: H.History;
    location: H.Location;
}