import gql from 'graphql-tag';

const GET_LOGIN_HISTORY = gql`
  query GetLoginHistory($userId: Int!) {
    getLoginHistory(userId: $userId) {
      id
      userId
      lastLogin
      loggedInIP
      loginCount
      loginToken
      userAgent
      loginAttempt
    }
  }
`;

export const LoginHistoryQuery = [GET_LOGIN_HISTORY];
