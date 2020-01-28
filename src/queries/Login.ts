import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation adminLogin($authInput: AuthInput) {
    adminLogin(authInput: $authInput) {
      token
      message
      status
    }
  }
`;
