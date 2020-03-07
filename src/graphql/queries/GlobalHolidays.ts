import gql from "graphql-tag";

const GET_GLOBAL_HOLIDAYS = gql`
  query GetGlobalHolidays($applicableStates: [ID!]) {
    getGlobalHolidays(applicableStates: $applicableStates) {
      id
      date
      note
      applicableStates
      states {
        id
        name
      }
    }
  }
`;

export const GlobalHolidaysQueries = [GET_GLOBAL_HOLIDAYS];
