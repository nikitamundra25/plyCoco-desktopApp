import gql from 'graphql-tag';

const GET_CARE_INSTITUTION_LIST = gql`
  query getCareInstitutions {
    getCareInstitutions(searchBy:null,sortBy:3,limit:2,isActive:"true") {
      id
      firstName
      lastName
      email
      userName
      phoneNumber
      isActive
      canstitution{
        city
        zipCode
        companyName
        shortName
      }
    }
  }
`;

const DELETE_CARE_INSTITUTION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

const ADD_CARE_INSTITUTION = gql`
  mutation AddCareInstitution($careInstitutionInput: CareInstitutionInput) {
    addCareInstitution(careInstitutionInput: $careInstitutionInput) {
      firstName
    }
  }`;

const UPDATE_CARE_INSTITUTION = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String!
    $lastName: String
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      id
      firstName
      lastName
    }
  }
`;

export const CareInstitutionQueries = [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION
]