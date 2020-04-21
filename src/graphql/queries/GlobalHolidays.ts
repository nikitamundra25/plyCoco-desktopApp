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

const GET_GLOBAL_CAREGIVER_HOLIDAYS = gql`
query GetGlobalCaregiverHolidays(
  $gte: String
  $lte: String
  $stateId: [Int]
) {
  getCaregiverGlobalHolidays(
    gte: $gte
    lte: $lte
    stateId: $stateId
  ) {
    id
    date
    note
  }
}
`;

export const GlobalHolidaysQueries = [GET_GLOBAL_HOLIDAYS, GET_GLOBAL_CAREGIVER_HOLIDAYS];
