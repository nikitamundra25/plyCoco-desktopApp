import gql from "graphql-tag";

const ADD_GLOBAL_HOLIDAYS = gql`
  mutation AddGlobalHolidays($globalCalendarInput: [GlobalCalendarInput!]) {
    addGlobalHolidays(globalCalendarInput: $globalCalendarInput) {
      note
    }
  }
`;

export const GlobalCalendarMutations = [ADD_GLOBAL_HOLIDAYS];
