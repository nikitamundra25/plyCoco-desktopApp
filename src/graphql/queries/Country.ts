import gql from "graphql-tag";

const GET_COUNTRIES = gql`
  query countries {
    countries {
      id
      name
      sortname
    }
  }
`;

const GET_STATES_BY_COUNTRY = gql`
  query states($countryid: ID!) {
    states(countryid: $countryid) {
      id
      name
    }
  }
`;
const GET_STATES_BY_COUNTRIES = gql`
  query statesByIds($countryid: [ID!]) {
    statesByIds(countryid: $countryid) {
      id
      name
    }
  }
`;

export const CountryQueries = [
  GET_COUNTRIES,
  GET_STATES_BY_COUNTRY,
  GET_STATES_BY_COUNTRIES
];
