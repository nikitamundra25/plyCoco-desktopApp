import gql from "graphql-tag";

export const CAREGIVER_PERSONAL_INFO_FIELDS = `
{
  
  address1
 
}`

export const GET_CAREGIVERS = gql`
query getCareGivers {
  getCareGivers 
  ${CAREGIVER_PERSONAL_INFO_FIELDS}
}`;

export const ADD_CAREGIVER = gql`
mutation addCaregiver($careGiverInput: CareGiverInput!) {
  addCaregiver(careGiverInput: $careGiverInput)
   ${CAREGIVER_PERSONAL_INFO_FIELDS}
}`;

export const UPDATE_CAREGIVER = gql`
  mutation updateCaregiver($id: Int!, $careGiverInput: CareGiverInput!) {
    updateCaregiver(id: $id, careGiverInput: $careGiverInput)
    ${CAREGIVER_PERSONAL_INFO_FIELDS}
  }
`;

export const DELETE_CAREGIVER = gql`
mutation deleteCaregiver($id: Int!){
  deleteCaregiver(id: $id)
}
`
