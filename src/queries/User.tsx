import gql from 'graphql-tag';

const GET_USERS = gql`
  query userList {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($firstName: String!, $lastName: String, $email: String) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;

const UPDATE_USER = gql`
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

export const UsersQuery = [
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER
]