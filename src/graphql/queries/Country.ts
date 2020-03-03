import gql from "graphql-tag";

const GET_COUNTRIES = gql`
  query countries {
    countries {
      id
      name
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

export const CountryQueries = [GET_COUNTRIES, GET_STATES_BY_COUNTRY];
