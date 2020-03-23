import gql from "graphql-tag";

const GET_GLOBAL_HOLIDAYS = gql`
  query GetGlobalHolidays(
    $startDate: String
    $endDate: String
    $applicableStates: [ID!]
    $hideWeekends: Boolean
  ) {
    getGlobalHolidays(
      startDate: $startDate
      endDate: $endDate
      applicableStates: $applicableStates
      hideWeekends: $hideWeekends
    ) {
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
