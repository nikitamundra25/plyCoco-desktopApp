import gql from "graphql-tag";

const ADD_GLOBAL_HOLIDAYS = gql`
  mutation AddGlobalHolidays($globalCalendarInput: [GlobalCalendarInput!]) {
    addGlobalHolidays(globalCalendarInput: $globalCalendarInput) {
      note
    }
  }
`;

const DELETE_HOLIDAY = gql`
  mutation DeleteGlobalCalendarHoliday($id: ID!) {
    deleteGlobalCalendarHoliday(id: $id) {
      id
    }
  }
`;

export const GlobalCalendarMutations = [ADD_GLOBAL_HOLIDAYS, DELETE_HOLIDAY];
