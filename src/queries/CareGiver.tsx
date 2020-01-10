import gql from "graphql-tag";

export const CAREGIVER_PERSONAL_INFO_FIELDS = `
{
  salutation
  firstName
  lastName
  address1
  address2
  street
  city
  state
  country
  postCode
  email
  dob
  phone
  fax
  mobilePhone
  username
  bankName
  qualification
  leasing
  driverLicenseNumber
  driversLicense
  vehicleavailable
  legalForm
  companyName
  registrationNumber
  registerCourt
  executiveDirector
  socialSecurityContribution
  taxNumber
  remarks
  workZones
  status
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
