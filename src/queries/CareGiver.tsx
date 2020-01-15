import gql from "graphql-tag";

export const CAREGIVER_PERSONAL_INFO_FIELDS = `
{
  id
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
  phone
  qualification
  legalForm
  workZones
  status
  
  dob
  fax
  mobilePhone
  username
  bankName
  leasing
  driverLicenseNumber
  driversLicense
  vehicleavailable
  companyName
  registrationNumber
  registerCourt
  executiveDirector
  socialSecurityContribution
  taxNumber
  remarks
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
