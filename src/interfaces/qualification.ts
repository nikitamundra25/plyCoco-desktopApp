export interface IQualification {
    id: string;
    attributeName: string;
}

export interface IQualifications {
    getQualificationAttributes: IQualification[]
}