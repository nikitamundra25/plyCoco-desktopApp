import gql from 'graphql-tag';

const GET_DASHBOARD_REGISTRATIONS_LIST = gql`
  query($days: Int) {
    getDashboardRegistrations(days: $days) {
      id
      firstName
      lastName
      userName
      userRole
      createdAt
    }
  }
`;

const GET_DASHBOARD_DOCUMENTS_LIST = gql`
  query($days: Int) {
    getDashboardNewDocuments(days: $days) {      
      createdAt,
      document_type{
        type
      }
      user{
        id
        firstName
        lastName
        userName
        userRole
      }
    }
  }
`;

const GET_DASHBOARD_LOGIN_HISTORY_LIST = gql`
  query($days: Int, $loginAttempt: String) {
    getDashboardLoginHistory(days: $days, loginAttempt: $loginAttempt) {      
      loggedInIP,
      createdAt,
      user{
        id
        firstName
        lastName
        userName
        userRole
      }
    }
  }
`;

export const DashboardQueries = [
  GET_DASHBOARD_REGISTRATIONS_LIST,
  GET_DASHBOARD_DOCUMENTS_LIST,
  GET_DASHBOARD_LOGIN_HISTORY_LIST
];