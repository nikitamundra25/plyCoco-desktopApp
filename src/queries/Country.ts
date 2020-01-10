import gql from 'graphql-tag';

const GET_COUNTRIES = gql`
  query countries {
    countries {
      id
      name
    }
  }
`;

const GET_STATE_BY_COUNTRIES = gql`
  query state($countryid: string!) {
    state(countryid: $countryid) {
      id
      name
    }
  }
`;

export const CountryQueries = [GET_COUNTRIES, GET_STATE_BY_COUNTRIES];
