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
  mutation AddUser($firstName: String!, $lastName: String, $email: String) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
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

export const CareInstitutionQuery = [
    GET_CARE_INSTITUTION,
    DELETE_CARE_INSTITUTION,
    UPDATE_CARE_INSTITUTION,
    ADD_CARE_INSTITUTION
]