import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation adminLogin($authInput: AuthInput) {
    adminLogin(authInput: $authInput) {
      token
      message
      status
      sessionExpire
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken {
      token
      sessionExpire
    }
  }
`;
