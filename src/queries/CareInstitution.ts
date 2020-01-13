import gql from 'graphql-tag';

const GET_CARE_INSTITUTION = gql`
  query userList {
    users {
      id
      firstName
      lastName
      email
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
  mutation AddCareInstitution(
    $firstName: String!, 
    $lastName: String!, 
    $email: String!, 
    $userName: String!,
    $phoneNumber: String,
    $mobileNumber: number,
    $fax: String,
    $shortName: String,
    $companyName: String,
    $street: String,
    $city: String,
    $zip: String,
    $state: String,
    $country: String,
    ){
      addCareInstitution(
        firstName: $firstName, 
        lastName: $lastName, 
        email: $email, 
        userName: $userName,
        phoneNumber: $phoneNumber,
        mobileNumber: $mobileNumber,
        fax: $fax,
        shortName: $shortName,
        companyName: $companyName,
        street: $street,
        city: $city,
        zip: $zip,
        state: $state,
        country: $country,) {
          firstName 
          lastName 
          email 
          userName
          phoneNumber
          mobileNumber
          fax
          shortName
          companyName
          street
          city
          zip
          state
          country
      }
    }
`;

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

export const CareInstitution = [
  GET_CARE_INSTITUTION,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION
]