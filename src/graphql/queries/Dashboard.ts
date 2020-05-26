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

const GET_DASHBOARD_APPOINTMENT_LIST = gql`
  query($days: Int, $status: String) {
    getDashboardAppointments(days: $days, status: $status) {      
      id,
      date,
      ca{
        id
        user{
          id
          firstName
          lastName
          userName
        }
      }
      cr{
        id
          user{
          id
          firstName
          lastName
          userName
        }
      }	
    }
  }
`;

export const DashboardQueries = [
  GET_DASHBOARD_REGISTRATIONS_LIST,
  GET_DASHBOARD_DOCUMENTS_LIST,
  GET_DASHBOARD_LOGIN_HISTORY_LIST,

  GET_DASHBOARD_APPOINTMENT_LIST
];