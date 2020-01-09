import gql from "graphql-tag";

export const CAREGIVER_PERSONAL_INFO_FIELDS = `
{
    id
    salutation
    firstName
    surname
    address
    dob
    phone
    fax
    mobile
    email
    password
    driverLicenseAvailable
    driverLicense
    ownVehicleAvailable
    legalType
    legalInfo
    securityContribution
    taxInput
    workingZones
    remarks
    qualifications
    createdAt
}`

export const GET_CAREGIVERS = gql`
query getCareGivers {
  getCareGivers 
  ${CAREGIVER_PERSONAL_INFO_FIELDS}
}`;

export const ADD_CAREGIVER = gql`
mutation addCareGiver($careGiverInput: CareGiverInput!) {
  addCareGiver(careGiverInput: $careGiverInput)
   ${CAREGIVER_PERSONAL_INFO_FIELDS}
}`;

export const UPDATE_CAREGIVER = gql`
  mutation updateCareGiver($id: Int!, $careGiverInput: CareGiverInput!) {
    updateCareGiver(id: $id, careGiverInput: $careGiverInput)
    ${CAREGIVER_PERSONAL_INFO_FIELDS}
  }
`;

export const DELETE_CAREGIVER = gql`
mutation deleteCareGiver($id: Int!){
  deleteCareGiver(id: $id)
}
`
