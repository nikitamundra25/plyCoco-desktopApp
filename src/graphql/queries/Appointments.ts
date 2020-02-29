import gql from 'graphql-tag';
const GET_USERS_BY_QUALIFICATION_ID = gql`
  query getUserByQualifications($qualificationId: [ID], $userRole: String) {
    getUserByQualifications(
      qualificationId: $qualificationId
      userRole: $userRole
    ) {
      firstName
      lastName
      userName
      userRole
      id
    }
  }
`;

export const AppointmentsQueries = [GET_USERS_BY_QUALIFICATION_ID];
