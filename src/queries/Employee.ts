import gql from 'graphql-tag';

const ADD_EMPLOYEE = gql`
  mutation AddUser($firstName: String!, $lastName: String, $email: String) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;

export const EmployeeQueries = [ADD_EMPLOYEE];
